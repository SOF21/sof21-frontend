import React, { Component} from 'react';

import HighlightedArea from '../../components/page_components/HighlightedArea';
import { ListDivider } from '@rmwc/list';

import { FormattedMessage, injectIntl } from 'react-intl'

import ContactCard from '../../components/page_components/ContactCard';

import ImageModal from '../../components/page_components/ImageModal';

import { Grid, GridCell, GridInner } from '@rmwc/grid';
import { Ripple } from '@rmwc/ripple';
import { SimpleDataTable } from '@rmwc/data-table';


const contactDaniel = {name: 'Daniel Sonesson', title: 'Kårtege - Tåg', email: 'kartege-tag', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/daniel.jpg'};
  const contactNils = {name: 'Nils Hedner', title: 'Kårtege - Byggområde', email: 'kartege-bygg', image:'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/Pictures/Committee_Profile_First/nisse.jpg'};

const images = [
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege-application/cortege-1-1.jpg',
    description: 'Makrobidragsexempel 1 - Kårtege',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege-application/cortege-2-2.jpg',
    description: 'Makrobidragsexempel 1 - Skiss 1/2',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege-application/cortege-2-3.jpg',
    description: 'Makrobidragsexempel 1 - Skiss 2/2',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege-application/cortege-2-1.jpg',
    description: 'Makrobidragsexempel 2 - Kårtege',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege-application/cortege-1-2.jpg',
    description: 'Makrobidragsexempel 2 - Skiss',
  },
  {
    original: 'https://s3-eu-west-1.amazonaws.com/lintek-sof/sof-react-page/pages/cortege-application/cortege-3-1.jpg',
    description: 'Fribyggesexempel',
  },
]

class CortegeApplication extends Component{
  constructor(props){
    super(props);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.keyPress = this.keyPress.bind(this);

    this.state = {imageModalOpen: false, selectedImage: 1, timerFinished: false, toDate:new Date('2019-02-04T00:00:00')}

    this.modalRef = React.createRef(); 
  }

  static pageTitle(){
    return <FormattedMessage id='CortegeAppl.title' />
  }

