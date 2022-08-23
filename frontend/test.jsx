import React, { useState } from "react"

import DauProgress from "components/Molecules/layouts/ProgressBar"
import Seller from "components/Molecules/layouts/Form/CreateSeller"
import MintProduct from "components/Molecules/layouts/Form/MintProduct"
import Container from "@mui/material/Container"

import CreateSeller from "pages/FormPages/CreateSeller"

import defaultRoutes from "routes/routesProcessing"

function Test() {
  return (
    <Container style={{ height: 20000 }}>
      <MintProduct />
    </Container>
  )
}

export default Test
