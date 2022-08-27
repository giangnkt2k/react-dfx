import React, { useState } from "react"

import DauHeader from "components/Molecules/layouts/Header"
import DauProgress from "components/Molecules/layouts/ProgressBar"
import Seller from "components/Molecules/layouts/Form/CreateSeller"
import Container from "@mui/material/Container"

import defaultRoutes from "routes/routesProcessing"

function CreateSeller() {
  const [progress, setProgress] = useState(defaultRoutes.createSeller)

  const handleNextStep = () => {
    const nextProgress = defaultRoutes.functions.nextStep(progress)
    setProgress([...nextProgress])
  }

  const handlePreviousStep = () => {
    const previousProgress = defaultRoutes.functions.previousStep(progress)
    setProgress([...previousProgress])
  }

  return (
    <>
      <DauHeader
        changeColorOnScroll={{
          height: 1,
          color: "transparent",
          shadow: "none",
        }}
      />
      <Container>
        <DauProgress progress={progress} />
        <Seller onNextStep={handleNextStep} />
      </Container>
    </>
  )
}

export default CreateSeller
