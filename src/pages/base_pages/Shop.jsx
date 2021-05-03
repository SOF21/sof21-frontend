import React, { Component, setState } from "react"

import ArticleCard from "../../components/page_components/ArticleCard"

import { FormattedMessage, injectIntl } from "react-intl"
import { Grid, GridCell, GridInner } from "@rmwc/grid"

import { withRouter } from "react-router-dom"

import { fetchProducts } from "../../actions/shop"
import { addProductToCart } from "../../actions/cart"

import { connect } from "react-redux"

import Header from "../../components/page_components/NiceHeader"

import { getCurrentUser } from "../../api/userCalls"

class Shop extends Component {
  constructor(props) {
    super(props)
    this.intl = this.props.intl

    this.state = {
      hasShippingInfo: false,
    }
  }

  componentDidMount() {
    getCurrentUser().then((response) => {
      if (response.data.phone !== null && response.data.pick_up_point !== null)
        this.setState({ hasShippingInfo: true })
    })
  }

  static pageTitle() {
    return <FormattedMessage id='Shop.title' />
  }

  static pageNavTitle() {
    return <FormattedMessage id='Shop.navTitle' />
  }

  render() {
    var articles = null
    if (
      !this.props.isLoading &&
      this.props.products &&
      this.state.hasShippingInfo
    ) {
      articles = this.props.products.map((article) => (
        <GridCell phone='4' tablet='4' desktop='6'>
          <ArticleCard
            article={article}
            addCallback={(id) => this.props.addProductToCart(id)}
          />
        </GridCell>
      ))
    }

    console.log(this.props.user)
    return (
      <React.Fragment>
        <Grid className='base-outer-grid base-outer-grid--first'>
          <GridInner>
            <GridCell
              phone='4'
              tablet='8'
              desktop='12'
              style={{ textAlign: "center" }}
            >
              Dina produkter kommer att levereras till den plats du valde i din
              profil.
              {!this.state.hasShippingInfo && (
                <p style={{ color: "red" }}>
                  För att handla i webshopen behöver du lägga till adress,
                  mobilnummer på ditt konto. Det gör du genom att gå in på 'Mitt
                  konto' och trycka på den röda knappen längst ner på
                  sidan.
                </p>
              )}
            </GridCell>
            <GridCell phone='4' tablet='4' desktop='6'>
              <p style={{ textAlign: "center" }}>
                <b>Linköping</b>
              </p>
              <ul>
                <li>Ryd [HG] (10:00 - 13:00)</li>
                <li>Colonia (10:00 - 10:30)</li>
                <li>Vallastaden AutoMat (10:35 - 11:05),</li>
                <li>VilleValla (11:15 - 11:45)</li>
                <li>Flamman (11:50 - 12.30)</li>
                <li>Katedralskolan, norra parkeringen (12.25 - 12:55)</li>
              </ul>
            </GridCell>
            <GridCell phone='4' tablet='4' desktop='6'>
              <p style={{ textAlign: "center" }}>
                <b>Norrköping</b>
              </p>
              <ul>
                <li>Trappan (13:35 - 14:05)</li>
              </ul>
            </GridCell>
            <GridCell phone='4' tablet='8' desktop='12' style={{ textAlign: "center" }}>
              <p>Möjlighet för sen upphämtning finns i Ryd vid 15:00</p>
            </GridCell>
            <GridCell phone='4' tablet='8' desktop='12'>
              <Header>Produkter</Header>
            </GridCell>
            {!this.props.isLoading && this.props.products ? articles : null}
          </GridInner>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
    isLoading: state.shop.loading,
    user: state,
  }
}

export default connect(mapStateToProps, { fetchProducts, addProductToCart })(
  withRouter(injectIntl(Shop, { forwardRef: true }))
)
