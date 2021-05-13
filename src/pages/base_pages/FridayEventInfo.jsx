import React, { Component } from "react"

import { Grid, GridCell, GridInner } from "@rmwc/grid"
import Button from "@rmwc/button"
import FormTextInput from "../../components/forms/components/FormTextInput"
import Header from "../../components/page_components/NiceHeader"

import { info } from "../../constants"

class FridayEventInfo extends Component {
  constructor(props) {
    super()
    this.state = {
      code: "",
      open: false,
      showInfo: new Date().getTime() > new Date("May 13 2021").getTime(),
    }
  }

  static pageTitle() {
    return "Information"
  }

  static pageNavTitle() {
    return "Information"
  }

  handlePasscode = (e) => {
    e.preventDefault()
    if (this.state.code === info.SOFFriday) {
      this.setState({ open: true })
    }
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.open && this.state.showInfo && (
          <Grid className='base-outer-grid '>
            <GridCell desktop='12' tablet='8' phone='4'>
              <form onSubmit={this.handlePasscode}>
                <FormTextInput
                  label='Adminkod'
                  type='text'
                  onChange={(e) => this.setState({ code: e.target.value })}
                  onSubmit={(e) => this.handlePasscode(e)}
                  value={this.state.code}
                  style={{ width: "100%", marginBottom: "1em" }}
                />
                <Button type='submit' raised style={{ width: "100%" }}>
                  Skicka
                </Button>
              </form>
            </GridCell>
          </Grid>
        )}
        {this.state.open && this.state.showInfo && (
          <Grid className='base-outer-grid '>
            <GridInner style={{ padding: "1.2em" }}>
              <GridCell phone='4' tablet='8' desktop='12'>
                <Header>SOF-Fredag</Header>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <p style={{ marginTop: 0 }}>
                  Nedan följer all information som kommer att behövas under
                  dagen! Första stycket innehåller en kort sammanfattningen av
                  det viktigaste. Aktiviteterna beskrivs sedan i mer detalj
                  därefter.
                </p>
                <p>
                  Är det några oklarheter eller problem är ni varmt välkomna att
                  kontakta oss
                  <br />
                  Balkestrar:{" "}
                  <a href='mailto:orkester@sof.lintek.nu'>
                    orkester@sof.lintek.nu
                  </a>
                  <br />
                  Gamlingar:{" "}
                  <a href='mailto:sof-general@lintek.liu.se'>
                    sof-general@lintek.liu.se
                  </a>
                </p>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <Header>Sammanfattning</Header>
              </GridCell>
              <GridCell
                phone='4'
                tablet='8'
                desktop='12'
                style={{ textAlign: "center" }}
              >
                <p>10:00 - 16:00 Mångkamp</p>
                <p>
                  <a
                    href='https://liu-se.zoom.us/j/64241549037'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {" "}
                    13:00 - 14:00 Workshop
                  </a>
                </p>
                <p>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://www.youtube.com/watch?v=Phv0pJ6CyQs'
                  >
                    14:00 - 15:00 Föreläsning
                  </a>
                </p>
                <p>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://liu-se.zoom.us/j/65436180091'
                  >
                    15:00 - ca 16:30 Ölprovning
                  </a>
                </p>
                <p>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://liu-se.zoom.us/j/65436180091'
                  >
                    ca 16:30 - 18:00 Mingel
                  </a>
                </p>
                <p>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://discord.gg/VdS949Uc'
                  >
                    16:00 - 18:00 Spelhäng
                  </a>
                </p>
                <p>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://liu-se.zoom.us/j/65436180091'
                  >
                    18:30 - 21:30 Orkester- och gamlingsittning
                  </a>
                </p>
                <p>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://discord.gg/e357FUg9'
                  >
                    21:30 - sent Eftersläpp
                  </a>
                </p>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <Header>Mångkamp</Header>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <p>
                  <b>Tid:</b> 10:00 - 16:00
                </p>
                <p>
                  Mångkampen är en tävling som hålls under SOF-Fredagen mellan
                  kl 10:00-16:00. Vinnaren kommer sedan att presenteras under
                  sittningen. För att delta skapar du ett lag med en eller flera
                  personer genom att skapa ett öppet instagramkonto eller
                  använda ett redan existerande. Laget ska sedan anmäla sig i
                  <a
                    href='https://forms.gle/9QewKDZJAHV7FgXy8'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {" "}
                    detta formulär{" "}
                  </a>
                  och utföra uppdragen som står på under SOF-Fredag - Uppdrag.
                  När laget är anmält kommer lagnamn och länk till
                  instagramkontot läggas upp på hemsidan under SOF-Fredag - Lag.
                  Glöm inte att följa
                  <a
                    href='https://www.instagram.com/studentorkesterfestivalen/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {" "}
                    @studentorkesterfestivalen{" "}
                  </a>
                  på Instagram!
                </p>

                <p>
                  Uppdragen är uppdelade i frågor och utmaningar. Under varje
                  kategori finns 6 teman:
                  <ul>
                    <li>geografi</li>
                    <li>underhållning</li>
                    <li>historia</li>
                    <li>naturvetenskap</li>
                    <li>kultur & litteratur</li>
                    <li>sport & fritid</li>
                  </ul>
                  Genomför så många uppdrag som ni kan innan tiden är slut!
                  Frågorna får bara besvaras en gång per lag.
                </p>
                <p>
                  Försök att inte träffa folk och tänk på att följa
                  Folkhälsomyndighetens restriktioner och de rekommendationer
                  som finns i din region. Ingen av uppgifterna ska utföras om
                  det finns risk för att skada sig. Deltagande sker på egen
                  risk. Ha kul!
                </p>
                <p>Sammanfattningsvis ska ni:</p>
                <ol>
                  <li>
                    Hitta lag, behöver du hjälp att hitta lagkamrater hör av sig
                    till
                    <a
                      href='https://www.instagram.com/studentorkesterfestivalen/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {" "}
                      @studentorkesterfestivalen
                    </a>{" "}
                    på instagram
                  </li>
                  <li>
                    Skapa ett publikt instagramkonto eller använd ett befintligt
                  </li>
                  <li>
                    Följ{" "}
                    <a
                      href='https://www.instagram.com/studentorkesterfestivalen/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {" "}
                      @studentorkesterfestivalen{" "}
                    </a>{" "}
                    på instagram
                  </li>
                  <li>
                    <a
                      href='https://forms.gle/9QewKDZJAHV7FgXy8'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Anmäl laget
                    </a>
                  </li>
                  <li>Börja med uppdragen!</li>
                </ol>

                <p>Skriv till oss på instagram ifall ni har några frågor!</p>
                <p>
                  Bland priserna, utöver den eminenta äran samt enorma glädje,
                  finner vi bland annat en bluetooth-högtalare, vars onekliga
                  magnificens lyfter närvaron till nya höjder!
                </p>
                <p>Lycka till!</p>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <Header>Workshop</Header>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <p>
                  <b>Tid:</b> 13:00 - 14:00
                </p>
                <p>
                  Upp och hoppa! Skaka loss med August "KP2", balettchefen i
                  LiTHe Blås för baletten Blåsyran, i denna dansworkshop!
                  Klockan 13:00 öppnar portarna till denna magiska workshop vars
                  lärdomar kan appliceras på godtyckligt dansgolv när corona
                  endast är ett minne blott.
                </p>
                <p>
                  <a
                    href='https://liu-se.zoom.us/j/64241549037'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Zoom
                  </a>
                </p>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <Header>Föreläsning</Header>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <p>
                  <b>Tid:</b> 14:00 - 15:00
                </p>
                <p>
                  Klockan har slagit tidig eftermiddag och det är dags att pusta
                  ut från den pulshöjande dansworkshopen och återhämta sig lite
                  inför resten av dagen. Det blir Studentorkesterfestivalens
                  historia, från dess början till nutid. Följ med på en resa
                  genom tiden med Rune och Anders från bloggen
                  Studentorkesterhistoria! Dessa herrars insikt i
                  studentorkesterhistoria kan inte förnekas - vem bättre att
                  hålla en föreläsning inom detta nischade område än dem.
                </p>
                <p>
                  <a
                    href='https://www.youtube.com/watch?v=Phv0pJ6CyQs'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Föreläsningen kommer att sändas här (YouTube)
                  </a>
                </p>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <Header>Ölprovning</Header>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <p>
                  <b>Tid:</b> 15:00 - ca 16:30
                </p>
                <p>
                  Under provningen kommer ni att bli vägledda genom fyra stycken
                  öl från fyra generationer av SOF! Jesper var den från SOF:s
                  sida som ansvarade för VÄRLDSREKORDET i världens största
                  ölprovning under SOF15 och Samuel var en av två
                  provningsledare under detta rekord, hur kul är inte det!
                </p>
                <p>
                  <i>Vi som kommer hålla i kvällen:</i>
                </p>
                <p>
                  SOF21: Jimmie Sandin (Vice Serveringsansvarig)
                  <br />
                  SOF19: Filip Jaredson (Orkesteransvarig)
                  <br />
                  SOF17: Samuel Trennelius (Controller) <br />
                  SOF15: Jesper Lehtonen (Öl- och matputte)
                </p>
                <p>
                  Tips till provningen är att ha fyra glas redo då takten på
                  provningen kanske är snabbare än er konsumeringstakt. I övrigt
                  kommer provningen att ske på Zoom där varje öl kommer
                  presenteras i helgrupp, därefter kommer alla att skickas ut i
                  breakout-rooms så att ni kan mingla. Provningsledarna kommer
                  även att hoppa mellan rummen så att ni får chansen att ställa
                  frågor om ölen.
                </p>
                <p>
                  <a
                    href='https://liu-se.zoom.us/j/65436180091'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Här hålls ölprovingen (Zoom)
                  </a>
                </p>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <Header>Mingel</Header>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <p>
                  <b>Tid:</b> ca 16:30 - 18:00
                </p>
                <p>
                  Då ölprovningen går mot sitt slut kommer minglet att fortsätta
                  ända fram till dess att sittningen börjar. Minglet är en form
                  av digital speeddejt-bingo där ni randomiserat kommer att bli
                  placerade i breakout-rooms i några minuter för att sedan
                  tilldelas nya rum. Under tiden ni minglar kommer det att
                  finnas bingobrickor med påståenden, till exempel “Har varit på
                  10 SOF/STORK”. Er uppgift är att hitta personer som uppfyller
                  påståenden för att få BINGO! Därefter kommer rummen att vara
                  öppna för att fritt kunna mingla runt tills dess att
                  sittningen börjar. Vi uppmanar er som ska delta att ta chansen
                  att träffa och prata med nya personer!
                </p>
                <p>
                  För den som känner att den inte har fått nog av
                  studentorkesterhistoria kommer även Anders och Rune att finnas
                  på plats för att kunna svara på frågor, och kanske berätta en
                  och annan anekdot som inte rymdes under föreläsningen.
                </p>
                <p>
                  <a
                    href='https://liu-se.zoom.us/j/65436180091'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Här finner du minglet, notera att det är samma länk som
                    ölprovningen (Zoom)
                  </a>
                </p>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <Header>Spelhäng</Header>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <p>
                  <b>Tid:</b> 16:00 - 18:30
                </p>
                <p>
                  Parallellt med ölprovningen och minglet anordnas ett spelhäng
                  på Discord. Det kommer bland annat att spelas jackbox,
                  skribbl.io samt andra valfria spel som ni vill spela. Utöver
                  spelen kommer det även gå att delta i en byggtävling. Servern
                  och spelen kommer att öppnas kl 16:00 och vara öppna fram till
                  sittningen. Vill du inte spela är du självklart varmt
                  välkommen att bara titta på.
                </p>
                <p>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://discord.gg/VdS949Uc '
                  >
                    Här finner du spelhänget (Discord)
                  </a>
                </p>
                <p>
                  <b>Byggtävling*:</b>
                  <br />
                  Byggtävlingen går ut på att bygga en byggnad efter temat{" "}
                  <b>Ett magiskt SOF</b> i valfritt spel eller program. Bygget
                  måste innehålla fem saker som kommer att presenteras kl 16:00
                  i discordchatten <i>#byggtävling</i>. För att vara med i
                  tävlingen måste bygget vara minst till 50 % byggt av din grupp
                  och får inte innehålla något stötande eller kränkande. Bygget
                  kan förslagsvis byggas i Minecraft, Valheim eller Sims.
                </p>
                <p>
                  När bygget är klart ska det presenteras i discordchatten{" "}
                  <i>#byggtävling</i> innan kl 18:00 för att vara med och tävla.
                  Skapelserna kommer att bedömas utifrån utförande, anknytning
                  till tema samt detaljer. Priserna som står på spel är en
                  fräsig snowracer samt en månads Storytel-abonnemang.
                </p>
                <p>
                  Vill du vara med och tävla? Ladda ner ett spel och skicka in
                  ditt bidrag till kanalen <i>#byggtävling</i> på Discord senast
                  fredag 14 maj kl: 18:00.
                </p>
                <p>Må oddsen alltid vara på din sida!</p>
                <p>
                  <b>Spel:</b>
                </p>
                <p>
                  På discord-servern finns kanaler för jackbox, skribbl.io,
                  Among us och andra spel. Vi kommer erbjuda och arrangera
                  jackbox med möjlighet att spela jackbox 1-7 i fem olika
                  kanaler, där det bara är att hoppa in om du är sugen på att
                  spela eller beskåda. Det går att öppna fler kanaler om
                  intresset för att spela andra spel finns, till exempel
                  Counter-Strike: Global Offensive, League of Legends eller
                  liknande. Skriv i <i>#önskemål</i> så löser vi det åt er. Mer
                  info finns på Discord där du även kan ställa frågor till oss i{" "}
                  <i>#hjälp</i>.
                </p>
                <p style={{ fontSize: "0.7em", lineHeight: "inherit" }}>
                  * När du skickar in/deltar i tävlingen godkänner du att LinTek
                  - Linköpings teknologers studentkår sparar och använder den
                  inskickade informationen i samband med SOF21.{" "}
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://lintek-styrdokument.gitlab-pages.liu.se/rutiner/pdf/Rutin%20f%C3%B6r%20behandling%20av%20personuppgifter.pdf'
                  >
                    Här kan du läsa mer om hur LinTek behandlar dina
                    personuppgifter.
                  </a>
                </p>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <Header>Orkester- och gamlingsittning</Header>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <p>
                  <b>Tid:</b> 18:30 - 21:30
                </p>
                <p>
                  Klockan har slagit mycket, men inte sent. Det är dags för
                  aftonens höjdpunkt! Sittningen kommer att inledas vid 18:30.
                  Måltiden förväntas börja vid 18:45, så se till att maten är
                  redo för förtäring tills dess! Tillsammans ska ni nu få
                  uppleva god mat, god dryck och trevligt sällskap på den
                  digitala orkester- och gamlingsittningen. Kvällen kommer ledas
                  av Kommunikationschefen och Barputten från SOF21. Se till att
                  ha maten redo och bänka dig framför datorn med din
                  favoritdryck!
                </p>
                <p>
                  Temat för sittningen är <b>Festliga huvudbonader</b>, så leta
                  fram din gamla studentmössa, farfars fiskehatt, mosters
                  plommonstop eller grannens sombrero!
                </p>
                <p>
                  Nedan följer förslag på mat och dryck som vi tror kommer
                  förgylla aftonen:
                  <br />
                  <b>Huvudrätt:</b> Pizza <br />
                  Dryckesföreslag: En kall, mysig lager <br />
                  <br />
                  <b>Efterrätt:</b> Marängsviss <br />
                  Dryckesförslag: Irish Coffee
                </p>
                <p>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://liu-se.zoom.us/j/65436180091'
                  >
                    Här hittar du kvällens sittningslokal (Zoom)
                  </a>
                </p>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <Header>Eftersläpp</Header>
              </GridCell>
              <GridCell phone='4' tablet='8' desktop='12'>
                <p>
                  <b>Tid:</b> 21:30 - sent
                </p>
                <p>
                  Nu har klockan slagit sent, men inte så pass sent att det är
                  tidigt. Aftonen kommer nu att urarta i ett digitalt medium
                  nära dig. Vi hoppas att kvällen avslutas i ett gott sällskap
                  med flera goda drycker. Många fina minnen har skapats, och
                  glömts bort samma kväll, i en buss sent efter att festivalen
                  stängt sina grindar. Må internet bringa samma glädje detta år!
                </p>
                <p>
                  <a
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://discord.gg/e357FUg9'
                  >
                    Här finner du aftonens aftersläpp (Discord)
                  </a>
                </p>
              </GridCell>
            </GridInner>
          </Grid>
        )}
      </React.Fragment>
    )
  }
}

export default FridayEventInfo
