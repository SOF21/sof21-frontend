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


import { FormattedMessage, injectIntl } from 'react-intl';
import { ScaleLoader } from 'react-spinners';
import CortegeModal from './CortegeModal';
import defaultCortege from './defaultCortege';
import { getCorteges, updateCortege } from '../../../actions/cortege';

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
        {buildType}
      </DataTableCell>
      <DataTableCell>
        {amountPartaking}
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

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  }

  const handleDialogExit = (e, c) => {
    setCortegeModalOpen(false)
    e.preventDefault();
    switch(e.detail.action) {
      case 'save':
        console.log(c)
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
        <TextField withLeadingIcon='search' label='Sök' id='searchBar'onChange={handleSearch}/>
      </GridCell>
      <GridCell desktop='12' tablet='8' phone='4'>
        <DataTable>
          <DataTableContent>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Gruppnamn</DataTableHeadCell>
                <DataTableHeadCell>Kontaktperson</DataTableHeadCell>
                <DataTableHeadCell>Byggnadsttyp</DataTableHeadCell>
                <DataTableHeadCell>Antal deltagare</DataTableHeadCell>
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