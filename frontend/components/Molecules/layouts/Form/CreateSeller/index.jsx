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

function Seller({ onNextStep }) {
  const hiddenAvatarInput = useRef(null)
  const handleClick = () => {
    hiddenAvatarInput.current.click()
    formik.setFieldValue("photo", {}, false)
    setSourceImg(defaultAvatar)
  }
  const [sourceImg, setSourceImg] = useState(defaultAvatar)
  const handleChangePhoto = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSourceImg(URL.createObjectURL(event.target.files[0]))
      formik.setFieldValue("photo", event.target.files[0], false)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      photo: {},
      description: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("dasdasdasd"),
      email: yup.string().email().required("dasdasdas"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values)
      onNextStep()
      setTimeout(() => {
        onNextStep()
      }, 5000)
    },
  })
  const handleReset = () => {
    formik.handleReset()
    setSourceImg(defaultAvatar)
  }
  return (
    <MKBox
      component="section"
      bgColor="grey-100"
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
            Become a Seller
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
              <Grid container>
                <Grid item xs={12} md={6} pr={2}>
                  <Grid pb={2}>
                    <MKTypography variant="h6" mb={1}>
                      Username
                    </MKTypography>
                    <MKInput
                      id="username"
                      name="username"
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                      variant="outlined"
                      fullWidth
                      placeholder="Type something"
                    />
                  </Grid>
                  <Grid pb={2}>
                    <MKTypography variant="h6" mb={1}>
                      Email
                    </MKTypography>
                    <MKInput
                      id="email"
                      name="email"
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      helperText={formik.touched.email && formik.errors.email}
                      variant="outlined"
                      fullWidth
                      placeholder="Type something"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6} pl={2}>
                  <MKTypography variant="h6" mb={1}>
                    Photo
                  </MKTypography>
                  <MKInput
                    onChange={(e) => {
                      handleChangePhoto(e)
                    }}
                    inputRef={hiddenAvatarInput}
                    type="file"
                    inputProps={{ accept: "image/png, image/gif, image/jpeg" }}
                    variant="outlined"
                    sx={{ position: "absolute", display: "none" }}
                  />
                  <MKAvatar
                    src={sourceImg}
                    alt="default-avatar"
                    size="myCustom"
                    onClick={handleClick}
                    sx={{ margin: "auto" }}
                  />
                </Grid>
                <Grid item xs={12} pb={2}>
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
                <Grid item xs={12} pb={2}>
                  <MKTypography variant="h6" mb={1}>
                    Social Media Link
                  </MKTypography>
                  <Grid container alignItems="center" pb={2}>
                    <TwitterIcon fontSize="medium" sx={{ margin: "8px" }} />
                    <Grid item flexGrow={1}>
                      <MKInput
                        id="twitter"
                        name="twitter"
                        onChange={formik.handleChange}
                        value={formik.values.twitter}
                        variant="outlined"
                        fullWidth
                        placeholder="Type something"
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" pb={2}>
                    <FacebookIcon fontSize="medium" sx={{ margin: "8px" }} />
                    <Grid item flexGrow={1}>
                      <MKInput
                        id="facebook"
                        name="facebook"
                        onChange={formik.handleChange}
                        value={formik.values.facebook}
                        variant="outlined"
                        fullWidth
                        placeholder="Type something"
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center" pb={2}>
                    <InstagramIcon fontSize="medium" sx={{ margin: "8px" }} />
                    <Grid item flexGrow={1}>
                      <MKInput
                        id="instagram"
                        name="instagram"
                        onChange={formik.handleChange}
                        value={formik.values.instagram}
                        variant="outlined"
                        fullWidth
                        placeholder="Type something"
                      />
                    </Grid>
                  </Grid>
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
                    Send
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

export default Seller
