import React, { useState, useRef, useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import LinearProgress from "@mui/material/LinearProgress"
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
import ReportIcon from "@mui/icons-material/Report"

// Import Image
import defaultAvatar from "assets/images/default-avatar.png"

function ErrorStep({ values, totalSteps, error }) {
  return Object.keys(values).length === totalSteps && error ? (
    <MKBox
      component="section"
      bgColor="grey-100"
      p={4}
      shadow="md"
      borderRadius="xl"
      my={3}
    >
      <Container sx={{ textAlign: "center", color: "#F44335" }}>
        <ReportIcon sx={{ fontSize: "150px !important" }} />
        <MKTypography variant="h4" color="error">
          Something Error!!!
        </MKTypography>
        <Grid container justifyContent="center" mt={4}>
          <Grid item xs={3} mx={2}>
            <MKButton variant="gradient" color="light" fullWidth>
              Reinput
            </MKButton>
          </Grid>
          <Grid item xs={3} mx={2}>
            <MKButton variant="gradient" color="dark" fullWidth>
              OK
            </MKButton>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  ) : null
}

export default ErrorStep
