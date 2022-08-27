import React from "react"

import Grid from "@mui/material/Grid"
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"

function StakePackage({ data }) {
  return (
    <MKBox component="section" shadow="inset" p={2}>
      <Grid container>
        <Grid item xs={3}>
          <MKTypography variant="body2" fontWeight="medium">
            Fee
          </MKTypography>
        </Grid>
        <Grid item xs={1}>
          <MKTypography variant="subtitle2">:</MKTypography>
        </Grid>
        <Grid item xs={8}>
          <MKTypography variant="subtitle2">{data.fee}%</MKTypography>
        </Grid>
        <Grid item xs={3}>
          <MKTypography variant="body2" fontWeight="medium">
            Min Stake
          </MKTypography>
        </Grid>
        <Grid item xs={1}>
          <MKTypography variant="subtitle2">:</MKTypography>
        </Grid>
        <Grid item xs={8}>
          <MKTypography variant="subtitle2">{data.minStaking}</MKTypography>
        </Grid>
        <Grid item xs={3}>
          <MKTypography variant="body2" fontWeight="medium">
            Duration
          </MKTypography>
        </Grid>
        <Grid item xs={1}>
          <MKTypography variant="subtitle2">:</MKTypography>
        </Grid>
        <Grid item xs={8}>
          <MKTypography variant="subtitle2">{data.title}</MKTypography>
        </Grid>
      </Grid>
    </MKBox>
  )
}

export default StakePackage
