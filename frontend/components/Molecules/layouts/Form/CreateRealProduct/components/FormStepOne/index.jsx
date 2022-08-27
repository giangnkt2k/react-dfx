import React, { useState, useRef, useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKInput from "components/MKInput"
import MKButton from "components/MKButton"
import MKRadioGroup from "components/MKRadioGroup"
import MKSelection from "../../../../../../MKSelection"
import { useCanister } from "@connect2ic/react"

const convertDaysToMiliSeconds = (days) => {
  return parseFloat(days) * 86400000
}

const radioItems = {
  items: [
    { id: 1, title: "24 Hours" },
    { id: 3, title: "3 Days" },
    { id: 7, title: "7 Days" },
  ],
  optional: { id: 0, title: "Day(s)" },
}

function FormStepOne({ onNextStep, values, setValues }) {
  const [marketplace_auction, { loadingDip721, errorDip721 }] = useCanister(
    "marketplace_auction",
    {
      mode: "anonymous",
    },
  )
  const [symbols, setSymbols] = useState([{ id: "BTC", title: "Bitcoin" }])

  const formik = useFormik({
    initialValues: values.s1,
    validationSchema: yup.object({
      title: yup.string().required("This field is required."),
      description: yup.string().required("This field is required."),
      duration: yup
        .number()
        .typeError("Must be numeric.")
        .positive("More than 0."),
      startPrice: yup
        .number()
        .typeError("Must be numeric.")
        .positive("More than 0.")
        .required("This field is required."),
      stepBid: yup
        .number()
        .typeError("Must be numeric.")
        .positive("More than 0.")
        .required("This field is required."),
    }),
    enableReinitialize: true,
    onSubmit: (formikValues) => {
      onNextStep()
      console.log(formikValues)
      setValues({
        s1: {
          ...formikValues,
        },
        s2: {},
      })
    },
  })

  const handleReset = () => {
    formik.handleReset()
  }

  useEffect(async () => {
    try {
      const dataRes = await marketplace_auction.GetSupportedPayment()
      console.log(dataRes)
      setSymbols(dataRes)
    } catch (err) {
      console.log(err)
    }
  }, [])

  return Object.keys(values).length === 1 ? (
    <MKBox
      component="section"
      bgColor="grey-100"
      p={4}
      shadow="md"
      borderRadius="xl"
      my={3}
    >
      <Container>
        <Grid
          container
          item
          justifyContent="center"
          xs={10}
          lg={7}
          mx="auto"
          textAlign="center"
        >
          <MKTypography variant="h3" mb={1}>
            Create Product
          </MKTypography>
        </Grid>
        <Grid container item xs={12} lg={10} sx={{ mx: "auto" }}>
          <MKBox
            width="100%"
            component="form"
            method="post"
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            onReset={handleReset}
          >
            <MKBox p={3}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={12}>
                  <MKTypography variant="h6" mb={1}>
                    Product Name
                  </MKTypography>
                  <MKInput
                    id="title"
                    name="title"
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    helperText={formik.touched.title && formik.errors.title}
                    variant="outlined"
                    fullWidth
                    placeholder="Type something"
                  />
                </Grid>
                <Grid item xs={12}>
                  <MKTypography variant="h6" mb={1}>
                    Description - Please be details as possible
                  </MKTypography>
                  <MKInput
                    id="description"
                    name="description"
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    variant="outlined"
                    multiline
                    fullWidth
                    rows={8}
                    placeholder="Type something"
                  />
                </Grid>
                <Grid item xs={12}>
                  <MKTypography variant="h6">Auction Duration</MKTypography>
                  <MKRadioGroup
                    radioItems={radioItems}
                    name="duration"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={4}>
                  <MKTypography variant="h6" mb={1}>
                    Currency Amount
                  </MKTypography>
                  <MKSelection
                    formik={formik}
                    label="Currency"
                    name="currency"
                    items={symbols}
                  />
                </Grid>
                <Grid item xs={4}>
                  <MKInput
                    id="startPrice"
                    name="startPrice"
                    error={
                      formik.touched.startPrice &&
                      Boolean(formik.errors.startPrice)
                    }
                    onChange={formik.handleChange}
                    value={formik.values.startPrice}
                    helperText={
                      formik.touched.startPrice && formik.errors.startPrice
                    }
                    label="Start Price"
                    variant="outlined"
                    placeholder="Type something"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <MKInput
                    id="stepBid"
                    name="stepBid"
                    error={
                      formik.touched.stepBid && Boolean(formik.errors.stepBid)
                    }
                    onChange={formik.handleChange}
                    value={formik.values.stepBid}
                    helperText={formik.touched.stepBid && formik.errors.stepBid}
                    label="Step Price"
                    variant="outlined"
                    placeholder="Type something"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="end" mt={4}>
                <Grid item xs={3} mr={2}>
                  <MKButton
                    type="reset"
                    variant="outlined"
                    color="dark"
                    fullWidth
                  >
                    Reset
                  </MKButton>
                </Grid>
                <Grid item xs={3} ml={2}>
                  <MKButton
                    type="submit"
                    variant="gradient"
                    color="dark"
                    fullWidth
                  >
                    Next
                  </MKButton>
                </Grid>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  ) : null
}

export default FormStepOne
