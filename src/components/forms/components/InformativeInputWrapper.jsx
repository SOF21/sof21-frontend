import React from 'react';
import { GridInner, GridCell } from 'rmwc';
const InformativeInputWrapper = ({
  infoText,
  children,
  align,
}) => {
  return(
    <>
      <GridInner className='text-info-container'>
        <GridCell align={align} className='text-info' desktop='12' tablet='8' phone='4'>
          {infoText}
        </GridCell>
        <GridCell align={align} desktop='12' tablet='8' phone='4'>
          {children}
        </GridCell>
      </GridInner>
    </>
  );
}
export default InformativeInputWrapper;