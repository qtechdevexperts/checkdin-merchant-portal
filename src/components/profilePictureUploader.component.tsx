import React, { useRef, useState } from 'react'
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Col, Row, Button, Container, Card } from "@themesberg/react-bootstrap";
import { uploadProfilePictures } from '../services/upload';
// import {Buffer} from 'buffer';
window.Buffer = window.Buffer || require("buffer").Buffer;

const ProfilePictureUploader: React.FC = () =>
{
    // State Hooks
    const inputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;
    


    const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => 
    {
      // data for submit
      console.log(imageList, addUpdateIndex);
      setImages(imageList as never[]);
    };

    const uploadtoS3 = async() =>
    {

      const accountNum = await getUserAttribute()

      if(images.length === 0)
      {
        alert('No Images to be uploaded');
        return;
      }
      else
      {
        uploadProfilePictures(accountNum, images);
        setImages([]);
      }


    }

    // get subName of user Attribute
    const getUserAttribute = async() =>
    {
      return localStorage.getItem("userID")?.replace(/['"]+/g, '');
    }

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
      {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
      }) => (
        // write your building UI
        <div>
          <Button
            style={isDragging ? { color: "red" } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
          Click or Drop here
          </Button>
          <Row>
            {imageList.map((image, index) => (
              <Col key={index}>
                <img src={image.dataURL} width="100" />
                <div>
                  <Button onClick={() => onImageUpdate(index)}>Update</Button>
                  <Button onClick={() => onImageRemove(index)}>Remove</Button>
                </div>
              </Col>
            ))}
          </Row>
          </div>
        )}
      </ImageUploading>
      <Button className='mt-4' onClick={uploadtoS3}>Submit</Button>
    </div>
  )
}

export default ProfilePictureUploader