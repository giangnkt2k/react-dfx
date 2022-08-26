import React, { useState } from "react"

import DauProgress from "components/Molecules/layouts/ProgressBar"
import MintProduct from "components/Molecules/layouts/Form/MintProduct"
import Container from "@mui/material/Container"

import defaultRoutes from "routes/routesProcessing"

function MintPage() {
  const [progress, setProgress] = useState(defaultRoutes.createSeller)
  const [values, setValues] = useState({
    file: undefined,
    name: "",
    description: "",
  })

  const handleNextStep = () => {
    const nextProgress = defaultRoutes.functions.nextStep(progress)
    setProgress([...nextProgress])
  }

  const handlePreviousStep = () => {
    const previousProgress = defaultRoutes.functions.previousStep(progress)
    setProgress([...previousProgress])
  }

  return (
    <Container>
      <DauProgress progress={progress} />
      <MintProduct
        onNextStep={handleNextStep}
        values={values}
        setValues={setValues}
      />
    </Container>
  )
}

export default MintPage
