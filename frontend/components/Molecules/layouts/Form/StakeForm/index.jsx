import React, { useState, useRef, useEffect } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKInput from "components/MKInput"
import MKButton from "components/MKButton"
import MKAvatar from "components/MKAvatar"
import MKSelection from "components/MKSelection"

// Import Component
import StakePackage from "./StakePackage"

// Import Icons
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"

// Import Image
import defaultAvatar from "assets/images/default-avatar.png"

// Import Web3-Storage
import { useCanister, useConnect } from "@connect2ic/react"
import { Principal } from "@dfinity/principal"
// Import const
import { uploadToWeb3Storage, replaceString, STRING_TOKEN } from "const"

function StakeForm({ dataItems, action, resAction, setResAction }) {
  const [data, setData] = useState(dataItems[0])
  const formik = useFormik({
    initialValues: { amount: "", package: dataItems[0].id },
    validationSchema: yup.object({
      amount: yup
        .number()
        .typeError("Must be numeric.")
        .required("Must be filled.")
        .min(data.minStaking, `Must not be small than ${data.minStaking}`),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values)
      const res = await action(values.id, values.amount)
      setResAction(res)
    },
  })

  const handleReset = () => {
    formik.handleReset()
  }

  useEffect(() => {
    const filterData = dataItems.filter(
      (ele) => ele.id === formik.values.package,
    )[0]
    setData(filterData)
  }, [formik.values.package])

  return (
    <MKBox
      component="section"
      bgColor="white"
      p={4}
      shadow="md"
      borderRadius="xl"
      m="auto"
      my={3}
      sx={{ width: "800px !important" }}
    >
      <Container>
        <Grid
          container
          item
          justifyContent="center"
          xs={10}
          lg={7}
          mx="auto"
          textAlign="center"
        >
          <MKTypography variant="h3" mb={1}>
            Stake token
          </MKTypography>
        </Grid>
        <Grid container item xs={12} lg={10} sx={{ mx: "auto" }}>
          <MKBox
            width="100%"
            component="form"
            method="post"
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            onReset={handleReset}
          >
            <MKBox p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MKTypography variant="h6" mb={1}>
                    Amount Tokens
                  </MKTypography>
                  <MKInput
                    id="amount"
                    name="amount"
                    error={
                      formik.touched.amount && Boolean(formik.errors.amount)
                    }
                    onChange={formik.handleChange}
                    value={formik.values.amount}
                    helperText={formik.touched.amount && formik.errors.amount}
                    variant="outlined"
                    fullWidth
                    placeholder="Type something"
                  />
                </Grid>
                <Grid item xs={12}>
                  <MKTypography variant="h6" mb={1}>
                    Stake Package
                  </MKTypography>
                  <MKSelection
                    items={dataItems}
                    name="package"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MKTypography variant="subtitle1" mb={1} fontSize={"16px"}>
                    Package Information
                  </MKTypography>
                  <StakePackage data={data} />
                </Grid>
              </Grid>
              <Grid container justifyContent="end" my={2}>
                <Grid item xs={3} ml={2}>
                  <MKButton
                    type="submit"
                    variant="gradient"
                    color="dark"
                    fullWidth
                  >
                    Stake
                  </MKButton>
                </Grid>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  )
}

export default StakeForm
