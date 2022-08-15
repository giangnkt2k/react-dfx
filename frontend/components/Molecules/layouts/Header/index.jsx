import React from "react"

// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKTypography from "components/MKTypography"
import MKAvatar from "components/MKAvatar"
import MKInput from "components/MKInput"

// Material Kit 2 React examples
import MyHeaderNavbar from "components/Molecules/layouts/Header/MyHeaderNavbar"

// Images
import logoDAU from "assets/images/logo-dau.png"

// Routes
import routes from "routes"

function DauHeader() {
  return (
    <MKBox bgColor="white" shadow="sm" py={0.25}>
      <MyHeaderNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "free download",
          color: "info",
        }}
        transparent
        relative
      />
    </MKBox>
  )
}

export default DauHeader
