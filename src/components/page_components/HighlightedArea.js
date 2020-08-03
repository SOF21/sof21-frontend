import React, { Component } from 'react';

import { Grid, GridInner } from '@rmwc/grid';

class HighlightedArea extends Component {

  render(){
    var areaCname = 'highlighted-area-red';
    if(this.props.color === 'pink'){
      areaCname = 'highlighted-area-pink';
    }else if(this.props.color ==='yellow'){
      areaCname = 'highlighted-area-yellow';
    }
    return(
      <React.Fragment>
        <Grid className={areaCname} >
          <GridInner 
            className={['highlighted-area-inner', this.props.className].join(' ')}
          >
            {this.props.children}
          </GridInner>
        </Grid>
      </React.Fragment>
    );
  }
}

export default HighlightedArea;
