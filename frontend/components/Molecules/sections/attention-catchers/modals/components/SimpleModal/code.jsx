const simpleModalCode = `import { useState } from "react";

import { useState } from "react"
import React from "react"
// @mui material components
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Modal from "@mui/material/Modal"
import Divider from "@mui/material/Divider"
import Slide from "@mui/material/Slide"

// @mui icons
// import CloseIcon from "@mui/icons-material/Close"

// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKButton from "components/MKButton"
import MKTypography from "components/MKTypography"
// material custom css
import { makeStyles } from "@mui/styles"
// import MKAvatar from "components/MKAvatar"
// import team1 from "assets/images/team-1.jpg"
import MuiAvatarGroup from "@mui/material/AvatarGroup"
// import Image from "material-ui-image"
// import { height } from "@mui/system"
// import Button from "@mui/joy/Button"

const useStyles = makeStyles({
  btn: {
    background: " #ff00ff",
    width: "250px",
    height: "73.67px",
    color: "while",
    border: "none",
  },
  btnBlue: {
    background: "#3333ff",
    width: "250px",
    height: "73.67px",
    color: "#FFFFF",
    border: "none",
  },
  image: {
    transform: "translatey(125px)",
  },
  fontText: {
    fontFamily: "monospace, Sans-serif",
    fontWeight: "normal",
  },
})

function SimpleModal() {
  const [show, setShow] = useState(false)
  const toggleModal = () => setShow(!show)
  const classes = useStyles()

  return (
    <MKBox component="section" py={6}>
      <Container>
        <Grid container item xs={12} lg={10} justifyContent="center" mx="auto">
          <MKButton variant="gradient" color="info" onClick={toggleModal}>
            Babi BOi
          </MKButton>
        </Grid>
        <Modal
          open={show}
          onClose={toggleModal}
          sx={{ display: "grid", placeItems: "center" }}
        >
          <Slide
            in={show}
            direction="down"
            timeout={500}
            className={classes.modal1}
          >
            {/* mkbox la phan modal hien ra  */}
            <MKBox
              position="relative"
              width="1200px"
              display="flex"
              height="650px"
              flexDirection="column"
              justify-content="center"
              borderRadius="xl"
              bgColor="white"
              shadow="xl"
            >
              <Grid container justifyContent="center">
                <MuiAvatarGroup>
                  <img
                    src="https://scontent.xx.fbcdn.net/v/t1.15752-9/297026107_872407733737955_4935824580116847396_n.png?stp=dst-png_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=aee45a&_nc_ohc=bXsrUSV91LMAX95VOAS&_nc_oc=AQnM49HXaKKkJGjZKw0wALLfjPjGm6w4NKiqydUx44K6undDaAbN47tMDWWb1zD5svgCEhyE0VXjSuPcNgcdRg4l&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVKM2jcwvQllSWgfCgr1kzHdDLUblkjt4tQ7OTGicVya5Q&oe=63246DBB"
                    sx={{ width: 500, height: 500 }}
                    className={classes.image}
                  />
                </MuiAvatarGroup>
              </Grid>

              <MKBox p={2}></MKBox>

              <Divider sx={{ my: 0 }} />

              <MKBox p={2} height="350px">
                <MKTypography
                  variant="h5"
                  textAlign="center"
                  color="info"
                  sx={{
                    pt: "164px",
                    fontSize: "40px",
                    fontWeight: "bold",
                  }}
                >
                  Congratulation!
                </MKTypography>

                <MKTypography variantMapping="p" textAlign="center">
                  You false at bidding ... $
                </MKTypography>
              </MKBox>
              <Divider sx={{ my: 0 }} />
              <MKBox
                display="flex"
                justifyContent="space-around"
                height="150px"
                p={1.5}
              >
                {/* <MKButton
                  variant="gradient"
                  color="dark"
                  onClick={toggleModal}
                  className={classes.btn}
                >
                  View transacript
                </MKButton>
                <MKButton
                  variant="gradient"
                  color="info"
                  className={classes.btnBlue}
                >
                  View process
                </MKButton> */}
                {/* <Button
                  variant="gradient"
                  color="dark"
                  onClick={toggleModal}
                  className={classes.btn}
                >
                  View transacript
                </Button>

                <Button
                  variant="gradient"
                  color="info"
                  className={classes.btnBlue}
                >
                  View process
                </Button> */}
                <button
                  // variant="gradient"
                  // color="dark"
                  color="while"
                  onClick={toggleModal}
                  className={classes.btn}
                >
                  View transacript
                </button>
                <button
                  // variant="gradient"
                  // color="info"
                  className={classes.btnBlue}
                >
                  View process
                </button>
              </MKBox>
            </MKBox>
          </Slide>
        </Modal>
      </Container>
    </MKBox>
  )
}
export default SimpleModal;`

export default simpleModalCode
