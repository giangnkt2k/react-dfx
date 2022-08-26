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
// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import MKSocialButton from "components/MKSocialButton"

// Material Kit 2 React examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter"
import DauHeader from "components/Molecules/layouts/Header"
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard"
// Presentation page sections
import Information from "pages/Presentation/sections/Information"
import DesignBlocks from "pages/Presentation/sections/DesignBlocks"
import Pages from "pages/Presentation/sections/Pages"
import Testimonials from "pages/Presentation/sections/Testimonials"
import Download from "pages/Presentation/sections/Download"

// Presentation page components
import BuiltByDevelopers from "pages/Presentation/components/BuiltByDevelopers"

// Routes
import routes from "routes"
import footerRoutes from "footer.routes"

// Images
import bgImage from "assets/images/bg-presentation.jpg"
import bgVideo from "assets/video/top-block-bg.mp4"

import { useCanister } from "@connect2ic/react"
import { useEffect } from "react"

const videoTag = {
  objectFit: "cover",
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: "0",
  left: "0",
}
function Presentation() {
  const [marketplace_auction, { loading, error }] = useCanister(
    "marketplace_auction",
  )
  const [products, setProducts] = React.useState([])

  const getProducts = async () => {
    const res = await marketplace_auction.GetAuctions()
    console.log("res", res)
    setProducts(res)
  }

  React.useEffect(() => {
    getProducts()
  }, [])
  return (
    <>
      <DauHeader
        changeColorOnScroll={{
          height: 1,
          color: "transparent",
          shadow: "none",
        }}
        isLogin={false}
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <video style={videoTag} autoPlay loop muted>
          <source src={bgVideo} type="video/mp4" />
        </video>
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="secondary"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Decentralized Auction
            </MKTypography>
            <MKTypography
              variant="body1"
              color="secondary"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              The World's First Decentralized Auction
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          mt: -8,
          mb: 8,
          mx: 2,
          backgroundColor: "#8275f52b",
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <DesignBlocks dataApi={products} />
      </Card>
    </>
  )
}

export default Presentation
