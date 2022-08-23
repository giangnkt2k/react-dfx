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


import Seller from "components/Molecules/layouts/Form/CreateSeller"

function Test() {
  return (
    <Container style={{ height: 20000 }}>
      <Seller />
    </Container>
  )
}

export default Test
