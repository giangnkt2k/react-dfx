// import bgVideo from "assets/video/top-block-bg.mp4"
import BaseLayout from "layouts/sections/components/BaseLayout"
import bgVideo from "assets/video/top-block-bg_1.mp4"
// import bgImage from "assets/images/bg-coworking.jpeg"
import React from "react"
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import { makeStyles } from "@mui/styles"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
//buton

const useStyles = makeStyles({
  text_heading: {
    fontSize: "40px",
    textAlign: "center",
    paddingBottom: "20px",
  },
  input_text: {
    paddingLeft: "30%",
  },
  selec_item: {
    paddingLeft: "31%",
  },
  InputLabel: {
    width: "40ch",
    height: "10px",
  },
  //select option
  from: {
    transform: "translateX(377px)",
    width: " 60ch",
    borderRadius: "5px",
    height: "47px",
    borderColor: "#b3b3b3",
    // paddingBottom: "50px",
  },
  //option
  optionS: {
    color: "#CBCDD7",
  },
  btn: {
    paddingLeft: "31%",
    paddingTop: "70px",
    hover: "none",
  },
  btnUi: {
    width: " 64ch",
    backgroundColor: "blue",
  },
  btn1: {
    width: "60ch",
    // paddingTop: "70px",
    color: "white",
    backgroundColor: "black",
    borderRadius: "10px",
    transform: "translate3d(378px, 33px, 10px)",
    padding: "10px 0px",
    cursor: "pointer",
  },
  paddingA: {
    paddingBottom: "30px",
  },
})

function AddStakeToken() {
  const videoTag = {
    objectFit: "cover",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "-1",
  }
  const classes = useStyles()

  return (
    <BaseLayout
      breadcrumb={[
        { label: "stake", route: "/Stake" },
        { label: "Add stake " },
      ]}
      title=""
    >
      <video style={videoTag} autoPlay loop muted>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <MKBox>
        <MKTypography variant="h2" className={classes.text_heading}>
          Stake token
        </MKTypography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { width: "40ch" },
          }}
          noValidate
          autoComplete="off"
          className={classes.input_text}
          pb={4}
        >
          <TextField id="outlined-basic" label="Tokens" variant="outlined" />
        </Box>
      </MKBox>
      {/* 
      <Box>
        <FormControl
          sx={{
            "& > :not(style)": { width: "60ch" },
          }}
         
        >
          <InputLabel
          // id="demo-simple-select-label"
          // className={classes.InputLabel}
          >
            Age
          </InputLabel>
          <Select>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box> */}
      <div className={classes.paddingA}>
        <select className={classes.from}>
          <option>Steak time</option>
          <option>3 month </option>
          <option>4 month</option>
        </select>
      </div>
      {/* <Box>
        <Stack className={classes.btn}>
          <Button className={classes.btnUi}>Contained</Button>
        </Stack>
      </Box> */}
      <MKBox className={classes.paddingA}>
        <button className={classes.btn1}>Stake</button>
      </MKBox>
      <MKBox className={classes.paddingA}>
        <button className={classes.btn1}>
          Do you want become an appraisers ?
        </button>
      </MKBox>
    </BaseLayout>
  )
}
export default AddStakeToken
