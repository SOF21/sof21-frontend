import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { GridCell, Grid, GridInner } from '@rmwc/grid';
import { 
  DataTable,
  DataTableBody,
  DataTableContent,
  DataTableHead,
  DataTableRow,
  DataTableHeadCell,
  DataTableCell,
 } from '@rmwc/data-table';
import { TextField } from '@rmwc/textfield';

import { Icon } from '@rmwc/icon'


import { FormattedMessage, injectIntl } from 'react-intl';
import { ScaleLoader } from 'react-spinners';
import CortegeModal from './CortegeModal';
import defaultCortege from './defaultCortege';
import bitFlags from './bitFlags';
import { getCorteges, updateCortege, deleteCortege } from '../../../actions/cortege';
import {  CSVLink } from 'react-csv';
import { Chip, ChipSet } from '@rmwc/chip';
import { Checkbox } from 'rmwc';
import { Button } from '@rmwc/button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

const isFlagSet = (flags, flag) => {
  return parseInt(flags, 2) &  flag
}

const CortegeAdminRow = ({
  cortege,
  onClick,
}) => {

  const [cortegeData, setCortegeData] = useState(defaultCortege)

  useEffect(() => {
    setCortegeData(cortege);
  }, [cortege])

  const {
    groupName,
    amountPartaking,
    contactPerson,
    approved,
    phonenumber,
    mail,
    feedback,
    securityFeedback,
    otherComments,
    flags,
  } = cortegeData;
  // TODO: Move select and list to separate modal instead. Accessed by clicking the item
  return(
    <DataTableRow key={groupName} onClick={onClick} className={`${approved? 'done' : ''} ${isFlagSet(flags, bitFlags.removed) ? 'removed' : ''}`}>
      <DataTableCell>
        {isFlagSet(flags, bitFlags.paid) ? <Icon icon='credit_card' style={{color: 'green'}}/> : null}
        {isFlagSet(flags, bitFlags.secApprv) ? <Icon icon='verified_user' style={{color: 'green'}}/> : null}
        {isFlagSet(flags, bitFlags.ideaReqExpand) ? <Icon icon='live_help' style={{color: 'red'}}/> : null}
        {isFlagSet(flags, bitFlags.invoiceSent) ? <Icon icon='description' style={{color: 'green'}}/> : null}
      </DataTableCell>
      <DataTableCell>
        {groupName}
      </DataTableCell>
      <DataTableCell>
        {contactPerson}
      </DataTableCell>
      <DataTableCell>
        {mail}
      </DataTableCell>
      <DataTableCell>
        {phonenumber}
      </DataTableCell>
      <DataTableCell>
        {amountPartaking}
      </DataTableCell>
      <DataTableCell className='feedbackText'>
        {feedback}
      </DataTableCell >
      <DataTableCell className='feedbackText'>
        {securityFeedback}
      </DataTableCell>
      <DataTableCell className='feedbackText'>
        {otherComments}
      </DataTableCell>
    </DataTableRow>
  );
}

