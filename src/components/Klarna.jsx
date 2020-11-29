// import React, { Component } from 'react';
// import { FormattedMessage, injectIntl } from 'react-intl'
//
// import { Redirect} from 'react-router-dom';
//
// import { CircularProgress } from '@rmwc/circular-progress';
// import { Grid, GridCell, GridInner } from '@rmwc/grid';
// import { Button } from '@rmwc/button';
//
// import {connect} from 'react-redux';
// import { saveCreditSession, resetCreditSession } from '../actions/klarna'
// import { getCreditSession, placeOrder } from '../api/shopCalls';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   DialogButton
// } from '@rmwc/dialog';
//
// const DAY_IN_SECONDS = 86400;
//
// const mapStateToProps = state => ({
//   client_token: state.klarna.client_token,
//   payment_options: state.klarna.payment_options,
//   updated_at: state.klarna.updated_at
// });
//
// class Klarna extends Component {
//   constructor(props){
//     super(props);
//     this.state = { loading: false, show_form:false, dialog_open: false, dialog_title:"", dialog_message:"" }
//   }
//
//   createOrder(){
//     console.log("Mounting Klarna Component");
//     this.setState({loading:true})
//     if(this.props.client_token === null ||
//     ((new Date().getTime() - this.props.updated_at.getTime())/1000) > DAY_IN_SECONDS)
//     {
//       getCreditSession()
//         .then(response => {
//           var identifiers = response.data.payment_method_categories.map(val => (val.identifier));
//           // console.log(response.data.payment_method_categories);
//           this.props.dispatch(saveCreditSession(response.data.client_token, identifiers))
//           .then( () => {
//             this.mountKlarnaWidget();
//           })
//           .catch(error => {
//             this.setState({dialog_open:true, dialog_title:"Error", dialog_message: "Could not create Payment session at Klarna."})
//           })
//           //this.props.dispatch(savePaymentOptions(response.))
//         })
//         .catch(error => {
//           console.log(error);
//           this.setState({loading:false, show_form:false, dialog_open:true, dialog_title:"Error", dialog_message:"No items to checkout"});
//
//         })
//     }
//     else {
//       this.mountKlarnaWidget();
//     }
//   }
//
//   mountKlarnaWidget() {
//     if(this.props.client_token != null )
//     {
//       window.Klarna.Payments.init({
//         client_token: this.props.client_token
//       })
//       window.Klarna.Payments.load({
//         container: '#klarna-payments-container',
//         instance_id: 'klarna-payments-instance', // Change later, unique for each user?!
//         payment_method_categories: this.props.payment_options
//       },  (res) => {
//         if(res.error)
//         {
//           console.log(res.error)
//           this.setState({dialog_open:true, dialog_title:"Error:", dialog_message: "Could not load Klarna, please try again!"})
//
//           //Do something cool
//         }
//         // Required to use arrow function to stay with the component as "this"
//         // and be able to set this.state
//         if(res.show_form)
//           this.setState({loading:false, show_form:true});
//         {/*response.data.payment_method_categories[0].identifier*/}
//         {/* pay_now : Option not available, please choose a different payment method */}
//
//         // Need to add some error handling here as well
//       })
//     }
//   }
//
//   authOrder(response){
//     console.log("Starting authorizing order")
//     this.setState({loading:true})
//     try {
//       window.Klarna.Payments.authorize({ payment_method_category: "pay_now", auto_finalize: true},
//       {  instance_id: 'klarna-payments-instance'
//       },  (res) => {
//         // authorize~callback
//         console.log(res);
//         if(!res.approved) {
//             this.setState({loading:false, dialog_open:true, dialog_title:"Error",
//             dialog_message: "Payment not approved, please double check your payment details and try again!"})
//         }else {
//           placeOrder(res.authorization_token)
//             .then(redirect_url => {
//               console.log(redirect_url.data);
//               this.props.dispatch(resetCreditSession());
//               window.location.replace(redirect_url.data);
//             })
//             .catch(error => {
//               {
//                  this.setState({loading:false, dialog_open:true, dialog_title:"Error",
//                   dialog_message: "Something went wrong, please try again!"})
//               }
//               console.log(error);
//               this.setState({loading:false})
//             })
//         }
//       })
//     } catch (e) {
//         // Handle error. The authorize~callback will have been called
//         // with "{ show_form: false, approved: false }" at this point.
//         this.setState({loading:false, dialog_open:true, dialog_title:"Error Mannen", dialog_message: "Försök igen"})
//     }
//   }
//
//   render(){
//     return (
//
//           <React.Fragment>
//             <Dialog
//               open={this.state.dialog_open}
//               onClose={() => this.setState({dialog_open:false})}
//               className='unclickable-scrim-dialog'>
//               <DialogTitle>  {this.state.dialog_title} </DialogTitle>
//               <DialogContent> {this.state.dialog_message} </DialogContent>
//               <DialogActions>
//                 <DialogButton action ="close" type='button' isDefaultAction> Close </DialogButton>
//               </DialogActions>
//             </Dialog>
//             <GridCell desktop="12" tablet='8' phone='4' className='h-center'>
//               <div id="klarna_container" style={{width: '100%'}}>
//                 <img src={"https://cdn.klarna.com/1.0/shared/image/generic/logo/sv_se/basic/logo_black.png?width=300"} />
//                 <div id="klarna-payments-container">
//
//                 </div>
//                 {(this.state.show_form === true) ?
//                     <Button raised disabled={this.state.loading}
//                       onClick={(e) => {e.stopPropagation(); this.authOrder()}}
//                       style={{width:'100%'}}>
//                       Buy
//                     </Button>
//                   :
//                     (!this.state.loading) ?
//                       <Button raised disabled={this.state.loading}
//                         onClick={(e) => {e.stopPropagation(); this.createOrder()}}
//                         style={{width:'100%'}}>
//                         Checkout
//                       </Button>
//                     :
//                       null
//                 }
//               </div>
//             </GridCell>
//           </React.Fragment>
//
//     )
//   }
//
// }
//
// export default injectIntl(connect(mapStateToProps)(Klarna));
