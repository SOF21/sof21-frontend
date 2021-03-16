import React, { useEffect, useState } from 'react'
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

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import FunkisTypesRow from './FunkisTypesRow'
import {
  getFunkisar,
  getFunkisTimeSlots,
  getFunkisTypes,
} from '../../../../actions/funkis';

import { ScaleLoader } from 'react-spinners';
import TextField from '@rmwc/textfield';

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

  const [isOpen, setOpen] = useState(false)

  return (
    <>
      {isOpen &&
        <Dialog open={isOpen}>
          <DialogTitle>Varning!</DialogTitle>
          <DialogContent>
            Du kan inte ta bort den här funkistypen. <br />
            <br />
            Det finns fortfarande funkisar av denna typen. Ta bort dem först!
            <br />
            Om en funkis valt denna funkistyp som ett av alternativen <br />
            i sin funkisanmälan kommer det att bli en tomt fält i deras modal. 
          </DialogContent>
          <DialogActions>
            <DialogButton onClick={() => setOpen(false)}>
              Stäng
            </DialogButton>
          </DialogActions>
        </Dialog>
      }
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
              onClick={() => history.push('/account/admin/funkistypes/new')}
            >
              + Lägg till funkistyp
          </Button>
          </GridCell>
          <GridCell span="12">
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
                  {positions !== {} ? Object.values(positions).sort((a, b) => b.title > a.title ? -1 : 1).map((funkisType) => {
                    return (
                      <FunkisTypesRow
                        key={funkisType.title}
                        funkisar={funkisar}
                        funkisType={funkisType}
                        funkisTimeslots={Object.values(idTimeslots).filter((f) => f.funkis_category_id === funkisType.id)}
                        setOpen={setOpen}
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