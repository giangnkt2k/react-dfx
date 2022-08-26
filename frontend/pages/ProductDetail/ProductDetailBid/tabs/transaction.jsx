import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from "prop-types";
import Paper from '@mui/material/Paper';
import { Principal } from '@dfinity/principal'
import '../style.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id, bider, amount, status) {
  return { id, bider, amount, status };
}


function CustomizedTables({data}) {

  const [rows, setRows] = React.useState(undefined);
  const settingData = () => {
    var temp = [];
    console.log('data123123', data);
    // data.length > 0 && data.map(e => {
    //   temp.push(createData(e.id, e.bider, e.amount, e.status))
    // });
    // setRows.push(temp)
    // console.log('setRow', rows)
  }
  React.useEffect(() => {
    settingData();
  }, [data]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className='table-head'>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Bider</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.id.toString()}
              </StyledTableCell>
              <StyledTableCell align="right">{Principal.fromUint8Array(row.bider).toString()}</StyledTableCell>
              <StyledTableCell align="right">{row.amount.toString()}</StyledTableCell>
              <StyledTableCell align="right">{(row.status.Withdrawn) ? 'Withdraw' : 'Deposit'}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CustomizedTables.defaultProps = {
  data: [],
  };
  
CustomizedTables.propTypes = {
  data: PropTypes.array,
};

export default CustomizedTables;