import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

import { Grid, GridCell, GridInner } from '@rmwc/grid'
import { Button } from '@rmwc/button'
import { Icon } from '@rmwc/icon'
import {
  DataTable,
  DataTableBody,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableCell,
} from '@rmwc/data-table';

import FunkisModal from '../funkisApplicationOverview/FunkisModal'
import { defaultFunkis } from '../constants'
import {
  getFunkisar,
  getFunkisTimeSlots,
  getFunkisType,
} from '../../../../actions/funkis';

import { ScaleLoader } from 'react-spinners';

const FunkisTypeData = ({
  loading,
  funkisType,
  getFunkisType,
  getFunkisar,
  getFunkisTimeSlots,
  match,
  positions,
  timeslots,
  funkisar,
  idTimeslots
}) => {

  useEffect(() => {
    getFunkisar()
    getFunkisType(match.params.id)
    getFunkisTimeSlots()
  }, [getFunkisType, match.params.id, getFunkisar, getFunkisTimeSlots])


  const history = useHistory()

  const [funkisModalOpen, setFunkisModalOpen] = useState(false);
  const [activeFunkis, setActiveFunkis] = useState(defaultFunkis);
  const [originalTimeslots, setOriginalTimeslots] = useState([]);

  const options = { day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric' };
  const filteredFunkisar = Object.values(funkisar).filter((f) => f.selectedFunkisAlt === parseInt(funkisType.id))
  const funkisRow = filteredFunkisar.map((f) => {
    const selectedTimeSlots = f.selectedTimeSlots.map(t => {
      const start = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].start_time);
      const end = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].end_time);
      return (`${start} -  ${end} `);
    })
    return (
      <DataTableRow
        key={f.id}
        onClick={() => {
          setActiveFunkis({
            ...f,
          });
          setFunkisModalOpen(true);
          setOriginalTimeslots(f.selectedTimeSlots);
        }}
      >
        <DataTableCell>
          {f.name}
        </DataTableCell>
        <DataTableCell>
          {f.liuid}
        </DataTableCell>
        <DataTableCell style={{ width: '100%' }}>
          {selectedTimeSlots}
        </DataTableCell>
        {}
      </DataTableRow>
    )
  })

  const timeslotRow = Object.values(idTimeslots).filter((t) => t.funkis_category_id === funkisType.id).map((t) => {
    const start = new Intl.DateTimeFormat('sv', options).format(t.start_time);
    const end = new Intl.DateTimeFormat('sv', options).format(t.end_time);
    const timeslotFilled = filteredFunkisar.map((f) => f.selectedTimeSlots.includes(t.id))
    console.log(timeslotFilled)
    return (
      <DataTableRow
        key={t.id}
      >
        <DataTableCell>
          {start}
        </DataTableCell>
        <DataTableCell>
          {end}
        </DataTableCell>
        <DataTableCell style={{width: '100%'}} alignMiddle>
          {timeslotFilled.includes(true) ?
            <Icon icon="done" style={{ color: 'green' }} /> : null }
        </DataTableCell>
      </DataTableRow>
    )
  })

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
      {!loading && activeFunkis !== defaultFunkis &&
        <FunkisModal
          funkis={activeFunkis}
          setFunkisModalOpen={setFunkisModalOpen}
          timeslots={timeslots}
          positions={positions}
          isOpen={funkisModalOpen}
          originalTimeslots={originalTimeslots}
        />
      }
      {!loading &&
        <Grid>

          <GridCell desktop='12' tablet='8' phone='4'>
            <h4 style={{ margin: '0px' }}> <b>{funkisType.title}</b></h4>
            <br />
            <h6 style={{ margin: '0px' }}> Antal: {funkisType.current} / {funkisType.needed}</h6>
          </GridCell>

          <GridCell desktop='7' tablet='4' phone='4'>
            <Button
              raised
              style={{ width: '100%' }}
              onClick={() => history.push('/account/admin/funkisar')}
            >
              + Lägg till funkisar
          </Button>
          </GridCell>

          <GridCell desktop='5' tablet='4' phone='4'>
            <Button raised style={{ width: '100%' }}>
              + Lägg till pass
          </Button>
          </GridCell>

          <GridCell desktop="7" tablet="8" phone="4">
            <h5 style={{ margin: '0px' }}>Funkisar</h5>
            <DataTable style={{ width: '100%' }}>
              <DataTableContent>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableHeadCell>Namn</DataTableHeadCell>
                    <DataTableHeadCell>LiU-ID</DataTableHeadCell>
                    <DataTableHeadCell>Bokade pass</DataTableHeadCell>
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {funkisar !== {} && funkisRow}
                </DataTableBody>
              </DataTableContent>
            </DataTable>
          </GridCell>

          <GridCell desktop="5" tablet="8" phone="4">
            <h5 style={{ margin: '0px' }}>Pass</h5>
            <DataTable style={{width: '100%'}}>
              <DataTableContent>
                <DataTableHead>
                  <DataTableRow>
                    <DataTableHeadCell>Starttid</DataTableHeadCell>
                    <DataTableHeadCell>Sluttid</DataTableHeadCell>
                    <DataTableHeadCell alignMiddle>Tillsatt?</DataTableHeadCell>
                  </DataTableRow>
                </DataTableHead>
                <DataTableBody>
                  {timeslotRow}
                </DataTableBody>
              </DataTableContent>
            </DataTable>
          </GridCell>

          <GridCell desktop='12' tablet='8' phone='4'>
            <Button
              raised
              style={{ width: '100%' }}
              onClick={() => history.push('/account/admin/funkistypes')}
            >
              Tillbaka
          </Button>
          </GridCell>

        </Grid>}
    </>
  )
}

const mapStateToProps = (state) => ({
  funkisar: state.funkis.funkisar,
  loading: state.funkis.loading,
  timeslots: state.funkis.timeslots,
  positions: state.funkis.positionTitles,
  idTimeslots: state.funkis.idTimeslots,
  funkisType: state.funkis.currentFunkisType
})

const mapDispatchToProps = (dispatch) => ({
  getFunkisar: () => dispatch(getFunkisar()),
  getFunkisTimeSlots: () => dispatch(getFunkisTimeSlots()),
  getFunkisType: (id) => dispatch(getFunkisType(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FunkisTypeData)