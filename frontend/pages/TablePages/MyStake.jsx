import React, { useEffect, useState } from "react"

import DauHeader from "components/Molecules/layouts/Header"
import StakeTable from "components/Molecules/layouts/Table/StakeTable"

import { useCanister, useConnect } from "@connect2ic/react"
import { Principal } from "@dfinity/principal"
import Container from "@mui/material/Container"

import moment from "moment"

const convertData = (data, subData) => {
  return data.map((item) => {
    const packageData = subData.filter((ele) => ele.id === data.packageId)
    return {
      totalProfit: parseInt(item.totalProfit),
      amount: parseInt(item.amount),
      startTime: moment(parseInt(item.startTime) / Math.pow(10, 6)).format(
        "MMMM Do YYYY, h:mm:ss a",
      ),
      endTime: moment(
        (parseInt(item.timePoint) + parseInt(packageData.lockTime)) /
          Math.pow(10, 6).format("MMMM Do YYYY, h:mm:ss a"),
      ),
    }
  })
}

function MyStake() {
  const [data, setData] = useState([])
  const { principal } = useConnect()
  const [staking, { loadingStaking, errorStaking, canisterDefinition }] =
    useCanister("staking", {
      mode: "anonymous",
    })

  useEffect(async () => {
    try {
      if (principal) {
        const [resData, packages] = await Promise.all([
          staking.GetMyStaking(Principal.fromText(principal)),
          staking.GetStakingPackage(),
        ])
        setData(convertData(resData, packages))
      }
    } catch (err) {
      console.log(err)
    }
  }, [principal])

  useEffect(() => {
    console.log(data)
  }, data)

  return (
    <>
      <DauHeader
        changeColorOnScroll={{
          height: 1,
          color: "transparent",
          shadow: "none",
        }}
      />
      <Container>{data ? <StakeTable data={data} /> : null}</Container>
    </>
  )
}

export default MyStake
