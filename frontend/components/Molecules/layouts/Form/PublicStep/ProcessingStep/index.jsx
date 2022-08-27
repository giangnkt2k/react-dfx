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

// Import Image
import defaultAvatar from "assets/images/default-avatar.png"

function ProcessingStep({ values, totalSteps }) {
  return Object.keys(values).length === totalSteps - 1 ? (
    <MKBox
      component="section"
      bgColor="white"
      p={4}
      shadow="md"
      borderRadius="xl"
      my={3}
    >
      <Container>
        <LinearProgress color="secondary" sx={{ overflow: "hidden" }} />
      </Container>
    </MKBox>
  ) : null
}

export default ProcessingStep
