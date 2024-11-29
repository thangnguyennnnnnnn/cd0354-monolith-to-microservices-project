import AWS = require('aws-sdk');
import {config} from './config/config';


// Configure AWS
//const credentials = new AWS.SharedIniFileCredentials({profile: config.aws_profile});
//AWS.config.credentials = credentials;

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export const s3 = new AWS.S3({
 signatureVersion: 'v4',
 region: config.aws_region,
 params: {Bucket: config.aws_media_bucket},
});

// export const s3 = new AWS.S3({
//   signatureVersion: 'v4',
//   region: config.aws_region, // Khu vực của bucket S3
//   credentials: new AWS.Credentials({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   }),
//   params: {Bucket: config.aws_media_bucket},
// });

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;
  let url = s3.getSignedUrl('getObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
  return url;
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl( key: string ): string {
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('putObject', {
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}
