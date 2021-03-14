import React, { useState } from 'react';
import {
    DataTableRow,
    DataTableCell,
} from '@rmwc/data-table';

export const FunkisCreationRow = ({
    funkisType,
    funkisTimeslots
}) => {

    const {
        title,
        current,
        needed,
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
                {funkisTimeslots.length}
            </DataTableCell>
        </DataTableRow>
    );
}

export default FunkisCreationRow