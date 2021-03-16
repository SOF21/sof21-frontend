import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';

import { deleteFunkisType } from '../../../../actions/funkis'

import {
  DataTableRow,
  DataTableCell,
} from '@rmwc/data-table';
import Button from '@rmwc/button';
import IconButton from '@rmwc/icon-button';

export const FunkisCreationRow = ({
  funkisar,
  funkisType,
  funkisTimeslots,
  deleteFunkisType,
  setOpen
}) => {

  const {
    id,
    title,
    current,
    needed,
  } = funkisType

  const history = useHistory()

  const filledTimeSlots = funkisTimeslots.filter((t, n) => {
    const timeslotFilled = Object.values(funkisar)
      .filter((f) => f.selectedFunkisAlt === parseInt(funkisType.id))
      .map((f) => f.selectedTimeSlots.includes(t.id))
    return timeslotFilled.includes(true)
  })

  const deleteFunkis = () => {
    current > 0 ? setOpen(true) : deleteFunkisType(funkisType)
  }

  return (
    <>
      <DataTableRow>
        <DataTableCell>
          {title}
        </DataTableCell>
        <DataTableCell>
          {`${current} / ${needed}`}
        </DataTableCell>
        <DataTableCell>
          {filledTimeSlots.length} / {funkisTimeslots.length}
        </DataTableCell>
        <DataTableCell style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              onClick={() => history.push('/account/admin/funkistypes/' + id)}
            >
              Mer information
            </Button>
            <IconButton
              icon="edit"
              style={{ color: '#C20E1A' }}
              onClick={() => history.push('/account/admin/funkistypes/' + id + '/update')}
            />
            <IconButton
              icon="delete"
              style={{ color: '#C20E1A' }}
              onClick={deleteFunkis}
            />
          </div>
        </DataTableCell>
      </DataTableRow>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  deleteFunkisType: (funkisType) => dispatch(deleteFunkisType(funkisType))
})


export default connect(null, mapDispatchToProps)(FunkisCreationRow)