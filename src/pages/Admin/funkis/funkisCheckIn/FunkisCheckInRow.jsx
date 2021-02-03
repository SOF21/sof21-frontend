import React, { useEffect, useState } from 'react';
import { defaultFunkis } from '../constants';
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
        timeSlots,
        checkedIn,
    } = funkis

    const startOfTimeSlot = timeSlots !== undefined ? timeSlots.map(t => t.start_time) : undefined
    const checkIfLate = ((timeSlots) => {
        const currentTime = new Date()
        if (timeSlots !== undefined) {
            return timeSlots.map(t => {
                if (currentTime > t && !checkedIn ) return true
                return false
            } );
        }
        return [false]
    })

    console.log(funkis.checkedIn)
    const lateForTimeSlot = checkIfLate(startOfTimeSlot).includes(true)
    return (
        <DataTableRow>
            <DataTableCell>
                {name}
            </DataTableCell>
            <DataTableCell>
                {email}
            </DataTableCell>
            <DataTableCell>
                {funkisAlt}
            </DataTableCell>
            <DataTableCell>
                {timeSlots !== undefined && timeSlots.map(t => {
                    const options = { day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric' };
                    const start = new Intl.DateTimeFormat('sv', options).format(t.start_time);
                    const end = new Intl.DateTimeFormat('sv', options).format(t.end_time);
                    const res = (`${start} -  ${end}`);
                    return res
                })}
            </DataTableCell>
            <DataTableCell className={`${checkedIn ? 'checkedIn' : ''} ${lateForTimeSlot ? 'late' : ''}`}>
            </DataTableCell>
        </DataTableRow>
    );
}