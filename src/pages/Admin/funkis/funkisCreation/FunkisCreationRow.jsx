import React, { useState } from 'react';
import {
    DataTableRow,
    DataTableCell,
} from '@rmwc/data-table';

export const FunkisCreationRow = ({
    funkisType,
}) => {

    const {
        name,
        amount,
        wishedAmount,
        timeslots,
    } = funkisType

    return (
        <DataTableRow>
            <DataTableCell>
                {name}
            </DataTableCell>
            <DataTableCell>
                {`${amount}/${wishedAmount}`}
            </DataTableCell>
            <DataTableCell>
                {timeslots}
            </DataTableCell>
        </DataTableRow>
    );
}

export default FunkisCreationRow