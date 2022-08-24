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

// Import Icons
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import InstagramIcon from "@mui/icons-material/Instagram"

// Import Image
import defaultAvatar from "assets/images/default-avatar.png"

// Import Web3-Storage
import { Web3Storage, getFilesFromPath } from "web3.storage"

import mintProduct from "../../../../../services/mintProduct"
import { useCanister } from "@connect2ic/react"

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUyRjNmQjU5NTAwOEM5QzI0MTE3NDgyMDQzY2M0QWM0N0NBYTBGYWQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEzNDc0Mzk2NTMsIm5hbWUiOiJmcHQtaGFja2F0aG9uLTIwMjIifQ._fFPVFAXa1vZ4qziS58ckAAxM8SVSd7Sts5dK04ShRU"

const myTextFieldStyle = {
  "& .MuiFormHelperText-root": {
    color: "red !important",
  },
}

const stringToken = "https://{cid}.ipfs.w3s.link/{name}"

const replaceString = (s, params) => {
  for (const key in params) {
    s = s.replace(`{${key}}`, params[key])
  }
  return s
}

function MintProduct({ onNextStep }) {
  const [dip721, { loadingDip, errorDip }] = useCanister("dip721")

  const formik = useFormik({
    initialValues: {
      file: undefined,
      name: "",
      description: "",
    },
    validationSchema: yup.object({
      file: yup.mixed().required("A file is required"),
      name: yup.string().required("dasdasdasd"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      onNextStep()
      const cid = await uploadToWeb3Storage(values.file)
      values = {
        ...values,
        url: replaceString(stringToken, {
          cid: cid,
          name: values.file.name,
        }),
      }
      console.log(values)
      console.log(await dip721.mint(values))
    },
  })

  const handleReset = () => {
    formik.handleReset()
  }

  

  const uploadToWeb3Storage = async (file) => {
    const storage = new Web3Storage({ token })
    const rootCid = await storage.put([file])
    return rootCid
  }

  const handleChangeFile = (event) => {
    const files = event.target.files ? [...event.target.files] : []
    if (files.length && files[0]) {
      formik.setFieldValue("file", files[0], false)
      formik.setFieldError("file", "")
    }
  }

  const handleOnClickFile = () => {
    formik.setFieldValue("file", undefined, false)
    setTimeout(() => {
      formik.setFieldError("file", "A file is required")
    }, 1000)
  }

  return (
    <MKBox
      component="section"
      bgColor="white"
      p={4}
      shadow="md"
      borderRadius="xl"
      my={3}
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
            Add to your collection
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
                    File
                  </MKTypography>
                  <MKInput
                    id="file"
                    type="file"
                    name="file"
                    onClick={(e) => {
                      handleOnClickFile(e)
                    }}
                    onChange={(e) => {
                      handleChangeFile(e)
                    }}
                    error={Boolean(formik.errors.file)}
                    helperText={formik.errors.file}
                    variant="outlined"
                    fullWidth
                    placeholder="Type something"
                    sx={myTextFieldStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MKTypography variant="h6" mb={1}>
                    File Name
                  </MKTypography>
                  <MKInput
                    id="name"
                    name="name"
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    helperText={formik.touched.name && formik.errors.name}
                    variant="outlined"
                    fullWidth
                    placeholder="Type something"
                    sx={myTextFieldStyle}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MKTypography variant="h6" mb={1}>
                    Description
                  </MKTypography>
                  <MKInput
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    variant="outlined"
                    multiline
                    fullWidth
                    rows={6}
                    placeholder="Type something"
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="end" my={2}>
                <Grid item xs={3} mr={2}>
                  <MKButton
                    type="reset"
                    variant="outlined"
                    color="dark"
                    fullWidth
                  >
                    Reset
                  </MKButton>
                </Grid>
                <Grid item xs={3} ml={2}>
                  <MKButton
                    type="submit"
                    variant="gradient"
                    color="dark"
                    fullWidth
                  >
                    Mint
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

export default MintProduct
