import { Web3Storage, getFilesFromPath } from "web3.storage"
import { uploadToWeb3Storage, STRING_TOKEN } from "../const"

export const mintProduct = async (useCanister, rawResult) => {
  const file = rawResult.file
  const cid = uploadToWeb3Storage(file)
  const data = {
    ...rawResult,
    url: replaceString(STRING_TOKEN, {
      cid: cid,
      name: rawResult.file.name,
    }),
  }
  await useCanister.mint(data)
}
