import React, {Component} from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux';

import {GridCell, GridInner} from '@rmwc/grid';
import { CircularProgress } from '@rmwc/circular-progress';
import { ListDivider } from '@rmwc/list';

import OrderItemCard from './OrderItemCard';
import LoadButton from '../forms/components/LoadButton'
import DiscountForm from '../forms/DiscountForm';

import api from '../../api/axiosInstance';

const mapStateToProps = state => ({
  products: state.shop.products,
  baseProducts: state.shop.base_products,
  cartLoading: state.cart.loading,
  prodLoading: state.shop.loading,

})

class CheckoutItems extends Component {
  constructor(props){
    super(props)

    this.state = {discountValue: null}
  }

  useCode = () =>{
    api.put('/cart/discount', {discount: {code: 'test'}})
      .then( response => {
        this.setState({discountValue: response.data});
      });
  }

  successCallback = (response) =>{
    this.setState({discountValue: response.data});
  }

  render(){
    const discountContent = this.state.discountValue ?
      <GridCell desktop='12' tablet='8' phone='4' style={{display: 'flex', justifyContent: 'space-between', margin: '0px 16px'}}>
        <span>
          Rabattkod använd
        </span>
        <span>
          {"-" + this.state.discountValue + (this.props.intl.locale === 'sv' ? ' Kr' : " SEK")}
        </span>
      </GridCell> :
      <GridCell desktop='12' tablet='8' phone='4' >
        <DiscountForm successCallback={this.successCallback}/>
      </GridCell>


    const loading = this.props.cartLoading || this.props.prodLoading;
    if(loading){
      return(
        <React.Fragment>
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <CircularProgress size="large" />
          </GridCell>
        </React.Fragment>
      );
    }

    if( !(Object.keys(this.props.items).length === 0 && this.props.items.constructor === Object))
    {
      let totCost = 0;
      for (const [key, value] of Object.entries(this.props.items)) {
        const baseProd = this.props.products[this.props.baseProducts[key].base_id];
        const productCost = baseProd.products[this.props.baseProducts[key].prod_id].actual_cost;
        totCost += productCost * value;
      }
      if(this.state.discountValue){
        totCost -= this.state.discountValue;
      }

      return (
        <React.Fragment>
          {Object.keys(this.props.items).map((key) => (
            <GridCell desktop='12' tablet='8' phone='4' key={key} >
              <OrderItemCard
                item={{product_id: key, amount: this.props.items[key]}}
              />
              </GridCell>
          ))}
          {discountContent}
          <GridCell desktop='12' tablet='8' phone='4' style={{display: 'flex', justifyContent: 'space-between', margin: '0px 16px'}}>
            <b>
              <FormattedMessage id='Shop.total' />
            </b>
            <b>
                {totCost + (this.props.intl.locale === 'sv' ? ' Kr' : " SEK")}
            </b>
          </GridCell>
        </React.Fragment>

      );
    }
    else{
      return (
        <React.Fragment>
            <GridCell desktop='12' tablet='8' phone='4'  >
              <FormattedMessage id='Shop.no_items' />
            </GridCell>
        </React.Fragment>
      );
    }
  }
}

export default connect(mapStateToProps)(injectIntl(CheckoutItems));
