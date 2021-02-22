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
  DataTableCell,
 } from '@rmwc/data-table';
import {
  List, 
  ListItem,
  ListItemGraphic,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemText,
} from '@rmwc/list';
import { Checkbox } from '@rmwc/checkbox';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import { Switch } from '@rmwc/switch';

import { FormattedMessage, injectIntl } from 'react-intl';
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
import { FunkisDayItem } from './FunkisDayItem';

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
  const [selectedDay, setSelectedDay] = useState('');
  const [originalTimeslots, setOriginalTimeslots] = useState([]);
  const [CSVHeaders, setCSVHeaders] = useState({});
  const [sortation, setSort] = useState({field: 'name', dir: 1});

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

  const handleDialogExit = (e) => {
    setFunkisModalOpen(false)
    e.preventDefault();
    switch(e.detail.action) {
      case 'save':
        const {modified, ...rest} = activeFunkis
        const newTimeslots = selectedTimeSlots.filter(t => !originalTimeslots.includes(t))
        const removedTimeslots = originalTimeslots.filter(t => !selectedTimeSlots.includes(t))
        for(const t of newTimeslots) {
          bookFunkis(id, t);
        }
        for(const t of removedTimeslots) {
          unbookFunkis(id, t);
        }
        updateFunkis(rest)
        break;
      default:
        break;
    }
  }

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  }

  const onChange = (e) => { // TODO: It might be that we need to store this in Redux.
    const { target: { id, value } } = e;
    switch(id) { // Could change IDs and just have them map to statenames
      case 'funkisType':
        setActiveFunkis({
          ...activeFunkis,
          modified: true,
          selectedFunkisAlt: value,
        });
        break;
      case 'markAsDone':
        setActiveFunkis({
          ...activeFunkis,
          modified: true,
          markedAsDone: !activeFunkis.markedAsDone,
        })
        break;
      case 'funkisDay':
        setSelectedDay(value);
        break;
    default:
        break;
    }
    return
  }

  const {
    name,
    liuid,
    email,
    funkisAlts,
    selectedFunkisAlt,
    modified,
    markedAsDone,
    selectedTimeSlots,
    tshirtSize,
    postAddress,
    allergy,
    otherFoodPreference,
    preferedDates,
    id,
    extraDesc,
    requestedPartner,
  } = activeFunkis;
  const funkisTimeSlots = timeslots[selectedFunkisAlt]

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
      <Dialog
        onClose={handleDialogExit}
        open={funkisModalOpen}
      >
        <DialogTitle>Ändra funkis: {name}</DialogTitle>
        <DialogContent>
        <Grid className='funkisInfo'>
        <GridCell desktop='12' tablet='8' phone='4'>
            <span>Funkis info</span>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <List twoLine nonInteractive>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Funkis.admin.fieldLabels.name'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{name}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Funkis.admin.fieldLabels.liuid'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{liuid}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Funkis.admin.fieldLabels.email'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{email}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Funkis.admin.fieldLabels.tshirtSize'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{tshirtSize}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Funkis.admin.fieldLabels.postAddress'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{postAddress}</ListItemSecondaryText>  
                </ListItemText>
              </ListItem>
              { allergy &&
                <ListItem ripple={false}>
                  <ListItemText>
                    <ListItemPrimaryText>
                      <FormattedMessage id='Funkis.admin.fieldLabels.allergy'/>
                    </ListItemPrimaryText>
                    <ListItemSecondaryText>{allergy}</ListItemSecondaryText>
                  </ListItemText>
                </ListItem>
              }
              { otherFoodPreference &&
                <ListItem ripple={false}>
                  <ListItemText>
                    <ListItemPrimaryText>
                      <FormattedMessage id='Funkis.admin.fieldLabels.otherFoodPreference'/>
                    </ListItemPrimaryText>
                    <ListItemSecondaryText style={{whiteSpace: 'break-spaces'}}>{otherFoodPreference}</ListItemSecondaryText>
                  </ListItemText>
                </ListItem>
              }
              { extraDesc &&
                <ListItem ripple={false}>
                  <ListItemText>
                    <ListItemPrimaryText>
                      <FormattedMessage id='Funkis.admin.fieldLabels.extraDesc'/>
                    </ListItemPrimaryText>
                    <ListItemSecondaryText style={{whiteSpace: 'break-spaces'}}>{extraDesc}</ListItemSecondaryText>
                  </ListItemText>
                </ListItem>
              }
              { requestedPartner &&
                <ListItem ripple={false}>
                  <ListItemText>
                    <ListItemPrimaryText>
                      <FormattedMessage id='Funkis.admin.fieldLabels.requestedPartner'/>
                    </ListItemPrimaryText>
                    <ListItemSecondaryText style={{whiteSpace: 'break-spaces'}}>{requestedPartner}</ListItemSecondaryText>
                  </ListItemText>
                </ListItem>
              }
            </List>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <span>Bokad följade pass:</span>
            <List>
              {selectedTimeSlots.map(t => {
                const options = {day: 'numeric', month: 'numeric', hour:'numeric', minute:'numeric'};
                const start = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].start_time);
                const end = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].end_time);
                return (
                  <ListItem ripple={false}>
                  <ListItemPrimaryText>
                    <span>{`${start} -  ${end}`}</span>
                  </ListItemPrimaryText>
                </ListItem>
                );
              }
              )}
            </List>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <span>Boka pass</span>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Select
              id='funkisType'
              options={[
               {
                 label: 'Önskade',
                 options: funkisAlts.reduce((obj, alt) => ({
                  ...obj,
                  [alt]: positions[alt]
                }), {})
              },
              {
                label: 'Övriga',
                options: Object.keys(positions)
                  .filter(p => funkisAlts.includes(p))
                  .reduce((obj, alt) => ({
                    ...obj,
                    [alt]: positions[alt]
                  }),{})
              }
              ]}
              value={selectedFunkisAlt}
              onChange={onChange}
              disabled={selectedTimeSlots.length > 0}
            />
          </GridCell>
          {selectedFunkisAlt && <GridCell desktop='12' tablet='8' phone='4'>
            <Select
              id='funkisDay'
              options={Object.keys(funkisTimeSlots).reduce((obj, date) => ({
                ...obj,
                [date]: date
              }), {})}
              value={selectedDay}
              onChange={onChange}
            />
          </GridCell>}
          {selectedFunkisAlt && selectedDay &&
            <GridCell desktop='12' tablet='8' phone='4'>
              <List>
                {
                funkisTimeSlots && Object.keys(funkisTimeSlots[selectedDay]).map((key, index) => {
                  const options = {hour:'numeric', minute:'numeric'};
                  const {start, end, id} = funkisTimeSlots[selectedDay][key];
                  const selected = selectedTimeSlots.includes(id);
                  const updatedSelectedTimeSlot = selected? [...selectedTimeSlots.filter(i => i !== id)] : [...selectedTimeSlots, id];
                  return (
                    <FunkisDayItem
                      timeSpan={`${new Intl.DateTimeFormat('sv', options).format(start)} - ${new Intl.DateTimeFormat('sv', options).format(end)}`}
                      index={index}
                      checked={selected} 
                      onClick={() => {
                        setActiveFunkis({
                            ...activeFunkis,
                            modified: true,
                            selectedTimeSlots: updatedSelectedTimeSlot,
                        })
                      }
                    }
                    />
                  );
                })
                }        
              </List>
            </GridCell>
          }
          {selectedFunkisAlt && 
            <GridCell desktop='12' tablet='8' phone='4'>
              <Checkbox
                id='markAsDone'
                onChange={onChange}
                checked={markedAsDone}
                label='Markera som klar'
              />
            </GridCell>
          }
        </Grid>
        </DialogContent>
        <DialogActions>
          <DialogButton action="close">Avbryt</DialogButton>
          <DialogButton action="save" raised disabled={!modified}>Spara</DialogButton>
        </DialogActions>
      </Dialog>
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
        <DataTable>
          <DataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell sort={getFieldSort('name')} onSortChange={(dir) => setSort({field: 'name', dir: dir? dir : 1})}>Namn</DataTableHeadCell>
                <DataTableHeadCell sort={getFieldSort('liuid')} onSortChange={(dir) => setSort({field: 'liuid', dir: dir? dir : 1})}>LiU-ID</DataTableHeadCell>
                <DataTableHeadCell sort={getFieldSort('email')} onSortChange={(dir) => setSort({field: 'email', dir: dir? dir : 1})}>E-mail</DataTableHeadCell>
                <DataTableHeadCell sort={getFieldSort('selectedFunkisAlt')} onSortChange={(dir) => setSort({field: 'selectedFunkisAlt', dir: dir? dir : 1})}>Funkis-typ</DataTableHeadCell>
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
              }).sort(() => sortation.dir).filter(f => {
                for(const key of ['name', 'email', 'liuid']) {
                  if(f[key] && f[key].toLowerCase().includes(searchTerm)) return true;
                  console.log(f.selectedTimeSlots);
                  const options = {day: 'numeric', month: 'numeric', hour:'numeric', minute:'numeric'};
                  if(f.selectedTimeSlots) {
                    for(const t of f.selectedTimeSlots) {
                      const start = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].start_time)
                      const end = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].end_time)
                      console.log(start);
                      console.log(end);
                      if(start.replace(/ /g,'').includes(searchTerm.replace(/ /g,'')) || end.replace(/ /g,'').includes(searchTerm.replace(/ /g,''))) return true;
                    }
                  }
                }
                return false;
              }).map((f) => {
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