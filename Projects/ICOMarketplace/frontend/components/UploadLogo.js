import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import UploadICON from "./SVG/UploadICON";

const UploadLogo = ({imageURL, setImageURL, setLoader}) => {

  const notifySuccess = (msg) => toast.success(msg, { duration: 200 })
  const notifyError = (msg) => toast.error(msg, { duration: 200 })

  const uploadToIPFS = async (file) => {
    try {
      setLoader(true)
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        body: formData,
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_API_SECRET,
          "Content-Type": "multipart/form-data"
        }
      })

      const url = `https://gateway/pinata.cloud/ipfs${response.data.IpfsHash}`
      setImageURL(url)
      setLoader(false)
      notifySuccess("Image uploaded successfully")
    } catch (error) {
      setLoader(false)
      notifyError(error.message)
    }

    const onDrop = useCallback(async (acceptFile) => {
      await uploadToIPFS(acceptFile[0])
    })

    const { getRootProps, getInputProps } = useDropzone({ onDrop, maxSize: 5000000, accept: "image/*" })

    return (
    <>
        {
          imageURL ? (
            <div>
              <img src={imageURL} style={{width: "200px", height: "200px"}} />
            </div>
          ) : (
            <div
              {...getRootProps()}
              >
                <label htmlFor="file" className="custom-file-upload">
                  <div className="icon">
                    <UploadICON />
                  </div>
                  <div className="text">
                    <span>Upload Logo</span>
                  </div>
                </label>
                <input {...getInputProps()} />
            </div>
          )
        }
    </>
    )
  }
}

export default UploadLogo;
