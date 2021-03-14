import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import { Grid, GridCell } from '@rmwc/grid'
import { 
  DataTable,
  DataTableBody,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableCell,
 } from '@rmwc/data-table';
 
import FunkisCreationRow from './FunkisCreationRow'
 import { 
  getFunkisar,
  getFunkisTimeSlots,
  getFunkisTypes,
 } from '../../../../actions/funkis';

 import { ScaleLoader } from 'react-spinners';

const FunkisCreationComponent = ({
  loading,
  getFunkisTimeSlots,
  getFunkisTypes,
  positions,
  idTimeslots,
  timeslots
}) => {

  useEffect(() => {
    getFunkisTimeSlots();
    getFunkisTypes();
  }, [])

  console.log(positions)
  return (
    <>
      <Grid>
        <GridCell>
          <DataTable>
            <DataTableContent>
              <DataTableHead>
                <DataTableHeadCell>Funkistyp</DataTableHeadCell>
                <DataTableHeadCell>Antal</DataTableHeadCell>
                <DataTableHeadCell>Pass</DataTableHeadCell>
              </DataTableHead>
              <DataTableBody>
{/*                 {positions !== {} ? positions.map((funkisType) => {
                  return (
                    <FunkisCreationRow
                      funkisType={funkisType}
                    />
                  )
                }) : null} */}
              </DataTableBody>
            </DataTableContent>
          </DataTable>
        </GridCell>
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => ({
  funkisar: state.funkis.funkisar,
  loading: state.funkis.loading,
  timeslots: state.funkis.timeslots,
  positions: state.funkis.positions,
  idTimeslots: state.funkis.idTimeslots,
})

const mapDispatchToProps = (dispatch) => ({
  getFunkisar: () => dispatch(getFunkisar()),
  getFunkisTimeSlots: () => dispatch(getFunkisTimeSlots()),
  getFunkisTypes: () => dispatch(getFunkisTypes()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FunkisCreationComponent)