import React, {useEffect, useState} from 'react';
import { GridCell, Grid, GridInner } from '@rmwc/grid';
import {
  List, 
  ListItem,
  ListItemGraphic,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemText,
} from '@rmwc/list';
import { Checkbox } from '@rmwc/checkbox';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import { Chip, ChipSet } from '@rmwc/chip';
import { Radio } from '@rmwc/radio';
import { FormattedMessage, injectIntl } from 'react-intl';
import { } from '../../../actions/cortege';
import FormTextInput from '../../../components/forms/components/FormTextInput';
import defaultCortege from './defaultCortege';
import { TextField } from 'rmwc';
import bitFlags from './bitFlags';


const toggleFlag = ({
  flags,
  flag
}) => {
  return (flag ^ parseInt(`0${flags}`, 2)).toString(2);
}

const CortegeModal = ({
  handleDialogExit,
  open,
  cortege,
}) => {


  const [cortegeData, setCortegeData] = useState(defaultCortege);
  const [modified, setModified] = useState(false);

  useEffect(() => {
    setCortegeData(cortege);
  }, [cortege])
  

  const onChange = (e) => { // TODO: It might be that we need to store this in Redux.
    const { target: { id, value, chipId } } = e;
    switch(id ?? chipId) {
      case 'approved': {
        setCortegeData({
          ...cortegeData,
          [id ?? chipId]: !cortegeData[id ?? chipId],
        })
        break;
      }
      case 'paid':
      case 'ideaReqExpand':
      case 'secApprv':
      case 'chosen':
      case 'removed':
      case 'invoiceSent':
        setCortegeData({
          ...cortegeData,
          flags: toggleFlag({
            flags: cortegeData.flags,
            flag: bitFlags[id ?? chipId],
          })
        })
        break;
      default:
        setCortegeData({
          ...cortegeData,
          [id]: value,
        })
    }
    
    setModified(true);
  }


  const {
    groupName,
    amountPartaking,
    phonenumber,
    contactPerson,
    contribMotivation,
    themeMotivation,
    image,
    gdpr,
    feedback,
    securityFeedback,
    otherComments,
    approved,
    mail,
    flags,
    reservPhonenumber,
    reservContactPerson,
    reservMail,
    invoiceAddress,
  } = cortegeData;

  return (
    <Dialog
        onClose={(e) => handleDialogExit(e, cortegeData)}
        open={open}
      >
        <DialogTitle>Ändra cortege: {groupName}</DialogTitle>
        <DialogContent>
        <Grid className='CortegeInfo'
          style={{width: '800px', maxWidth:'100%'}}
        >
          <GridCell desktop='12' tablet='8' phone='4'>
            <List twoLine nonInteractive>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Cortege.admin.fieldLabels.groupName'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{groupName}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Cortege.admin.fieldLabels.amountPartaking'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{amountPartaking}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Cortege.admin.fieldLabels.contactPerson'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{contactPerson}</ListItemSecondaryText>  
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Cortege.admin.fieldLabels.phonenumber'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{phonenumber}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Cortege.admin.fieldLabels.mail'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{mail}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Cortege.admin.fieldLabels.reservContactPerson'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{reservContactPerson}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Cortege.admin.fieldLabels.reservPhonenumber'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{reservPhonenumber}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Cortege.admin.fieldLabels.reservMail'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{reservMail}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Cortege.admin.fieldLabels.invoiceAddress'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{invoiceAddress}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Cortege.admin.fieldLabels.contribMotivation'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText style={{whiteSpace: 'break-spaces'}}>{contribMotivation}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Cortege.admin.fieldLabels.themeMotivation'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText style={{whiteSpace: 'break-spaces'}}>{themeMotivation}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Cortege.admin.fieldLabels.image'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText style={{whiteSpace: 'break-spaces', wordBreak: 'break-all'}}><a href={image}>{image}</a></ListItemSecondaryText>
                </ListItemText>
              </ListItem>
            </List>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <TextField
              textarea
              fullwidth
              id='feedback'
              label={<FormattedMessage id='Cortege.admin.fieldLabels.feedback'/>}
              value={feedback}
              onChange={onChange}
            />
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <TextField
            textarea
            fullwidth
            id='securityFeedback'
            label={<FormattedMessage id='Cortege.admin.fieldLabels.securityFeedback'/>}
            value={securityFeedback}
            onChange={onChange}
          />
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <TextField
            textarea
            fullwidth
            id='otherComments'
            label={<FormattedMessage id='Cortege.admin.fieldLabels.otherComments'/>}
            value={otherComments}
            onChange={onChange}
          />
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <ChipSet choice>
              <Chip 
                id={'paid'}
                text={'Betalat anmälningsavgift'}
                selected={parseInt(flags, 2) & bitFlags.paid}
                onInteraction={onChange}
              />
              <Chip 
                id={'secApprv'}
                text={'Godkänd av säkerhet'}
                selected={parseInt(flags, 2) & bitFlags.secApprv}
                onInteraction={onChange}
              />
              <Chip 
                id={'ideaReqExpand'}
                text={'Idé kräver vidarutveckling'}
                selected={parseInt(flags, 2) & bitFlags.ideaReqExpand}
                onInteraction={onChange}
              />
              <Chip 
                id={'invoiceSent'}
                text={'Faktura skickad'}
                selected={parseInt(flags, 2) & bitFlags.invoiceSent}
                onInteraction={onChange}
              />
            </ChipSet>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Checkbox
              label={'Bortvald'}
              id={'removed'}
              checked={parseInt(flags, 2) & bitFlags.removed}
              onChange={onChange}
            ></Checkbox>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Checkbox
              id='approved'
              onChange={onChange}
              checked={approved}
              label='Vald'
            />
          </GridCell>
        </Grid>
        </DialogContent>
        <DialogActions>
          <DialogButton action="delete" raised style={{marginRight: 'auto'}}>Ta bort</DialogButton>  
          <DialogButton action="close">Avbryt</DialogButton>
          <DialogButton action="save" raised disabled={!modified}>Spara</DialogButton>
        </DialogActions>
      </Dialog>
  );
}

export default injectIntl(CortegeModal);