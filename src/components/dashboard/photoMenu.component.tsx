import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Spinner, Button } from "@themesberg/react-bootstrap";
import { getPhotoKeys, getUserId } from "../../services/user.service";
import { Row } from "react-bootstrap";
import { deletePhoto } from "../../services/upload";

const PhotoMenu: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<any>(null);
  const [imgArr, setImgArr] = useState<string[]>([])
  // const [arrLength, setArrLength] = useState();

  useEffect(() =>
  {
      const fetchPhotos = async() =>
      {
        const id = getUserId();
        const response = await getPhotoKeys();

        // console.log(`response: ${response}`)
        setImgArr(response)
        // setArrLength(response.length);
      }

      fetchPhotos().catch(err => console.log(err))
  })

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  const removePhoto = async (fileName: string) =>
  {
    let metadata = fileName.split("/")
    let accountNum = metadata[0]
    let fileData = metadata[1]
    await deletePhoto(accountNum, fileData);
  }

  

  const ImageGrid = () => {
    return (
      <div className="img-grid">
        {imgArr ? (
          imgArr.map((img => (
            // <motion.div
            //   className="img-wrap"
            //   key={`https://chekdin-merchant-photos.s3.us-east-1.amazonaws.com/${img}`}
            //   layout
            //   whileHover={{ opacity: 1 }}
            //   onClick={() => setSelectedImg(`https://chekdin-merchant-photos.s3.us-east-1.amazonaws.com/${img}`)}
            // >
            //   <motion.img
            //     src={`https://chekdin-merchant-photos.s3.us-east-1.amazonaws.com/${img}`}
            //     alt="alt_name"
            //     initial={{ opacity: 0 }}
            //     animate={{ opacity: 1 }}
            //     transition={{ delay: 1 }}
            //   />
            // </motion.div>
            <div>
              <Row>
                <img src={`https://chekdin-merchant-photos.s3.us-east-1.amazonaws.com/${img}`}/>
                <Button className="mt-4" onClick={() => {removePhoto(img)}}>Remove</Button>
              </Row>
            </div>
          )))
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p>Upload some photos now to get started</p>
          </div>
        )}
      </div>
    );
  };

  const Modal = () => {
    return (
      <motion.div
        className="backdrop"
        onClick={(e) => {
          handleClick(e);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.img
          src={selectedImg}
          alt="enlarged pic"
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
        />
      </motion.div>
    );
  };

  return (
    <>
      <ImageGrid />
      {selectedImg && <Modal />}
    </>
  );
};

export default PhotoMenu;
