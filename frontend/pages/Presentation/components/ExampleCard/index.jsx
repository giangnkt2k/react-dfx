import * as React from 'react';
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import vetifyIcon from "../../../../assets/images/examples/vetify.svg";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './style.css';
import LinearProgress from '@mui/material/LinearProgress';
function ExampleCard({ product, seller, ...rest }) {
  console.log('responseListProductproductproductproductproduct==>',product,seller );

  return (
    <MKBox position="relative">
      <Card className='card-content'>
        <CardActionArea>
          <MKBox
            component="img"
            src="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            alt=''
            width="100%"
            height="160px"
            my="auto"
          />
          <CardContent className='card-antiMui'>
            <div>
            </div>
            <div className='card-root'>
              <div className='card-avatar'>
                <div className="avtar-container">
                  <div className='avatar'>
                    <img className='avatar-img' src='https://mui.com/static/images/cards/contemplative-reptile.jpg' alt="" />
                  </div>
                  <div className="avatar-infor">
                    <div className="card-shopname">
                      <p>GiangNKT</p>
                      <img src={vetifyIcon} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-space"></div>
              <div className="card-action">
                <p>
                  <strong >20</strong>
                  ETH<span>/$37,717.8</span></p>
              </div>
            </div>

            <div className="card-detail">
              <div>
                <MKTypography variant="span" fontWeight="bold" mb={1}>Start time: 12h00 2022/10/10</MKTypography>
              </div>
              <div>
                <MKTypography variant="span" fontWeight="bold" mb={1}>Current price: 25 ETH</MKTypography>
              </div> <div>
                <MKTypography variant="span" fontWeight="bold" mb={1}>Deadline: 12h00 2022/10/12</MKTypography>
              </div>
            </div>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              product name
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </MKBox>
  );
}

// Setting default props for the ExampleCard
ExampleCard.defaultProps = {
product: {},
seller: {}
};

// Typechecking props for the ExampleCard
ExampleCard.propTypes = {
  product: PropTypes.object,
  seller: PropTypes.object
};

export default ExampleCard;
