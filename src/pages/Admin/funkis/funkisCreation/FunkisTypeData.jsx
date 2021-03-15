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
  getFunkisType,
} from '../../../../actions/funkis';

import { ScaleLoader } from 'react-spinners';

const FunkisTypeData = ({
  funkisType,
  getFunkisType,
  match
}) => {

  useEffect(() => {
    getFunkisType(match.params.id)
  }, [getFunkisType, match.params.id])


  console.log(funkisType)
  return (
    <>
      <Grid>
      <GridCell desktop='12' tablet='8' phone='4'>
            <h4 style={{margin: '0px'}}> <b>{funkisType.title}</b></h4>
            <br/>
            <h6 style={{margin: '0px'}}> Antal: {funkisType.current} / {funkisType.needed}</h6>
          </GridCell>
        <GridCell>
          <Button>
            Lägg till pass
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
  funkisType: state.funkis.currentFunkisType
})

const mapDispatchToProps = (dispatch) => ({
  getFunkisar: () => dispatch(getFunkisar()),
  getFunkisTimeSlots: () => dispatch(getFunkisTimeSlots()),
  getFunkisType: (id) => dispatch(getFunkisType(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FunkisTypeData)