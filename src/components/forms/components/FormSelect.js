import React from 'react';
import { Select } from '@rmwc/select';

import {PosedErrorText} from './FormTextInput';

class FormSelect extends React.Component {


  handleChange = value => {
    // this is going to call setFieldValue and manually update values.instr
    this.props.onChange(this.props.field, eval(value.target.value));
    if (this.props.specialAns) {
      this.props.specialAns(value.target.value);
    }
  };

  handleBlur = () => {
    //this is going to call setFieldTouched and manually update touched.topcis
   this.props.onBlur(this.props.field, true);
  };


  render() {
    const {touched, error, options, ...props} = this.props;

    var inSelect = null;
    if(!props.enhanced) {
      inSelect = (
        options.map( (dict) => 
          <option
            value={dict.value}
            key={dict.key}
          >
            {dict.label}
          </option>
      ));
    }

    const errorPose = (touched && error) ? 'error' : 'noError';

    return (
      <React.Fragment>
        <Select
          {...props}
          className={touched && error ? 'mdc-select--invalid' : ''}
          options={props.enhanced && props.options}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        >
          {inSelect}
        </Select>

        <PosedErrorText pose={errorPose} persistent style={{color: '#FF0000'}} className='form-error-text'>
          {touched && error}
        </PosedErrorText>
      </React.Fragment>
    );
  }
}

export default FormSelect;
