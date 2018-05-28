import { Sequelize, STRING, DATE, BOOLEAN, INTEGER, Instance } from "sequelize";

// app/model/user.js
interface ICloudinaryImage {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  format: string;
  resource_type: string;
  created_at: Date;
  tags: string[];
  bytes: number;
  type: string;
  egtag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  appName: string;
  admin: any;
}
type ICloudinaryImageInstance = Instance<ICloudinaryImage> & ICloudinaryImage;

export let CloudinaryImage = (database: Sequelize) => {
  const CloudinaryImage = database.define<
    ICloudinaryImageInstance,
    ICloudinaryImage
  >("cloudinary_image", {
    public_id: STRING,
    version: STRING,
    signature: STRING,
    width: INTEGER,
    format: STRING,
    resource_type: STRING,
    created_at: DATE,
    tags: STRING,
    bytes: INTEGER,
    type: STRING,
    egtag: STRING,
    placeholder: { type: BOOLEAN },
    url: STRING,
    secure_url: STRING,
    appName: STRING
  });

  return CloudinaryImage;
};