const CortegeAdminComponent = ({
  corteges,
  loading,
  getCorteges,
  updateCortege,
  positions,
  deleteCortege,
}) => {

  useEffect(() => {
    getCorteges();
  }, [getCorteges])

  const [cortegeModalOpen, setCortegeModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activeCortege, setActiveCortege] = useState(defaultCortege);
  const [searchTerm, setSearchTerm] = useState('');
  const [CSVHeaders, setCSVHeaders] = useState({});
  const [statusFilters, setStatusFilters] = useState([]);
  const [displayCSV, setDisplayCSV] = useState(false);

  const activatedCSVHeaders = Object.values(CSVHeaders).filter(obj => obj.checked).map(v => v.id);
  const CSVData = Object.values(corteges).map(c => ({
    ...Object.keys(c).reduce((acc, k) => {
      return activatedCSVHeaders.includes(k) ? {
        ...acc,
        [k] : corteges[c.id][k]
      }
      :
      acc
    },{})
  }))

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  }

  const handleCortegeDialogExit = (e, c) => {
    e.preventDefault();
    switch(e.detail.action) {
      case 'save':
        setCortegeModalOpen(false);
        updateCortege(c);
        break;
      case 'delete':
        setDeleteDialogOpen(true);
        break;
      default:
        setCortegeModalOpen(false);
        break;
    }
  }

  const handleDeleteDialogExit = (e, c) => {
    setDeleteDialogOpen(false)
    e.preventDefault();
    switch(e.detail.action) {
      case 'delete':
        setCortegeModalOpen(false);
        deleteCortege(c);
        break;
      default:
        break;
    }
  }



  const onStatusFilterChange = (e) => {
    const {target: {chipId}} = e;
    console.log(chipId)
    console.log(statusFilters)
    if(statusFilters.includes(chipId))
      setStatusFilters(statusFilters.filter(f => f !== chipId));
    else
      setStatusFilters([...statusFilters, chipId]);
  }

  const filterStatus = (cortege) => {
    if(statusFilters.length === 0) return true;
    console.log(statusFilters.length)
    console.log(cortege.flags)
    for(const filter of statusFilters) {
      switch(filter) {
        case 'filterInvoiceSent':
          if(!isFlagSet(cortege.flags, bitFlags.invoiceSent)) return false;
          break;
        case 'filterPaid':
          if(!isFlagSet(cortege.flags, bitFlags.paid)) return false;
          break;
        case 'filterIdeaReqExpand':
          if(!isFlagSet(cortege.flags, bitFlags.ideaReqExpand)) return false;
          break;
        case 'filterSecApproved':
          if(!isFlagSet(cortege.flags, bitFlags.secApprv)) return false;
          break;
        case 'filterRemoved':
          if(!isFlagSet(cortege.flags, bitFlags.removed)) return false;
          break;
        case 'filterChosen':
          if(!cortege.approved) return false;
          break;
        default:
          break;
      }
    }
    return true;
  }

  const filterSearch = (cortege) => {
    const searchProps = ['groupName', 'contactPerson', 'phonenumber', 'mail'];
    for (const p of searchProps) {
      if(cortege[p]?.toLowerCase().includes(searchTerm)) return true;
    }
    return false;
  }

  return ( // TODO: Fix in-line text
    <>
    {loading &&
      <GridInner className='h-center v-center' style={{height: '100%'}}>
          <ScaleLoader
            loading={true}
            color={'red'}
          />
      </GridInner>
    }
    {!loading && activeCortege !== defaultCortege &&
      <CortegeModal 
        handleDialogExit={handleCortegeDialogExit}
        open={cortegeModalOpen}
        cortege={activeCortege}
      /> 
    }
    {!loading && activeCortege !== defaultCortege &&
      <Dialog
        onClose={(e) => handleDeleteDialogExit(e, activeCortege)}
        open={deleteDialogOpen}
      >
        <DialogContent>
          <p>Är du säker på att du vill ta bort cortege: {activeCortege.groupName} ?</p>
        </DialogContent>
        <DialogActions>          
          <DialogButton action="cancel">Avbryt</DialogButton>
          <DialogButton action="delete" raised>Ta bort</DialogButton>  
        </DialogActions>
        
      </Dialog> 
    }
      {!loading &&
      <Grid>
      <GridCell desktop='12' tablet='8' phone='4'>
        <Button
          style={{marginRight: '10px'}}
          raised
          onClick={() => {setDisplayCSV(!displayCSV)}}
        >
          Visa CSV
        </Button>
        <Button
          raised
          onClick={() => {navigator.clipboard.writeText(
            Object.values(corteges).map(c => `${c.mail};`)
          )}}>
            Kopiera e-mail
          </Button>
      </GridCell>
      {displayCSV && <>
        <GridCell desktop='12' tablet='8' phone='4'>
            {Object.keys(corteges).length > 0 && Object.keys(corteges[Object.keys(corteges)[0]]).map(v => {
              if(!CSVHeaders[v]) {
                setCSVHeaders({
                  ...CSVHeaders,
                  [v] : {
                    id: v,
                    checked: true,
                  }
                })
              }
              
              return(<Checkbox
                checked={CSVHeaders[v]?.checked ?? true}
                onClick={() => {
                  setCSVHeaders({
                    ...CSVHeaders,
                    [v]: {
                      id: v,
                      checked: !(CSVHeaders[v]?.checked ?? true),
                    },
                  })
                }}
                label={v}
              />)
            })}
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4'>
          <CSVLink style={{textDecoration: 'none'} } filename={'cortegeData.csv'} data={CSVData}>
          {corteges && <Button raised>Ladda ner CSV</Button>}
          </CSVLink>
        </GridCell>
      </>}
      <GridCell desktop='12' tablet='8' phone='4'>
        <TextField withLeadingIcon='search' label='Sök' id='searchBar'className='cortegeSearch' onChange={handleSearch}/>
      </GridCell>
      <GridCell desktop='12' tablet='8' phone='4'>
        <h6 style={{margin: 0}}>Filter</h6>
        <span>
          <ChipSet filter>
          <Chip
            checkmark
            id={'filterInvoiceSent'}
            text={'Faktura skickad'}
            ripple={null}
            selected={statusFilters.includes('filterInvoiceSent')}
            onInteraction={onStatusFilterChange}
          />
          <Chip
            checkmark
            id={'filterPaid'}
            text={'Betalat anmälningsavgift'}
            ripple={null}
            selected={statusFilters.includes('filterPaid')}
            onInteraction={onStatusFilterChange}
          />
          <Chip
            checkmark
            id={'filterIdeaReqExpand'}
            text={'Idé kräver vidarutveckling'}
            selected={statusFilters.includes('filterIdeaReqExpand')}
            onInteraction={onStatusFilterChange}
          />
          <Chip
            checkmark
            id={'filterSecApproved'}
            text={'Godkänd av säkerhet'}
            selected={statusFilters.includes('filterSecApproved')}
            onInteraction={onStatusFilterChange}
          />
          <Chip
            checkmark
            id={'filterChosen'}
            text={'Vald'}
            selected={statusFilters.includes('filterChosen')}
            onInteraction={onStatusFilterChange}
          />
          <Chip
            checkmark
            id={'filterRemoved'}
            text={'Bortvald'}
            selected={statusFilters.includes('filterRemoved')}
            onInteraction={onStatusFilterChange}
          />
          </ChipSet>
        </span>
      </GridCell>
      <GridCell desktop='12' tablet='8' phone='4'>
        <DataTable style={{maxWidth: '100%'}} className='cortegesContainer'>
          <DataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Status</DataTableHeadCell>
                <DataTableHeadCell>Gruppnamn</DataTableHeadCell>
                <DataTableHeadCell>Kontaktperson</DataTableHeadCell>
                <DataTableHeadCell>E-mail</DataTableHeadCell>
                <DataTableHeadCell>Telefon</DataTableHeadCell>
                <DataTableHeadCell>Antal personer</DataTableHeadCell>
                <DataTableHeadCell>Feedback</DataTableHeadCell>
                <DataTableHeadCell>Säkerhet</DataTableHeadCell>
                <DataTableHeadCell>Övrigt</DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {Object.keys(corteges).length > 0 && Object.values(corteges)
              .filter(c => filterSearch(c))
              .filter(c => filterStatus(c))
              .map((cor) => {
                    return (
                      <CortegeAdminRow
                        cortege={cor}
                        onClick={() => {
                          setActiveCortege({
                            ...cor,
                          });
                          setCortegeModalOpen(true);
                        }}
                      />
                    );
              }
              )}
            </DataTableBody>
          </DataTableContent>  
        </DataTable>  
      </GridCell>
      </Grid>
      }
      
    </>
  );
}

const mapStateToProps = (state) => ({
  corteges: state.cortege.corteges,
  loading: state.cortege.loading,
  error: state.cortege.error,
})

const mapDispatchToProps = (dispatch) => ({
  getCorteges: () => dispatch(getCorteges()),
  updateCortege: (cortege) => dispatch(updateCortege(cortege)),
  deleteCortege: (cortege) => dispatch(deleteCortege(cortege))
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CortegeAdminComponent))