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
import { Select } from '@rmwc/select';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import { FormattedMessage, injectIntl } from 'react-intl';
import { } from '../../../actions/cortege';
import FormTextInput from '../../../components/forms/components/FormTextInput';
import defaultCortege from './defaultCortege';
import { TextField } from 'rmwc';

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
    const { target: { id, value } } = e;
    console.log(id);
    console.log(value);
    setCortegeData({
      ...cortegeData,
      [id]: value,
    })
    setModified(true);
  }


  const {
    groupName,
    amountPartaking,
    buildType,
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
  } = cortegeData;

  return (
    <Dialog
        onClose={(e) => handleDialogExit(e, cortegeData)}
        open={open}
      >
        <DialogTitle>Ändra cortege: {groupName}</DialogTitle>
        <DialogContent>
        <Grid className='funkisInfo'>
          <GridCell desktop='12' tablet='8' phone='4'>
            <List twoLine nonInteractive>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Funkis.admin.fieldLabels.groupName'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{groupName}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Funkis.admin.fieldLabels.amountPartaking'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{amountPartaking}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Funkis.admin.fieldLabels.buildType'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{buildType}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Funkis.admin.fieldLabels.phonenumber'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{phonenumber}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Funkis.admin.fieldLabels.contactPerson'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText>{contactPerson}</ListItemSecondaryText>  
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Funkis.admin.fieldLabels.contribMotivation'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText style={{whiteSpace: 'break-spaces'}}>{contribMotivation}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Funkis.admin.fieldLabels.themeMotivation'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText style={{whiteSpace: 'break-spaces'}}>{themeMotivation}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
              <ListItem ripple={false}>
                <ListItemText>
                  <ListItemPrimaryText>
                    <FormattedMessage id='Funkis.admin.fieldLabels.allergyOther'/>
                  </ListItemPrimaryText>
                  <ListItemSecondaryText style={{whiteSpace: 'break-spaces'}}>{image}</ListItemSecondaryText>
                </ListItemText>
              </ListItem>
            </List>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <TextField textarea fullwidth id='feedback' label="feedback" value={feedback} onChange={onChange}/>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <TextField textarea fullwidth id='securityFeedback' label="securityFeedback" value={securityFeedback} onChange={onChange}/>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <TextField textarea fullwidth id='otherComments' label="otherComments" value={otherComments} onChange={onChange}/>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Checkbox
              id='approved'
              onChange={onChange}
              checked={approved}
              label='Markera som klar'
            />
          </GridCell>
        </Grid>
        </DialogContent>
        <DialogActions>
          <DialogButton action="close">Avbryt</DialogButton>
          <DialogButton action="save" raised disabled={!modified}>Spara</DialogButton>
        </DialogActions>
      </Dialog>
  );
}

export default injectIntl(CortegeModal);