import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private readonly logger = new Logger(MinioService.name);
  private readonly client: Minio.Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Minio.Client({
      endPoint: configService.get<string>('MINIO_HOST') || 'localhost',
      port: configService.get<number>('MINIO_PORT') || 9000,
      useSSL: Boolean(configService.get<boolean>('MINIO_USE_SSL')) || false,
      accessKey: configService.get<string>('MINIO_ROOT_USER'),
      secretKey: configService.get<string>('MINIO_ROOT_PASSWORD'),
    });
  }

  getClient() {
    return this.client;
  }

  async ensureBucket(bucket: string) {
    const exists = await this.client.bucketExists(bucket);
    if (!exists) {
      await this.client.makeBucket(bucket);
      this.logger.log(`✅ Created bucket: ${bucket}`);
    }
  }

  async upload(
    bucket: string,
    objectName: string,
    buffer: Buffer,
    contentType: string,
  ) {
    await this.ensureBucket(bucket);

    await this.client.putObject(bucket, objectName, buffer, buffer.length, {
      contentType,
    });

    return await this.client.presignedGetObject(bucket, objectName);
  }

  async download(bucket: string, objectName: string) {
    return await this.client.getObject(bucket, objectName);
  }

  async remove(bucket: string, objectName: string) {
    await this.client.removeObject(bucket, objectName);
    this.logger.log(`🗑️ Removed: ${bucket}/${objectName}`);
  }
}
