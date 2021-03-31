import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { GridCell, GridInner } from '@rmwc/grid';
import {
  List, 
  ListItem,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemText,
} from '@rmwc/list';
import { Checkbox } from '@rmwc/checkbox';
import { Select } from '@rmwc/select';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import { FormattedMessage, injectIntl } from 'react-intl';
import { 
  bookFunkis,
  unbookFunkis,
  updateFunkis,
 } from '../../../../actions/funkis';

import {defaultFunkis} from '../constants'
import { FunkisDayItem } from './FunkisDayItem';

// TODO: Bryt ut till intl

const FunkisModal = ({
  funkis,
  updateFunkis,
  timeslots,
  positions,
  setFunkisModalOpen,
  isOpen,
  bookFunkis,
  unbookFunkis,
  originalTimeslots,
  idTimeslots,
}) => {


  const [activeFunkis, setActiveFunkis] = useState(defaultFunkis);
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    setActiveFunkis(funkis);
  }, [funkis])

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

  return (
    <Dialog
    onClose={handleDialogExit}
    open={isOpen}
  >
    <DialogTitle>Ändra funkis: {name}</DialogTitle>
    <DialogContent>
    <GridInner className='funkisInfo' style={{gridGap: '10px'}}>
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
              <ListItemSecondaryText style={{whiteSpace: 'break-spaces'}}>{postAddress}</ListItemSecondaryText>  
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
          { preferedDates && preferedDates.length > 0 &&
            <ListItem ripple={false} style={{height: 'auto'}}>
              <ListItemText>
                <ListItemPrimaryText>
                  <FormattedMessage id='Funkis.admin.fieldLabels.preferedTimeSlots'/>
                </ListItemPrimaryText>
                {preferedDates.map(ts => <ListItemSecondaryText key={ts}>{ts}</ListItemSecondaryText>)}
                
              </ListItemText>
            </ListItem>
          }
        </List>
      </GridCell>
      <GridCell desktop='12' tablet='8' phone='4'>
        <span>Bokad följade pass: </span>
        {selectedTimeSlots.length === 0? <span style={{color: 'red'}}>Ej bokad</span> : <List>
          {selectedTimeSlots.map(t => {
            const options = {day: 'numeric', month: 'numeric', hour:'numeric', minute:'numeric'};
            const start = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].start_time);
            const end = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].end_time);
            return (
              <ListItem key={t} ripple={false}>
              <ListItemSecondaryText>
                <span>{`${start} -  ${end}`}</span>
              </ListItemSecondaryText>
            </ListItem>
            );
          }
          )}
        </List>}
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
            options: funkisAlts.filter(alt => positions[alt] !== undefined ).reduce((obj, alt) => ({
              ...obj,
              [alt]: positions[alt]
            }), {})
          },
          {
            label: 'Övriga',
            options: Object.keys(positions)
            .map((i) => parseInt(i))
            .filter(p => !funkisAlts.includes(p))
            .reduce((obj, alt) => ({
              ...obj,
              [alt]: positions[alt]
            }),{})
          }
          ]}
          value={selectedFunkisAlt || ''}
          onChange={onChange}
          disabled={selectedTimeSlots.length > 0}
        />
      </GridCell>
      {selectedFunkisAlt && <GridCell desktop='12' tablet='8' phone='4'>
        <Select
          id='funkisDay'
          options={funkisTimeSlots ? Object.keys(funkisTimeSlots).reduce((obj, date) => ({
            ...obj,
            [date]: date
          }), {})
          : ''}
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
    </GridInner>
    </DialogContent>
    <DialogActions>
      <DialogButton action="close">Avbryt</DialogButton>
      <DialogButton action="save" raised disabled={!modified}>Spara</DialogButton>
    </DialogActions>
  </Dialog>
  );
}

const mapStateToProps = (state) => ({
  funkisar: state.funkis.funkisar,
  loading: state.funkis.loading,
  timeslots: state.funkis.timeslots,
  positions: state.funkis.positionTitles,
  idTimeslots: state.funkis.idTimeslots,
})

const mapDispatchToProps = (dispatch) => ({
  updateFunkis: (funkis) => dispatch(updateFunkis(funkis)),
  bookFunkis: (funkisId, timeslotId) => dispatch(bookFunkis({funkisId, timeslotId})),
  unbookFunkis: (funkisId, timeslotId) => dispatch(unbookFunkis({funkisId, timeslotId})),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FunkisModal))