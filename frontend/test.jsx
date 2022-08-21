import React from "react"
import DauHeader from "components/Molecules/layouts/Header"
<<<<<<< HEAD
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
=======
import Seller from "components/Molecules/layouts/Form/CreateSeller"
import Container from "@mui/material/Container"

function Test() {
  return (
    <Container style={{ height: 20000 }}>
      <Seller />
    </Container>
>>>>>>> 2684b4a42f2540c10b6b4253f6e80bcbf0282b28
  )
}

export default Test
