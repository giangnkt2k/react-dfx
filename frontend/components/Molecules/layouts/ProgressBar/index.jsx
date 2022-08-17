import React from "react"

// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKPagination from "components/MKPagination"

function DauProgress({ progress }) {
  let propertyMkbox = {
    width: "100%",
    maxWidth: "250px",
    height: 2,
    backgroundColor: "secondary.light",
    marginRight: 1,
    marginLeft: 1,
  }

  const renderProgress = progress.map(({ label, step, status }) => {
    if (step === 1) return <MKPagination item>{step}</MKPagination>
    return (
      <>
        <MKBox sx={propertyMkbox}></MKBox>
        <MKPagination item>{step}</MKPagination>
      </>
    )
  })

  return (
    <MKBox
      component="section"
      bgColor="white"
      py={4}
      px={10}
      shadow="md"
      borderRadius="xl"
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
