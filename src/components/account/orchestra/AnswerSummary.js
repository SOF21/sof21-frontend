import React, { Component} from 'react';

import { SimpleDataTable } from '@rmwc/data-table';

import { injectIntl } from 'react-intl';

class AnswerSummary extends Component{
  render() {
    const Package = [
      this.props.intl.formatMessage({id: 'Prices.Big'}),
      this.props.intl.formatMessage({id: 'Prices.Small'}),
      this.props.intl.formatMessage({id: 'Prices.Saturday'}),
    ];
    
    const Food = [
      this.props.intl.formatMessage({id: 'Prices.BigFood'}),
      this.props.intl.formatMessage({id: 'Prices.SmallFood'}),
      this.props.intl.formatMessage({id: 'Prices.SaturdayFood'}),
      this.props.intl.formatMessage({id: 'Prices.NoFood'}),
    ];

    const InstrSize = [
      this.props.intl.formatMessage({id: 'Orchestra.sizeVerySmall'}),
      this.props.intl.formatMessage({id: 'Orchestra.sizeSmall'}),
      this.props.intl.formatMessage({id: 'Orchestra.sizeMedium'}),
      this.props.intl.formatMessage({id: 'Orchestra.sizeLarge'}),
      this.props.intl.formatMessage({id: 'Orchestra.noInstr'}),
    ];

    const Dates = [
      this.props.intl.formatMessage({id: 'OrchestraMemReg.thur'}),
      this.props.intl.formatMessage({id: 'OrchestraMemReg.fri'}),
      this.props.intl.formatMessage({id: 'OrchestraMemReg.sat'}),
    ]

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

    if(this.props.full){
      return(
        <AnswerSummaryFull Package={Package} Food={Food} InstrSize={InstrSize} Dates={Dates} 
        ShirtSizes={ShirtSizes} signup={this.props.signup} intl={this.props.intl}/>
      );
    } else if(this.props.small){
      return(
        <AnswerSummarySmall Package={Package} Food={Food} InstrSize={InstrSize} Dates={Dates} 
        ShirtSizes={ShirtSizes} signup={this.props.signup} intl={this.props.intl}/>
      );
    } else{
      return(null);
    }
  }
}

export default injectIntl(AnswerSummary); 


class AnswerSummarySmall extends Component{
  render() {
    console.log(this.props.signup)
    return(
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
              this.props.intl.formatMessage({id :'OrchestraMemReg.newOrOld'}), 
              this.props.signup.active_member ? 
                this.props.intl.formatMessage({id :'OrchestraMemReg.active'}) :
                this.props.intl.formatMessage({id :'OrchestraMemReg.old'}) 
            ],
            [
              this.props.intl.formatMessage({id :'OrchestraMemReg.arrive'}), 
              //Checks if arrive with orchestra
              this.props.signup.arrival_date === this.props.signup.orchestra.arrival_date || this.props.signup.arrival_date === null?
                this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                this.props.intl.formatMessage({id :'Orchestra.no'}) 
            ],
            [
              this.props.intl.formatMessage({id :'OrchestraMemReg.whatDay'}), 
              this.props.Dates[this.props.signup.arrival_date !== null ? this.props.signup.arrival_date : this.props.signup.orchestra.arrival_date]
            ] ,
            [
              this.props.intl.formatMessage({id :'OrchestraMemReg.balletOrOrchestra'}),
              this.props.signup.orchestra_role === 0 ?
                this.props.intl.formatMessage({id: 'OrchestraMemReg.ballet'}) : 
                this.props.intl.formatMessage({id: 'OrchestraMemReg.orchestra'})
            ],
            [
              this.props.intl.formatMessage({id :'OrchestraMemReg.otherOrchestra'}) + " (tänkt på att detta fält är pranked, ska lägga till så man ser flera anmälningar asap)",
              this.props.signup.other_performances !== null && this.props.signup.other_performances !== ""?
                this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                this.props.intl.formatMessage({id :'Orchestra.no'}) 
            ],
            (
              this.props.signup.other_performances !== null && this.props.signup.other_performances !== ""?
              [
              this.props.intl.formatMessage({id :'OrchestraMemReg.whichOrchestras'}),
                this.props.signup.other_performances
              ] : []
            ),
          ]
        }
      />
    );
  }
}


