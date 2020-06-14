import React, { Component, forwardRef } from 'react';

import {
  Card,
  CardMedia,
  CardPrimaryAction
} from '@rmwc/card';
import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText
} from '@rmwc/list';
import { TextField } from '@rmwc/textfield';
import { IconButton } from '@rmwc/icon-button';
import { CircularProgress } from '@rmwc/circular-progress';
import { Button } from '@rmwc/button';
import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { injectIntl } from 'react-intl'

import posed from 'react-pose';

import { connect } from 'react-redux';


function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

class OrderCard extends Component{

  clickCallback = id => {
    if(this.props.clickCallback){
      this.props.clickCallback(id);
    }
  }

  render(){
    const {order} = this.props;

    return(
      <React.Fragment>
        <Card
          className='order-card'
        >
          <CardPrimaryAction onClick={() => this.clickCallback(order.id)}>
            <Grid style={{padding: '16px', width: "100%"}}>
              <GridInner>
                <GridCell desktop='6' tablet='4' phone='2'>
                  <b> Order </b> {" #" + pad(order.id, 5)}
                </GridCell>
                <GridCell desktop='6' tablet='4' phone='2' style={{textAlign: 'right'}}>
                  {new Date(order.created_at).toLocaleDateString()}
                </GridCell>
                <GridCell desktop='6' tablet='4' phone='2'>
                  {order.amount + (this.props.intl.locale === 'sv' ? ' artiklar' : " articles")}

                </GridCell>
                <GridCell desktop='6' tablet='4' phone='2' style={{textAlign: 'right'}}>
                  {order.cost + (this.props.intl.locale === 'sv' ? ' Kr' : " SEK")}
                </GridCell>
              </GridInner>
            </Grid>
          </CardPrimaryAction>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.shop.products,
  baseProducts: state.shop.base_products,
  isLoading: state.shop.loading
});

export default connect(mapStateToProps)(injectIntl(OrderCard));
