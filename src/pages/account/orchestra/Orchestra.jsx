import React, { Component } from 'react';

import { GridCell, GridInner } from '@rmwc/grid';
import FormTextInput from '../../../components/forms/components/FormTextInput';
import OrchestraCard from '../../../components/account/orchestra/OrchestraCard';
import PriceSummary from '../../../components/account/orchestra/PriceSummary'
import ShirtSizeFormPopup from '../../../components/forms/ShirtSizeForm';

import { FormattedMessage, injectIntl } from 'react-intl';

import { Formik, Form } from 'formik/dist/index';
import * as Yup from 'yup';

import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';
import { SimpleDataTable } from '@rmwc/data-table';


import { withRouter } from 'react-router-dom'

import {connect} from 'react-redux';

import { fetchSignupOrchestra } from '../../../actions/orchestraSignups'
import { fetchOrchestraFromSignup } from '../../../actions/orchestras'
import { setTitle } from '../../../actions/title';

function getTicketPickupOrchestra(orchestras){
  var firstOrchestra = null;

  orchestras.forEach( elem => {
    if(elem.orchestra_articles.length !== 0){
      firstOrchestra = elem;
    }
  })
  return firstOrchestra;
}

class Orchestra extends Component{
  constructor(props){
    super(props)

    this.props = {dialogOpen: false}
  }

  componentDidMount() {
    this.props.dispatch(fetchOrchestraFromSignup())
    this.props.dispatch(setTitle('Account.orchestraTitle'));
  }

  formSubmit = (values, bag) => {
    const {
      code,
    } = values;
    bag.setSubmitting(true);
    this.props.dispatch(fetchSignupOrchestra(code))
      .then((response) => {
        if(!response){
          if(this.props.signupOrchestra.double_signup){
            bag.setErrors( {code: 
              this.props.intl.formatMessage({id: 'Orchestra.alreadyRegistered'})
              + this.props.signupOrchestra.orchestra.name
            })
          } else{
            this.props.history.push('/account/orchestra/join/' + code);  
          }
        } else{
          bag.setErrors( {code: 
            //this.props.intl.formatMessage({id: 'Orchestra.invalidCode'}),
            response.payload.error.response.data.message //TODO: Make this nicer
          })
          bag.setSubmitting(false);
        }
      })
  }

