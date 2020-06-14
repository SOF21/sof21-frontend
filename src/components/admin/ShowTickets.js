import React, { Component } from 'react';
import { GridCell } from '@rmwc/grid';
import { ListDivider } from '@rmwc/list';
import { FormattedMessage, injectIntl } from 'react-intl';
import OrderItemCard from '../shop/OrderItemCard';
import LoadButton from '../forms/components/LoadButton';

import { openDialog } from '../../actions/dialog';
import Header from '../page_components/NiceHeader';
import { collectItems } from '../../api/ticketPickupCalls';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';
import {Button} from '@rmwc/button';
import { connect } from 'react-redux';


class ShowTickets extends Component{
  constructor(props){
    super(props);
    this.state = { loading:false, currUser: this.props.user, dialogOpen:false, dialogTitle: "", dialogMessage :""};
  }

  collectItems = (items) => {
    this.setState({loading:true, dialogOpen:false});
    if (items.length !== 0) {
      const collectedIds = items.map( item => {
        return item[1].id;
      });
      collectItems(collectedIds, this.state.currUser.id)
        .then( res => {
          this.setState({loading:false, currUser: res.data })
        })
        .catch( err => {
          this.setState({loading:false});
        });
      }
  }

  render () {
    const resetButton = <React.Fragment>
      <GridCell desktop='12' tablet='8' phone='4'>
        <Button raised style={{width:"100%"}}
          onClick={() =>  {this.props.resetUser();
          this.setState({currUser:null}); }}>
          Ny kund
         </Button>
      </GridCell>
    </React.Fragment>
    // if( !(Object.keys(this.props.items).length === 0 && this.props.items.constructor === Object))
    // {


    /* Nullcheck */
    if(this.state.currUser !== null){
      var collectedItems = [];
      var unCollectedItems = [];

      Object.entries(this.state.currUser.owned_items).forEach((item) => (
          (item[1].collected) ?
            collectedItems.push(item) :
            unCollectedItems.push(item)
        ))

      var filteredunCollectedItems = [];
      if(unCollectedItems.length > 0){

        unCollectedItems.forEach((item) => {
            if(filteredunCollectedItems[item[1].product_id] === undefined)
              filteredunCollectedItems[item[1].product_id] = JSON.parse(JSON.stringify(item))
            else
              filteredunCollectedItems[item[1].product_id][1].amount += item[1].amount;
          })
        filteredunCollectedItems.sort((item1, item2) => {return item1[1].product_id > item2[1].product_id })
      }

      var filteredCollectedItems = [];
      if(collectedItems.length > 0){

        collectedItems.forEach((item) => {
            if(filteredCollectedItems[item[1].product_id] === undefined)
              filteredCollectedItems[item[1].product_id] = JSON.parse(JSON.stringify(item))
            else
              filteredCollectedItems[item[1].product_id][1].amount += item[1].amount;
          })
        filteredCollectedItems.sort((item1, item2) => {return item1[1].product_id > item2[1].product_id })
      }


      const item_text = <React.Fragment>
        {filteredunCollectedItems.map((item) => {
          const prodName = "" + item[1].amount + "x " + item[1].product.base_product['name'];
          const suffix = (item[1].product.base_product_id > 1) ? "(" + item[1].product.kind + ")" : "";
          return(
             <React.Fragment>
              {prodName + suffix}
              <br />
             </React.Fragment>
          );
        })}
      </React.Fragment>

      collectedItems.sort((item1, item2) => {return item1[1].collected_at < item2[1].collected_at })

      return (
        <React.Fragment>
          {resetButton}
          <Dialog
            open={this.state.dialogOpen}
            onClose={(evt) => {
              if(evt.detail.action === "getTickets")
                this.collectItems(unCollectedItems);
              this.setState({ dialogOpen:false })
            }}
            className='unclickable-scrim-dialog'
            >
            <DialogTitle>
              Du ska ge ut
            </DialogTitle>
            <DialogContent>
              {item_text}

            </DialogContent>
            <DialogActions>
              <DialogButton action="getTickets" type='button' raised >
                Hämta ut biljetter
              </DialogButton>
              <DialogButton action="close" type='button' isDefaultAction>
                Close
              </DialogButton>
            </DialogActions>
          </Dialog>
          <GridCell desktop='12' tablet='8' phone='4'>
            <Header>
              <div style={{color:"#0c726f"}}>
                Biljetter som kan hämtas ut
              </div>
            </Header>
          </GridCell>

          {(filteredunCollectedItems.length > 0) ?
            <React.Fragment>
              {Object.keys(filteredunCollectedItems).map((key) =>
              (
                <GridCell desktop='12' tablet='8' phone='4' key={filteredunCollectedItems[key][1].id} >
                  <OrderItemCard
                    item={{product_id: filteredunCollectedItems[key][1].product_id, amount: filteredunCollectedItems[key][1].amount}}
                    />
                </GridCell>
              ))
              }
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <LoadButton raised
                onClick={() => this.setState({dialogOpen:true})}
                style={{width:'100%'}}
                loading={this.state.loading}
              >
                Hämta alla
              </LoadButton>
              </GridCell>
            </React.Fragment>

            : null
          }

          <GridCell desktop='12' tablet='8' phone='4'>
            <Header>
              <div style={{color:"#FF0000"}} >
                Biljetter som redan har hämtats ut
              </div>
            </Header>
          </GridCell>
          {(collectedItems.length > 0) ?

            Object.keys(collectedItems).map((key) =>
            (
              <React.Fragment>
              <GridCell desktop='12' tablet='8' phone='4' key={collectedItems[key][1].id} >
                <OrderItemCard
                  item={{product_id: collectedItems[key][1].product_id, amount: collectedItems[key][1].amount}}
                />

              </GridCell>
              {console.log(collectedItems[key][1].collected_at)}
              <GridCell desktop='12' tablet='8' phone='4' key={collectedItems[key][1].id + 100} >
                Hämtades ut: {new Date(collectedItems[key][1].collected_at).toLocaleString('en-GB', { timeZone: 'Europe/Stockholm' })}
              </GridCell>
              </React.Fragment>
            )
          )
          : null
          }

        </React.Fragment>);
    }
    else {
      return (
        <React.Fragment>
          <GridCell desktop='12' tablet='8' phone='4'>
              <Header>
                Användaren {this.props.user.display_name} ({this.props.user.email}) har inga biljetter att hämta ut
              </Header>
          </GridCell>
          {resetButton}
        </React.Fragment>

      )
    }
  }
}


export default connect(null, { openDialog })(ShowTickets);
