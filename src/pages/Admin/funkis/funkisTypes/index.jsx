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
  deleteFunkisType
} from '../../../../actions/funkis';

import { ScaleLoader } from 'react-spinners';
import TextField from '@rmwc/textfield';

const FunkisCreationComponent = ({
  loading,
  getFunkisar,
  getFunkisTimeSlots,
  getFunkisTypes,
  deleteFunkisType,
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
  const [funkisType, setFunkisType] = useState(undefined)

  const handleDeleteFunkis = (funkisType) => {
    if (funkisType.current > 0) {
      setOpen(true)
      setFunkisType(funkisType)
    } else {
      deleteFunkisType(funkisType)
    }
  }

  return (
    <>
      {isOpen &&
        <Dialog open={isOpen}>
          <DialogTitle>Varning!</DialogTitle>
          <DialogContent>
            Det finns fortfarande funkisar av denna typen. <br />
            <br />
             Är du säker att du vill ta bort den?
          </DialogContent>
          <DialogActions>
            <DialogButton 
              onClick={() => {
                setOpen(false)
                deleteFunkisType(funkisType).finally(() => {
                  getFunkisTimeSlots()
                  getFunkisar()
                })
              }}>
              Fortsätt
            </DialogButton>
            <DialogButton onClick={() => setOpen(false)}>
              Avbryt
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
                        handleDeleteFunkis={handleDeleteFunkis}
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
  deleteFunkisType: (funkisType) => dispatch(deleteFunkisType(funkisType))
})

export default connect(mapStateToProps, mapDispatchToProps)(FunkisCreationComponent)