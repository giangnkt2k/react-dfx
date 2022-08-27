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
import MKButton from "components/MKButton";
import { useCanister } from "@connect2ic/react";
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

function CustomizedTables({ data, principal, product }) {
  const [marketplace_auction, {canisterDefinition}] = useCanister("marketplace_auction", { mode: 'anonymous' })

  const settingData = () => {
    console.log('principal=>>>', principal);
    console.log('product=>>>', product);
    console.log('data=>>>', data, (Object.keys(data[3].status)));
    console.log((product.highestBidId).toString())
  }
  const handleClaim = async (IdBid) => {
    try {
      const res = await marketplace_auction.RefundToken(Principal.fromText(principal), parseInt(product.id), parseInt(IdBid))
      
      await settingData();
      console.log('alo', res)
    }
    catch(e) {
      console.log('e=>', e)
    }
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
            <StyledTableCell >Bider</StyledTableCell>
            <StyledTableCell >Price</StyledTableCell>
            <StyledTableCell >Status</StyledTableCell>
            <StyledTableCell >Option</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.id.toString()}
              </StyledTableCell>
              <StyledTableCell>{row.bider.toText()}</StyledTableCell>
              <StyledTableCell>{row.amount.toString()}</StyledTableCell>
              <StyledTableCell>{Object.keys(row.status)[0]}</StyledTableCell>
              <StyledTableCell>
                {((row.bider.toText() === principal) && (parseInt(product.highestBidId) !== parseInt(row.id)) && Object.keys(row.status)[0] === 'Deposited') ?
                  <MKButton onClick={() =>
                    handleClaim(row.id)}>Claim</MKButton>
                  :
                  <><div>-</div> </>
                }
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CustomizedTables.defaultProps = {
  data: [],
  principal: '',
  product: {}
};

CustomizedTables.propTypes = {
  data: PropTypes.array,
  principal: PropTypes.string,
  product: PropTypes.object
};

export default CustomizedTables;