import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css'
import Spinner from 'react-spinkit'

class CampainsTable extends React.Component {
  render() {

      return (
        <BootstrapTable data={this.props.data}
          tableHeaderClass={"col-hidden"}
          tableStyle={{ margin: -8, marginTop: 1, marginBottom: 1, marginLeft: 2, borderRadius: 1, border: 1 }}
        >
          <TableHeaderColumn dataField='name' width='400' isKey={ true }>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='ClicksContext' expandable={ false }>ClicksContext</TableHeaderColumn>
          <TableHeaderColumn dataField='ClicksSearch' expandable={ false }>ClicksSearch</TableHeaderColumn>
          <TableHeaderColumn dataField='GoalConversionContext' expandable={ false }>GConvC</TableHeaderColumn>
          <TableHeaderColumn dataField='GoalConversionSearch' expandable={ false }>GConvS</TableHeaderColumn>
          <TableHeaderColumn dataField='GoalCostContext' expandable={ false }>GCostC</TableHeaderColumn>
          <TableHeaderColumn dataField='GoalCostSearch' expandable={ false }>GCostS</TableHeaderColumn>
          <TableHeaderColumn dataField='SessionDepthContext' expandable={ false }>SDC</TableHeaderColumn>
          <TableHeaderColumn dataField='SessionDepthSearch' expandable={ false }>SDS</TableHeaderColumn>
          <TableHeaderColumn dataField='ShowsContext' expandable={ false }>SearchC</TableHeaderColumn>
          <TableHeaderColumn dataField='ShowsSearch' expandable={ false }>SearchS</TableHeaderColumn>
          <TableHeaderColumn dataField='SumContext' expandable={ false }>SumC</TableHeaderColumn>
          <TableHeaderColumn dataField='SumSearch' expandable={ false }>SumS</TableHeaderColumn>
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
          <TableHeaderColumn dataField='accountlogin' width='400' isKey={ true }>Field A0</TableHeaderColumn>
          <TableHeaderColumn dataField='ClicksContext' expandable={ false }>ClicksContext</TableHeaderColumn>
          <TableHeaderColumn dataField='ClicksSearch' expandable={ false }>ClicksSearch</TableHeaderColumn>
          <TableHeaderColumn dataField='GoalConversionContext' expandable={ false }>GConvC</TableHeaderColumn>
          <TableHeaderColumn dataField='GoalConversionSearch' expandable={ false }>GConvS</TableHeaderColumn>
          <TableHeaderColumn dataField='GoalCostContext' expandable={ false }>GCostC</TableHeaderColumn>
          <TableHeaderColumn dataField='GoalCostSearch' expandable={ false }>GCostS</TableHeaderColumn>
          <TableHeaderColumn dataField='SessionDepthContext' expandable={ false }>SDC</TableHeaderColumn>
          <TableHeaderColumn dataField='SessionDepthSearch' expandable={ false }>SDS</TableHeaderColumn>
          <TableHeaderColumn dataField='ShowsContext' expandable={ false }>SearchC</TableHeaderColumn>
          <TableHeaderColumn dataField='ShowsSearch' expandable={ false }>SearchS</TableHeaderColumn>
          <TableHeaderColumn dataField='SumContext' expandable={ false }>SumC</TableHeaderColumn>
          <TableHeaderColumn dataField='SumSearch' expandable={ false }>SumS</TableHeaderColumn>
        </BootstrapTable>);
    }
  }

class YandexTable extends Component {

  constructor(props) {
      super(props);

      this.expandComponent = this.expandComponent.bind(this)
  }

  isExpandableRow(row) {
    return true
  }

  expandComponent(row) {
    return <AccountsTable data={this.props.yandex[0].accounts} />
  }

  render() {
    if (this.props.loadingYandex) {
      return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Spinner name="wave" fadeIn="half"/>
        </div>
      )
    }
    else {
      return (
        <BootstrapTable
          data={this.props.yandex}
          options={{expandRowBgColor: 'gainsboro', expandBy: 'column', expandBodyClass: 'custom-expand-body-0'}}
          expandableRow={this.isExpandableRow}
          expandComponent={this.expandComponent}
        >
          <TableHeaderColumn width='400' dataField='name' isKey={ true }>Name</TableHeaderColumn>
          <TableHeaderColumn dataField='ClicksContext' expandable={ false }>ClicksContext</TableHeaderColumn>
          <TableHeaderColumn dataField='ClicksSearch' expandable={ false }>ClicksSearch</TableHeaderColumn>
          <TableHeaderColumn dataField='GoalConversionContext' expandable={ false }>GConvC</TableHeaderColumn>
          <TableHeaderColumn dataField='GoalConversionSearch' expandable={ false }>GConvS</TableHeaderColumn>
          <TableHeaderColumn dataField='GoalCostContext' expandable={ false }>GCostC</TableHeaderColumn>
          <TableHeaderColumn dataField='GoalCostSearch' expandable={ false }>GCostS</TableHeaderColumn>
          <TableHeaderColumn dataField='SessionDepthContext' expandable={ false }>SDC</TableHeaderColumn>
          <TableHeaderColumn dataField='SessionDepthSearch' expandable={ false }>SDS</TableHeaderColumn>
          <TableHeaderColumn dataField='ShowsContext' expandable={ false }>SearchC</TableHeaderColumn>
          <TableHeaderColumn dataField='ShowsSearch' expandable={ false }>SearchS</TableHeaderColumn>
          <TableHeaderColumn dataField='SumContext' expandable={ false }>SumC</TableHeaderColumn>
          <TableHeaderColumn dataField='SumSearch' expandable={ false }>SumS</TableHeaderColumn>
        </BootstrapTable>
      )
    }
  }
}

const mapStateToProps = ({ accounts }) => {
  const { yandex, loadingYandex, yandexStat } = accounts;
  return {
    yandex,
    loadingYandex,
    yandexStat
  }
}

export default connect(mapStateToProps,null)(YandexTable);
