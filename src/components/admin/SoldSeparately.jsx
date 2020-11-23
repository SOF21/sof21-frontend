import React, {Component} from 'react';
import { GridInner, GridCell } from '@rmwc/grid';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';
import { Formik, Form } from 'formik/dist/index';
import {Button} from '@rmwc/button'
import LoadButton from '../forms/components/LoadButton';
import { connect } from 'react-redux';
import api from '../../api/axiosInstance';
import CartItemCard from '../shop/CartItemCard';

import Header from '../page_components/NiceHeader';
import { fetchProducts } from '../../actions/shop';

const mapStateToProps = state => ({
  products: state.shop.products,
  baseProducts: state.shop.base_products,
  loading: state.shop.loading,
});

class SoldSeparately extends Component {
  constructor(props){
    super(props);
    this.state = { 
      loading : false, 
      dialogOpen : false, 
      dialogTitle: "", 
      dialogMessage : "" , 
      patches: 0, 
      saturday_tickets:0};
  }


  increase = () => {
    //This shit is hardcoded AF
    this.setState({loading:true});
    api.put('/shopping_product/sold_separately', { 
      products:[
      {product_id: 4, amount: this.state.saturday_tickets},
      {product_id: 5, amount: this.state.patches}
    ]}, {timeout: 1000*10})
      .then(response => {
        this.setState({loading:false, dialogOpen:true, dialogMessage: "Lyckades", patches: 0, saturday_tickets: 0});
        this.props.fetchProducts()
      })
      .catch((e) => {
        this.setState({loading:false, dialogOpen:true, dialogMessage: "Misslyckades", patches: 0, saturday_tickets: 0});
        this.props.fetchProducts()
      })
  };

  render(){
    // const baseProductIds = this.props.baseProducts[prodID];
    // const baseProduct = this.props.products[baseProductIds['base_id']];
    // const product = baseProduct.products[baseProductIds['prod_id']];


    // const { prodID, amount } = this.props.item;



    const products = this.props.products;
    return (
      <React.Fragment>
      <Dialog
        open={this.state.dialogOpen}
        onClose={(evt) => {
          this.setState({ dialogOpen:false })
        }}
        className='unclickable-scrim-dialog'
        >
        <DialogTitle>
          {this.state.dialogTitle}
        </DialogTitle>
        <DialogContent>
          {this.state.dialogMessage}
        </DialogContent>
        <DialogActions>
          <DialogButton action="close" type='button' isDefaultAction>
            Stäng
          </DialogButton>
        </DialogActions>
      </Dialog>

        <GridInner>
          <GridCell desktop="12" tablet="8" phone="4" >
            <CartItemCard 
              item={{prodID: 4, amount:this.state.saturday_tickets}}
              addCallback={() => this.setState({saturday_tickets: this.state.saturday_tickets + 1})}
              removeCallback={() => this.setState({saturday_tickets: this.state.saturday_tickets - 1})}
            />
          </GridCell>
          <GridCell desktop="12" tablet="8" phone="4" >
            <CartItemCard 
              item={{prodID: 5, amount:this.state.patches}}
              addCallback={() => this.setState({patches: this.state.patches + 1})}
              removeCallback={() => this.setState({patches: this.state.patches - 1})}
            />
          </GridCell>
          <GridCell desktop="12" tablet="8" phone="4" >
            <Button 
              raised style={{width: '100%'}}
              onClick={() => this.increase()}
            > 
              Genomför köp 
            </Button>
          </GridCell>
          <GridCell desktop="12" tablet="8" phone="4" >
            <Header> Redan sålda </Header>
          </GridCell>
          {(!this.props.loading && this.props.products !== null) ?
              <React.Fragment>
            <GridCell desktop="12" tablet="8" phone="4" >
              <CartItemCard 
                item={{prodID: 4, amount: this.props.products[1].products[2].separately_sold}}
              />
            </GridCell>
            <GridCell desktop="12" tablet="8" phone="4" >
              <CartItemCard 
                item={{prodID: 5, amount: this.props.products[2].products[0].separately_sold}}
              />
            </GridCell>
          </React.Fragment>
              : null}
        </GridInner>
      </React.Fragment>
    );

  }
};

export default connect(mapStateToProps, { fetchProducts })(SoldSeparately);
