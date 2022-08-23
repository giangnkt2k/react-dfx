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
import MKAvatar from "components/MKAvatar"

// Import Icons
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"

// Import Image
import defaultAvatar from "assets/images/default-avatar.png"
import ButtonAdd from "./components/ButtonAdd"
import PreviewFile from "./components/PreviewFile"

const myTextFieldStyle = {
  "& .MuiFormHelperText-root": {
    color: "red !important",
  },
}

function MintProduct() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      photo: {},
      description: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("dasdasdasd"),
      email: yup.string().email().required("dasdasdas"),
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
    setSourceImg(defaultAvatar)
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
                    Files
                  </MKTypography>
                  <MKBox
                    component="section"
                    bgColor="light"
                    variant="gradient"
                    p={1}
                    borderRadius="sm"
                  >
                    <ButtonAdd />
                    <PreviewFile />
                  </MKBox>
                </Grid>
                <Grid item xs={12}>
                  <MKTypography variant="h6" mb={1}>
                    Filename
                  </MKTypography>
                  <MKInput
                    id="username"
                    name="username"
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                    variant="outlined"
                    fullWidth
                    placeholder="Type something"
                    sx={myTextFieldStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MKTypography variant="h6" mb={1}>
                    Description
                  </MKTypography>
                  <MKInput
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    variant="outlined"
                    multiline
                    fullWidth
                    rows={6}
                    placeholder="Type something"
                  />
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
                    Mint
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

export default MintProduct
