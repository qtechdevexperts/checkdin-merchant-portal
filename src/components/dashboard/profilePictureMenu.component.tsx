import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Spinner, Button } from "@themesberg/react-bootstrap";
import { getProfilePicture, getUserId } from "../../services/user.service";
import { Row } from "react-bootstrap";
import ExamplePhoto from "../../assets/blank-user.jpg"

const ProfilePictureMenu: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<any>(null);
  const [img, setImg] = useState<string>()

  useEffect(() =>
  {
      const fetchPhotos = async() =>
      {
        const id = getUserId();
        const response = await getProfilePicture();
        setImg(response)
      }

      fetchPhotos().catch(err => console.log(err))
  })

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  

  const ImageGrid = () => {
    return (
      <div className="img-grid">
        {img ? (
        <div>
            <Row>
                <img src={`https://chekdin-merchant-photos.s3.us-east-1.amazonaws.com/${img}`}/>
            </Row>
        </div>
        ) : (
            <div>
                <Row>
                    <img src={ExamplePhoto}/>
                </Row>
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

export default ProfilePictureMenu;
