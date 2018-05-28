import { Sequelize, STRING, INTEGER, DATE, Instance } from "sequelize";

/**
 * 阿里云上传的图片数据库结构
 */
export interface IOSSFile {
  /**自定义 bucket 名字 */
  prefix?: string;
  bucket?: string;
  name?: string;
  url?: string;
  requestUrls?: string[];
  remotePort?: number;
  rt?: number;
  statusCode?: number;
  status?: number;
  remoteAddress?: string;
  size: number;
}
type IOssFileInstance = Instance<IOSSFile> & IOSSFile;

export let OSSFile = (database: Sequelize) => {
  const OSSFile = database.define<IOssFileInstance, IOSSFile>(
    "oss_file",
    {
      prefix: STRING,
      name: STRING,
      url: STRING,
      requestUrls: STRING,
      remotePort: INTEGER,
      rt: INTEGER,
      statusCode: INTEGER,
      status: INTEGER,
      remoteAddress: STRING,
      size: STRING,
      created_at: DATE,
      updated_at: DATE
    },
    {
      underscored: true
    }
  );

  return OSSFile;
};
