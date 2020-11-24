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
import { Dialog } from '@rmwc/dialog';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';

import { FormattedMessage, injectIntl } from 'react-intl';
import { getFunkisar } from '../../../actions/funkis';

// TODO: Bryt ut till intl


const defaultFunkis = {
  name:'',
  liuid:'',
  email: '',
  funkisAlts: [],
  funkisDays: {},
  selectedFunkisAlt: '',
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
}) => {

  const [funkisData, setFunkisData] = useState(defaultFunkis)

  useEffect(() => {
    setFunkisData(funkis);
  }, [funkis])


  const onSave = () => {
    console.log(funkisData);
    return;
  }

  const onChange = (e) => { // TODO: It might be that we need to store this in Redux.
    const { target: { id, value } } = e;
    switch(id) { // Could change IDs and just have them map to statenames
      case 'funkisType':
        setFunkisData({
          ...funkisData,
          'selectedFunkisAlt': value,
        });
        break;
      case 'funkisDay':
        setFunkisData({
          ...funkisData,
          'selectedFunkisDays': value,
        });
        break;
    default:
        break;
    }
    console.log("testChange");
    return
  }
  
  const {
    name,
    liuid,
    email,
    funkisAlts,
    funkisDays,
    selectedFunkisAlt,
  } = funkisData;
  // TODO: Move select and list to separate modal instead. Accessed by clicking the item
  return(
    <DataTableRow>
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
        <Select
          id='funkisType'
          options={funkisAlts}
          value={selectedFunkisAlt}
          placeholder='Funkistyp' 
          onChange={onChange}
        />
      </DataTableCell>
      <DataTableCell>
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
                setFunkisData({
                  ...funkisData,
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
      </DataTableCell>
      <DataTableCell>
        <Button onClick={onSave} raised>
          Spara 
        </Button>
      </DataTableCell>
    </DataTableRow>
  );
}

const FunkisAdminComponent = ({
  funkisar,
  loading,
  getFunkisar
}) => {

  useEffect(() => {
    getFunkisar();
  }, [getFunkisar])

  return ( // TODO: Fix in-line text
    <>
      <Dialog 
        open={loading}
      >
        <h2> Vi skickar din ansökan. Vänta! :)</h2>
      </Dialog>
        <DataTable>
          <DataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Namn</DataTableHeadCell>
                <DataTableHeadCell>LiU-ID</DataTableHeadCell>
                <DataTableHeadCell>E-mail</DataTableHeadCell>
                <DataTableHeadCell>Funkis-typ</DataTableHeadCell>
                <DataTableHeadCell>Funkis-dagar</DataTableHeadCell>
                <DataTableHeadCell>Spara</DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {funkisar.map((f) => {
                return (
                  <FunkisAdminRow funkis={f}/>
                );
              }
              )}
            </DataTableBody>
          </DataTableContent>  
        </DataTable>  
    </>
  );
}

const mapStateToProps = (state) => ({
  funkisar: state.funkis.funkisar,
  loading: state.funkis.loading
})

const mapDispatchToProps = (dispatch) => ({
  getFunkisar: () => dispatch(getFunkisar())
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FunkisAdminComponent))