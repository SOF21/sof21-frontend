import React, { Component } from 'react';
import ReactDOM from 'react-dom'

import posed from 'react-pose/lib/index';

import ScrollLock, { TouchScrollable } from 'react-scrolllock';

import { IconButton } from '@rmwc/icon-button';

const Frame = posed.div({
  closed: {
    applyAtEnd: { display: 'none' },
    opacity: 0
  },
  open: {
    applyAtStart: { display: 'block' },
    opacity: 1
  }
});

const Container = posed.div({
  closed: {
    applyAtEnd: { display: 'none' },
    opacity: 0,
    scale: 0.8,
    transition:{
      duration: 150,
    }
  },
  open: {
    applyAtStart: { display: 'flex' },
    opacity: 1,
    scale: 1,
  }
});


export default class Modal extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount() {

  }

  render(){
    const content = (
      <div>
        <ScrollLock
          isActive={this.props.isOpen}
        />
        <TouchScrollable>
          <Frame
            className = 'modal-frame' 
            pose={(this.props.isOpen) ? 'open' : 'closed'}
            onClick={() => this.props.exitCallback()}
          />
          <Container className = 'modal-container' pose={(this.props.isOpen) ? 'open' : 'closed'}>
            <IconButton
              icon='close'
              className='modal-exit-button'
              onClick={() => this.props.exitCallback()}
            />
              {this.props.children}
          </Container>
        </TouchScrollable>
      </div>
    );

    const portalElem = document.getElementById("modal-root");

    return ReactDOM.createPortal(content, portalElem);
    
  }
}

