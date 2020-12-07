import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { GridCell, Grid } from '@rmwc/grid';
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

import { FormattedMessage, injectIntl } from 'react-intl';
import { 
  getFunkisar,
  getFunkisTimeSlots,
  updateFunkis,
 } from '../../../actions/funkis';

// TODO: Bryt ut till intl


const defaultFunkis = {
  name:'',
  liuid:'',
  email: '',
  funkisAlts: [],
  funkis: {},
  selectedFunkisAlt: '',
  modified: false,
  markedAsDone: false,
  funkisTimeSlots: {},
}

const FunkisDayItem = ({
  timeSpan,
  onClick,
  checked,
  index,
}) => {
return (
  <ListItem onClick={onClick} id={`funkis-day-alt-${index}`}>
    <ListItemGraphic icon={<Checkbox checked={checked}/>}/>
    {timeSpan}
  </ListItem>
);
}

const FunkisAdminRow = ({
  funkis,
  onClick,
}) => {

  const [funkisData, setFunkisData] = useState(defaultFunkis)

  useEffect(() => {
    setFunkisData(funkis);
  }, [funkis])
  
  const {
    name,
    liuid,
    email,
    selectedFunkisAlt,
    markedAsDone,
  } = funkisData;
  // TODO: Move select and list to separate modal instead. Accessed by clicking the item
  return(
    <DataTableRow onClick={onClick} className={markedAsDone? 'done' : ''}>
      <DataTableCell>
        {name}
      </DataTableCell>
      <DataTableCell>
        {liuid}
      </DataTableCell>
      <DataTableCell>
        {email}
      </DataTableCell>
      <DataTableCell>
        {selectedFunkisAlt}
      </DataTableCell>
      <DataTableCell>
        {markedAsDone}
      </DataTableCell>
    </DataTableRow>
  );
}

const FunkisAdminComponent = ({
  funkisar,
  loading,
  getFunkisar,
  updateFunkis,
  timeslots,
  getFunkisTimeSlots,
}) => {

  useEffect(() => {
    getFunkisar();
    getFunkisTimeSlots();
  }, [getFunkisar, getFunkisTimeSlots])

  const [funkisModalOpen, setFunkisModalOpen] = useState(false);
  const [activeFunkis, setActiveFunkis] = useState(defaultFunkis);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDialogExit = (e) => {
    setFunkisModalOpen(false)
    switch(e.detail.action) {
      case 'save':
        const {modified, funkisTimeSlots, ...rest} = activeFunkis
        //updateTimeSlots()
        updateFunkis(rest)
        // TODO: Save, should be a redux action here...
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
          'selectedFunkisAlt': value,
        });
        break;
      case 'markAsDone':
        setActiveFunkis({
          ...activeFunkis,
          modified: true,
          markedAsDone: !activeFunkis.markedAsDone,
        })
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
    funkisDays,
    selectedFunkisAlt,
    modified,
    markedAsDone,
    funkisTimeSlots,
  } = activeFunkis;

  return ( // TODO: Fix in-line text
    <> {!loading &&
      <Dialog
        onClose={handleDialogExit}
        open={funkisModalOpen}
      >
        <DialogTitle>Ändra funkis: {name}</DialogTitle>
        <DialogContent>
        <Grid className='funkisInfo'>
          <GridCell desktop='12' tablet='8' phone='4'>
            {name}
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            {liuid}
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            {email}
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Select
              id='funkisType'
              options={funkisAlts}
              value={selectedFunkisAlt}
              placeholder='Funkistyp' 
              onChange={onChange}
            />
          </GridCell>
          {selectedFunkisAlt && 
            <GridCell desktop='12' tablet='8' phone='4'>
              <List>
                {
                Object.keys(funkisTimeSlots).map((key, index) => {
                  const {selected, start, end, id} = funkisTimeSlots[key];
                  console.log(start);
                  return (
                    <FunkisDayItem
                      timeSpan={`${start} - ${end}`}
                      index={index}
                      checked={selected} 
                      onClick={() => { // Don't want to lose context of key
                      setActiveFunkis({
                          ...activeFunkis,
                          modified: true,
                          funkisTimeSlots: {
                            ...funkisTimeSlots,
                            [id]: {
                              ...funkisTimeSlots[id],
                              selected: !funkisTimeSlots[id].selected
                            },
                          }
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
          {selectedFunkisAlt && funkisDays && 
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
        <TextField withLeadingIcon='search' label='Sök' id='searchBar'onChange={handleSearch}/>
      </GridCell>
      <GridCell desktop='12' tablet='8' phone='4'>
        <DataTable>
          <DataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Namn</DataTableHeadCell>
                <DataTableHeadCell>LiU-ID</DataTableHeadCell>
                <DataTableHeadCell>E-mail</DataTableHeadCell>
                <DataTableHeadCell>Funkis-typ</DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {funkisar.map((f) => {
                for(const key in {name, email, liuid}) {
                  if(f[key].toLowerCase().includes(searchTerm)) {
                    const options = {day: 'numeric', month: 'numeric', hour:'numeric', minute:'numeric'};    
                    console.log(timeslots[f.selectedFunkisAlt])             
                    return (
                      <FunkisAdminRow
                        funkis={f}
                        onClick={() => {
                          const ft = Object.fromEntries(Object.entries(timeslots[f.selectedFunkisAlt]).filter(([k, t]) => [...Object.values(f.funkisDays).map(p => p.day)].includes(`${t.start.getDate()}/${t.start.getMonth()}`)));
                          setActiveFunkis({
                            ...f,
                            funkisTimeSlots: Object.keys(ft).reduce((obj, t) => ( {
                              ...obj,
                              [ft[t].id]: {
                              id: ft[t].id,
                              start: ft[t].start.toLocaleString('sv', options),
                              end: ft[t].end.toLocaleString('sv', options),
                              selected: false,
                            }}), {})
                          });
                          setFunkisModalOpen(true);
                        }}
                      />
                    );
                  }
                }
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
})

const mapDispatchToProps = (dispatch) => ({
  getFunkisar: () => dispatch(getFunkisar()),
  updateFunkis: (funkis) => dispatch(updateFunkis(funkis)),
  getFunkisTimeSlots: () => dispatch(getFunkisTimeSlots()),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FunkisAdminComponent))