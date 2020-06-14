import React, { Component } from 'react';

import {
  List,
  ListGroup,
  ListItem,
  ListItemMeta,
  ListItemGraphic,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  Avatar,
} from '@rmwc/list';

export default class CortegeEntry extends Component{
  render(){

    return(
      <React.Fragment>
        <ListItem 
          ripple={false}
          className='mdc-item-uninteractive'
          style={{
            //paddingLeft: '0px',
          }}
        >
            {/*<div style={{ height: '72px' }} onClick={() => this.props.onClickCallback(this.props.num)}>
            <img
              className='cortege-entry-image'
              src={this.props.entry.img}
            />
          </div>*/}
          <div
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
          >
            <div
              style={{lineHeight: '1rem', flexGrow: '3'}}
            >
              {'' + (this.props.num + 1) + ". " + this.props.entry.name}
            </div>
            <div
              style={{fontSize: '0.8rem', color: '#555'}}
            >
              {this.props.entry.type}
            </div>
          </div>
        </ListItem>
      </React.Fragment>
    );
  }
}
