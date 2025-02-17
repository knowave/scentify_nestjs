import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
  AWS_SECRET_ACCESS_KEY,
} from 'src/common/env';

@Injectable()
export class S3Service {
  private readonly s3: S3;
  private defaultBucket: string;

  constructor() {
    this.defaultBucket = AWS_S3_BUCKET_NAME;
    this.s3 = new S3({
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
      region: AWS_REGION,
    });
  }

  async getObject(
    key: string,
    bucket?: string,
  ): Promise<S3.Types.GetObjectOutput> {
    return await this.s3
      .getObject({
        Bucket: bucket || this.defaultBucket,
        Key: key,
      })
      .promise();
  }

  async deleteObject(
    key: string,
    bucket?: string,
  ): Promise<S3.DeleteObjectOutput> {
    return await this.s3
      .deleteObject({
        Bucket: bucket || this.defaultBucket,
        Key: key,
      })
      .promise();
  }

  async uploadObject(
    key: string,
    body: S3.Body,
    contentType?: string,
    bucket?: string,
  ): Promise<S3.ManagedUpload.SendData> {
    return await this.s3
      .upload({
        Key: key,
        Body: body,
        ContentType: contentType,
        Bucket: bucket || this.defaultBucket,
      })
      .promise();
  }
}
