import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css'

class CampainsTable extends React.Component {
  render() {

      return (
        <BootstrapTable data={this.props.data}
          tableHeaderClass={"col-hidden"}
          tableStyle={{ margin: -8, marginTop: 1, marginBottom: 1, marginLeft: 2, borderRadius: 1, border: 1 }}
        >
          <TableHeaderColumn dataField='name' isKey={ true }>Field A0</TableHeaderColumn>
          <TableHeaderColumn dataField='soi' expandable={ false }>Type</TableHeaderColumn>
          <TableHeaderColumn dataField='size' expandable={ false }>Clicks</TableHeaderColumn>
          <TableHeaderColumn dataField='price' expandable={ false }>Impressions</TableHeaderColumn>
          <TableHeaderColumn dataField='poi' expandable={ false }>Join Rate</TableHeaderColumn>
          <TableHeaderColumn dataField='coi' expandable={ false }>Spent</TableHeaderColumn>
          <TableHeaderColumn dataField='vcs' expandable={ false }>VideoClicks Site</TableHeaderColumn>
          <TableHeaderColumn dataField='vv' expandable={ false }>Video Views</TableHeaderColumn>
          <TableHeaderColumn dataField='vfv' expandable={ false }>Video Full Views</TableHeaderColumn>
          <TableHeaderColumn dataField='vhv' expandable={ false }>Video Half Views</TableHeaderColumn>
        </BootstrapTable>);

  }
}

class AccountsTable extends React.Component {

  constructor(props) {
        super(props);
        this.isExpandableRow = this.isExpandableRow.bind(this)
        this.expandComponent = this.expandComponent.bind(this)
    }

    isExpandableRow(row) {
      return (true)
    }

    expandComponent(row) {
      return <CampainsTable data={row.campaignsinfo} />
    }

    // textFormatter(cell, row) {
    //   return (<div style={{marginLeft: 10}}>{cell}</div>)
    // }

    render() {
      const options = {
        expandRowBgColor: 'gainsboro',
        expandBy: 'row', // Currently, available value is row and column, default is row
        expandBodyClass: 'custom-expand-body-0'
      };
      return (
        <BootstrapTable data={this.props.data}
          options={ options }
          tableHeaderClass={"col-hidden"}
          tableStyle={{ margin: -8, marginTop: 1, marginBottom: 1, marginLeft: 2, borderRadius: 1, border: 1 }}
          expandableRow={ this.isExpandableRow }
          expandComponent={ this.expandComponent }
        >
          <TableHeaderColumn dataField='accountlogin' isKey={ true }>Field A0</TableHeaderColumn>
          <TableHeaderColumn dataField='soi' expandable={ false }>Type</TableHeaderColumn>
          <TableHeaderColumn dataField='size' expandable={ false }>Clicks</TableHeaderColumn>
          <TableHeaderColumn dataField='price' expandable={ false }>Impressions</TableHeaderColumn>
          <TableHeaderColumn dataField='poi' expandable={ false }>Join Rate</TableHeaderColumn>
          <TableHeaderColumn dataField='coi' expandable={ false }>Spent</TableHeaderColumn>
          <TableHeaderColumn dataField='vcs' expandable={ false }>VideoClicks Site</TableHeaderColumn>
          <TableHeaderColumn dataField='vv' expandable={ false }>Video Views</TableHeaderColumn>
          <TableHeaderColumn dataField='vfv' expandable={ false }>Video Full Views</TableHeaderColumn>
          <TableHeaderColumn dataField='vhv' expandable={ false }>Video Half Views</TableHeaderColumn>
        </BootstrapTable>);
    }
  }

class VkTable extends Component {

  constructor(props) {
      super(props);

      this.expandComponent = this.expandComponent.bind(this)
  }

  isExpandableRow(row) {
    return true
  }

  expandComponent(row) {
    return <AccountsTable data={this.props.vk} />
  }

  render() {
    return (
      <BootstrapTable
        data={[{name: "Vk"}]}
        options={{expandRowBgColor: 'gainsboro', expandBy: 'column', expandBodyClass: 'custom-expand-body-0'}}
        expandableRow={this.isExpandableRow}
        expandComponent={this.expandComponent}
      >
        <TableHeaderColumn width='100' dataField='name' isKey={ true }>Name</TableHeaderColumn>
        <TableHeaderColumn width='100' dataField='soi' expandable={ false }>Type</TableHeaderColumn>
        <TableHeaderColumn width='100' dataField='size' expandable={ false }>Clicks</TableHeaderColumn>
        <TableHeaderColumn width='100' dataField='price' expandable={ false }>Impressions</TableHeaderColumn>
        <TableHeaderColumn width='100' dataField='poi' expandable={ false }>Join Rate</TableHeaderColumn>
        <TableHeaderColumn width='100' dataField='coi' expandable={ false }>Spent</TableHeaderColumn>
        <TableHeaderColumn width='100' dataField='vcs' expandable={ false }>VideoClicks Site</TableHeaderColumn>
        <TableHeaderColumn width='100' dataField='vv' expandable={ false }>Video Views</TableHeaderColumn>
        <TableHeaderColumn width='100' dataField='vfv' expandable={ false }>Video Full Views</TableHeaderColumn>
        <TableHeaderColumn width='100' dataField='vhv' expandable={ false }>Video Half Views</TableHeaderColumn>
      </BootstrapTable>
    )
  }
}

const mapStateToProps = ({ accounts }) => {
  const { vk } = accounts;
  return {
    vk
  }
}

export default connect(mapStateToProps,null)(VkTable);
