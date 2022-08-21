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
import routesDefault from "routes/routesProcessing"

function Test() {
  return (
    <>
      <Container style={{ height: 20000, padding: 30 }}>
        <DauProgress progress={routesDefault.createRealProduct} />
      </Container>
    </>
  )
}

export default Test
