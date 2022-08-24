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

const myTextFieldStyle = {
  "& .MuiFormHelperText-root": {
    color: "red !important",
  },
}

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

function FormStepOne({ onNextStep }) {
  const formik = useFormik({
    initialValues: {
      productName: "",
      description: "",
      duration: 1,
    },
    validationSchema: yup.object({
      //   productName: yup.string().required("dasdasdasd"),
      //   duration: yup.number().min(1, "Enter number please."),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values)
      onNextStep()
      setTimeout(() => {
        onNextStep()
      }, 5000)
    },
  })

  const handleReset = () => {
    formik.handleReset()
  }

  return (
    <MKBox
      component="section"
      bgColor="white"
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
            Add to your collection
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
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MKTypography variant="h6" mb={1}>
                    Product Name
                  </MKTypography>
                  <MKInput
                    id="productName"
                    name="productName"
                    error={
                      formik.touched.productName &&
                      Boolean(formik.errors.productName)
                    }
                    onChange={formik.handleChange}
                    value={formik.values.productName}
                    helperText={
                      formik.touched.productName && formik.errors.productName
                    }
                    variant="outlined"
                    fullWidth
                    placeholder="Type something"
                    sx={myTextFieldStyle}
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
                <Grid item xs={12}>
                  <MKTypography variant="h6">Auction Duration</MKTypography>
                </Grid>
              </Grid>
              <Grid container justifyContent="end" my={2}>
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
  )
}

export default FormStepOne
