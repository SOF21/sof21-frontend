import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router'
import { GridCell, Grid, GridInner } from '@rmwc/grid';
import {
    DataTable,
    DataTableBody,
    DataTableContent,
    DataTableHead,
    DataTableRow,
    DataTableHeadCell,
    DataTableCell,
} from '@rmwc/data-table';
import {
    List,
    ListItem,
    ListItemGraphic,
    ListItemPrimaryText,
    ListItemSecondaryText,
    ListItemText,
} from '@rmwc/list';
import { Checkbox } from '@rmwc/checkbox';
import { Select } from '@rmwc/select';
import { Button } from '@rmwc/button';
import { TextField } from '@rmwc/textfield';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogButton
} from '@rmwc/dialog';

import { Formik, Form, setNestedObjectValues } from 'formik/dist/index';
import FormTextInput from '../../../../components/forms/components/FormTextInput'

import { Switch } from '@rmwc/switch';

import { FormattedMessage, injectIntl } from 'react-intl';

import {
    bookFunkis,
    checkInFunkis,
    getFunkisar,
    getFunkisTimeSlots,
    getFunkisTypes,
    unbookFunkis,
    updateFunkis,
} from '../../../../actions/funkis';

import { FunkisCheckInRow } from './FunkisCheckInRow'

const focusUsernameInputField = input => {
    if (input) {
        setTimeout(() => input.focus(), 100);
    }
};

const FunkisCheckInComponent = (
    {
        funkisar,
        getFunkisar,
        getFunkisTimeSlots,
        getFunkisTypes,
        checkInFunkis,
        positions,
        idTimeslots,
    }
) => {

    useEffect(() => {
        getFunkisar();
        getFunkisTimeSlots();
        getFunkisTypes();
    }, [getFunkisar, getFunkisTimeSlots, getFunkisTypes])

    const parseLiUCardCode = hexCode => {
        const decimalCode = parseInt(hexCode, 16)
        return decimalCode.length != 10 ? "0" + decimalCode : decimalCode
    }

    const [updateState, setState] = useState('')
    const handleSubmit = (values, bag) => {
        console.log("SUBMITTING")
        console.log(values)
        bag.setSubmitting(true)
        checkInFunkis(parseLiUCardCode(values.blipp))
            .then(res => {
                bag.setSubmitting(false);
            })
            .catch(err => {
                this.props.openDialog('Ajaj', 'Denna person verkar inte ha lagt till sin kod rätt, skriv in LiU-id istället');
                bag.setSubmitting(false);
            }) 
        bag.resetForm();
    }

    return (
        <>
            <Grid>
                <GridInner>
                    <GridCell desktop='12' tablet='8' phone='4'>
                        <Formik
                            initialValues={{ blipp: '' }}
                            onSubmit={handleSubmit}
                            render={({ values, handleChange, handleBlur, errors, touched, isValid, isSubmitting }) => {
                                return (
                                    <Form style={{ width: '100%' }}>
                                        <GridInner>
                                            {errors.global && <GridCell desktop='12' tablet='8' phone='4'> {errors.global}</GridCell>}

                                            <GridCell desktop='12' tablet='8' phone='4'>
                                                <FormTextInput
                                                    name='blipp'
                                                    label={'Blippa LiU-kort eller skriv in LiU-id'}
                                                    value={values.blipp}
                                                    error={errors.blipp}
                                                    touched={touched.blipp}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    //inputRef={focusUsernameInputField}
                                                    style={{width: '100%'}}
                                                />
                                            </GridCell>
                                            <GridCell desktop='6' tablet='4' phone='2'>
                                                <Button raised type='submit' disabled={!isValid || isSubmitting}>
                                                    Checka in
                                                </Button>
                                            </GridCell>
                                        </GridInner>
                                    </Form>
                                );
                            }}
                        />
                    </GridCell >
                    <GridCell desktop='12' tablet='8' phone='4'>
                        <TextField withLeadingIcon='search' label='Sök' id='searchBar' className='funkisSearch' />
                    </GridCell>
                    <GridCell desktop='12' tablet='8' phone='6'>
                        <DataTable style={{ maxWidth: '100%' }}>
                            <DataTableContent>
                                <DataTableHead>
                                    <DataTableRow>
                                        <DataTableHeadCell>Namn</DataTableHeadCell>
                                        <DataTableHeadCell>E-mail</DataTableHeadCell>
                                        <DataTableHeadCell>Funkistyp</DataTableHeadCell>
                                        <DataTableHeadCell>Pass</DataTableHeadCell>
                                        <DataTableHeadCell>Incheckad</DataTableHeadCell>
                                    </DataTableRow>
                                </DataTableHead>
                                <DataTableBody>
                                    {funkisar !== {} && Object.values(funkisar).map((f) => {
                                        return (
                                            <FunkisCheckInRow key={f.name}
                                                funkis={{
                                                    ...f,
                                                    funkisAlt: positions[f.selectedFunkisAlt],
                                                    timeSlots: f.selectedTimeSlots.map(t => {
                                                        const options = { day: 'numeric', month: 'numeric', hour: 'numeric', minute: 'numeric' };
                                                        const start = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].start_time);
                                                        const end = new Intl.DateTimeFormat('sv', options).format(idTimeslots[t].end_time);
                                                        const res = (`${start} -  ${end}`);
                                                        return idTimeslots[t]
                                                    })

                                                }}
                                            />
                                        );
                                    }
                                    )}
                                </DataTableBody>
                            </DataTableContent>
                        </DataTable>
                    </GridCell>
                </GridInner>
            </Grid>
        </>
    )
}

const mapStateToProps = (state) => ({
    funkisar: state.funkis.funkisar,
    loading: state.funkis.loading,
    timeslots: state.funkis.timeslots,
    positions: state.funkis.positions,
    idTimeslots: state.funkis.idTimeslots,
})

const mapDispatchToProps = (dispatch) => ({
    getFunkisar: () => dispatch(getFunkisar()),
    updateFunkis: (funkis) => dispatch(updateFunkis(funkis)),
    getFunkisTimeSlots: () => dispatch(getFunkisTimeSlots()),
    getFunkisTypes: () => dispatch(getFunkisTypes()),
    checkInFunkis: (checkedIn) => dispatch(checkInFunkis(checkedIn))
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(FunkisCheckInComponent))