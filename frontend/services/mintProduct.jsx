import { useCanister } from "@connect2ic/react"

const mintProduct = async (values) => {
  const [dip721, { loadingDip, errorDip }] = useCanister("dip721")
  console.log("daskdhaskjh")
  return await dip721.mint(values)
}

export default mintProduct
