import React, {Component} from 'react';
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux';

import { Button } from '@rmwc/button';
import { Grid, GridCell, GridInner } from '@rmwc/grid';
import {CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';

import LoadButton from '../forms/components/LoadButton'
import { stripePurchaseBegin, stripePurchaseFailure, stripePurchase, stripeReset } from '../../actions/shop';
import { openDialog } from '../../actions/dialog';

import { PosedErrorText } from '../forms/components/FormTextInput';
import { withRouter, Redirect } from 'react-router-dom';

const mapStateToProps = state => ({
  stripe_loading: state.shop.stripe_loading,
  stripe_complete: state.shop.stripe_complete,
  error: state.shop.stripe_error
})


const cardToClass = {
	'visa': 'pf pf-visa',
  'mastercard': 'pf pf-mastercard',
  'amex': 'pf pf-american-express',
  'discover': 'pf pf-discover',
  'diners': 'pf pf-diners',
  'jcb': 'pf pf-jcb',
  'unknown': 'pf pf-credit-card',
}

class CheckoutForm extends Component {
  /* A credit card form class used in checkout. Uses stripes react components
   * (https://stripe.com/docs/stripe-js/react)
   */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {cardClass: 'unknown', cardError: null, dateError: null, cvcError: null}
  }

  componentWillUnmount(){
    this.props.dispatch(stripeReset());
  }

  async submit(ev) {
    ev.preventDefault();
    this.props.dispatch(stripePurchaseBegin());
    let {token} = await this.props.stripe.createToken({name: "Name"});
    if (token === undefined)
    {

      if(this.props.intl.locale === 'sv')
        this.props.dispatch(openDialog("Felaktiga kortuppgifter", "Försök igen och dubbelkolla att du fyllt i alla betalningsuppgifter korrekt, om problemet kvarstår, kontakta support@sof.lintek.liu.se"));
      else
        this.props.dispatch(openDialog("Wrong card details", "Verify that all payment details you have entered is correct and then try again, if it still fails, contact support@sof.lintek.liu.se"));
      this.props.dispatch(stripePurchaseFailure("Could not verify card details"));

    }
    else
      this.props.dispatch(stripePurchase(token.id));


  };

  onCardChangeHandler = (event) => {
    if(event.brand){
      this.setState({cardClass: event.brand});
    }
    if(event.error){
      this.setState({cardError: event.error.message});
    } else{
      this.setState({cardError: null});
    }
  }

  onDateChangeHandler = (event) => {
    if(event.error){
      console.log('eror');
      this.setState({dateError: event.error.message});
    } else{
      this.setState({dateError: null});
    }
  }

  onCVCChangeHandler = (event) => {
    if(event.error){
      this.setState({cvcError: event.error.message});
    } else{
      this.setState({cvcError: null});
    }
  }

  render() {
    if (this.props.stripe_complete) return <Redirect to='/account/purchases' />;

    return (
        <React.Fragment >
          <form onSubmit={this.submit}>
          <GridCell desktop='12' tablet='8' phone='4'>
            <GridInner className="checkout">
              <GridCell desktop='6' tablet='4' phone='4'>
                <FormattedMessage id='Shop.card_number' />
                <div className='stripe-container'>
                  <CardNumberElement onChange={this.onCardChangeHandler}/>
                  <span class="brand" style={{width: '32px'}}>
                    <i class={cardToClass[this.state.cardClass]} ></i>
                  </span>
                </div>
                <PosedErrorText
                  pose={this.state.cardError ? 'error' : 'noError'}
                  persistent
                  className='form-error-text'
                  style={{color: '#FF0000'}}
                >
                  {this.state.cardError}
                </PosedErrorText>
              </GridCell>
              <GridCell desktop='3' tablet='2' phone='2'>
                <FormattedMessage id='Shop.expiry_date' />
                <div className='stripe-container'>
                  <CardExpiryElement onChange={this.onDateChangeHandler}/>
                </div>
                <PosedErrorText
                  pose={this.state.dateError ? 'error' : 'noError'}
                  persistent
                  className='form-error-text'
                  style={{color: '#FF0000'}}
                >
                  {this.state.dateError}
                </PosedErrorText>
              </GridCell>
              <GridCell desktop='3' tablet='2' phone='2'>
                CVC <FormattedMessage id='Shop.code' />
                <div className='stripe-container'>
                  <CardCVCElement onChange={this.onCVCChangeHandler}/>
                </div>
                <PosedErrorText
                  pose={this.state.cvcError ? 'error' : 'noError'}
                  persistent
                  className='form-error-text'
                  style={{color: '#FF0000'}}
                >
                  {this.state.cvcError}
                </PosedErrorText>
              </GridCell>
            </GridInner>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4' style={{marginTop: '16px'}}>
            <LoadButton raised
              onClick={this.submit}
              style={{width:'100%'}}
              loading={this.props.stripe_loading}
              disabled={this.state.cardError || this.state.dateError || this.state.cvcError}
            >
              <FormattedMessage id='Shop.buy' />
            </LoadButton>
          </GridCell>
          <GridCell desktop='12' tablet='8' phone='4'>
           <i><p style={{fontSize:'0.8rem', lineHeight: '1rem'}}>
            <FormattedMessage id='Shop.data_handling1' />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://stripe.com/"
                style={{color: "var(--mdc-theme-secondary)"}}
              >
                Stripe
              </a>
            <FormattedMessage id='Shop.data_handling2' />
            </p></i>
          </GridCell>
        </form>
        </React.Fragment>

      );
    }
}

export default connect(mapStateToProps)(injectIntl(injectStripe(CheckoutForm)));
