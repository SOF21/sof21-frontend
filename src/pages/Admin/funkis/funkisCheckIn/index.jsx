import React, { useEffect, useState, } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
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

import { Formik, Form, setNestedObjectValues } from 'formik/dist/index';
import FormTextInput from '../../../../components/forms/components/FormTextInput'

import { Switch } from '@rmwc/switch';

import { FormattedMessage, injectIntl } from 'react-intl';

import {
  bookFunkis,
  checkInFunkis,
  getFunkisar,
  getFunkisTimeSlots,
  getFunkisTypes,
  unbookFunkis,
  updateFunkis,
} from '../../../../actions/funkis';

import { FunkisCheckInRow } from './FunkisCheckInRow'

const FunkisCheckInOverviewComponent = (
  {
    funkisar,
    getFunkisar,
    getFunkisTimeSlots,
    getFunkisTypes,
    checkInFunkis,
    positions,
    idTimeslots,
  }
) => {

  useEffect(() => {
    getFunkisar();
    getFunkisTimeSlots();
    getFunkisTypes();
  }, [getFunkisar, getFunkisTimeSlots, getFunkisTypes])

  const [sortation, setSort] = useState({ field: 'name', dir: 1 });
  const [searchTerm, setSearchTerm] = useState('');

  const getFieldSort = (field) => {
    if (field === sortation.field) return sortation.dir;
    return null;
  }

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  }

  const history = useHistory();
  const routeChange = () => {
    let path = `/account/admin/funkischeckin/checkin`;
    history.push(path);
  }

  const sortedFunkis = Object.values(funkisar).filter((f) => f.selectedTimeSlots.length > 0).sort((f, s) => {
    const first = sortation.field === 'selectedFunkisAlt' && f.selectedFunkisAlt ? positions[f[sortation.field]] : f[sortation.field]
    const second = sortation.field === 'selectedFunkisAlt' && s.selectedFunkisAlt ? positions[s[sortation.field]] : s[sortation.field]
    if (first > second) return -1;
    if (first < second) return 1;
    return 0;
  }).sort(() => sortation.dir).filter(f => {
    for (const key of ['name', 'email', 'liuid']) {
      if (f[key] && f[key].toLowerCase().includes(searchTerm)) return true;
      else if (positions[f['selectedFunkisAlt']].toLowerCase().includes(searchTerm)) return true
      const options = { day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric' };
      if (f.selectedTimeSlots) {
        for (const t of f.selectedTimeSlots) {
          const start = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].start_time)
          const end = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].end_time)
          console.log(start);
          console.log(end);
          if (start.replace(/ /g, '').includes(searchTerm.replace(/ /g, '')) || end.replace(/ /g, '').includes(searchTerm.replace(/ /g, ''))) return true;
        }
      }
    }
    return false;
  })

  return (
    <>
      <Grid>
        <GridInner>
          <GridCell desktop='6' tablet='4' phone='2'>
            <Button raised type='submit' onClick={routeChange}>
              Checka in funkisar
                        </Button>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
            <TextField withLeadingIcon='search' label='Sök' id='searchBar' className='funkisSearch' onChange={handleSearch} />
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='6'>
            <DataTable style={{ maxWidth: '100%' }}>
              <DataTableContent>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableHeadCell>Namn</DataTableHeadCell>
                    <DataTableHeadCell>LiU-id</DataTableHeadCell>
                    <DataTableHeadCell>E-mail</DataTableHeadCell>
                    <DataTableHeadCell>Funkistyp</DataTableHeadCell>
                    <DataTableHeadCell>Pass</DataTableHeadCell>
                    <DataTableHeadCell>Incheckad</DataTableHeadCell>
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {funkisar !== {} && sortedFunkis.map((f) => {
                    return (
                      <FunkisCheckInRow key={f.name}
                        funkis={{
                          ...f,
                          funkisAlt: positions[f.selectedFunkisAlt],
                          timeSlots: f.selectedTimeSlots.map(t => {
                            return idTimeslots[t]
                          })

                        }}
                      />
                    );
                  }
                  )}
                </DataTableBody>
              </DataTableContent>
            </DataTable>
          </GridCell>
        </GridInner>
      </Grid>
    </>
  )
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
  checkInFunkis: (checkedIn) => dispatch(checkInFunkis(checkedIn))
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FunkisCheckInOverviewComponent))