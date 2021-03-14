import React, { useState } from 'react';
import {
    DataTableRow,
    DataTableCell,
} from '@rmwc/data-table';

export const FunkisCreationRow = ({
    funkisType,
}) => {

    const {
        title,
        current,
        needed,
        timeslots,
    } = funkisType

    return (
        <DataTableRow>
            <DataTableCell>
                {title}
            </DataTableCell>
            <DataTableCell>
                {`${current} / ${needed}`}
            </DataTableCell>
            <DataTableCell>
                {timeslots}
            </DataTableCell>
        </DataTableRow>
    );
}

export default FunkisCreationRow