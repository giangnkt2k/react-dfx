import React from "react"

// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKPagination from "components/MKPagination"

// Material Icon
import CheckIcon from "@mui/icons-material/Check"

import MyProgressStep from "./MyProgressStep"

function DauProgress({ progress }) {
  const renderProgress = progress.map(({ label, status }, index) => {
    return (
      <MyProgressStep
        firstItem={index}
        key={index}
        status={status}
        label={label}
      >
        {status === "done" ? <CheckIcon /> : index + 1}
      </MyProgressStep>
    )
  })

  return (
    <MKBox
      component="section"
      bgColor="grey-100"
      py={4}
      px={10}
      shadow="md"
      borderRadius="xl"
      my={3}
    >
      <Container>
        <Grid
          container
          item
          xs={12}
          mx="auto"
          justifyContent="center"
          alignItems="center"
          wrap="nowrap"
        >
          {renderProgress}
        </Grid>
      </Container>
    </MKBox>
  )
}

export default DauProgress
