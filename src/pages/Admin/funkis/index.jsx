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

import { FormattedMessage, injectIntl } from 'react-intl';
import { 
  getFunkisar,
  getFunkisTimeSlots,
  getFunkisTypes,
  updateFunkis,
 } from '../../../actions/funkis';
import { ScaleLoader } from 'react-spinners';

import {defaultFunkis} from './constants'
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
}) => {

  useEffect(() => {
    getFunkisar();
    getFunkisTimeSlots();
    getFunkisTypes();
  }, [getFunkisar, getFunkisTimeSlots, getFunkisTypes])

  const [funkisModalOpen, setFunkisModalOpen] = useState(false);
  const [activeFunkis, setActiveFunkis] = useState(defaultFunkis);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const handleDialogExit = (e) => {
    setFunkisModalOpen(false)
    e.preventDefault();
    switch(e.detail.action) {
      case 'save':
        const {modified, ...rest} = activeFunkis
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
    workFriend,
    postAddress,
    allergy,
    allergyOther,
    preferedDates,
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
              { workFriend &&
                <ListItem ripple={false}>
                  <ListItemText>
                    <ListItemPrimaryText>
                      <FormattedMessage id='Funkis.admin.fieldLabels.workFriend'/>
                    </ListItemPrimaryText>
                    <ListItemSecondaryText>{workFriend}</ListItemSecondaryText>
                  </ListItemText>
                </ListItem>
              }
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
              { allergyOther &&
                <ListItem ripple={false}>
                  <ListItemText>
                    <ListItemPrimaryText>
                      <FormattedMessage id='Funkis.admin.fieldLabels.allergyOther'/>
                    </ListItemPrimaryText>
                    <ListItemSecondaryText style={{whiteSpace: 'break-spaces'}}>{allergyOther}</ListItemSecondaryText>
                  </ListItemText>
                </ListItem>
              }
            </List>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <List>
              {preferedDates.filter(d => d !== null).map(d => <ListItem>{d}</ListItem>)}
            </List>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Select
              id='funkisType'
              options={funkisAlts.reduce((obj, alt) => ({
                ...obj,
                [alt]: positions[alt]
              }), {})}
              value={selectedFunkisAlt}
              onChange={onChange}
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
          {selectedFunkisAlt && selectedTimeSlots.length > 0 && 
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
              {funkisar !== {} && Object.values(funkisar).sort(f => f.liuid).map((f) => {
                console.log(f);
                console.log('funkis');
                for(const key in {name, email, liuid}) {
                  if(f[key].toLowerCase().includes(searchTerm)) {   
                    return (
                      <FunkisAdminRow
                        funkis={{
                          ...f,
                          selectedFunkisAlt: positions[selectedFunkisAlt]
                        }}
                        onClick={() => {
                          setActiveFunkis({
                            ...f,
                          });
                          setFunkisModalOpen(true);
                        }}
                      />
                    );
                  }
                }
                return <></>
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
})

const mapDispatchToProps = (dispatch) => ({
  getFunkisar: () => dispatch(getFunkisar()),
  updateFunkis: (funkis) => dispatch(updateFunkis(funkis)),
  getFunkisTimeSlots: () => dispatch(getFunkisTimeSlots()),
  getFunkisTypes: () => dispatch(getFunkisTypes()),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FunkisAdminComponent))