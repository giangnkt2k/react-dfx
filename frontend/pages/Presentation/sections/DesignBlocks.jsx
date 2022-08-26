/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react"
// react-router-dom components
import { Link } from "react-router-dom"

// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"

// Presentation page components
import ExampleCard from "pages/Presentation/components/ExampleCard"
import PropTypes from "prop-types"

// Data
import data from "pages/Presentation/sections/data/designBlocksData"
function DesignBlocks({ dataApi }) {
  const renderData = (
    <div container spacing={3} sx={{ mb: 10 }}>
      <Grid container spacing={3}>
        {dataApi.map((item, index) => (
          <Grid item xs={12} md={4} sx={{ mb: 2 }} key={index}>
            <Link
              to={"/pages/detailProduct/ProductDetailBid/" + item.product.id}
            >
              <ExampleCard product={item.product} seller={item.seller} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  )

  return (
    <MKBox component="section">
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          {/* <MKBadge
            variant="contained"
            color="info"
            badgeContent="Infinite combinations"
            container
            sx={{ mb: 2 }}
          /> */}
          <MKTypography variant="h2" fontWeight="bold">
            Products on auction
          </MKTypography>
          <MKTypography variant="body1" color="text">
            Below are the products being auctioned on the current floor
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ my: 6 }}>{renderData}</Container>
    </MKBox>
  )
}

// Setting default props for the ExampleCard
DesignBlocks.defaultProps = {
  dataApi: PropTypes.array,
}

// Typechecking props for the ExampleCard
DesignBlocks.propTypes = {
  dataApi: PropTypes.array,
}

export default DesignBlocks
