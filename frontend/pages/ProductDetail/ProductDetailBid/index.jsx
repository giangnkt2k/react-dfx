import React from 'react';
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput"
import MKTypography from "components/MKTypography";
import MKProgress from "components/MKProgress";
import vetifyIcon from "assets/images/examples/vetify.svg";
import BaseLayout from "layouts/sections/components/BaseLayout";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './style.css';
import bgVideo from "assets/video/top-block-bg_1.mp4";
import humanSVG from "assets/images/shapes/person.svg";
import Transaction from "./tabs/transaction.jsx";

// Images
import bgImage from "assets/images/bg-coworking.jpeg";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <MKBox sx={{ p: 3 }}>
          <MKTypography>{children}</MKTypography>
        </MKBox>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



function ProductDetailBid() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const videoTag = {
    objectFit: "cover",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: '0',
    left: "0",
    zIndex: "-1"
  };
  return (
    <BaseLayout
      breadcrumb={[
        { label: "Home", route: "/presentation" },
        { label: "Product detail" },
      ]}
      title=""
    >
      <video style={videoTag} autoPlay loop muted>
        <source src={bgVideo} type='video/mp4' />
      </video>
      <MKBox pt={5} pb={6}>
        <Container style={{ "backgroundColor": "#ffffffd9", "boxShadow": "0rem 0.625rem 0.9375rem -0.1875rem rgb(0 0 0 / 10%), 0rem 0.25rem 0.375rem -0.125rem rgb(0 0 0 / 5%)" }}>
          <Grid container>
            <Grid item xs={12} md={8} sx={{ mb: 2 }}>
              {/* user info  */}
              <div className='card-root'>
                <div className='card-avatar'>
                  <div className="avtar-container">
                    <div className='avatar'>
                      <img className='avatar-img' src="https://mui.com/static/images/cards/contemplative-reptile.jpg" alt="" />
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
              </div>
              {/* main info product */}
              <div className='card-root'>
                <MKTypography color='primary' textGradient variant="h4" fontWeight="bold" mb={1}>Beautiful bird picture</MKTypography>
              </div>
              <div className='card-root-image'>
                <MKBox
                  component="img"
                  src="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                  width="100%"
                  height="400px"
                  my="auto"
                />
              </div>

            </Grid>
            {/* product infor  */}
            <Grid item xs={12} md={4} sx={{ mx: "auto", textAlign: "center" }}>
              <div>
                <MKTypography pt={3} color='dark' textGradient variant="body1" fontWeight="bold" mb={1}>Infor Product</MKTypography>
              </div>
              <MKBox py={2} px={3}>
                <MKProgress variant="gradient" color="success" value={50} />
              </MKBox>
              <dl className='dl-list'>
                <dt>
                  <MKTypography color='dark' fontWeight="bold" textGradient variant="inherit" mb={1}>
                    Product type:
                  </MKTypography>
                </dt>
                <dd>
                  <MKTypography color='dark' textGradient variant="inherit" mb={1}>
                    Infor Product
                  </MKTypography>
                </dd>
                <dt>
                  <MKTypography color='dark' fontWeight="bold" textGradient variant="inherit" mb={1}>
                    Auction time:
                  </MKTypography>
                </dt>
                <dd>
                  <MKTypography color='dark' textGradient variant="inherit" mb={1}>
                    Infor Product
                  </MKTypography>
                </dd>
                <dt>
                  <MKTypography color='dark' fontWeight="bold" textGradient variant="inherit" mb={1}>
                    Step Bid:
                  </MKTypography>
                </dt>
                <dd>
                  <MKTypography color='dark' textGradient variant="inherit" mb={1}>
                    Infor Product
                  </MKTypography>
                </dd>
                <dt>
                  <MKTypography color='dark' fontWeight="bold" textGradient variant="inherit" mb={1}>
                    Start price:
                  </MKTypography>
                </dt>
                <dd>
                  <MKTypography color='dark' textGradient variant="inherit" mb={1}>
                    500 ETH
                  </MKTypography>
                </dd>
                <dt>
                  <MKTypography color='dark' fontWeight="bold" textGradient variant="inherit" mb={1}>
                    Current Price:
                  </MKTypography>
                </dt>
                <dd>
                  <MKTypography color='dark' textGradient variant="inherit" mb={1}>
                    700 ETH
                  </MKTypography>
                </dd>
              </dl>
              <div>
                <MKBox py={3} px={3} sx={{ mx: "auto", textAlign: "center" }}>
                  <MKTypography color='primary' textGradient variant="body1" fontWeight="bold" mb={1}>Total wallet : 300ETH</MKTypography>
                  <MKInput label="Outline" fullWidth />
                  <MKBox pt={2}>
                    <MKButton variant="gradient" color="primary" fullWidth>
                      BID
                    </MKButton>
                  </MKBox>

                </MKBox>
              </div>
            </Grid>
          </Grid>
        </Container>
      </MKBox>

      <MKBox mt={5} pb={6} className="box-tabs">
        <MKBox >
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Description" {...a11yProps(0)} />
            <Tab label="Comments" {...a11yProps(1)} />
            <Tab label="Transactions" {...a11yProps(2)} />
          </Tabs>
        </MKBox>
        <TabPanel value={value} index={0}>
          <MKBox
            component="div"
            alt='About product'
            width="100%"
            color="dark"
          >
            <MKBox pt={{ xs: 1, lg: 2.5 }} pr={4} pl={{ xs: 4, lg: 1 }} borderRadius="md"
              shadow="md" lineHeight={1} style={{ "border": "1px solid #3447672b" }}>
              <MKTypography pl={{ xs: 4, lg: 1 }} variant="h5">About this product</MKTypography>
              <MKTypography variant="h6" color="secondary" mb={1} pb={{ xs: 1, lg: 2.5 }} pl={{ xs: 4, lg: 1 }} pt={{ xs: 1, lg: 2.5 }}>
                3D Animation and Sound Design for advertisement, presentation and educational purposes, logo animation.
              </MKTypography>
            </MKBox>

            <MKBox mt={{ xs: 1, lg: 2.5 }} pt={{ xs: 1, lg: 2.5 }} pr={4} pl={{ xs: 4, lg: 1 }} borderRadius="md"
              shadow="md" lineHeight={1} style={{ "border": "1px solid #3447672b" }}>
              <MKTypography pb={2} pl={{ xs: 4, lg: 1 }} variant="h5">About this seller</MKTypography>
              <Grid container>
                <Grid item xs={12} md={2} sx={{ mb: 2 }}>
                  <div className='card-root-lg'>
                    <div className='card-avatar'>
                      <div className="avtar-container-lg">
                        <div className='avatar-lg'>
                          <img className='avatar-img' src="https://mui.com/static/images/cards/contemplative-reptile.jpg" alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="card-space"></div>
                  </div>
                </Grid>
                <Grid item xs={12} md={10} sx={{ mb: 2 }}>
                  <div className="avatar-infor">
                    <div className="card-shopname-md">
                      <p>GiangNKT</p>
                      <img src={vetifyIcon} alt="" />
                    </div>
                    <MKTypography pb={2} variant="body1" color="text">
                      I will be the leader of a company that ends up being worth billions of dollars,
                      because I got the answers. I understand culture. I am the nucleus. I think that&apos;s
                      a responsibility that I have, to push possibilities, to show people, this is the level
                      that things could be at.
                    </MKTypography>
                  </div>
                </Grid>
              </Grid>
            </MKBox>
          </MKBox>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MKBox py={3} px={3} sx={{ mx: "auto", textAlign: "center" }} className="box-comment">
            <img className='img-human' src={humanSVG} alt="" />
            <MKTypography color='primary' textGradient variant="body1" fontWeight="bold" mb={1} style={{ "align-self": "center" }}>
              Sorry! No comments now.
            </MKTypography>
          </MKBox>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Transaction/>
        </TabPanel>
      </MKBox>
    </BaseLayout>
  );
}

export default ProductDetailBid;
