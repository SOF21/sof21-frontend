import React, { useState } from 'react';
import { useInterval, checkIfLate } from './index'
import {
    DataTableRow,
    DataTableCell,
} from '@rmwc/data-table';

export const FunkisCheckInRow = ({
    funkis,
}) => {

    const {
        name,
        email,
        funkisAlt,
        checkedIn,
        liuid,
        idTimeslots,
        selectedTimeSlots,
    } = funkis

    const [late, setLate] = useState(checkIfLate(selectedTimeSlots, checkedIn, idTimeslots))

    useInterval(() => {
      setLate(checkIfLate(selectedTimeSlots, checkedIn, idTimeslots))
    }, 1000)

    return (
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
                {funkisAlt}
            </DataTableCell>
            <DataTableCell>
                {selectedTimeSlots.map(t => {
                    const options = { day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric' };
                    const start = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].start_time);
                    const end = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].end_time);
                    const res = (`${start} -  ${end} `);
                    return res
                })}
            </DataTableCell>
            <DataTableCell className={`${checkedIn ? 'checkedIn' : ''} ${late ? 'late' : ''}`}>
              {late}
            </DataTableCell>
        </DataTableRow>
    );
}