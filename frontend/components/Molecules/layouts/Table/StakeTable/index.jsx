import * as React from "react"

import { Link } from "react-router-dom"

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"

import MKTypography from "components/MKTypography"
import MKBox from "components/MKBox"
import MKButton from "components/MKButton"

import AddIcon from "@mui/icons-material/Add"

function StakeTable({ data }) {
  return (
    <TableContainer component={Paper} sx={{ p: 5, my: 3 }}>
      <Grid container alignItems="center" justifyContent="space-between" mb={3}>
        <MKTypography variant="h4">My Stake</MKTypography>
        <MKButton
          variant="contained"
          color="light"
          size="medium"
          component={Link}
          to={"/stake/create"}
        >
          <AddIcon sx={{ mr: 2 }} />
          Add
        </MKButton>
      </Grid>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ display: "table-header-group" }}>
          <TableRow>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Profit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.startTime}</TableCell>
              <TableCell>{row.endTime}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.totalProfit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StakeTable
