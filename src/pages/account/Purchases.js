import React, { Component } from 'react';


import OrderCard from '../../components/shop/OrderCard';
import OrderSummary from '../../components/shop/OrderSummary';
import Modal from '../../components/page_components/Modal';

import { FormattedMessage, injectIntl } from 'react-intl'

import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';
import { ListDivider } from '@rmwc/list';

import {connect} from 'react-redux';
import { fetchOrders, fetchOrderItems } from '../../actions/orders';
import { setTitle, mapTabToIndex, setActiveTab } from '../../actions/title';


import QRCode from "qrcode.react";

const testOrders = [
  { klarna_order_id: 'bing_bong1233',
    id: 0,
    date: (new Date()).toLocaleDateString(),
    articles: 15,
    price: 1337
  },
  { klarna_order_id: 'bing_bong1337',
    id: 1,
    date: (new Date()).toLocaleDateString(),
    articles: 2,
    price: 9001
  },
  { klarna_order_id: 'bish_bashbosh',
    id: 2,
    date: (new Date()).toLocaleDateString(),
    articles: 7,
    price: 25000
  },
]

const testOrder = {
  id: 1337,
  items: [{
    prodID: 1,
    amount: 5,
  },{
    prodID: 2,
    amount: 5,
  }]
}


const mapStateToProps = state => ({
  name    : state.reduxTokenAuth.currentUser.attributes.displayName,
  orders  : state.orders.orders,
  loading : state.orders.loading,
  error   : state.orders.error
});

class Purchases extends Component{
  constructor(props) {
    super(props);

    this.state = {modalOpen: false, orderId: null}
  }

  static pageTitle(){
    //return <FormattedMessage id='CortegeAbout.title' />
    return "Dina köp";
  }

  static pageNavTitle(){
    //return <FormattedMessage id='CortegeAbout.navTitle' />
    return 'Bingo';
  }

  componentDidMount(){
    this.props.dispatch(setTitle('Account.purchases'));
    this.props.dispatch(setActiveTab(mapTabToIndex.PURCHASES))
    this.props.dispatch(fetchOrders());
  }


  render() {
    var orders = null;
    if(this.props.orders != null){
       orders = this.props.orders.map( order => (
        <GridCell desktop='6' tablet='8' phone='4' key={order.id}>
          <OrderCard order={order}
            clickCallback={() => {
                this.setState({modalOpen: true, orderId: order.id, receiptURL: order.receipt_url});
                this.props.dispatch(fetchOrderItems(order.id));
              }}/>
        </GridCell>
      ));
    }

    return(
      <React.Fragment>

        <Modal
          style={{zIndex: '12'}}
          isOpen={this.state.modalOpen}
          exitCallback={() => this.setState({modalOpen: false})}
        >
          <OrderSummary order={this.state.orderId} receipt={this.state.receiptURL} />
        </Modal>
        <GridInner>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <FormattedMessage id='Purchases.purchases'/>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4' >
            <ListDivider/>
          </GridCell>
          { this.props.orders != null ?
              orders
            : null
          }
        </GridInner>
      </React.Fragment>
    );
  }
}

export default injectIntl(connect(mapStateToProps)(Purchases));
