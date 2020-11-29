import React, { Component } from 'react';

import { connect } from "react-redux";
import { fetchOrchestras } from "../../../actions/orchestras";
import { withRouter } from 'react-router-dom';

import {
  DataTable,
  DataTableContent,
  DataTableHead,
  DataTableBody,
  DataTableHeadCell,
  DataTableRow,
  DataTableCell
} from '@rmwc/data-table';
import { CircularProgress } from '@rmwc/circular-progress';
import { Button } from '@rmwc/button';

import { getOrchestraCSV } from '../../../api/csvCalls';
import { CSVLink } from "react-csv";

const orchestraTypes = {
  0: 'Orkester',
  1: 'Band',
};

class AllOrchestras extends Component{
  constructor(props){
    super(props)

    this.csvLinkRef = React.createRef();

    this.state = {csvData: "", csvFileName: ""}
  }

  componentDidMount() {
    this.props.dispatch(fetchOrchestras());
  }

  downloadOrchestraData = (id, name) => {
    getOrchestraCSV(id)
      .then( response => {
        console.log('test');
        console.log(this.csvLinkRef);
        this.setState({csvData: response.data,
          csvFileName: name.replace(' ', '_') + (new Date()).toISOString()}, () =>{
            this.csvLinkRef.current.link.click();
        });
      }).catch(error => {
        console.log(error);
      });
  }

  render(){
    const { loading, error, orchestras } = this.props;
    let content;
    if (loading) {
      content = <CircularProgress size="xlarge" />
    } else if (error || !orchestras || !orchestras.list || orchestras.list.size === 0) {
      console.log("ERROR: " + error);
      content = <div>Error!</div>
    } else {
      content = (
        <DataTable style={{width: '100%'}}>
          <DataTableContent style={{width: '100%'}}>
            <DataTableHead>
              <DataTableRow>
                <DataTableHeadCell>Namn</DataTableHeadCell>
                <DataTableHeadCell >
                  Typ
                </DataTableHeadCell>
                <DataTableHeadCell >
                  Medlemmar
                </DataTableHeadCell>
                <DataTableHeadCell >
                  Skapad
                </DataTableHeadCell>
                <DataTableHeadCell >
                  Kod
                </DataTableHeadCell>
                <DataTableHeadCell >
                  CSV
                </DataTableHeadCell>
              </DataTableRow>
            </DataTableHead>
            <DataTableBody>
          {Object.keys(orchestras.list).map( key => {
            const orchestra = orchestras.list[key];

            return (
              <DataTableRow 
                key={orchestra.id} 
                onClick={() => this.props.history.push('/account/admin/orchestras/' + orchestra.id)}
                style={{cursor: 'pointer'}}
              >
                <DataTableCell>{orchestra.name}</DataTableCell>
                <DataTableCell>{orchestraTypes[orchestra.orchestra_type]}</DataTableCell>
                <DataTableCell>{orchestra.members_count}</DataTableCell>
                <DataTableCell>{(new Date(orchestra.created_at)).toISOString().substring(0, 10)}</DataTableCell>
                <DataTableCell>{orchestra.code}</DataTableCell>
                <DataTableCell> 
                  <Button onClick={(e) => {e.stopPropagation(); this.downloadOrchestraData(orchestra.id, orchestra.name)}}> 
                    Hämta
                  </Button>
                </DataTableCell>
              {/*<ListItem tag={Link} to={`/account/admin/orchestras/${orchestra.id}`} key={orchestra.id}>{orchestra.name}</ListItem> */}
              </DataTableRow>
            );
          })}
          </DataTableBody>
          </DataTableContent>
        </DataTable>
      )}
    return(
      <React.Fragment>
        <CSVLink
          ref={this.csvLinkRef}
          data={this.state.csvData}
          style={{display: 'none'}}
          filename={this.state.csvFileName + '.csv'}
          target="_blank" 
        >
            test
        </CSVLink>
        {content}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  orchestras: state.orchestras.orchestras,
  orchestraSignups: state.orchestras.orchestraSignups,
  loading: state.orchestras.loading,
  error: state.orchestras.error
});

export default withRouter(connect(mapStateToProps,)(AllOrchestras));
