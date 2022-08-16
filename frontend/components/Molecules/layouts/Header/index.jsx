import React, { useState } from "react"

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

//Styles
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
  sticky_header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
})

function DauHeader({ color, shadow, changeColorOnScroll }) {
  const classes = useStyles()

  const [colorHeader, setColorHeader] = useState(changeColorOnScroll.color)
  const [shadowHeader, setShadowHeader] = useState(changeColorOnScroll.shadow)

  React.useEffect(() => {
    if (changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange)
    }
    return function cleanup() {
      if (changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange)
      }
    }
  })

  const headerColorChange = () => {
    const windowsScrollTop = window.pageYOffset
    if (windowsScrollTop > changeColorOnScroll.height) {
      setColorHeader(color ? color : "white")
      setShadowHeader(shadow ? shadow : "sm")
    } else {
      setColorHeader("transparent")
      setShadowHeader("none")
    }
  }

  return (
    <MKBox
      bgColor={colorHeader}
      shadow={shadowHeader}
      py={0.25}
      className={classes.sticky_header}
    >
      <MyHeaderNavbar
        actions={[
          {
            type: "internal",
            route: "",
            label: "Become a seller",
            color: "info",
            isBtn: false,
          },
          {
            type: "internal",
            route: "",
            label: "New request",
            color: "info",
            isBtn: false,
          },
          {
            type: "internal",
            route: "",
            label: "Sign up",
            color: "info",
            isBtn: false,
          },
          {
            type: "external",
            route: "",
            label: "Sign in",
            color: "info",
            isBtn: true,
          },
        ]}
        subActions={[
          {
            label: "All products",
            color: "info",
          },
          {
            label: "Pending products",
            color: "info",
          },
        ]}
        transparent
        relative
      />
    </MKBox>
  )
}

export default DauHeader
