/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react"

import { FormattedMessage, injectIntl } from "react-intl"

import { GridCell, GridInner } from "@rmwc/grid"
import { Button } from "@rmwc/button"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton,
} from "@rmwc/dialog"

import FormTextInput from "../../components/forms/components/FormTextInput"
import { Select } from "@rmwc/select"
import { Formik, Form } from "formik/dist/index"
import * as Yup from "yup"

import { getCurrentUser } from "../../api/userCalls"
import { addExtraWebshopData } from "../../api/ticketPickupCalls"

const extraWebshopDataComponent = (props) => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const [dialogOpen, setOpen] = useState(false)

  const handleSubmit = (values) => {
    getCurrentUser().then((response) => {
      addExtraWebshopData({
        id: response.data.id,
        ...values,
      })
    })
  }

  return (
    <>
      <GridCell desktop='12' tablet='8' phone='4' className='h-center'>
        <Button raised onClick={() => setOpen(true)}>
          Lägg till information för att kunna handla i webshopen!
        </Button>
      </GridCell>
      <GridCell desktop='12' tablet='8' phone='4'>
        <Formik
          initialValues={{ adress: "", phone: "" }}
          validationSchema={Yup.object().shape({
            adress: Yup.string().required("Du måste ange en address"),
            phone: Yup.string()
              .matches(phoneRegExp, "Mobilnummret är inte korrekt")
              .required("Du måste ange ett mobilnummer"),
          })}
          onSubmit={handleSubmit}
          render={({
            values,
            handleChange,
            handleBlur,
            errors,
            touched,
            isValid,
            isSubmitting,
          }) => (
            <Form style={{ width: "100%" }}>
              <Dialog
                open={dialogOpen}
                onClose={() => setOpen(false)}
                className='unclickable-scrim-dialog'
              >
                <DialogTitle>
                  Lägg till information för att kunna handla i webshopen!
                </DialogTitle>
                <DialogContent>
                  <GridInner>
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <p>Alla leveranser sker på lördag den 15/5. </p>
                      <p><b>Tider för upphämtning:</b></p>
                      <ul style={{ textAlign: "left", fontSize: "14px" }}>
                        <li>Ryd [HG] (10:00 - 13:00)</li>
                        <li>Colonia (10:00 - 10:30)</li>
                        <li>Vallastaden AutoMat (10:35 - 11:05),</li>
                        <li>VilleValla (11:15 - 11:45)</li>
                        <li>Flamman (11:50 - 12.30)</li>
                        <li>
                          Katedralskolan, norra parkeringen (12.25 - 12:55)
                        </li>
                        <li>Trappan (13:35 - 14:05)</li>
                      </ul>
                      <p>Om ingen av dessa tider fungerar går det att hämta paketet i Ryd vid 15:00, välj 'Ryd [hg] (15:00)' i listan</p>
                    </GridCell>
                    {errors.global && (
                      <GridCell desktop='12' tablet='8' phone='4'>
                        {" "}
                        {errors.global}
                      </GridCell>
                    )}
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <FormTextInput
                        style={{ width: "100%" }}
                        name='phone'
                        label={"Mobilnummer"}
                        value={values.phone}
                        error={errors.phone}
                        touched={touched.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </GridCell>
                    <GridCell desktop='12' tablet='8' phone='4'>
                      <Select
                        id='adress'
                        options={[
                          {
                            label: "Linköping",
                            options: [
                              "Ryd [hg] (10:00 - 13:00)",
                              "Colonia (10:00 - 10:30)",
                              "Vallastaden AutoMat (10:35 - 11:05)",
                              "VilleValla (11:15 - 11:45)",
                              "Flamman (11:50 - 12.30)",
                              "Katedralskolan, norra parkeringen (12.25 - 12:55)",
                              "Ryd [hg] (15:00)",
                            ],
                          },
                          {
                            label: "Norrköping",
                            options: ["Trappan (13:35 - 14:05)"],
                          },
                        ]}
                        value={values.adress || ""}
                        onChange={handleChange}
                      />
                    </GridCell>
                  </GridInner>
                </DialogContent>
                <DialogActions>
                  <DialogButton action='close' type='button' isDefaultAction>
                    Avbryt
                  </DialogButton>
                  <DialogButton
                    action='close'
                    type='submit'
                    disabled={!isValid}
                  >
                    Skicka
                  </DialogButton>
                </DialogActions>
              </Dialog>
            </Form>
          )}
        />
      </GridCell>
    </>
  )
}

export default injectIntl(extraWebshopDataComponent)
