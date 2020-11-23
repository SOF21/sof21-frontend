import React, { Component, forwardRef } from 'react';

import {
  Card,
  CardMedia,
} from '@rmwc/card';

import { Ripple } from '@rmwc/ripple';

import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
} from '@rmwc/list';

import posed from 'react-pose/lib/index';

const FCard = forwardRef((props, ref) => 
  <Card elementRef={ref} {...props}>
    {props.children}
  </Card>
);

const PosedTransformableCard = posed(FCard)({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  desktop: {

  },
  intermediateMobile: {
  
  },
  intermediateDesktop: {
  
  },
  mobile: {
  },
});

const FCardMedia = forwardRef((props, ref) =>
  <CardMedia elementRef={ref} {...props}/>
);

//TODO: bit iffy animation
const PosedTransformableCardMedia = posed(FCardMedia)({
  desktop: {
    paddingTop: '80%',
    applyAtStart: {width: '100%'}
  },
  intermediateDesktop: {
    paddingTop: '0%',
    applyAtEnd: {width: '0px'}
  },
  intermediateMobile: {
    width: '0px',
    applyAtEnd: {paddingTop: '0%', height: '0px'}
  },
  mobile: {
    applyAtStart: {height: '112px'},
    width: '112px',
  }
})

const FListItemGraphic = forwardRef((props, ref) =>
  <ListItemGraphic elementRef={ref} {...props}/>
);

const PosedTransformableListItemGraphic = posed(FListItemGraphic)({
  desktop: {
  },
  intermediateDesktop: {
  },
  intermediateMobile: {
    applyAtStart:{display: 'initial'},
    width: '32px',
    height: '32px',
    fontSize: '32px',
    marginRight: '16px',
    marginLeft: '0px',
  },
  mobile: {
    applyAtEnd:{display: 'none'},
    width: '0px',
    height: '0px',
    fontSize: '0px',
    marginRight: '32px',
    marginLeft: '-32px',
  }
})

class ContactCard extends Component{
  constructor(props){
    super(props)

    this.handleResize = this.handleResize.bind(this);
    this.poseFinish = this.poseFinish.bind(this);
    this.clickMediaHandler = this.clickMediaHandler.bind(this);
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
    this.toggleState = this.toggleState.bind(this);

    if(window.innerWidth < 480){
      this.state = {mobileView: true, pose: 'mobile', isMobile: true};
      }
    else{
      this.state = {mobileView: false, pose: 'desktop', isMobile: false};
    }
  }


  // TODO: Do this on props change instead
  handleResize() {
    if(!this.state.isMobile && window.innerWidth < 480){
      this.setState({isMobile: true});
      this.collapse();
    } else if(this.state.isMobile && window.innerWidth >= 480){
      this.setState({isMobile: false});
      this.expand();
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  poseFinish(pose){
    if(pose === 'intermediateDesktop'){
      this.setState({pose: 'mobile'});
    }else if(pose === 'intermediateMobile'){
      this.setState({pose: 'desktop'});
    }
  }

  expand(){
    if(this.state.mobileView){
      this.setState({
        mobileView: false,
        pose: 'intermediateMobile'
      })
    }
  }

  collapse(){
    if(!this.state.mobileView){
      this.setState({
        mobileView: true,
        pose: 'intermediateDesktop'
      })
    }
  }

  toggleState(){
    if(this.state.mobileView){
      this.expand();
    } else{
      this.collapse();
    }
  }

  clickMediaHandler(){
    if(this.state.isMobile){
      this.toggleState();
    }else{
      if(this.props.allClickCallback){
        this.props.allClickCallback();
      }
    }
  }

  render(){
    const mailSuffix = (this.props.mailSuffix) ? this.props.mailSuffix : '@sof.lintek.nu';

    const mobileClass = (this.state.pose === 'mobile' || this.state.pose === 'intermediateMobile') ? 'contact-card-mobile' : '';

    return(
      <React.Fragment>
        <PosedTransformableCard 
          className='contact-card' 
          pose={this.state.pose}
          onPoseComplete={(pose) => this.poseFinish(pose)}
        >
          <Ripple disabled={!this.state.isMobile} >
            <PosedTransformableCardMedia
              onClick={this.clickMediaHandler}
              className={(this.state.isMobile) ? 'contact-card-media ' + mobileClass : 'contact-card-media mdc-item-uninteractive ' + mobileClass}
              style={{ backgroundImage: 'url(' + this.props.image + ')', flexShrink: '0' }}
            />
          </Ripple>
          <List twoLine nonInteractive avatarList >
            <ListItem ripple={false} style={{overflow: 'visible'}}>
              <PosedTransformableListItemGraphic 
                className='avatar-graphic' 
                style={{ backgroundImage: 'url(' + this.props.image + ')' }}
              />
              <ListItemText>
                <ListItemPrimaryText>{this.props.name}</ListItemPrimaryText>
                <ListItemSecondaryText 
                  style={{display: 'inline-block', whiteSpace: 'normal', lineHeight: '1rem'}}
                >
                  {this.props.title}
                </ListItemSecondaryText>
              </ListItemText>
            </ListItem>
            <ListItem ripple={false}  style={{lineHeight: '1rem'}}>
              <PosedTransformableListItemGraphic icon="mail" className='select-none' style={{color: '#F00'}}/>
              <div className='select-all'>
                {this.props.email}<wbr/>{mailSuffix}
              </div>
            </ListItem>
          </List>
        </PosedTransformableCard>
      </React.Fragment>
    );
  }
}

export default ContactCard;

