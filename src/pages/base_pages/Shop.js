import React, { Component } from 'react';

import ArticleCard from '../../components/page_components/ArticleCard';

import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, GridCell, GridInner } from '@rmwc/grid';

import { withRouter } from 'react-router-dom';

import { fetchProducts } from '../../actions/shop';
import { addProductToCart } from '../../actions/cart';

import { connect } from 'react-redux'

import Header from '../../components/page_components/NiceHeader';

class Shop extends Component{
  constructor(props) {
    super(props);
    this.intl = this.props.intl;
  };

  componentDidMount(){
    // this.props.fetchProducts();
  };

  static pageTitle(){
    return <FormattedMessage id='Shop.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Shop.navTitle' />
  }

  render() {

    console.log(this.props);
    var articles = null;
    if (!this.props.isLoading && this.props.products){
      articles = this.props.products.map(article => (
        <GridCell phone='4' tablet='4' desktop='6'>
          <ArticleCard
            article={article}
            addCallback={(id) => this.props.addProductToCart(id)}
          />
      </GridCell>
      ));
    }
    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone='4' tablet='8' desktop='12' style={{textAlign:'center'}}>
                Alla biljetter kommer att kunna hämtas ut i biljettältet:
              <br/>Mån-Ons 11:30-15:00
              <br/>Tors/Fre 11:30-02:30
              <br/>Lör 15:00-02:30
              <br/>mot uppvisande av QR-kod, eller om du lägger till ditt koden till ditt liu-id på ditt konto, med blipp.
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
    isLoading: state.shop.loading
  };
}

export default connect(mapStateToProps, {fetchProducts, addProductToCart})(withRouter(injectIntl(Shop, { forwardRef: true })));
