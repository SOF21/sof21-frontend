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
import * as Yup from 'yup';

import { FormattedMessage, injectIntl } from 'react-intl';

// TODO: Replace, this is not nice.
const funkisPositions = ['God', 'Pleb', 'General', 'Nattvakt']; 
const workDates = ["1/1", "2/2", "3/3", "4/4"];
const shirtSizes = ["S", "M", "L", "XL"];
const availableAllergies = ["Gluten", "Laktos", "Other"];


const initialInput = {
  name: '',
  liuid: '',
  mail: '',
  phonenumber: '',
  address: '',
  postcode: '',
  city: '',
  funkisOne: '',
  funkisTwo: '',
  funkisThree: '',
  firstPrefferedDate: '',
  secondPrefferedDate: '',
  thirdPrefferedDate: '',
  shirtSize: '',
  allergies: '',
  otherAllergy: '',
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.name' />
  ),
  liuid: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.liuid' />
  ),
  mail: Yup.string().email().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.mail' />
  ),
  phonenumber: Yup.string().required(
    <FormattedMessage id='Funkis.recruitment.errors.req.phonenumber' />
  ),
  address: Yup.string(),
  postcode: '',
  city: Yup.string(),
  //funkisOne: '',
  //funkisTwo: '',
  //funkisThree: '',
  //firstPrefferedDate: '',
  //secondPrefferedDate: '',
  //thirdPrefferedDate: '',
  //shirtSize: '',
  //allergies: '',
  otherAllergy: Yup.string(),
})

// TODO: Bryt ut till intl


// TODO: Lägg till faktiskt data, kolla strukturen, namn
const testFunkisar = [
  {
    name:'Test Testsson',
    liuid:'test123',
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
    ]
  }
]

const FunkisAdminComponent = ({
  funkisar = testFunkisar
}) => {

  const onSave = () => {
    console.log("test");
    return
  }

  

  return ( // TODO: Add errormessages for inputs
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
                  <DataTableRow>
                    <DataTableCell>
                      {f.name}
                    </DataTableCell>
                    <DataTableCell>
                      {f.liuid}
                    </DataTableCell>
                    <DataTableCell>
                      {f.email}
                    </DataTableCell>
                    <DataTableCell>
                      <Select options={f.funkisAlts} placeholder='Funkis dagar' />
                    </DataTableCell>
                    <DataTableCell>
                    <List>
                      {
                      f.funkisDays.map((d) => {
                        return (
                          <FunkisDayItem date={d} />
                        );
                      })
                      }        
                    </List>
                    </DataTableCell>
                    <DataTableCell>
                      <Button onClick={() => {onSave()}} raised>
                        Spara
                      </Button>
                    </DataTableCell>
                  </DataTableRow>
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

const FunkisDayItem = ({
    date,
    onClick,
    checked,
  }) => {
  return (
    <ListItem onClick={() => {onClick()}}>
      <ListItemGraphic icon={<Checkbox checked={checked}/>}/>
      {date}
    </ListItem>
  );
}

export default injectIntl(FunkisAdminComponent)