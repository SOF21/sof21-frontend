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
import { getCorteges, updateCortege } from '../../../actions/cortege';
import { CSVDownload, CSVLink } from 'react-csv';
import { Switch } from '@rmwc/switch';
import { Button } from 'rmwc';

// TODO: Bryt ut till intl


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
    buildType,
    contactPerson,
    approved,
    phonenumber,
    mail,
    infoMail,
    electricity,
    feedback,
    securityFeedback,
    otherComments,
  } = cortegeData;
  // TODO: Move select and list to separate modal instead. Accessed by clicking the item
  return(
    <DataTableRow onClick={onClick} className={approved? 'done' : ''}>
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
        {buildType}
      </DataTableCell>
      <DataTableCell>
        {amountPartaking}
      </DataTableCell>
      <DataTableCell>
        <Icon icon={infoMail? 'done' : 'clear'}/>
      </DataTableCell>
      <DataTableCell>
        <Icon icon={electricity? 'done' : 'clear'}/>
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
}) => {

  useEffect(() => {
    getCorteges();
  }, [getCorteges])

  const [cortegeModalOpen, setCortegeModalOpen] = useState(false);
  const [activeCortege, setActiveCortege] = useState(defaultCortege);
  const [searchTerm, setSearchTerm] = useState('');
  const [CSVHeaders, setCSVHeaders] = useState({});

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

  const handleDialogExit = (e, c) => {
    setCortegeModalOpen(false)
    e.preventDefault();
    switch(e.detail.action) {
      case 'save':
        updateCortege(c)
        break;
      default:
        break;
    }
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
        handleDialogExit={handleDialogExit}
        open={cortegeModalOpen}
        cortege={activeCortege}
      /> 
    }
      {!loading &&
      <Grid>
      <GridCell desktop='12' tablet='8' phone='4'>
        <CSVLink style={{textDecoration: 'none'} } filename={'cortegeData.csv'} data={CSVData}>
        {corteges && <Button raised>Ladda ner CSV</Button>}
        </CSVLink>
      </GridCell>
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
            
            return(<Switch
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
              checkmark
              label={v}
            />)
          })}
      </GridCell>
      <GridCell desktop='12' tablet='8' phone='4'>
        <TextField withLeadingIcon='search' label='Sök' id='searchBar'onChange={handleSearch}/>
      </GridCell>
      <GridCell desktop='12' tablet='8' phone='4'>
        <DataTable style={{maxWidth: '100%'}} className='cortegesContainer'>
          <DataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Gruppnamn</DataTableHeadCell>
                <DataTableHeadCell>Kontaktperson</DataTableHeadCell>
                <DataTableHeadCell>E-mail</DataTableHeadCell>
                <DataTableHeadCell>Telefon</DataTableHeadCell>
                <DataTableHeadCell>Bidragstyp</DataTableHeadCell>
                <DataTableHeadCell>Antal personer</DataTableHeadCell>
                <DataTableHeadCell>Info mail</DataTableHeadCell>
                <DataTableHeadCell>El</DataTableHeadCell>
                <DataTableHeadCell>Feedback</DataTableHeadCell>
                <DataTableHeadCell>Säkerhet</DataTableHeadCell>
                <DataTableHeadCell>Övrigt</DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
              {Object.keys(corteges).length > 0 && Object.values(corteges).map((cor) => {
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
  updateCortege: (cortege) => dispatch(updateCortege(cortege))
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(CortegeAdminComponent))