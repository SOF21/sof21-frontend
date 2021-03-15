import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import {
    DataTableRow,
    DataTableCell,
} from '@rmwc/data-table';
import Button from '@rmwc/button';

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