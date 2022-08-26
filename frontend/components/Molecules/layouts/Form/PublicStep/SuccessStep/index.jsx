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
import DoneAllIcon from "@mui/icons-material/DoneAll"

// Import Image
import defaultAvatar from "assets/images/default-avatar.png"

function SuccessStep({ values, totalSteps, success }) {
  return Object.keys(values).length === totalSteps && success ? (
    <MKBox
      component="section"
      bgColor="white"
      p={4}
      shadow="md"
      borderRadius="xl"
      my={3}
    >
      <Container sx={{ textAlign: "center", color: "#66BB6A" }}>
        <DoneAllIcon sx={{ fontSize: "150px !important" }} />
        <MKTypography variant="h4" color="success">
          Create Success!!!
        </MKTypography>
        <Grid container justifyContent="center" mt={4}>
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

export default SuccessStep
