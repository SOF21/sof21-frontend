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
import { TextField, TextFieldIcon } from '@rmwc/textfield';

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
  updateFunkis,
 } from '../../../actions/funkis';

// TODO: Bryt ut till intl


const defaultFunkis = {
  name:'',
  liuid:'',
  email: '',
  funkisAlts: [],
  funkisDays: {},
  selectedFunkisAlt: '',
  modified: false,
}

const FunkisDayItem = ({
  date,
  onClick,
  checked,
  index,
}) => {
return (
  <ListItem onClick={onClick} id={`funkis-day-alt-${index}`}>
    <ListItemGraphic icon={<Checkbox checked={checked}/>}/>
    {date}
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
  } = funkisData;
  // TODO: Move select and list to separate modal instead. Accessed by clicking the item
  return(
    <DataTableRow onClick={onClick}>
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
    </DataTableRow>
  );
}

const FunkisAdminComponent = ({
  funkisar,
  loading,
  getFunkisar,
  updateFunkis
}) => {

  useEffect(() => {
    getFunkisar();
  }, [getFunkisar])

  const [funkisModalOpen, setFunkisModalOpen] = useState(false);
  const [activeFunkis, setActiveFunkis] = useState(defaultFunkis);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDialogExit = (e) => {
    setFunkisModalOpen(false)
    switch(e.detail.action) {
      case 'save':
        const {modified, ...rest} = activeFunkis
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
      case 'funkisDay':
        setActiveFunkis({
          ...activeFunkis,
          modified: true,
          'selectedFunkisDays': value,
        });
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
  } = activeFunkis;

  return ( // TODO: Fix in-line text
    <>
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
          {selectedFunkisAlt && <GridCell desktop='12' tablet='8' phone='4'>
            <List>
              {
              Object.keys(funkisDays).map((key, index) => {
                const {selected, day} = funkisDays[key];
                return (
                  <FunkisDayItem
                    date={day}
                    index={index}
                    checked={selected} 
                    onClick={() => { // Don't want to lose context of key
                    setActiveFunkis({
                        ...activeFunkis,
                        modified: true,
                        funkisDays: {
                          ...funkisDays,
                          [key]: {
                            ...funkisDays[key],
                            selected: !funkisDays[key].selected
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
          </GridCell>}
        </Grid>
        </DialogContent>
        <DialogActions>
          <DialogButton action="close">Avbryt</DialogButton>
          <DialogButton action="save" raised disabled={!modified}>Spara</DialogButton>
        </DialogActions>
      </Dialog>
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
                    return (
                      <FunkisAdminRow
                        funkis={f}
                        onClick={() => {
                          setActiveFunkis(f);
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
      
    </>
  );
}

const mapStateToProps = (state) => ({
  funkisar: state.funkis.funkisar,
  loading: state.funkis.loading
})

const mapDispatchToProps = (dispatch) => ({
  getFunkisar: () => dispatch(getFunkisar()),
  updateFunkis: (funkis) => dispatch(updateFunkis(funkis))
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FunkisAdminComponent))