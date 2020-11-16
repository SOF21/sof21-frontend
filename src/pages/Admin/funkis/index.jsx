import React, {useEffect, useState} from 'react';

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
} from '@rmwc/list'
import { Checkbox } from '@rmwc/checkbox'
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';

import { FormattedMessage, injectIntl } from 'react-intl';

// TODO: Bryt ut till intl


const defaultFunkis = {
  name:'',
  liuid:'',
  email: '',
  funkisAlts: [],
  funkisDays: [],
  selectedFunkisDays : { // Maybe make this a list instead? Appending/removing dates
    0: true,
    1: false,
    2: false,
  },
  selectedFunkisAlt: '',
}

// TODO: Lägg till faktiskt data, kolla strukturen, namn
const testFunkisar = [
  {
    name:'Test Testsson',
    liuid:'teste123',
    email: 'test123@student.liu.se',
    funkisAlts: [
      'Natt',
      'Funis1',
      'Troll',
    ],
    funkisDays: [
      '5/5',
      '6/5',
      '7/5',
    ],
    selectedFunkisDays : {
      0: true,
      1: true,
      2: false,
    },
    selectedFunkisAlt: 'Natt',
  },
  {
    name:'Test Testsson2',
    liuid:'teste666',
    email: 'teste666@student.liu.se',
    funkisAlts: [
      'Natt',
      'Funis1',
      'Troll',
    ],
    funkisDays: [
      '4/5',
      '2/5',
      '7/5',
    ],
    selectedFunkisDays : {
      0: false,
      1: false,
      2: true,
    },
    selectedFunkisAlt: 'Funis1',
  }
]

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
    console.log("testSave");
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
    selectedFunkisDays,
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
        funkisDays.map((date, index) => {
          return (
            <FunkisDayItem
              date={date}
              index={index}
              checked={selectedFunkisDays[index]} 
              onClick={() => { // Don't want to lose context of index
                setFunkisData({
                  ...funkisData,
                  selectedFunkisDays: {
                    ...selectedFunkisDays,
                    [index]: !selectedFunkisDays[index],
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
  funkisar = testFunkisar
}) => {

  return ( // TODO: Fix in-line text
    <>
      <Grid base-outer-grid base-outer-grid--first>
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
      </Grid>
    </>
  );
}

export default injectIntl(FunkisAdminComponent)