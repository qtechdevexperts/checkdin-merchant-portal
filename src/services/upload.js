import S3 from "react-aws-s3";
import { Buffer } from "buffer";
import { getProfilePicture } from "../services/user.service";
window.Buffer = window.Buffer || require("buffer").Buffer;

export const uploadPhotos = async (accountNum, files) => {
  const config = {
    bucketName: "chekdin-merchant-photos",
    dirName: accountNum,
    region: "us-east-1",
    accessKeyId: "AKIA37FFSC7UW6KBEEU4",
    secretAccessKey: "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",
    s3Url: "https://chekdin-merchant-photos.s3.amazonaws.com/",
  };

  const s3Client = new S3(config);

  files.map(async (item) => {
    s3Client
      .uploadFile(item.file, item.file.name)
      .then((data) => {
        alert("Successfully Uploaded");
        console.log(data);
      })
      .catch((err) => {
        alert("Image not uploaded");
        console.log(err);
      });
  });
};

export const deletePhoto = async (accountNum, fileName) => {
  const config = {
    bucketName: "chekdin-merchant-photos",
    dirName: accountNum,
    // region: 'us-east-1',
    accessKeyId: "AKIA37FFSC7UW6KBEEU4",
    secretAccessKey: "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",
    s3Url: "https://chekdin-merchant-photos.s3.us-east-1.amazonaws.com/",
  };

  const s3Client = new S3(config);

  s3Client
    .deleteFile(fileName)
    .then((response) => {
      console.log(response);
      window.location.reload();
    })
    .catch((err) => console.error(err));
};

export const uploadProfilePictures = async (accountNum, item) => {
  const config = {
    bucketName: "chekdin-merchant-photos",
    dirName: `${accountNum}/profile_picture`,
    region: "us-east-1",
    accessKeyId: "AKIA37FFSC7UW6KBEEU4",
    secretAccessKey: "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",
    s3Url: "https://chekdin-merchant-photos.s3.amazonaws.com/",
  };

  const response = await getProfilePicture();

  if (!response) {
    // straight up upload if photo doesn't exist
    const s3Client = new S3(config);
    s3Client
      .uploadFile(item[0].file, item[0].file.name)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  } else {
    // grab the substring from the photokey
    let substr1 = response[0].substring(response[0].indexOf("/") + 1);
    let fileName = substr1.substring(substr1.indexOf("/") + 1);

    // delete the previous photo and add the new one
    await deletePhoto(`${accountNum}/profile_picture`, fileName);

    const s3Client = new S3(config);
    s3Client
      .uploadFile(item[0].file, item[0].file.name)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }
};

export const createS3Link = async (coupon_type, coupon_id, user_id) => {
  try {
    let config = {
      bucketName: "chekdin-merchant-coupons",
      dirName: `${user_id}/coupons`, // merchant-id/coupons
      region: "us-east-1",
      accessKeyId: "AKIA37FFSC7UZ5ZYAVHT",
      secretAccessKey: "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",
      s3Url: "https://chekdin-merchant-coupons.s3.amazonaws.com/",
    };

    let obj = {};

    switch (coupon_type) {
        case "User Coupon":
            obj = {
                business_address: ""
            };
            break;
        case "Chekdin Coupon":
            obj = {
                business_address: "", // 123 Street Address Place
                business_name: "", // John's Pizza Shop 4.0
                merchant_id: `${user_id}`, // merchant-id
                coupon_term: "", // $10 Off
                coupon_code: `${coupon_id}`, // coupon-code
                expiration_date: "" // 11/25/2026
            };
            break;
        default:
            obj = {};
    }

    if(!obj) {
        var buf = JSON.stringify(obj);

        const s3Client = new S3(config);

        await s3Client.uploadFile(buf, `${coupon_id}.json`)
            .then((res) => {
                const response = res.body.json();
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }
  } catch (e) {
    console.log(e);
  }
};

export const checkForS3Link = async () => {

}