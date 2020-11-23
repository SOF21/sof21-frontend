import React, { Component } from 'react';

import CartItemCard from './CartItemCard';

import { signOutUser } from '../../redux-token-auth-config'

import { setAccountPopupOpen, setShopPopupOpen } from '../../actions/login';

import { Grid, GridInner, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { TopAppBarActionItem } from '@rmwc/top-app-bar';
import { SimpleMenuSurface } from '@rmwc/menu';
import { CircularProgress } from '@rmwc/circular-progress';

import ScrollLock, { TouchScrollable } from 'react-scrolllock';

import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import posed from 'react-pose/lib/index';
import { FormattedMessage, injectIntl } from 'react-intl';

import { IconButton } from '@rmwc/icon-button';

import {
  List,
  ListItem,
  ListItemMeta,
  ListItemGraphic,
  ListDivider

} from '@rmwc/list';

import { addProductToCart, fetchCart, removeProductFromCart } from '../../actions/cart'

const mapStateToProps = state => ({
  loggedIn: state.reduxTokenAuth.currentUser.isSignedIn,
  name: state.reduxTokenAuth.currentUser.attributes.displayName,
  cart: state.cart.cart,
  cartLoading: state.cart.loading,
  products: state.shop.products,
  baseProducts: state.shop.base_products,
  productsLoading: state.shop.loading,
  userLoading: state.reduxTokenAuth.currentUser.loading,
  isOpen: state.login.shopPopupOpen,
});

class UNCDesktopCartPopup extends React.PureComponent {

  setPopupState = (state) => {
    this.props.setShopPopupOpen(state);
  }

  render(){

    var cartAmt = 0;
    if (!this.props.cartLoading && Object.keys(this.props.cart).length > 0){
      Object.keys(this.props.cart).forEach(key => {
        cartAmt += this.props.cart[key];
      })
    }
    return(
      <SimpleMenuSurface
        className='login-popup-surface'
        //open={this.props.isOpen}
        //onOpen={()=>this.setPopupState(true)}
        //onClose={()=>this.setPopupState(false)}
        handle={
            <div className='cart-button'>
              <TopAppBarActionItem icon='shopping_cart'/>
              {(cartAmt > 0) ?
                  <span className='cart-amount'> {cartAmt} </span> :
                  null
              }
            </div>
        }
      >
      <CartPopupContent {...this.props}/>

      </SimpleMenuSurface>
    );
  }
}

export const DesktopCartPopup = withRouter(connect(mapStateToProps, { setShopPopupOpen, signOutUser}) (UNCDesktopCartPopup));

const MobileAccountModal = posed.div({
  open:{
    height: 'auto',
    applyAtEnd: {overflow: 'auto'},
  },
  closed:{
    height: '0',
    applyAtStart: {overflow: 'hidden'},
  }
});

const MobileAccountScrim = posed.div({
  open:{
    opacity: 1,
    applyAtStart: {display: 'initial'},
  },
  closed:{
    opacity: 0,
    applyAtEnd: {display: 'none'},
  }
});

export class UNCMobileCartPopup extends Component {

  setPopupState = (state) => {
    this.props.setShopPopupOpen(state);
  }

  componentDidMount() {
    this.props.history.push('/', null)
  }

  componentDidUpdate() {
    if (this.props.history.action === 'POP') {
      this.props.setShopPopupOpen(false);
      window.history.go(1)
      this.props.history.push(this.props.history.location.path, null)
    }
  }

  render(){
    var cartAmt = 0;
    if (!this.props.cartLoading && Object.keys(this.props.cart).length > 0){
      Object.keys(this.props.cart).forEach(key => {
        cartAmt += this.props.cart[key];
      })
    }
    return(
      <React.Fragment>
        <div className='cart-button'>
          <IconButton
            style={{marginTop: '-6px'}}
            icon='shopping_cart'
            onClick={()=>this.setPopupState(true)}
          />
            {(cartAmt > 0) ?
                <span className='cart-amount'> {cartAmt} </span> :
                null
            }
        </div>
        <ScrollLock isActive={this.props.isOpen}/>
        <TouchScrollable>
          <MobileAccountModal
            className='mobile-account-modal'
            pose={this.props.isOpen ? 'open' : 'closed'}
          >
            <CartPopupContent {...this.props}/>
          </MobileAccountModal>
        </TouchScrollable>
        <MobileAccountScrim
          className='mobile-account-scrim'
          pose={this.props.isOpen ? 'open' : 'closed'}
          onClick={() => this.setPopupState(false)}
        />
      </React.Fragment>
    );
  }
}

export const MobileCartPopup = withRouter(connect(mapStateToProps, { setShopPopupOpen, signOutUser })(UNCMobileCartPopup));

class UNCCartPopupContent extends Component{
  constructor(props){
    super(props)

    this.state = {scrolled: false, scrolledBottom: false};
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchCart();
  }

  componentDidUpdate(){
    //Neccessary for shadow to not show up if items do not fill cart (no scroll event will be issued)
    if(this.scrollRef.current){
      this.handleInlineScroll(this.scrollRef.current)
    }
  }

  addCallbackHandler = (id) => {
    this.props.addProductToCart(id);
  }

  RemoveCallbackHandler = (id) => {
    this.props.removeProductFromCart(id);
  }

  handleCheckoutClicked = () => {
    this.props.history.push('/checkout')
    this.props.setShopPopupOpen(false);
  }

  handleInlineScroll = target => {
    const scroll = target.scrollTop;
    const bottom = target.scrollHeight - scroll === target.clientHeight;

    if (!this.state.scrolled && scroll > 0){
      this.setState({scrolled: true});
    } else if(this.state.scrolled && scroll === 0){
      this.setState({scrolled: false});
    }

    if(!this.state.scrolledBottom && bottom){
      this.setState({scrolledBottom: true})
    }else if(this.state.scrolledBottom && !bottom){
      this.setState({scrolledBottom: false})
    }
  }

  render(){
    const isLoading = this.props.cartLoading || this.props.productsLoading;

    var content =
      <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
        <CircularProgress size="large" />
      </GridCell>;

    if (!isLoading && Object.keys(this.props.cart).length === 0) {
      content =
        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <FormattedMessage id='Cart.empty'/>
        </GridCell>
    } else if(!isLoading && this.props.products !== null) {
      var totCost = 0;
      console.log(this.props.cart)
      Object.keys(this.props.cart).forEach( key =>{
        const baseProd = this.props.products[this.props.baseProducts[key].base_id];
        const productCost = baseProd.products[this.props.baseProducts[key].prod_id].actual_cost;
        totCost += productCost * this.props.cart[key]
      });

      content =
        <React.Fragment>
          <TouchScrollable>
            <GridCell desktop='12' tablet='8' phone='4' className='cart-cell'
              onScroll={(e) => this.handleInlineScroll(e.target)}
              elementRef={this.scrollRef}
            >
              <GridInner style={{margin: '5px 0px'}}>
                {Object.keys(this.props.cart).map((key) => (
                  <GridCell desktop='12' tablet='8' phone='4' key={key} >
                    <CartItemCard
                      addCallback={this.addCallbackHandler}
                      removeCallback={this.RemoveCallbackHandler}
                      item={{prodID: key, amount: this.props.cart[key]}}
                    />
                  </GridCell>
                ))}
              </GridInner>
            </GridCell>
          </TouchScrollable>
        </React.Fragment>
    }

    return(
      <React.Fragment>
        <Grid
          className='cart-upper-grid mdc-elevation-transition'
          style={this.state.scrolled ? {boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.14)'}: {}}
        >
          <GridInner>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <FormattedMessage id='Cart.cart'/>
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4' >
              <ListDivider/>
            </GridCell>
          </GridInner>
        </Grid>
        <Grid className='cart-middle-grid'>
          <GridInner>
            {!isLoading ? content : null}
          </GridInner>
        </Grid>
        { !isLoading && Object.keys(this.props.cart).length > 0 ?
          <Grid
            className='cart-upper-grid mdc-elevation-transition'
            style={!this.state.scrolledBottom ? {boxShadow: '0px 2px 2px 4px rgba(0, 0, 0, 0.14)'}: {}}
          >
            <GridCell desktop='12' tablet='8' phone='4'>
              <ListDivider/>
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4' style={{display: 'flex', justifyContent: 'space-between', margin: '0px 16px'}}>
              <b>
                <FormattedMessage id='Cart.total' />
              </b>
              <b>
              {totCost + (this.props.intl.locale === 'sv' ? ' Kr' : " SEK")}
              </b>
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4'>
              <Button raised style={{width: '100%'}} onClick={() => this.handleCheckoutClicked()}>
                <FormattedMessage id='Cart.checkout' />
              </Button>
            </GridCell>
          </Grid>
            : 
          <Grid style={{paddingTop: '0px'}}>
          </Grid>
        }
      </React.Fragment>
    );
  }
}

export const CartPopupContent = injectIntl(withRouter(connect(mapStateToProps, { setAccountPopupOpen, signOutUser, fetchCart, addProductToCart, removeProductFromCart })(UNCCartPopupContent)));
