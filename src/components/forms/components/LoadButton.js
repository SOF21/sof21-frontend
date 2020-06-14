import React, { forwardRef } from 'react';

import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';

import posed from 'react-pose';

const FButton = forwardRef((props, ref) => (
  <Button elementRef={ref} {...props}>
    {props.children}
  </Button>
));

const PosedButton = posed(FButton)({
  loading: {
    paddingRight: '42px'
  },
  notLoading: {
    paddingRight: '16px'
  }
});


class LoadButton extends React.Component {
  render() {
    const { loading, disabled, ...props } = this.props;

    return (
      <React.Fragment>
        <PosedButton
          {...props}
          disabled={disabled || loading}
          pose={loading ? 'loading' : 'notLoading'}
        >
          {props.children}
          {loading ? <CircularProgress size="xsmall"
            style={{position: 'absolute', right: '0', color: 'rgba(0, 0, 0, 0.37)', marginRight: '16px'}} />
              : null
          }
        </PosedButton>
      </React.Fragment>
    );
  }
}

export default LoadButton;
