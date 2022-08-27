import React, { useState, useEffect } from "react"

import DauHeader from "components/Molecules/layouts/Header"
import StakeForm from "components/Molecules/layouts/Form/StakeForm"

import Container from "@mui/material/Container"
import { useCanister, useConnect } from "@connect2ic/react"

import { ContactlessOutlined } from "@mui/icons-material"

import { Principal } from "@dfinity/principal"

const titleData = [
  "3 months",
  "6 months",
  "9 months",
  "12 months",
  "15 months",
  "18 months",
]

const convertData = (data) => {
  return data.map((item, index) => {
    return (
      !item.lockItem &&
      (item = {
        ...item,
        title: titleData[index],
        minStaking: parseInt(item.minStaking),
      })
    )
  })
}

function StakeToken() {
  const [data, setData] = useState()
  const [dataStake, setDataStake] = useState()
  const { principal } = useConnect()

  const [staking, { loadingStaking, errorStaking, canisterDefinition }] =
    useCanister("staking", {
      mode: "anonymous",
    })
  const [dip20, { loadingDip20, errorDip20 }] = useCanister("dip20", {
    mode: "anonymous",
  })

  useEffect(async () => {
    try {
      const dataRes = await staking.GetStakingPackage()
      console.log(dataRes)
      setData(convertData(dataRes))
    } catch (e) {
      console.log(e)
    }
  }, [])

  const uploadStakingPackage = async (packageId, amount) => {
    try {
      await dip20.approve(
        Principal.fromText(principal),
        Principal.fromText(canisterDefinition.canisterId),
        BigInt(amount),
      )
      return await staking.Stake(
        Principal.fromText(principal),
        packageId,
        BigInt(amount),
      )
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(async () => {
    dataStake ? console.log(dataStake) : null
    // TODO: Handle error success response.
  }, [dataStake])

  return (
    <>
      <DauHeader
        changeColorOnScroll={{
          height: 1,
          color: "transparent",
          shadow: "none",
        }}
      />
      <Container>
        {data ? (
          <StakeForm
            dataItems={data}
            action={uploadStakingPackage}
            resAction={dataStake}
            setResAction={setDataStake}
          />
        ) : null}
      </Container>
    </>
  )
}

export default StakeToken
