interface OSSUploadResponse {
  url: string;
  name: string;
  res: {
    size: number;
    status: number;
    statusCode: number;
    rt: number;
    remoteAddress: string;
    remotePort: 80;
  };
}

declare module "ali-oss" {
  export = class OSS {
    /**
     *
     * @param objectKey 文件对象名称
     * @param filePath  上传文件路径
     *
     */
    put(objectKey: string, filePath: string): Promise<OSSUploadResponse>;

    constructor(config: {
      region: string;
      accessKeyId: string;
      accessKeySecret: string;
      bucket: string;
    });
  };
}
