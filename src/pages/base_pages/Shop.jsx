import React, { Component, setState } from 'react';

import ArticleCard from '../../components/page_components/ArticleCard';

import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { withRouter } from 'react-router-dom';

import { fetchProducts } from '../../actions/shop';
import { addProductToCart } from '../../actions/cart';

import { connect } from 'react-redux'

import Header from '../../components/page_components/NiceHeader';

import { getCurrentUser } from '../../api/userCalls'

class Shop extends Component {
  constructor(props) {
    super(props);
    this.intl = this.props.intl;

    this.state = {
      hasShippingInfo: false,
    }
  };

  componentDidMount() {
    getCurrentUser().then(response => {
      if (response.data.phone !== null && response.data.invoice_address !== null)
        this.setState({ hasShippingInfo: true })
    })
  };

  static pageTitle() {
    return <FormattedMessage id='Shop.title' />
  }

  static pageNavTitle() {
    return <FormattedMessage id='Shop.navTitle' />
  }

  render() {
    var articles = null;
    if (!this.props.isLoading && this.props.products && this.state.hasShippingInfo) {
      articles = this.props.products.map(article => (
        <GridCell phone='4' tablet='4' desktop='6'>
          <ArticleCard
            article={article}
            addCallback={(id) => this.props.addProductToCart(id)}
          />
        </GridCell>
      ));
    }
    return (
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone='4' tablet='8' desktop='12' style={{ textAlign: 'center' }}>
              ALLMÄN TEXT OM HUR LEVERANS KOMMER SKE
              {!this.state.hasShippingInfo &&
                <p style={{ color: 'red' }}>För att handla i webshopen behöver du lägga till adress, mobilnummer på ditt konto.
                Det gör du genom att gå in på 'Mitt konto' och trycka på knappen den röda knappen längst ner på sidan.
                </p>
              }
            </GridCell>
            <GridCell phone='4' tablet='8' desktop='12'>
              <Header>
                Produkter
              </Header>
            </GridCell>
            {(!this.props.isLoading && this.props.products) ? articles : null}
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
    isLoading: state.shop.loading,
    user: state

  };
}

export default connect(mapStateToProps, { fetchProducts, addProductToCart })(withRouter(injectIntl(Shop, { forwardRef: true })));
