import React, { useState } from "react"
import { makeStyles } from "@mui/styles"

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
import routes from "routes/routesUser"
import routesHeader from "routes/routesHeader"

//Styles
import { useConnect } from "@connect2ic/react"

// Import Constant
import { VIDEO_TAG_CSS } from "const"
import bgVideo from "assets/video/top-block-bg_1.mp4"

const useStyles = makeStyles({
  sticky_header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
})

function DauHeader({ color, shadow, changeColorOnScroll }) {
  const classes = useStyles()
  const { isConnected } = useConnect()
  // console.log(isConnected, "? ")

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
    <>
      <MKBox
        bgColor={colorHeader}
        shadow={shadowHeader}
        py={0.25}
        className={classes.sticky_header}
      >
        <MyHeaderNavbar
          routes={routes}
          actions={isConnected ? routesHeader.isLogin : routesHeader.isLogout}
          subActions={routesHeader.subHeaders}
          isLogin={isConnected}
          transparent
          relative
        />
      </MKBox>
      <video style={VIDEO_TAG_CSS} autoPlay loop muted>
        <source src={bgVideo} type="video/mp4" />
      </video>
    </>
  )
}

export default DauHeader
