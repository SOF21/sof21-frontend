import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

import { Grid, GridCell, GridInner } from '@rmwc/grid'
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

const FunkisCreationComponent = ({
  loading,
  getFunkisar,
  getFunkisTimeSlots,
  getFunkisTypes,
  positions,
  idTimeslots,
  funkisar,
  timeslots
}) => {

  useEffect(() => {
    getFunkisar()
    getFunkisTimeSlots();
    getFunkisTypes();
  }, [getFunkisTimeSlots, getFunkisTypes, getFunkisar])

  const history = useHistory()

  return (
    <>
      {loading &&
        <GridInner className='h-center v-center' style={{ height: '100%' }}>
          <ScaleLoader
            loading={true}
            color={'red'}
          />
        </GridInner>
      }
      {!loading &&
        <Grid>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Button
              raised
              style={{ width: '100%' }}
            >
              + Lägg till funkistyp
          </Button>
          </GridCell>
          <GridCell desktop="12">
            <DataTable style={{ width: '100%' }}>
              <DataTableContent>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableHeadCell>Funkistyp</DataTableHeadCell>
                    <DataTableHeadCell>Antal</DataTableHeadCell>
                    <DataTableHeadCell>Pass</DataTableHeadCell>
                    <DataTableHeadCell></DataTableHeadCell>
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {positions !== {} ? Object.values(positions).map((funkisType) => {
                    return (
                      <FunkisCreationRow
                        key={funkisType.title}
                        funkisar={funkisar}
                        funkisType={funkisType}
                        funkisTimeslots={Object.values(idTimeslots).filter((f) => f.funkis_category_id === funkisType.id)}
                      />
                    )
                  }) : null}
                </DataTableBody>
              </DataTableContent>
            </DataTable>
          </GridCell>
        </Grid>}
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