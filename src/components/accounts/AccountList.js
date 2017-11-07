import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-bootstrap-table/css/react-bootstrap-table.css'
import { getAccountsData, changeDate } from '../../actions'
import YandexTable from './YandexTable'
import VkTable from './VkTable'

import yandexLogo from '../../logos/yandexLogo.png'
import vkLogo from '../../logos/vkLogo.png'

class AccountList extends Component {

  constructor(props){
    super(props);

    this.onTodayClick = this.onTodayClick.bind(this)
  }

  componentWillMount() {
    this.props.getAccountsData(this.props.date)
  };

  onTodayClick() {
    this.props.changeDate('today')
    this.props.getAccountsData(this.props.date)
    this.forceUpdate()
  }

  renderAll() {
    if (this.props.yandex===this.props.vk) {
      return (
        <div>
          Add Accounts
        </div>
      )
    }
    return (
      <div>
        {this.renderYandex()}
        {this.renderVk()}
      </div>
    )
  }

  renderYandex() {
    const fd = this.props.date.firstday
    const sd = this.props.date.lastday
    return (
      <div style={{ border: "2px solid grey", borderRadius: "10px"}}>
        <div style={{ marginTop: "10px", marginLeft: "20px"}}>
          <img style={{ width:"100px", height:"50px"}} src={yandexLogo} alt="yandexLogo"/>
        </div>
        <div style={{margin: "20px", border: "2px solid grey", borderRadius: "5px"}}>
          <div>
            <button>
              {"<"}
            </button>
            <button>
              {`${fd.getDate()}.${fd.getMonth()+1}.${fd.getFullYear()} - ${sd.getDate()}.${sd.getMonth()+1}.${sd.getFullYear()}`}
            </button>
            <button>
              {">"}
            </button>
            <button>
              Yesterday
            </button>
            <button onClick={this.onTodayClick}>
              Today
            </button>
            <button>
              7 Days
            </button>
            <button>
              30 Days
            </button>
            <button>
              Year
            </button>
          </div>
        </div>
        <div style={{margin: "20px"}}>
          <YandexTable/>
        </div>
      </div>
    )
  }

  renderVk() {
    return (
      <div style={{marginTop: "30px", border: "2px solid grey", borderRadius: "10px"}}>
        <div style={{ marginTop: "10px", marginLeft: "20px"}}>
          <img style={{ width:"50px", height:"50px"}} src={vkLogo} alt="vkLogo"/>
        </div>
        <div style={{padding: "20px"}}>
          <VkTable/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div style={{margin: "30px"}}>
        {this.renderAll()}
      </div>
    );
  }
}

const mapStateToProps = ({ accounts }) => {
  const { yandex, vk, date } = accounts;
  return {
    yandex,
    vk,
    date
  }
}

export default connect(mapStateToProps, { getAccountsData, changeDate }) (AccountList);

// import React from 'react';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//
// const products = [];
//
// function addProducts(quantity) {
//   const startId = products.length;
//   for (let i = 0; i < quantity; i++) {
//     const id = startId + i;
//     products.push({
//       id: id+100,
//       name: 'Item name ' + id,
//       price: 2100 + i,
//       expand: [ {
//         fieldA: 'test1',
//         fieldB: (i + 1) * 99,
//         fieldC: (i + 1) * Math.random() * 100,
//         fieldD: '123eedd' + i
//       }, {
//         fieldA: 'test2',
//         fieldB: i * 99,
//         fieldC: i * Math.random() * 100,
//         fieldD: '123eedd' + i
//       } ]
//     });
//   }
// }
// addProducts(5);
//
// class BSTable extends React.Component {
//   render() {
//     if (this.props.data) {
//       return (
//           <BootstrapTable data={ this.props.data }>
//             <TableHeaderColumn dataField='fieldA' isKey={ true }>Field A</TableHeaderColumn>
//             <TableHeaderColumn dataField='fieldB'>Field B</TableHeaderColumn>
//             <TableHeaderColumn dataField='fieldC'>Field C</TableHeaderColumn>
//             <TableHeaderColumn dataField='fieldD'>Field D</TableHeaderColumn>
//           </BootstrapTable>);
//     } else {
//       return (<p>?</p>);
//     }
//   }
// }
//
// export default class ExpandRow extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
//     this.state = {
//       // Default expanding row
//       expanding: [ 2 ]
//     };
//   }
//
//   isExpandableRow() {
//     return true;
//   }
//
//   expandComponent(row) {
//     return (
//       <BSTable data={ row.expand } />
//     );
//   }
//
//   handleClick() {
//     console.log(this.state.expanding)
//   }
//
//   render() {
//     const options = {
//       expandRowBgColor: 'rgb(66, 134, 244)',
//       expanding: this.state.expanding,
//     };
//     return (
//       <div>
//         <button onClick={this.handleClick}>
//           CLICK
//         </button>
//         <BootstrapTable data={ products }
//           options={ options }
//           expandableRow={ this.isExpandableRow }
//           expandComponent={ this.expandComponent }
//           search>
//           <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
//           <TableHeaderColumn dataField='name' expandable={ false }>Product Name</TableHeaderColumn>
//           <TableHeaderColumn dataField='price' expandable={ false }>Product Price</TableHeaderColumn>
//         </BootstrapTable>
//       </div>
//     );
//   }
// }
