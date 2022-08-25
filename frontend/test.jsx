import React, { useState } from "react"

import DauProgress from "components/Molecules/layouts/ProgressBar"
import Seller from "components/Molecules/layouts/Form/CreateSeller"
import MintProduct from "components/Molecules/layouts/Form/MintProduct"
import CreateRealProduct from "components/Molecules/layouts/Form/CreateRealProduct"

import Container from "@mui/material/Container"

import CreateSeller from "pages/FormPages/CreateSeller"
import MintPage from "pages/FormPages/MintPage"

import defaultRoutes from "routes/routesProcessing"

function Test() {
  return (
    <Container>
      <CreateRealProduct />
    </Container>
  )
}

export default Test
