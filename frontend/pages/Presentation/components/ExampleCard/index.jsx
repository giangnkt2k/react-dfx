import * as React from "react"
// prop-types is a library for typechecking of props
import PropTypes from "prop-types"
import Container from "@mui/material/Container"
// Material Kit 2 React components
import MKBox from "components/MKBox"
import MKTypography from "components/MKTypography"
import vetifyIcon from "../../../../assets/images/examples/vetify.svg"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Button, CardActionArea, CardActions } from "@mui/material"
import "./style.css"
import LinearProgress from "@mui/material/LinearProgress"

const replaceNumber = (num) => {
  return parseInt(num)
}
const replaceTime = (time) => {
  return new Date(replaceNumber(time) / 1000000).toGMTString()
}
const deadLineTime = (currentTime, totalDay) => {
  const deadLine = replaceNumber(currentTime) + replaceNumber(totalDay)
  return replaceTime(deadLine)
}
function ExampleCard({ product, seller, ...rest }) {
  return (
    <Container>
      <MKBox position="relative">
        <Card className="card-content">
          <CardActionArea>
            <MKBox
              component="img"
              src={product.picture[0]}
              alt=""
              width="100%"
              height="160px"
              my="auto"
              sx={{ objectFit: "cover" }}
            />
            <CardContent className="card-antiMui">
              <div></div>
              <div className="card-root">
                <div className="card-avatar">
                  <div className="avtar-container">
                    <div className="avatar">
                      <img className="avatar-img" src={seller.avatar} alt="" />
                    </div>
                    <div className="avatar-infor">
                      <div className="card-shopname">
                        <p>{seller.username}</p>
                        <img src={vetifyIcon} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-space"></div>
                <div className="card-action">
                  <p>
                    <strong>{replaceNumber(product.currentPrice)}</strong>
                    {product.currencyUnit}
                    {/* <span>/$37,717.8</span> */}
                  </p>
                </div>
              </div>

              <div className="card-detail">
                <div>
                  <MKTypography variant="span" fontWeight="bold" mb={1}>
                    Start time: {replaceTime(product.startTime)}
                  </MKTypography>
                </div>
                <div>
                  <MKTypography variant="span" fontWeight="bold" mb={1}>
                    Current price: {replaceNumber(product.startPrice)}
                    {product.currencyUnit}
                  </MKTypography>
                </div>{" "}
                <div>
                  <MKTypography variant="span" fontWeight="bold" mb={1}>
                    Deadline:{" "}
                    {deadLineTime(product.startTime, product.auctionTime)}
                  </MKTypography>
                </div>
              </div>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                {product.title}
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </MKBox>
    </Container>
  )
}

// Setting default props for the ExampleCard
ExampleCard.defaultProps = {
  product: {},
  seller: {},
}

// Typechecking props for the ExampleCard
ExampleCard.propTypes = {
  product: PropTypes.object,
  seller: PropTypes.object,
}

export default ExampleCard