class AnswerSummaryFull extends Component{
  render() {
    const sortedArticles = this.props.signup.orchestra_articles.sort((a, b) => a.kind - b.kind)
    return(
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
              this.props.intl.formatMessage({id :'OrchestraMemReg.newOrOld'}), 
              this.props.signup.active_member ? 
                this.props.intl.formatMessage({id :'OrchestraMemReg.active'}) :
                this.props.intl.formatMessage({id :'OrchestraMemReg.old'}) 
            ],
            [
              this.props.intl.formatMessage({id :'OrchestraMemReg.arrive'}), 
              //Checks if arrive with orchestra
              this.props.signup.arrival_date === this.props.signup.orchestra.arrival_date || this.props.signup.arrival_date === null?
                this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                this.props.intl.formatMessage({id :'Orchestra.no'}) 
            ],
            [
              this.props.intl.formatMessage({id :'OrchestraMemReg.whatDay'}), 
              this.props.Dates[this.props.signup.arrival_date !== null ? this.props.signup.arrival_date : this.props.signup.orchestra.arrival_date]
            ] ,
            [
              this.props.intl.formatMessage({id :'OrchestraMemReg.festivalPackage'}), 
              this.props.Package[this.props.signup.orchestra_ticket.kind]
            ],
            [
              this.props.intl.formatMessage({id :'OrchestraMemReg.foodtickets'}),
              this.props.Food[this.props.signup.orchestra_food_ticket.kind]
            ],
            [
              this.props.intl.formatMessage({id :'OrchestraMemReg.allergies'}),
              this.props.signup.special_diets[0].name
            ],
            [
              this.props.intl.formatMessage({id :'Orchestra.dorm'}),
              this.props.signup.dormitory ? 
              this.props.intl.formatMessage({id :'Orchestra.yes'}) :
              this.props.intl.formatMessage({id :'Orchestra.no'}) 
            ],
            [
              this.props.intl.formatMessage({id :'OrchestraMemReg.balletOrOrchestra'}),
              this.props.signup.orchestra_role === 0 ?
                this.props.intl.formatMessage({id: 'OrchestraMemReg.ballet'}) : 
                this.props.intl.formatMessage({id: 'OrchestraMemReg.orchestra'})
            ],
            [
              this.props.intl.formatMessage({id :'OrchestraMemReg.otherOrchestra'}) + " (tänkt på att detta fält är pranked, ska lägga till så man ser flera anmälningar asap)",
              this.props.signup.other_performances !== null && this.props.signup.other_performances !== ""?
                this.props.intl.formatMessage({id :'Orchestra.yes'}) :
                this.props.intl.formatMessage({id :'Orchestra.no'}) 
            ],
            (
              this.props.signup.other_performances !== null && this.props.signup.other_performances !== ""?
              [
              this.props.intl.formatMessage({id :'OrchestraMemReg.whichOrchestras'}),
                this.props.signup.other_performances
              ] : []
            ),
            [
              this.props.intl.formatMessage({id :'Orchestra.instrumentSize'}),
              this.props.InstrSize[this.props.signup.instrument_size]
            ],
            [
              this.props.intl.formatMessage({id :'Orchestra.tenth'}),
              this.props.signup.consecutive_10 ?
              this.props.intl.formatMessage({id :'Orchestra.yes'}) :
              this.props.intl.formatMessage({id :'Orchestra.no'}) 
            ],
            [
              this.props.intl.formatMessage({id :'Orchestra.twentyfifth'}),
              this.props.signup.attended_25 ? 
              this.props.intl.formatMessage({id :'Orchestra.yes'}) :
              this.props.intl.formatMessage({id :'Orchestra.no'}) 
            ],
            [
              this.props.intl.formatMessage({id :'Orchestra.tshirt'}),
              sortedArticles[0].data
            ],
            [
              this.props.intl.formatMessage({id :'OrchestraMemReg.sizeTshirt'}),
              this.props.ShirtSizes[sortedArticles[0].size]
            ],
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
    );
  }
}

