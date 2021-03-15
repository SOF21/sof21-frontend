import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import {
    DataTableRow,
    DataTableCell,
} from '@rmwc/data-table';
import Button from '@rmwc/button';

export const FunkisCreationRow = ({
    funkisar,
    funkisType,
    funkisTimeslots
}) => {

    const {
        id,
        title,
        current,
        needed,
    } = funkisType

    const history = useHistory()

    const filteredFunkisar = Object.values(funkisar).filter((f) => f.selectedFunkisAlt === parseInt(funkisType.id))
    const filledTimeSlots = funkisTimeslots.filter((t, n) => {
      const timeslotFilled = filteredFunkisar.map((f) => f.selectedTimeSlots.includes(t.id))
      return timeslotFilled.includes(true)
    })

    return (
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
            <DataTableCell style={{width:'100%'}} alignMiddle>
              <Button
                onClick={() => history.push('/account/admin/funkistypes/' + id)}
              >
                Mer information
              </Button>
            </DataTableCell>
        </DataTableRow>
    );
}

export default FunkisCreationRow