  render() {
    //TODO: Refactor answersummary, is used in admin view too!
    const Package = [
      this.props.intl.formatMessage({id: 'Prices.Big'}),
      this.props.intl.formatMessage({id: 'Prices.Small'}),
      this.props.intl.formatMessage({id: 'Prices.Saturday'}),
    ];
    
    const PackagePrices = [
      500, 470, 220
    ]

    const Food = [
      this.props.intl.formatMessage({id: 'Prices.BigFood'}),
      this.props.intl.formatMessage({id: 'Prices.SmallFood'}),
      this.props.intl.formatMessage({id: 'Prices.SaturdayFood'}),
      this.props.intl.formatMessage({id: 'Prices.NoFood'}),
    ];

    const FoodPrices = [
      215, 140, 75
    ]

    const InstrSize = [
      this.props.intl.formatMessage({id: 'Orchestra.sizeVerySmall'}),
      this.props.intl.formatMessage({id: 'Orchestra.sizeSmall'}),
      this.props.intl.formatMessage({id: 'Orchestra.sizeMedium'}),
      this.props.intl.formatMessage({id: 'Orchestra.sizeLarge'}),
      this.props.intl.formatMessage({id: 'Orchestra.noInstr'}),
    ];

    const ShirtSizes = [
      "Woman S",
      "Woman M",
      "Woman L",
      "Woman XL",
      "Woman XXL",
      "Man S",
      "Man M",
      "Man L",
      "Man XL",
      "Man XXL"
    ];

    var noSize = false;
    var shirtId = null;
    var orchId = null;

    var orchestraContent = (
      <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
        <CircularProgress size="xlarge" />
      </GridCell>);
    if(!this.props.loading){
      if(!this.props.orchestras || !this.props.orchestras.signup || this.props.orchestras.list.length === 0 ){
        orchestraContent =  (
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <h5> <FormattedMessage id='Orchestra.noOrchestras' /> </h5>
          </GridCell>)
      } else{
        const ticketPickupOrc = getTicketPickupOrchestra(this.props.orchestras.list);
        const sortedArticles = ticketPickupOrc !== null ? ticketPickupOrc.orchestra_articles.sort((a, b) => a.kind - b.kind) : [{id: 0}]
        
        // Check if has no t-shirt size
        if( sortedArticles[0].data > 0 && (sortedArticles[0].size === null || sortedArticles[0].size === '')){
          shirtId=sortedArticles[0].id;
          orchId=ticketPickupOrc.id;
          noSize=true;
        }

        orchestraContent =  ticketPickupOrc !== null ? 
          (
            <React.Fragment>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <h5 style={{margin: '0px'}}> <FormattedMessage id='Orchestra.orchestras' /> </h5>
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
                <GridInner style={{width: '100%'}}>
                  {this.props.orchestras.list.map(orch => (
                    <GridCell desktop='6' tablet='4' phone='4' key={orch.id}>
                      <OrchestraCard orchestra={orch} key={orch.id}/>
                    </GridCell>
                  ))}
                </GridInner>
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <h5 style={{margin: '0px'}}> <FormattedMessage id='Orchestra.info' /> </h5>
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <SimpleDataTable
                  className='full-width-table rmwc-table-uninteractive'
                  getRowProps={row => {
                    return {}
                  }}
                  getCellProps={(cell, index, isHead) => {
                    return {}
                  }}
                  headers={[[ 
                    this.props.intl.formatMessage({id :'Orchestra.question'}),
                    this.props.intl.formatMessage({id :'Orchestra.answer'})
                  ]]}
                  data={
                    [
                      [
                        this.props.intl.formatMessage({id :'OrchestraMemReg.festivalPackage'}), 
                        Package[ticketPickupOrc.orchestra_ticket.kind]
                      ],
                      [
                        this.props.intl.formatMessage({id :'OrchestraMemReg.foodtickets'}),
                        Food[ticketPickupOrc.orchestra_food_ticket.kind]
                      ],
                      [
                        this.props.intl.formatMessage({id :'OrchestraMemReg.allergies'}),
                        ticketPickupOrc.special_diets[0].name
                      ],
                      [
                        this.props.intl.formatMessage({id :'Orchestra.dorm'}),
                        ticketPickupOrc.dormitory ? 
                          this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                          this.props.intl.formatMessage({id :'Orchestra.no'}) 
                      ],
                      [
                        this.props.intl.formatMessage({id :'Orchestra.instrumentSize'}),
                        InstrSize[ticketPickupOrc.instrument_size]
                      ],
                      [
                        this.props.intl.formatMessage({id :'Orchestra.tenth'}),
                        ticketPickupOrc.consecutive_10 ?
                          this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                          this.props.intl.formatMessage({id :'Orchestra.no'}) 
                      ],
                      [
                        this.props.intl.formatMessage({id :'Orchestra.twentyfifth'}),
                        ticketPickupOrc.attended_25 ? 
                          this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                          this.props.intl.formatMessage({id :'Orchestra.no'}) 
                      ],
                      [
                        this.props.intl.formatMessage({id :'Orchestra.tshirt'}),
                        sortedArticles[0].data
                      ],
                      (sortedArticles[0].data > 0 ?
                        [
                          this.props.intl.formatMessage({id :'OrchestraMemReg.sizeTshirt'}) + ':',
                          ShirtSizes[sortedArticles[0].size]
                        ]: []
                      ),
                      [
                        this.props.intl.formatMessage({id :'Orchestra.medal'}),
                        sortedArticles[1].data
                      ],
                      [
                        this.props.intl.formatMessage({id :'Orchestra.patch'}),
                        sortedArticles[2].data
                      ],
                    ]
                  }
                />
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <h5 style={{margin: '0px'}}> <FormattedMessage id='Orchestra.toPay' /> </h5>
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <PriceSummary
                  data={
                    [
                      [Package[ticketPickupOrc.orchestra_ticket.kind],
                        1,
                        PackagePrices[ticketPickupOrc.orchestra_ticket.kind],
                        PackagePrices[ticketPickupOrc.orchestra_ticket.kind],
                      ],
                      (ticketPickupOrc.orchestra_food_ticket.kind !== 3) ? 
                      [Food[ticketPickupOrc.orchestra_food_ticket.kind],
                        1,
                        FoodPrices[ticketPickupOrc.orchestra_food_ticket.kind],
                        FoodPrices[ticketPickupOrc.orchestra_food_ticket.kind],
                      ] : [],
                      ticketPickupOrc.dormitory ? [ this.props.intl.formatMessage({id: 'Prices.Dorm'}),
                        1,
                        50,
                        50,
                      ] : [],
                      sortedArticles[0].data ? [ this.props.intl.formatMessage({id: 'Prices.Tshirt'}),
                        sortedArticles[0].data,
                        100,
                        100 * sortedArticles[0].data,
                      ] : [],
                      sortedArticles[1].data ? [ this.props.intl.formatMessage({id: 'Prices.Medal'}),
                        sortedArticles[1].data,
                        40,
                        40 * sortedArticles[1].data,
                      ] : [],
                      sortedArticles[2].data ? [ this.props.intl.formatMessage({id: 'Prices.Patch'}),
                        sortedArticles[2].data,
                        20,
                        20 * sortedArticles[2].data,
                      ] : [],
                      ticketPickupOrc.is_late_registration ? [ this.props.intl.formatMessage({id: 'Prices.late'}),
                        1,
                        250,
                        250,
                      ] : [],
                    ]}
                />
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <p>
                  {this.props.intl.formatMessage({id :'Orchestra.change'})}
                  <b style={{color: '#f00'}} className='select-all'>orkester@sof.lintek.nu</b>
                </p>
              </GridCell>
            </React.Fragment>
          )
        :
          (
            <React.Fragment>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <h5 style={{margin: '0px'}}> <FormattedMessage id='Orchestra.orchestras' /> </h5>
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4'>
                <GridInner style={{width: '100%'}}>
                  {this.props.orchestras.list.map(orch => (
                    <GridCell desktop='6' tablet='4' phone='4' key={orch.id}>
                      <OrchestraCard orchestra={orch} key={orch.id}/>
                    </GridCell>
                  ))}
                </GridInner>
              </GridCell>
              <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
                <p>
                  {this.props.intl.formatMessage({id :'Orchestra.change'})}
                  <b style={{color: '#f00'}} className='select-all'>orkester@sof.lintek.nu</b>
                </p>
              </GridCell>
            </React.Fragment>
          )
      }
    }
    return(
      <GridInner>
        {this.props.location.message ?  
          <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
            <h5 style={{margin:'0px'}} >{this.props.location.message}</h5>
          </GridCell> : null
        }
        {noSize && <ShirtSizeFormPopup 
          shirtId={shirtId} 
          orchId={orchId}
          successCallback={() => this.props.dispatch(fetchOrchestraFromSignup())}
        />}

        <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
          <h5 style={{margin: 0}}> <FormattedMessage id='Orchestra.signup' /> </h5>
        </GridCell>
        <GridCell desktop='12' tablet='8' phone='4' className='account-orchestra'>
          <Formik
            initialValues={{code: ''}}
            validationSchema={Yup.object().shape({
              code: Yup.string().required(<FormattedMessage id='Orchestra.code' />),
            })}
            onSubmit={this.formSubmit}
            render={ ({values, handleChange, handleBlur, errors, touched, isValid, isSubmitting}) => (
              <Form style={{width: '100%'}} >
                <GridInner>
                  <GridCell desktop='9' tablet='6' phone='4'>
                    <FormTextInput
                      name='code'
                      label={<FormattedMessage id='Orchestra.code'/>}
                      value={values.code}
                      error={errors.code}
                      touched={touched.code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </GridCell>
                  <GridCell desktop='3' tablet='2' phone='4'>
                    <Button raised disabled={!isValid || isSubmitting} type='submit'>
                      <FormattedMessage id='Orchestra.codeButton'/>
                    </Button>
                  </GridCell>
                </GridInner>
              </Form>
            )}
          />
        </GridCell>
        {orchestraContent}
      </GridInner>
    );
  }
}

const mapStateToProps = state => ({
  orchestras : state.orchestras.orchestras,
  signupOrchestra : state.orchestras.signupOrchestra,
  loading: state.orchestras.loading,
});

export  default injectIntl(withRouter(connect(mapStateToProps)(Orchestra)));
