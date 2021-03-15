import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import {
    DataTableRow,
    DataTableCell,
} from '@rmwc/data-table';

export const FunkisCreationRow = ({
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

    return (
        <DataTableRow
          onClick={() => history.push('/account/admin/funkistypes/' + id)}
          style={{cursor: 'pointer'}}
        >
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