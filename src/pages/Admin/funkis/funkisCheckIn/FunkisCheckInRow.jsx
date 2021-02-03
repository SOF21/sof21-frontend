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
        liuid,
        late
    } = funkis

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
                {timeSlots !== undefined && timeSlots.map(t => {
                    const options = { day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric' };
                    const start = new Intl.DateTimeFormat('sv', options).format(t.start_time);
                    const end = new Intl.DateTimeFormat('sv', options).format(t.end_time);
                    const res = (`${start} -  ${end}`);
                    return res
                })}
            </DataTableCell>
            <DataTableCell className={`${checkedIn ? 'checkedIn' : ''} ${late ? 'late' : ''}`}>
              {late}
            </DataTableCell>
        </DataTableRow>
    );
}