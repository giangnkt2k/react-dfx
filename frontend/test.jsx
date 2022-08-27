import React, { useState } from "react"

import DauProgress from "components/Molecules/layouts/ProgressBar"
import Seller from "components/Molecules/layouts/Form/CreateSeller"
import MintProduct from "components/Molecules/layouts/Form/MintProduct"
import ProcessingStep from "components/Molecules/layouts/Form/PublicStep/ProcessingStep"
import StakeForm from "components/Molecules/layouts/Form/StakeForm"

import CreateSeller from "pages/FormPages/CreateSeller"
import MintPage from "pages/FormPages/MintPage"
import CreateRealProduct from "pages/FormPages/CreateRealProduct"
import StakeToken from "pages/FormPages/StakeToken"

import defaultRoutes from "routes/routesProcessing"
import { Container } from "@mui/material"

import StakeTable from "./components/Molecules/layouts/Table/StakeTable"
import MyStake from "pages/TablePages/MyStake"

function Test() {
  return <MyStake />
}

export default Test
