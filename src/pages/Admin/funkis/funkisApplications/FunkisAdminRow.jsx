import React, {useEffect, useState} from 'react';
import { defaultFunkis } from '../constants';
import {
  DataTableRow,
  DataTableCell,
 } from '@rmwc/data-table';

export const FunkisAdminRow = ({
  funkis,
  onClick,
}) => {

  const [funkisData, setFunkisData] = useState(defaultFunkis)

  useEffect(() => {
    setFunkisData(funkis);
  }, [funkis])
  
  const {
    name,
    liuid,
    email,
    selectedFunkisAlt,
    markedAsDone,
    selectedTimeSlots,
  } = funkisData;
  // TODO: Move select and list to separate modal instead. Accessed by clicking the item
  return(
    <DataTableRow onClick={onClick} className={markedAsDone? 'done' : ''}>
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
        {selectedFunkisAlt}
      </DataTableCell>
      <DataTableCell>
        <span>{selectedTimeSlots.reduce((str, t) => `${t}${str.length > 0? ',' : ''} ${str}`, '')}</span>
      </DataTableCell>
    </DataTableRow>
  );
}