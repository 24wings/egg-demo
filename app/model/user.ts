import {
  Sequelize,
  STRING,
  INTEGER,
  DATE,
  // TINYINT,
  Instance
  // BOOLEAN
} from "sequelize";

interface IUser {
  openid?: string;
  nick_name?: string;
  password?: string;
  sex?: string;
  register_time?: Date;
  /**
   * 微信注册 00
   *
   */
  user_type?: string;
  photos?: string;
  update_time?: Date;
  user_id?: number;
  mobi?: string;
  nation?: string;
}
type IUserInstance = Instance<IUser> & IUser;
// app/model/user.js

export let User = (database: Sequelize) => {
  const user = database.define<IUserInstance, IUser>(
    "user",
    {
      user_id: { primaryKey: true, type: INTEGER, autoIncrement: true },
      nation: STRING,
      openid: STRING,
      nick_name: STRING,
      password: STRING,
      sex: STRING,
      register_time: DATE,
      user_type: STRING,
      photos: STRING,
      update_time: DATE,

      mobi: STRING
    },
    {
      underscored: true,

      freezeTableName: true
    }
  );
  user.removeAttribute("id");

  return user;
};
