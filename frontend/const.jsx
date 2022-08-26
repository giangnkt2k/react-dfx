import { Web3Storage } from "web3.storage"

export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDUyRjNmQjU5NTAwOEM5QzI0MTE3NDgyMDQzY2M0QWM0N0NBYTBGYWQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEzNDc0Mzk2NTMsIm5hbWUiOiJmcHQtaGFja2F0aG9uLTIwMjIifQ._fFPVFAXa1vZ4qziS58ckAAxM8SVSd7Sts5dK04ShRU"

export const STRING_TOKEN = "https://{cid}.ipfs.w3s.link/{name}"

export const replaceString = (s, params) => {
  for (const key in params) {
    s = s.replace(`{${key}}`, params[key])
  }
  return s
}

export const uploadToWeb3Storage = async (file) => {
  const storage = new Web3Storage({ token: TOKEN })
  const rootCid = await storage.put(file)
  return rootCid
}
