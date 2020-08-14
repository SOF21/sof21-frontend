
import React from 'react'

import { useIntl } from 'react-intl'

import { TextField } from '@rmwc/textfield'

const SearchField = ({handleChange}) => {
    const intl = useIntl()

    return (
        <TextField
            outline="true"
            className="search"
            type="search"
            withLeadingIcon="search"
            label={intl.formatMessage({id: 'Contact.search'})}
            onChange={ handleChange }
            style={{width:'100%'}}
        /> 
    )

}

export default SearchField