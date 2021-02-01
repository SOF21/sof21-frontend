import React from 'react';
import { Checkbox } from '@rmwc/checkbox';

import {PosedErrorText} from './FormTextInput';

class FormCheckbox extends React.Component {

  render() {
    const {touched, error, options, ...props} = this.props;

    const errorPose = (touched && error) ? 'error' : 'noError';

    return (
      <React.Fragment>
        <Checkbox
          {...props}
          options={props.enhanced && props.options}
        >
        </Checkbox>

        <PosedErrorText pose={errorPose} persistent style={{color: '#FF0000'}} className='form-error-text'>
          {touched && error}
        </PosedErrorText>
      </React.Fragment>
    );
  }
}

export default FormCheckbox;
