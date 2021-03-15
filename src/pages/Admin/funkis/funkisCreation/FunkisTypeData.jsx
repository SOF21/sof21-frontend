import React, { useEffect } from 'react'
import { connect } from 'react-redux';

import { Grid, GridCell } from '@rmwc/grid'
import { Button } from '@rmwc/button'
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

const FunkisTypeData = (props) => {

  console.log(props)
  return (
    <>
      <Grid>
        <GridCell>

        </GridCell>
        <GridCell>
          <Button>
            Lägg till funkistyp
          </Button>
        </GridCell>
        <GridCell>
          <Button>
          </Button>
        </GridCell>
        <GridCell desktop="12">
          <DataTable>
            <DataTableContent>
              <DataTableHead>
                <DataTableRow>
                  <DataTableHeadCell>Funkistyp</DataTableHeadCell>
                  <DataTableHeadCell>Antal</DataTableHeadCell>
                  <DataTableHeadCell>Pass</DataTableHeadCell>
                </DataTableRow>
              </DataTableHead>
              <DataTableBody>
              
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

export default connect(mapStateToProps, mapDispatchToProps)(FunkisTypeData)