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
import { useCanister } from "@connect2ic/react"
import { Route, Routes, useParams } from 'react-router-dom';
import { useBalance, useWallet } from "@connect2ic/react";
import { Principal } from '@dfinity/principal'
import bgImage from "assets/images/bg-coworking.jpeg";



const replaceNumber = (num) => {
  return parseInt(num);
}
const replaceTime = (time) => {
  return (new Date((replaceNumber(time)) / 1000000)).toGMTString();
}
const deadLineTime = (currentTime, totalDay) => {
  const deadLine = replaceNumber(currentTime) + replaceNumber(totalDay);
  return replaceTime(deadLine);
}
// Images
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
  const [marketplace_auction, { loading, error }] = useCanister("marketplace_auction")
  const [dip20] = useCanister("dip20")
  const [value, setValue] = React.useState(0);
  const [product, setProduct] = React.useState(undefined);
  const [wallet] = useWallet()
  const [assets] = useBalance()
  const [inputNumToken, setInputNumToken] = React.useState('');
  const params = useParams();
  const [amountCurrentUnit,c] = React.useState(undefined);
  const handleChangeInputBid = event => {
    setInputNumToken(event.target.value);

    console.log('value is:', event.target.value);
  };

  const getProduct = async () => {
    const datas = await marketplace_auction.GetAuction(parseInt(params.id));
    datas.Ok.product.dateLine = deadLineTime(datas.Ok.product.startTime, datas.Ok.product.auctionTime);
    // lay ngay den date Line
    const a = replaceNumber(datas.Ok.product.startTime) + replaceNumber(datas.Ok.product.auctionTime);
    const b = new Date(a / 1000000);
    const c = new Date();
    const d = b.getDate() - c.getDate();
    datas.Ok.product.processToBid = d + ' day';
    if (c > b) {
      datas.Ok.product.processBar = 100
    } else {
      datas.Ok.product.processBar = (replaceNumber(datas.Ok.product.auctionTime) - d) * 100
    }

    setProduct(datas);
  };

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

  console.log('product', product);
  const handleBid = async () => {
    if(!wallet) {
     await onConnectPlug()
    }
    else {
      const res = await dip20.approve('wzp7w-lyaaa-aaaaa-aaara-cai', 0)
      console.log('mum', res);
    }
  }

  const onConnectPlug = async () => {
    try {
      const publicKey = await window.ic.plug.requestConnect();
      console.log(`The connected user's public key is:`, publicKey);
      getProduct()
    } catch (e) {
      console.log(e);
    }
  }

  const getAmount = (amountt, unitt) => {
    let amountToken = ' 0';
    amountToken = amountt.filter(e =>  e.symbol === unitt)
    if(amountToken.length > 0) {
      amountToken =  amountToken[0].amount
    } else {
      amountToken = ' 0'
    }
    return amountToken + ' ' + unitt
  }


  React.useEffect(() => {
    getProduct()
    console.log('product jnc', product);
  }, []);

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
      {product ?
        <>
        <MKBox pt={5} pb={6}>
          <Container style={{ "backgroundColor": "#ffffffd9", "boxShadow": "0rem 0.625rem 0.9375rem -0.1875rem rgb(0 0 0 / 10%), 0rem 0.25rem 0.375rem -0.125rem rgb(0 0 0 / 5%)" }}>
            <Grid container>
              <Grid item xs={12} md={8} sx={{ mb: 2 }}>
                {/* user info  */}
                <div className='card-root'>
                  <div className='card-avatar'>
                    <div className="avtar-container">
                      <div className='avatar'>
                        <img className='avatar-img' src={product.Ok.seller.avatar} alt="" />
                        {/* <img className='avatar-img' src="" alt="" /> */}

                      </div>
                      <div className="avatar-infor">
                        <div className="card-shopname">
                          <p>{product.Ok.seller.username}</p>
                          <img src={vetifyIcon} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-space"></div>
                </div>
                {/* main info product */}
                <div className='card-root'>
                  <MKTypography color='primary' textGradient variant="h4" fontWeight="bold" mb={1}>{product.Ok.product.title}</MKTypography>
                </div>
                <div className='card-root-image'>
                  <MKBox
                    component="img"
                    src={product.Ok.product.picture[0]}
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
                  <MKProgress variant="gradient" color={(product.Ok.product.processBar === 100) ? 'error' : 'success'} value={product.Ok.product.processBar} />
                </MKBox>
                <dl className='dl-list'>
                  <dt>
                    <MKTypography color='dark' fontWeight="bold" textGradient variant="inherit" mb={1}>
                      Product type:
                    </MKTypography>
                  </dt>
                  <dd>
                    <MKTypography color='dark' textGradient variant="inherit" mb={1}>
                      {(product.Ok.product.metadataAuction) ? 'Real Product' : 'NFT'}
                    </MKTypography>
                  </dd>
                  <dt>
                    <MKTypography color='dark' fontWeight="bold" textGradient variant="inherit" mb={1}>
                      Auction time:
                    </MKTypography>
                  </dt>
                  <dd>
                    <MKTypography color='dark' textGradient variant="inherit" mb={1}>
                      {product.Ok.product.processToBid}
                    </MKTypography>
                  </dd>
                  <dt>
                    <MKTypography color='dark' fontWeight="bold" textGradient variant="inherit" mb={1}>
                      Step Bid:
                    </MKTypography>
                  </dt>
                  <dd>
                    <MKTypography color='dark' textGradient variant="inherit" mb={1}>
                      {replaceNumber(product.Ok.product.stepBid)} {product.Ok.product.currencyUnit}
                    </MKTypography>
                  </dd>
                  <dt>
                    <MKTypography color='dark' fontWeight="bold" textGradient variant="inherit" mb={1}>
                      Start price:
                    </MKTypography>
                  </dt>
                  <dd>
                    <MKTypography color='dark' textGradient variant="inherit" mb={1}>
                      {replaceNumber(product.Ok.product.startPrice)} {product.Ok.product.currencyUnit}
                    </MKTypography>
                  </dd>
                  <dt>
                    <MKTypography color='dark' fontWeight="bold" textGradient variant="inherit" mb={1}>
                      Current Price:
                    </MKTypography>
                  </dt>
                  <dd>
                    <MKTypography color='dark' textGradient variant="inherit" mb={1}>
                      {replaceNumber(product.Ok.product.currentPrice)} {product.Ok.product.currencyUnit}
                    </MKTypography>
                  </dd>
                </dl>
                <div>
                  <MKBox py={3} px={3} sx={{ mx: "auto", textAlign: "center" }}>
                    <MKTypography color='primary' textGradient variant="body1" fontWeight="bold" mb={1}>Total wallet : 
                    {assets ? getAmount(assets, product.Ok.product.currencyUnit)  : 'connect Wallet'}</MKTypography>
                    <MKInput label="Your total" value={inputNumToken} onChange={handleChangeInputBid} fullWidth />
                    <MKBox pt={2}>
                      <MKButton variant="gradient" color="primary" fullWidth onClick={handleBid}>
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
                    {product.Ok.product.description}
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
                              <img className='avatar-img' src={product.Ok.seller.avatar} alt="" />
                            </div>
                          </div>
                        </div>
                        <div className="card-space"></div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={10} sx={{ mb: 2 }}>
                      <div className="avatar-infor">
                        <div className="card-shopname-md">
                          <p>{product.Ok.seller.username}</p>
                          <img src={vetifyIcon} alt="" />
                        </div>
                        <MKTypography pb={2} variant="h6" color="text">
                          {product.Ok.seller.email}
                        </MKTypography>
                        <MKTypography pb={2} variant="body1" color="text">
                          {product.Ok.seller.description}
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
              <Transaction />
            </TabPanel>
          </MKBox></> : null}
    </BaseLayout>
  );
}

export default ProductDetailBid;
