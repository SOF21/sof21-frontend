import React, { Component } from 'react';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { ListDivider } from '@rmwc/list';

import { FormattedMessage, injectIntl } from 'react-intl'

import { TextField } from '@rmwc/textfield'

import SearchField from '../../components/page_components/SearchField'
import ContactView from '../../components/page_components/ContactView';
import ContactCard from '../../components/page_components/ContactCard';
import Header from '../../components/page_components/NiceHeader';

const generalContact = [
  {name: 'Elin Norberg', title: 'General', email: 'sof-general', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/General.jpg', id: 1},
];

const festivalContacts = [
  {name: 'Julia Ohlin', title: 'Festivalchef', email: 'festival', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Festival.jpg', id: 2},
  {name: 'Emma Green', title: 'Serveringsansvarig', email: 'servering', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Servering.jpg', id: 3},
  {name: 'Jesper Andersson', title: 'Områdesansvarig - Festival', email: 'omrade-festival', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Omrade-F.jpg', id: 4},
  {name: 'Kasper Landgren', title: 'Områdesansvarig - Uppbyggnad', email: 'omrade-uppbyggnad', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Omrade-U.jpg', id: 5},
  {name: 'Sara Wågman', title: 'Personalansvarig', email: 'personal', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Personal.jpg', id: 6},
  {name: 'Joel H Nilsson', title: 'Orkesteransvarig', email: 'orkester', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Orkester.jpg', id: 7},
  {name: 'Daniel Pysander', title: 'Kårtegeansvarig', email: 'kartege', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Kartege.jpg', id: 8},
];

const commContacts = [
  {name: 'Ingrid Rylander', title: 'Kommunikationschef', email: 'kommunikation', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Kommunikation.jpg', id: 9},
  {name: 'Michelle Krejci', title: 'IT-ansvarig', email: 'it', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/IT.jpg', id: 10},
  {name: 'Ester Brandås', title: 'Samarbetesansvarig', email: 'samarbete', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Samarbete.jpg', id: 11},
  {name: 'Didrik Florhed', title: 'Marknadsföringsansvarig', email: 'marknadsforing', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/MF.jpg', id: 12},
  {name: 'Ylva Bröms', title: 'Art Director', email: 'ad', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/AD.jpg', id: 13},
  {name: 'Hanna Emanuelsson', title: 'Eventansvarig', email: 'event', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Event.jpg', id: 14},
];

const managmentContacts = [
  {name: 'Gustaf Udd', title: 'Vice General med ekonomiansvar', email: 'vicegeneral', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/ViceG.jpg', id: 15},
  {name: 'Erik Edeskog', title: 'Säkerhetsansvarig', email: 'sakerhet', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Sakerhet.jpg', id: 16},
  {name: 'Sara Höglund', title: 'Riks-SMASK', email: 'rikssmask', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Smask.png', id: 17},
  {name: 'Ingrid Rylander', title: 'Kommunikationschef', email: 'kommunikation', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Kommunikation.jpg', id: 18},
  {name: 'Julia Ohlin', title: 'Festivalchef', email: 'festival', image: 'https://lintek-sof.s3-eu-west-1.amazonaws.com/sof21/Kommiten/Bilder2021/Festival.jpg', id: 19},
];

class Contact extends Component{
  constructor(props) {
    super(props)

    this.state = { searchField: ""}
  }

  static pageTitle(){
    return <FormattedMessage id='Contact.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='Contact.navTitle' />
  }

  filteredContacts(arr){
    const { searchField } = this.state
    return arr.filter(contact => 
      (contact.name.toLowerCase().includes(searchField.toLowerCase()) || 
      contact.title.toLowerCase().includes(searchField.toLowerCase())));
  }

  render() {
    const { searchField } = this.state
    const searching = (searchField.length !== 0)

    return(
      <React.Fragment>
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <SearchField
                handleChange={e => this.setState({searchField: e.target.value})}
              />       
            </GridCell>
              <GridCell phone="4" tablet="8" desktop='12'>
                <Header style={{width: '100%'}}>
                  General 
                </Header>
             </GridCell>
            {/* padding for centering of contact*/}
            <GridCell phone="0" tablet="1" desktop="3"/>
            <GridCell phone="4" tablet="6" desktop='6'>
              <ContactCard
                name={generalContact[0].name} 
                title={generalContact[0].title} 
                email={generalContact[0].email} 
                image={generalContact[0].image}
                mailSuffix="@lintek.liu.se"
              />
            </GridCell>
            <GridCell phone="0" tablet="1" desktop="3"/>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView 
                title='Ledning' 
                contacts={this.filteredContacts(managmentContacts)}
                searching={searching} 
                isMobile={this.props.isMobile} />
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView 
                title='Festival' 
                contacts={this.filteredContacts(festivalContacts)} 
                searching={searching} 
                isMobile={this.props.isMobile} />
            </GridCell>

            <GridCell phone="4" tablet="8" desktop='12'>
              <ContactView 
                title='Kommunikation' 
                contacts={this.filteredContacts(commContacts)} 
                searching={searching} 
                isMobile={this.props.isMobile} />
            </GridCell>

            </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default injectIntl(Contact)
