import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { GridCell, Grid, GridInner } from '@rmwc/grid';
import { 
  DataTable,
  DataTableBody,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
 } from '@rmwc/data-table';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';

import { Switch } from '@rmwc/switch';
import { Select } from '@rmwc/select';

import { injectIntl } from 'react-intl';
import { 
  bookFunkis,
  getFunkisar,
  getFunkisTimeSlots,
  getFunkisTypes,
  unbookFunkis,
  updateFunkis,
 } from '../../../actions/funkis';
import { ScaleLoader } from 'react-spinners';

import { CSVLink } from 'react-csv';

import { defaultFunkis } from './constants'
import { FunkisAdminRow } from './FunkisAdminRow';
import FunkisModal from './FunkisModal';

// TODO: Bryt ut till intl


const FunkisAdminComponent = ({
  funkisar,
  loading,
  getFunkisar,
  updateFunkis,
  timeslots,
  getFunkisTimeSlots,
  getFunkisTypes,
  positions,
  bookFunkis,
  unbookFunkis,
  idTimeslots,
}) => {

  const [funkisModalOpen, setFunkisModalOpen] = useState(false);
  const [activeFunkis, setActiveFunkis] = useState(defaultFunkis);
  const [searchTerm, setSearchTerm] = useState('');
  const [originalTimeslots, setOriginalTimeslots] = useState([]);
  const [CSVHeaders, setCSVHeaders] = useState({});
  const [sortation, setSort] = useState({field: 'name', dir: 1});
  const [funkisTypeFilter, setFunkisTypeFilter] = useState('0');
  const [funkisCompleteFilter, setFunkisCompleteFilter] = useState('0');

  const activatedCSVHeaders = Object.values(CSVHeaders).filter(obj => obj.checked).map(v => v.id);
  const CSVData = Object.values(funkisar).map(c => ({
    ...Object.keys(c).reduce((acc, k) => {
      let val;
      switch(k) {
        case 'selectedFunkisAlt':
          val = positions[funkisar[c.id][k]];
          break;
        case 'selectedTimeSlots':
          val = funkisar[c.id][k].map(t => {
            const options = {day: 'numeric', month: 'numeric', hour:'numeric', minute:'numeric'};
            const start = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].start_time);
            const end = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].end_time);
            return (`${start} -  ${end}` );
          });
          break;
        case 'funkisAlts':
          val = funkisar[c.id][k].map(p => positions[p]);
          break;
        default:
          val = funkisar[c.id][k]
      }
      return activatedCSVHeaders.includes(k) ? {
        ...acc,
        [k] : val
      }
      :
      acc
    },{})
  }))

  useEffect(() => {
    getFunkisar();
    getFunkisTimeSlots();
    getFunkisTypes();
  }, [getFunkisar, getFunkisTimeSlots, getFunkisTypes])

  const getFieldSort = (field) => {
    if(field === sortation.field) return sortation.dir;
    return null;
  }

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  }

  const handleSortChange = (field, dir) => {
    setSort({field, dir: dir? dir : 1});
  }

  const funkisFilter = (f) => {
    if(f.selectedFunkisAlt != funkisTypeFilter && funkisTypeFilter !== "0") return false;
    if(funkisCompleteFilter !== "0") {
      if(f.markedAsDone && funkisCompleteFilter !== '1') return false;
      else if(!f.markedAsDone && funkisCompleteFilter !== '2') return false;
    }
    
    for(const key of ['name', 'email', 'liuid']) {
      if(f[key] && f[key].toLowerCase().includes(searchTerm)) return true;
    }
    if(f.selectedTimeSlots) {
      const options = {day: 'numeric', month: 'numeric', hour:'numeric', minute:'numeric'};
      for(const t of f.selectedTimeSlots) {
        const start = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].start_time)
        const end = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].end_time)
        if(start.replace(/ /g,'').includes(searchTerm.replace(/ /g,'')) || end.replace(/ /g,'').includes(searchTerm.replace(/ /g,''))) return true;
      }
    }
    return false;
  }

  const funkisTable = (
    <DataTable>
      <DataTableContent>
        <DataTableHead>
          <DataTableRow>
            <DataTableHeadCell sort={getFieldSort('name')} onSortChange={(dir) => handleSortChange('name', dir)}>Namn</DataTableHeadCell>
            <DataTableHeadCell sort={getFieldSort('liuid')} onSortChange={(dir) => handleSortChange('liuid', dir)}>LiU-ID</DataTableHeadCell>
            <DataTableHeadCell sort={getFieldSort('email')} onSortChange={(dir) => handleSortChange('email', dir)}>E-mail</DataTableHeadCell>
            <DataTableHeadCell sort={getFieldSort('selectedFunkisAlt')} onSortChange={(dir) => handleSortChange('selectedFunkisAlt', dir)}>Funkis-typ</DataTableHeadCell>
            <DataTableHeadCell>Bokade pass</DataTableHeadCell>
          </DataTableRow>
        </DataTableHead>
        <DataTableBody>
          {funkisar !== {} && Object.values(funkisar).sort((f, s) => {
            const first = sortation.field === 'selectedFunkisAlt' && f.selectedFunkisAlt? positions[f[sortation.field]] : f[sortation.field]
            const second = sortation.field === 'selectedFunkisAlt' && s.selectedFunkisAlt? positions[s[sortation.field]] : s[sortation.field]
            if(first > second) return -1;
            if(first < second) return 1;
            return 0;
          }).sort(() => sortation.dir).filter(f => funkisFilter(f)).map((f) => {
                return (
                  <FunkisAdminRow
                    funkis={{
                      ...f,
                      selectedFunkisAlt: positions[f.selectedFunkisAlt],
                      selectedTimeSlots: f.selectedTimeSlots.map(t => {
                        const options = {day: 'numeric', month: 'numeric', hour:'numeric', minute:'numeric'};
                        const start = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].start_time);
                        const end = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].end_time);
                        return (`${start} -  ${end}` );
                      })
                    }}
                    onClick={() => {
                      setActiveFunkis({
                        ...f,
                      });
                      setFunkisModalOpen(true);
                      setOriginalTimeslots(f.selectedTimeSlots);
                    }}
                  />
                );
              }
          )}
        </DataTableBody>
      </DataTableContent>  
    </DataTable>
  )

  return ( // TODO: Fix in-line text
    <>
    {loading &&
      <GridInner className='h-center v-center' style={{height: '100%'}}>
          <ScaleLoader
            loading={true}
            color={'red'}
          />
      </GridInner>
    }
    {!loading && activeFunkis !== defaultFunkis &&
      <FunkisModal
        funkis={activeFunkis}
        setFunkisModalOpen={setFunkisModalOpen}
        timeslots={timeslots}
        positions={positions}
        isOpen={funkisModalOpen}
        originalTimeslots={originalTimeslots}
      />
      }
      {!loading &&
      <Grid>
      <GridCell desktop='12' tablet='8' phone='4'>
        {Object.keys(funkisar).length > 0 && Object.keys(funkisar[Object.keys(funkisar)[0]]).map(v => {
          if(!CSVHeaders[v]) {
            setCSVHeaders({
              ...CSVHeaders,
              [v] : {
                id: v,
                checked: true,
              }
            })
          }
          
          return(<Switch
            checked={CSVHeaders[v]?.checked ?? true}
            onClick={() => {
              setCSVHeaders({
                ...CSVHeaders,
                [v]: {
                  id: v,
                  checked: !(CSVHeaders[v]?.checked ?? true),
                },
              })
            }}
            checkmark
            label={v}
          />)
        })}
      </GridCell>
      <GridCell desktop='12' tablet='8' phone='4'>
        <CSVLink style={{textDecoration: 'none'} } filename={'funkisData.csv'} data={CSVData}>
        {funkisar && <Button raised>Ladda ner CSV</Button>}
        </CSVLink>
      </GridCell>
      <GridCell desktop='12' tablet='8' phone='4'>
        <TextField withLeadingIcon='search' label='Sök' id='searchBar' className='funkisSearch' onChange={handleSearch}/>
      </GridCell>
      <GridCell desktop='12' tablet='8' phone='4'>
        <Select 
          label="Funkistyp"
          options={
            Object.keys(positions).reduce((obj, alt) => ({
              ...obj,
              [alt]: positions[alt]
            }), {0: "Alla"})
          }
          onChange={(e) => setFunkisTypeFilter(e.target.value)}
          value={funkisTypeFilter}
        />
        <Select 
          label="Klar"
          options={
          {
            0: "Båda",
            1: "Klar",
            2: "Ej klar",
          }
          }
          onChange={(e) => setFunkisCompleteFilter(e.target.value)}
          value={funkisCompleteFilter}
        />
      </GridCell>
      <GridCell desktop='12' tablet='8' phone='4'>
        {funkisTable}
      </GridCell>
      </Grid>
      }
      
    </>
  );
}

const mapStateToProps = (state) => ({
  funkisar: state.funkis.funkisar,
  loading: state.funkis.loading,
  timeslots: state.funkis.timeslots,
  positions: state.funkis.positions,
  idTimeslots: state.funkis.idTimeslots,
})

const mapDispatchToProps = (dispatch) => ({
  getFunkisar: () => dispatch(getFunkisar()),
  updateFunkis: (funkis) => dispatch(updateFunkis(funkis)),
  getFunkisTimeSlots: () => dispatch(getFunkisTimeSlots()),
  getFunkisTypes: () => dispatch(getFunkisTypes()),
  bookFunkis: (funkisId, timeslotId) => dispatch(bookFunkis({funkisId, timeslotId})),
  unbookFunkis: (funkisId, timeslotId) => dispatch(unbookFunkis({funkisId, timeslotId})),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FunkisAdminComponent))