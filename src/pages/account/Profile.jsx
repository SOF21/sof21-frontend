import React, { Component } from 'react';

import { FormattedMessage, injectIntl } from 'react-intl'

import { GridCell, GridInner } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog';

import {connect} from 'react-redux';
import { setTitle } from '../../actions/title';
import { getUserUuid } from '../../api/userCalls';
import { addLiUCardCode } from '../../api/ticketPickupCalls';
import { openDialog } from '../../actions/dialog'

import QRCode from "qrcode.react";
import FormTextInput from '../../components/forms/components/FormTextInput';
import { Formik, Form } from 'formik/dist/index';
import * as Yup from 'yup';

import ExtraWebshopData from '../../components/forms/ExtraWebshopData'

const mapStateToProps = state => ({
  name: state.reduxTokenAuth.currentUser.attributes.displayName,
  id: state
});


function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

class Profile extends Component{

  constructor(props) {
    super(props);
    this.state = {uuid: null, dialogOpen: false}
  }
  static pageTitle(){
    //return <FormattedMessage id='CortegeAbout.title' />
    return "Din profil";
  }

  static pageNavTitle(){
    //return <FormattedMessage id='CortegeAbout.navTitle' />
    return 'Bingo';
  }
  componentDidMount() {
    this.props.setTitle('Account.profileTitle');
    getUserUuid()
    .then( response =>{
      console.log(response);
      this.setState({uuid: response.data.uuid});
    })
  }


  handleLiUCardClicked = () => {
    this.setState({ dialogOpen: true })
  }

  formSubmit = (value, bag) => {  
    bag.setSubmitting(true);
    addLiUCardCode(value.liuIDCode)
      .then( res => {
        this.props.openDialog(this.props.intl.formatMessage({ id: 'Account.nice'}), this.props.intl.formatMessage({ id: 'Account.codeSuccess'}));
        bag.setSubmitting(false);
      })
      .catch( err => {
        this.props.openDialog(this.props.intl.formatMessage({ id: 'Account.bad'}), this.props.intl.formatMessage({ id: 'Account.badExplain'}));
        bag.setSubmitting(false);
      })
  }

  render() {
    return(
          <GridInner>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              {this.state.uuid ?
                <QRCode
                  bgColor="#FFFFFF"
                  fgColor="#FF0000"
                  level="Q"
                  className='user-code'
                  size={256}
                  value={this.state.uuid}
                  renderAs={"canvas"}
                />
                :
                <CircularProgress size="large" />
              }
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <h4 style={{margin: '0'}}> {this.props.name} </h4>
            </GridCell>
            <GridCell desktop='12' tablet='8' phone='4' style={{textAlign: 'center'}}>
              <p>
                <FormattedMessage id='Account.welcomeToProfile'/>
              </p>
              <p>
                <FormattedMessage id='Account.liuAdd'/>
              </p>
            </GridCell>

            <GridCell desktop='12' tablet='8' phone='4'>
              <Formik
                initialValues={{liuIDCode: ''}}
                validationSchema={Yup.object().shape({
                  liuIDCode: Yup.string()
                    .test('len', <FormattedMessage id='Account.code10numbers'/>, val => (
                      val.length === 10
                    ))
                    .required(<FormattedMessage id='Account.badCode'/>),
                })}
                onSubmit={this.formSubmit}
                render={ ({values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
                  <Form style={{width: '100%'}} >
                    <Dialog
                      open={this.state.dialogOpen}
                      onClose={() => this.setState({dialogOpen: false})}
                      className='unclickable-scrim-dialog'
                    >
                      <DialogTitle>
                        <FormattedMessage id='Account.codePopupTitle'/>
                      </DialogTitle>
                      <DialogContent>
                        <GridInner>
                          <GridCell desktop='12' tablet='8' phone='4'>
                            <FormattedMessage id='Account.codePopupDesc'/>
                          </GridCell>

                          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                            <div>
                            <img
                              src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/liukort.png'
                              alt='LiU-kort'
                              style={{width: '60%'}}
                            />
                            </div>
                          </GridCell>
                          {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}
                          <GridCell desktop='12' tablet='8' phone='4'>
                          <FormTextInput
                            style={{width: '100%'}}
                            name='liuIDCode'
                            label={<FormattedMessage id='Account.codeGoesHere'/>}
                            
                            value={values.liuIDCode}
                            error={errors.liuIDCode}
                            touched={touched.liuIDCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </GridCell>
                        {/* <GridCell desktop='6' tablet='4' phone='2'>
                          <Button raised type='submit' disabled={!isValid || isSubmitting}>
                            <FormattedMessage id='OrchestraMemReg.Submit'/>
                            Skicka
                          </Button>
                        </GridCell> */}

                        </GridInner>
                      </DialogContent>
                      <DialogActions>
                        <DialogButton action="close" type='button' isDefaultAction >
                          <FormattedMessage id='Account.later'/>
                        </DialogButton>
                        <DialogButton action='close' type='submit' disabled={!isValid} >
                          <FormattedMessage id='Account.send' />
                        </DialogButton>
                      </DialogActions>
                    </Dialog>
                  </Form>
                )}
              />
            </GridCell>

            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <Button raised onClick={() => this.handleLiUCardClicked()}>
                <FormattedMessage id='Account.codePopupTitle'/>
              </Button>
            </GridCell>

            <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
              <ExtraWebshopData open={this.state.open}/>
            </GridCell>
     
           
            {/* <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
              <Button raised onClick={evt => this.setState({dialogOpen: !this.state.dialogOpen})} >
                <FormattedMessage id='Account.editProfile' />
              </Button>
            </GridCell>
            <GridCell desktop='6' tablet='4' phone='2' className='h-center'>
              <Button raised onClick={evt => this.setState({dialogOpen: !this.state.dialogOpen})}>
                <FormattedMessage id='Account.changePass'/>
              </Button>
              <Dialog
                open={this.state.dialogOpen}
                onClose={evt => {
                  console.log(evt.detail.action)
                  this.setState({dialogOpen: false})
                }}
               >
                <DialogTitle>
                  <FormattedMessage id='Account.sorry'/>
                </DialogTitle>
                <DialogContent>
                  <FormattedMessage id='Account.notImplemented'/>
                </DialogContent>
                <DialogActions>
                  <DialogButton action="close">Ok</DialogButton>
                  {// <DialogButton action="accept" isDefaultAction>Sweet!</DialogButton>
                  }
                </DialogActions>
              </Dialog>
             </GridCell> */}

          </GridInner>
    );
  }
}

export default injectIntl(connect(mapStateToProps, { openDialog, setTitle })(Profile));