  static pageNavTitle(){
    return <FormattedMessage id='CortegeAppl.navTitle' />
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

  onTimerFinish = () => {
    this.setState({timerFinished: true});
  }

  render() {

    return(
      <React.Fragment>
        <ImageModal
          ref={this.modalRef}
          isOpen={this.state.imageModalOpen}
          images={images}
          exitCallback={()=>this.closeModal()}
        />
        <Grid className="base-outer-grid base-outer-grid--first">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <p>
              <FormattedMessage
                id="CortegeAppl.notAvailable"
              />

              </p>
            </GridCell>
          </GridInner>
        </Grid>

        <HighlightedArea className='countdown-inner' color='green'>
          <GridCell phone="4" tablet="8" desktop='12' className = 'h-center' >
            <h3 style={{margin: '10px'}}>
              Ansökan är nu öppen
            </h3>
          </GridCell>
          <GridCell phone='4' tablet='8' desktop='12' >
            <ListDivider/>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='12' className = 'h-center' >
            <h3 style={{margin: '10px'}}>
              <b>
                <a 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href='https://goo.gl/forms/yMCmu1xk48GQMOiI2'
                  style={{color: 'white'}}
                >
                    KLICKA HÄR FÖR ATT ANSÖKA
                </a>
              </b>
            </h3>
          </GridCell>
        </HighlightedArea>

        <Grid className="base-outer-grid ">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <h2>
                Viktiga Datum
              </h2>
              <p>
                Nedan följer några viktiga datum under både Kårtegeansökan och inför själva Kårtegen:
              </p>

              <div className='h-center'>
                <SimpleDataTable
                  className='rmwc-table-full-width'
                  getRowProps={row => {
                    return {className: 'rmwc-table-uninteractive'}
                  }}
                  getCellProps={(cell, index, isHead) => {
                    return {className: 'rmwc-table-uninteractive', style: {whiteSpace: 'normal'}}
                  }}
                  headers={[['Datum', 'Händelse']]}
                  data={
                    [
                      ['20/1','Temasläpp för Kårtegen 2019'],
                      ['4/2','Ansökan öppnar!'],
                      ['5/2','Kårtegepub i Gasquen.'],
                      ['17/2','Ansökan stänger!'],
                      ['2/5','Byggstartsfest.'],
                      ['9/5','SOF19 börjar.'],
                      ['11/5','Kårtegen 2019 går av stapeln!'],
                    ]
                  }
                />
              </div>

              <h2>
                Bidrags&#8203;information
              </h2>
              <p>
                För att ni ska ha möjlighet att förbereda er inför att ansökan öppnar följer nedan praktisk information.
                Ansökan kommer att vara öppen från <b>4/2</b> till <b>17/2</b> men för att maximera chansen att just ert bidrag ska få vara med i Kårtegen är det bra att skicka in en ansökan tidigt vartefter vi i Kårtegeutskottet kanske hinner titta igenom och komma med feedback redan innan ansökan stänger.
              </p>

              <h3>
                Ansökans delar
              </h3>
              <p>
                En ansökan innehåller utöver information om er grupp tre delar:
              </p>
              <div className='h-center'>
                <SimpleDataTable
                  className='rmwc-table-full-width'
                  getRowProps={row => {
                    return {className: 'rmwc-table-uninteractive'}
                  }}
                  getCellProps={(cell, index, isHead) => {
                    return {className: 'rmwc-table-uninteractive', style: {whiteSpace: 'normal'}}
                  }}
                  data={
                    [
                      ['1', 'En grovskiss över bidraget'],
                      ['2', 'En beskrivning av bidraget och vad det innehåller'],
                      ['3', 'En förklaring hur bidraget hänger ihop med Kårtegens tema']
                    ]
                  }
                />
              </div>

              <p>
                Det är just beskrivningen och hur bra ert bidrag passar in i årets tema vi i Kårtegeutskottet kommer att kolla på när vi bestämmer vilka som får möjlighet att vara med i Kårtegen.
                <br/>
                <b>Tips!</b> Försök tänka utanför ramarna, det kommer inte godkännas bidrag som har samma idé.
              </p>

              <p>
                När ansökan stänger kommer vi i Kårtegeutskottet gå igenom alla bidrag och välja ut de vi tycker är bäst lämpade. Om ansökan blir godkänd så kommer vi då be om en mer utförlig ritning samt planerad materialåtgång och ytterligare information.
              </p>

              <p>
                <b>OBS!</b> Årets Kårtege kommer att innehålla färre bidrag (men med högre kvalité) än tidigare år. Detta innebär att endast de med bäst idé och koppling till temat kommer att få möjlighet att vara med. Se därför till att ni gör ert allra bästa med beskrivning och skiss.
              </p>

              <h3> Typer av bidrag </h3>
              <p> De typer av bidrag som kommer att finnas i Kårtegen 2019 är: </p>

              <h4> 1. Makrobidrag </h4>
              <p>
                Ett makrobidrag innebär en konstruktion som transporteras på ett lastbilsflak under Kårtegen där deltagarna är på flaket med sin konstruktion.
                För ett makrobidrag rekommenderar vi att man är en grupp på 15-25 personer.
                Är man fler eller färre kontakta gärna oss för att kolla om det fungerar.
                Maximal byggstorlek för ett makrobidrag är <b>5</b> meter långt, <b>2.5</b> meter brett och <b>3</b> meter högt.
              </p>

              <h4> 2. Fribygge </h4>
              <p>
                Ett fribygge är alla andra sorters bidrag än makrobidrag och för dessa krävs en beskrivning av vad man vill bygga och speciellt godkännande. För att diskutera just er fribygge-idé får ni gärna kontakta oss i Kårtegeutskottet redan innan ansökan öppnar.
              </p>

              <h3> Kostnad </h3>
              <p>
                Kostnaden för att vara med i Kårtegen och ha ett bidrag beror på vilket typ av bidrag man vill ha och antalet personer man är i gruppen.
              </p>

              <p>
                Ett makrobidrag kommer att kosta 8000kr plus 400kr per person i gruppen. I detta ingår:
              </p>

              <div className='h-center'>
                <SimpleDataTable
                  className='rmwc-table-full-width'
                  getRowProps={row => {
                    return {className: 'rmwc-table-uninteractive'}
                  }}
                  getCellProps={(cell, index, isHead) => {
                    return {className: 'rmwc-table-uninteractive', style: {whiteSpace: 'normal'}}
                  }}
                  data={
                    [
                      ['Material att bygga bidraget med'],
                      ['En egen byggplats på byggområdet samt tillgång till verktyg'],
                      ['Chansen att få visa upp sitt färdiga bidrag för hela Linköping'],
                      ['Ett speciellt Kårtege-helhelgsarmband till varje person i gruppen. (Biljett till alla tre kvällar av SOF19)'],
                      [' Byggstartsfesten 2/5'],
                      ['Ett SOF19-märke'],
                      ['En massa annat kul!'],
                    ]
                  }
                />
              </div>

              <ul>
              </ul>

              <p>
                För grundkostnad för fribygge kontakta oss i Kårtegeutskottet med information om storlek på er grupp och vad ni vill göra.
                Vi kommer återkomma med en kostnad då denna beror mycket på det specifika bidraget.
              </p>

              <h2> Tidigare bidrag </h2>
              <p>
                Nedan följer exempel från bidrag till Kårtegen under SOF17.
                Skisser med tillhörande bild under själva Kårtegen och även en kortare beskrivning om vad ett bidrag kan handla om och hur det anknyter till temat.
                Dessa kan ni som ansöker om Kårtegebidrag använda som riktlinjer för vad vi i Kårtegeutskottet vill ha in från er.
              </p>
            </GridCell>
          </GridInner>
        </Grid>

        <HighlightedArea className='grid-gap-8 ' >
          <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
            <h2> Skiss&#8203;exempel #1 </h2>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='8' className='h-center'>
            <Ripple>
              <div
                className = 'cortege-image cortege-image-square-desktop mdc-item-only-hover'
                style={{backgroundImage: 'url(' + images[0].original + ')'}}
                onClick={() => this.openModal(0)}
              />
            </Ripple>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='4' className='h-center'>
            <GridInner style={{width: '100%'}} className='grid-gap-8'>
              <GridCell phone="4" tablet="4" desktop='12' className='h-center'>
                <Ripple>
                  <div
                    className = 'cortege-image cortege-image-square-tablet mdc-item-only-hover'
                    style={{backgroundImage: 'url(' + images[1].original + ')'}}
                    onClick={() => this.openModal(1)}
                  />
                </Ripple>
              </GridCell>
              <GridCell phone="4" tablet="4" desktop='12' className='h-center'>
                <Ripple>
                  <div
                    className = 'cortege-image cortege-image-square-tablet mdc-item-only-hover'
                    style={{backgroundImage: 'url(' + images[2].original + ')'}}
                    onClick={() => this.openModal(2)}
                  />
                </Ripple>
              </GridCell>
            </GridInner>
          </GridCell>
        </HighlightedArea>

        <Grid className="base-outer-grid ">
        </Grid>

        <HighlightedArea className='grid-gap-8'>
          <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
            <h2> Skiss&#8203;exempel #2 </h2>
          </GridCell>
          <GridCell phone="4" tablet="4" desktop='6' className='h-center'>
            <Ripple>
              <div
                className = 'cortege-image cortege-image-square-tablet mdc-item-only-hover'
                style={{backgroundImage: 'url(' + images[3].original + ')'}}
                onClick={() => this.openModal(3)}
              />
            </Ripple>
          </GridCell>
          <GridCell phone="4" tablet="4" desktop='6' className='h-center'>
            <Ripple>
              <div
                className = 'cortege-image cortege-image-square-tablet mdc-item-only-hover'
                style={{backgroundImage: 'url(' + images[4].original + ')'}}
                onClick={() => this.openModal(4)}
              />
            </Ripple>
          </GridCell>
        </HighlightedArea>

        <Grid className="base-outer-grid ">
        </Grid>

        <HighlightedArea className='grid-gap-8'>
          <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
            <h2> Exempel på fribygge </h2>
          </GridCell>
          <GridCell phone="4" tablet="8" desktop='12' className='h-center'>
            <Ripple>
              <div
                className = 'cortege-image mdc-item-only-hover'
                style={{backgroundImage: 'url(' + images[5].original + ')'}}
                onClick={() => this.openModal(5)}
              />
            </Ripple>
          </GridCell>
        </HighlightedArea>

        <Grid className="base-outer-grid ">
          <GridInner>
            <GridCell phone="4" tablet="8" desktop='12'>
              <h3> Beskrivnings&#8203;exempel </h3>
              <p>
                Beskrivning av ett bidrag som gestaltade målgången av Vasaloppet:
              </p>
              <p>
                “Konkret kommer flaket att se ut som målgången för Vasaloppet i Mora. Det stora valvet kommer att byggas och ett fjällandskap med snö och granar kommer prägla flaket. En läktare kommer finnas för att skapa så lik bild av den riktiga målgången som möjligt. Tanken är att det snöar vid målgången för extra effekt för publiken. Själva flaket kommer ha upploppspår där några åkare är på väg in i mål. För att ligga i enlighet med temat så kommer vi ha åkare från de olika tiderna som loppet genomförts. Bygget kommer verkligen spegla en typisk svensk tradition. Publiken kommer bjudas på blåbärssoppa av dalkullor och åkare kommer ”åka” bakom flaket för att integrera med publiken.”
              </p>

              <h2 style={{marginBottom: '0'}}> Kontakt </h2>
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6'>
              <ContactCard
                name={contactDaniel.name}
                title={contactDaniel.title}
                email={contactDaniel.email}
                image={contactDaniel.image}
                clickable
              />
            </GridCell>
            <GridCell phone="4" tablet="4" desktop='6'>
              <ContactCard
                name={contactNils.name}
                title={contactNils.title}
                email={contactNils.email}
                image={contactNils.image}
                clickable
              />
            </GridCell>
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default injectIntl(CortegeApplication);
