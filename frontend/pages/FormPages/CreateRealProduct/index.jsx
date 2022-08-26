import React, { useEffect, useState } from "react"

// Import component MUI
import Container from "@mui/material/Container"

import DauHeader from "components/Molecules/layouts/Header"
import DauProgress from "components/Molecules/layouts/ProgressBar"
import {
  FormStepOne,
  FormStepTwo,
} from "components/Molecules/layouts/Form/CreateRealProduct"

import {
  ProcessingStep,
  SuccessStep,
  ErrorStep,
} from "components/Molecules/layouts/Form/PublicStep"

import defaultRoutes from "routes/routesProcessing"

function CreateRealProduct() {
  const totalSteps = defaultRoutes.createRealProduct.length
  const [progress, setProgress] = useState(defaultRoutes.createRealProduct)
  const [values, setValues] = useState({
    s1: {
      title: "",
      description: "",
      duration: 1,
      startPrice: "",
      stepBid: "",
      currency: "BTC",
    },
  })
  const [isError, setIsError] = useState(true)
  const [isSuccess, setIsSuccess] = useState(true)

  const handleNextStep = () => {
    const nextProgress = defaultRoutes.functions.nextStep(progress)
    setProgress([...nextProgress])
  }

  const handlePreviousStep = () => {
    const previousProgress = defaultRoutes.functions.previousStep(progress)
    setProgress([...previousProgress])
  }

  const handleErrorStep = () => {
    const nextProgress = defaultRoutes.functions.nextErrorStep(progress)
    setProgress([...nextProgress])
  }

  useEffect(() => {
    if (Object.keys(values).length === totalSteps - 1) {
      console.log("Will call services")
    }
  }, [values, progress])

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
        <FormStepOne
          onNextStep={handleNextStep}
          values={values}
          setValues={setValues}
        />
        <FormStepTwo
          onNextStep={handleNextStep}
          onPreviousStep={handlePreviousStep}
          values={values}
          setValues={setValues}
        />
        <ProcessingStep values={values} totalSteps={totalSteps} />
        <ErrorStep values={values} totalSteps={totalSteps} error={isError} />
        <SuccessStep
          values={values}
          totalSteps={totalSteps}
          success={isSuccess}
        />
      </Container>
    </>
  )
}

export default CreateRealProduct
