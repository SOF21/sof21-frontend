import React, { Component } from 'react';

import HighlightedArea from '../../components/page_components/HighlightedArea';
import ContactCard from '../../components/page_components/ContactCard';
import Header from '../../components/page_components/NiceHeader';
import ImageModal from '../../components/page_components/ImageModal';
import SofCountdown from '../../components/page_components/SofCountdown'

import { FormattedMessage, injectIntl } from 'react-intl'

import { withRouter } from 'react-router-dom'

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Ripple } from '@rmwc/ripple';
import { ListDivider } from '@rmwc/list';
import { SimpleDataTable } from '@rmwc/data-table';
import { Button } from '@rmwc/button';
import {
  List,
  ListGroup,
} from '@rmwc/list';

import CortegeEntry from '../../components/page_components/CortegeEntry';

const cortegeEntries = [
  {
    name: 'LiTHe Blås', 
    type: 'Orkester (Linköping)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Bobby SOF', 
    type: 'Bobbycar', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Astrid Lindgrens Förgrömmade Studentkår', 
    type: 'Astrid Lindgren', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Glasblåsarna', 
    type: 'Orkester (Uppsala)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'FOULossning', 
    type: 'BB', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'VI-Ling', 
    type: 'Trädkoja', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Humpsvaka & Patriciabaletten', 
    type: 'Orkester (Finland)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'PiLS - Plask i Långsamt Släp', 
    type: 'Barnkalas på badhus', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Alte Kamereren', 
    type: 'Orkester (Lund)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'D-Groups Magasin', 
    type: 'Björnes Magasin', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'M-Verkstan', 
    type: 'Diverse fordon', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Foul 16+17', 
    type: 'Roliga timmen', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Isterbandet', 
    type: 'Orkester (Växjo)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Dr (Baljan) Mugg', 
    type: 'Nalle har ett stort blått hus', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Kårsdraget', 
    type: 'Orkester (Stockholm)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Wild Kids', 
    type: 'Wild Kids', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Teekkaritorvet', 
    type: 'Orkester (Finland)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Klanen MaCaramellkung', 
    type: 'Godisborg', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'PlumbLING', 
    type: 'Super Mario', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Snösvänget', 
    type: 'Orkester (Umeå)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'McMPiRE\'s', 
    type: 'Happy Meal', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Rädda världen med Navitas', 
    type: 'Superhjältar', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Bonnkapälle', 
    type: 'Orkester (Linköping)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Clubmästeriet', 
    type: 'Joakim Von Anka Pengabinge', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Pipp(i)Verkeriet', 
    type: 'Pippi', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Mistluren', 
    type: 'Orkester (Göteborg)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Saksmästeriet', 
    type: 'Legoborg', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Holgerspexet - Monstret har goth vidare', 
    type: 'Frankenstein (Band)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Blommor och Bin', 
    type: 'Blommor och Bin', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Axelbandet', 
    type: 'Orkester (Finland)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Popcorn M-ania', 
    type: 'Popcorn', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Ingenjörer utan gränser', 
    type: 'Upp', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Röda Arméns Gosskör', 
    type: 'Orkester (Linköping)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'M-Tower', 
    type: 'Disneyborg', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'AMC Bleckhornen', 
    type: 'Orkester (Lund)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Glassföräldrarna', 
    type: 'Hemglassbilen', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'HKL Make Believes', 
    type: 'Hockey', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'FBhaj i poolen', 
    type: 'Vattenkrig', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'AllianceOrchestret & Chalmersbaletten', 
    type: 'Orkester (Göteborg)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'SIMS UNDERJORDEN', 
    type: 'Sims', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'ab Kruthornen & Letta Gardet', 
    type: 'Orkester (Uppsala)', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'FÖR VI HAR TAGIT STUDENT(IG)EN', 
    type: 'Studentflak', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
  {
    name: 'Valla Skivgarde', 
    type: 'Dunka dunka', 
    img: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
  },
]

const modalImages = cortegeEntries.map((entry, num) =>(
  {original: entry.img, description: "" + (num + 1) + ". " + entry.name + " - " + entry.type}
));


const contactDaniel = {name: 'Daniel Sonesson', title: 'Kårtege - Tåg', email: 'kartege-tag', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/million_dollar_smile.jpg'};
const contactNils = {name: 'Nils Hedner', title: 'Kårtege - Byggområde', email: 'kartege-bygg', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile/larsa.jpg'};

class CortegeFestival extends Component{
  constructor(props){
    super(props)

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.keyPress = this.keyPress.bind(this);

    this.modalRef = React.createRef();

    this.state = {timerFinished: false, toDate: new Date('2019-01-21T00:00:00'), imageModalOpen: false, selectedImage: 1};
  }

  static pageTitle(){
    return <FormattedMessage id='CortegeFestival.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='CortegeFestival.navTitle' />
  }

  onTimerFinish(){
    this.setState({timerFinished: true});
  }

  openModal(imageI){
    this.setState({imageModalOpen: true});
    this.modalRef.current.changeImage(imageI);
    document.addEventListener("keydown", this.keyPress, false);
  }

  closeModal(){
    this.setState({imageModalOpen: false});
    document.removeEventListener("keydown", this.keyPress, false);
  }

  keyPress(event){
    if(event.keyCode === 27){ //If esc button
      this.closeModal();
    }
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.keyPress, false); // Prevent leak
  }

  render() {
    const entries = cortegeEntries.map((entry, num) => (
      <React.Fragment>
        <CortegeEntry entry={entry} num={num} onClickCallback={this.openModal}/>
        {num+1 !== cortegeEntries.length ? <ListDivider style={{width: '100%'}}/> : null}
      </React.Fragment>
    ));

    return(
      <React.Fragment>
          {/*<ImageModal
          ref={this.modalRef}
          isOpen={this.state.imageModalOpen}
          images={modalImages}
          showBullets={false}
          exitCallback={()=>this.closeModal()}
        />*/}
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <img 
                className='full-width-grid-image'
                src='https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege_festival/cortege_f1.jpg'
              />
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12'>
              <p>
                <FormattedMessage id='CortegeFestival.time' />
              </p>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
              <p style={{margin: '0'}}>
                <FormattedMessage id='CortegeFestival.more' />
              </p>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12'>
              <Button raised style={{width: '100%'}} onClick={() => this.props.history.push('/about_cortege')}>
                <FormattedMessage id='CortegeFestival.click' />
              </Button>
            </GridCell>
          </GridInner>
        </Grid>

        <HighlightedArea className='countdown-inner' color='yellow'
        >
          <SofCountdown 
            label={<FormattedMessage id='CortegeFestival.timeLeft' />}
            toDate={new Date('2019-05-11T12:00:00')} 
            countdownFinishCallback={() => this.setState({timerFinished: true})} />
        </HighlightedArea>

        <Grid className="base-outer-grid ">
          <GridInner className='grid-gap-8'>
            <GridCell phone="4" tablet="8" desktop='12' >
              <Header>
                <FormattedMessage id='CortegeFestival.routeH' />
              </Header>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' >
              <p>
                <FormattedMessage id='CortegeFestival.route' />
              </p>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' >
              <Header>
                <FormattedMessage id='CortegeFestival.map' />
              </Header>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
              <iframe src="https://www.google.com/maps/d/u/2/embed?mid=1mIFO2HGVpgsDfqlZmlxeSMmvQqc77QFB" width="640" height="480" style={{width: '100%'}}></iframe>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' >
              <Header>
                <FormattedMessage id='CortegeFestival.procession' />
              </Header>
            </GridCell>
            <GridCell phone="4" tablet="8" desktop='12' >
              <List twoLine avatarList>
                <ListGroup>
                  {entries}
                </ListGroup>
              </List>
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withRouter(injectIntl(CortegeFestival));
