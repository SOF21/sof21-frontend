import React, { Component, forwardRef } from 'react';

import {
  Card,
  CardMedia,
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
import { openSnackbar } from '../../actions/dialog';

import { injectIntl, FormattedMessage } from 'react-intl'

import posed from 'react-pose';

import { connect } from 'react-redux';

function getAmtText(amt, intl){
  if(amt <= 0){
    return intl.formatMessage({id: 'Shop.sold_out'});
  } else if(amt < 100){
    return amt.toString();
  } else if(amt < 200){
    return "100+";
  } else if(amt < 500){
    return "200+";
  } else {
    return "500+"
  }
}

class CardItemCard extends Component{
  add = (id) => {
    if (this.props.addCallback){
      this.props.addCallback(id)
    }
  }

  remove = (id) => {
    if (this.props.removeCallback){
      this.props.removeCallback(id)
    }
  }

  render(){
    var cardContent = <CircularProgress size="large" />;

    if(!this.props.loading && this.props.products !== null){
      const { prodID, amount } = this.props.item;
      const baseProductIds = this.props.baseProducts[prodID];
      const baseProduct = this.props.products[baseProductIds['base_id']];
      const product = baseProduct.products[baseProductIds['prod_id']];

      const hasTypes = baseProduct.products.length > 1;
      const enabled = product.enabled;
      const amt = enabled ? product.amount_left : 0;
    
      cardContent = 
        <React.Fragment>
          {(baseProduct.has_image) ?
              <CardMedia
                style={{ backgroundImage: 'url(' + baseProduct.image_path + ')'}}
              /> :
              null
          }
          <List nonInteractive className='product-list'>
            <ListItem ripple={false} style={{overflow: 'visible'}}>
              <ListItemText>
                {(hasTypes) ?
                  <React.Fragment>
                    <ListItemPrimaryText>
                      <b>
                        {baseProduct.name}
                      </b>
                    </ListItemPrimaryText>
                    <ListItemSecondaryText>
                      {product.kind}
                    </ListItemSecondaryText>
                  </React.Fragment>
                  :
                  <b>{baseProduct.name}</b>
                }
              </ListItemText>
            </ListItem>
          </List>
          <IconButton icon='remove' onClick={() => this.remove(prodID)} />
          {/* <TextField outlined value={amount}
            label={this.props.intl.formatMessage({id: 'Cart.amount'})}
          /> */}
          <div className='amount'>
            <b>
              {amount}
              {/* <FormattedMessage id='Shop.amount'/>  */}
            </b>
          </div>
          <IconButton icon='add' onClick={() => this.add(prodID)} />
          
          <List nonInteractive >
            <ListItem ripple={false} style={{overflow: 'visible'}}>
              <ListItemText>
                  <ListItemPrimaryText>
                    <b>
                      {product.actual_cost + (this.props.intl.locale === 'sv' ? ' Kr' : " SEK")}
                    </b>
                </ListItemPrimaryText>
                <ListItemSecondaryText style={{color: '#F00'}}>
                  {getAmtText(amt, this.props.intl) + (enabled ? this.props.intl.formatMessage({id: 'Cart.left'}) : '')} 
                </ListItemSecondaryText>
              </ListItemText>
            </ListItem>
          </List>
        </React.Fragment>
    }
    

    return(
      <React.Fragment>
        <Card 
          className='cart-item-card' 
        >
            {cardContent}
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

export default connect(mapStateToProps, { openSnackbar })(injectIntl(CardItemCard));

