import React, { useState } from "react"
// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import Switch from "@mui/material/Switch"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKInput from "components/MKInput"
import MKButton from "components/MKButton"

function Seller() {
  const [checked, setChecked] = useState(true)

  const handleChecked = () => setChecked(!checked)

  return (
    <MKBox
      component="section"
      bgColor="white"
      py={4}
      px={10}
      shadow="md"
      borderRadius="xl"
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
          <MKBox width="100%" component="form" method="post" autocomplete="off">
            <MKBox p={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Grid>
                    <MKTypography variant="h6" mb={1}>
                      Username
                    </MKTypography>
                    <MKInput variant="outlined" fullWidth />
                  </Grid>
                  <Grid pt={3}>
                    <MKTypography variant="h6" mb={1}>
                      Email
                    </MKTypography>
                    <MKInput variant="outlined" fullWidth />
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}></Grid>
                <Grid item xs={12}>
                  <MKTypography variant="h6" mb={1}>
                    Description
                  </MKTypography>
                  <MKInput
                    variant="outlined"
                    type=""
                    multiline
                    fullWidth
                    rows={6}
                  />
                </Grid>
              </Grid>
              <Grid container item justifyContent="center" xs={12} my={2}>
                <MKButton
                  type="submit"
                  variant="gradient"
                  color="dark"
                  fullWidth
                >
                  Send Message
                </MKButton>
              </Grid>
            </MKBox>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  )
}

export default Seller
