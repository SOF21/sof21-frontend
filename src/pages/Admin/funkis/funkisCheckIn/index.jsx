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


import { FormattedMessage, injectIntl } from 'react-intl';

import {
  checkInFunkis,
  getFunkisar,
  getFunkisTimeSlots,
  getFunkisTypes,
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
  const [checked_in, setCheckedIn] = React.useState(false);
  const [late, setLate] = React.useState(false);
  const [funkisAlt, setFunkisAlt] = React.useState('0')

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

  const filterByFieldValues = (f) => {
    for (const key of ['name', 'email', 'liuid']) {
      if (f[key] && f[key].toLowerCase().includes(searchTerm)) return true;
      else if (positions[f['selectedFunkisAlt']].toLowerCase().includes(searchTerm)) return true
      const options = { day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric' };
      if (f.selectedTimeSlots) {
        for (const t of f.selectedTimeSlots) {
          const start = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].start_time)
          const end = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].end_time)
          console.log(start, end);
          if (start.replace(/ /g, '').includes(searchTerm.replace(/ /g, '')) || end.replace(/ /g, '').includes(searchTerm.replace(/ /g, ''))) return true;
        }
      }
    }
    return false;
  }

  const filterByCheckedIn = (f) => {
    if (checked_in && f['checkedIn']) return true
    else if (late) {
      for (const t of f.selectedTimeSlots) {
        const currentTime = new Date()
        if (currentTime > idTimeslots[t].start_time && currentTime < idTimeslots[t].end_time) return true;
      }
    }
    else if (!checked_in && !late) return true
    return false
  }

  const filterByFunkisAlt = (f) => {
    const allFunkisAlts = '0'
    if (positions[f['selectedFunkisAlt']] === positions[funkisAlt]) return true
    else if (funkisAlt === allFunkisAlts) return true
    return false
  }

  const sortedFunkis = Object.values(funkisar)
    .filter((f) => f.selectedTimeSlots.length > 0)
    .sort(() => sortation.dir)
    .filter(f => filterByFieldValues(f))
    .filter(f => filterByCheckedIn(f))
    .filter(f => filterByFunkisAlt(f))

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
          <GridCell desktop='12' tablet='8' phone='4'>
            <Checkbox
              label="Incheckade"
              checked={checked_in}
              onChange={evt => setCheckedIn(!!evt.currentTarget.checked)}
            />
            <Checkbox
              label="Sena"
              checked={late}
              onChange={evt => setLate(!!evt.currentTarget.checked)}
            />
            <Select
              label="Funkistyp"
              defaultValue={{0: 'Alla'}}
              options={{...positions, 0: 'Alla'}}
              style={{marginLeft: '20px'}}
              onChange={evt => {console.log(evt.target.value) 
                setFunkisAlt(evt.target.value)}}
            />
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