import React from "react"
import DauHeader from "components/Molecules/layouts/Header"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
// Material Kit 2 React components
import MKPagination from "components/MKPagination"

// Import Icons Material UI
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"

import DauProgress from "components/Molecules/layouts/ProgressBar"

function Test() {
  return (
    <>
      <DauHeader
        changeColorOnScroll={{
          height: 1,
          color: "transparent",
          shadow: "none",
        }}
        isLogin={false}
      />
      <Container style={{ height: 20000 }}>
        <Grid container item justifyContent="center" xs={12} lg={6} mx="auto">
          <MKPagination>
            <MKPagination item>
              <KeyboardArrowLeftIcon />
            </MKPagination>
            <MKPagination item active>
              1
            </MKPagination>
            <MKPagination item active>
              2
            </MKPagination>
            <MKPagination item>3</MKPagination>
            <MKPagination item>4</MKPagination>
            <MKPagination item>5</MKPagination>
            <MKPagination item>
              <KeyboardArrowRightIcon />
            </MKPagination>
          </MKPagination>
        </Grid>
        <DauProgress
          progress={[
            { label: "1", step: 1, status: true },
            { label: "2", step: 2, status: true },
            { label: "3", step: 3, status: true },
          ]}
        />
      </Container>
    </>
  )
}

export default Test
