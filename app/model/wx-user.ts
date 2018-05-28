import {
  Sequelize,
  STRING,
  INTEGER,
  DATE,
  TINYINT,
  Instance,
  BOOLEAN
} from "sequelize";

interface IWxUser {
  id?: number;
  phone?: string;
  user_id?: number;
  user_name?: string;
  nickname?: string;
  password?: string;
  password_hash?: string;
  id_card?: string;
  sex?: string;
  mobi?: string;
  qq?: string;
  unionid?: string;
  openid?: string;
  register_time?: Date;
  user_type?: string;
  nation?: string;
  birthday?: string;
  married?: boolean;
  native_place?: string;
  education?: string;
  id_card_addr?: string;
  live_province?: string;
  live_city?: string;
  live_addr?: string;
  height?: number;
  weight?: number;
  description?: number;
  photos?: string;
  update_time?: Date;
  register_shop_id?: number;

  created_at?: Date;
  updated_at?: Date;
  language?: string;
  privilege?: string;
  signup_shop_id?: number;
  is_sync?: boolean;
}
type IWxUserInstance = Instance<IWxUser> & IWxUser;
// app/model/user.js

export let WxUser = (database: Sequelize) => {
  const wxUser = database.define<IWxUserInstance, IWxUser>(
    "wx_user",
    {
      // score: { type: INTEGER, defaultValue: 0 },
      phone: { type: STRING, allowNull: false },
      user_id: INTEGER,
      user_name: STRING,
      nickname: STRING,
      password: STRING,
      password_hash: STRING,
      id_card: STRING,
      sex: STRING,
      mobi: STRING,
      qq: STRING,
      unionid: STRING,
      openid: STRING,
      register_time: DATE,
      user_type: STRING,
      nation: STRING,
      birthday: DATE,
      married: TINYINT(1),
      native_place: STRING,
      education: STRING,
      id_card_addr: STRING,
      live_province: STRING,
      live_city: STRING,
      live_addr: STRING,
      height: INTEGER,
      weight: INTEGER,
      description: STRING,
      photos: STRING,

      register_shop_id: INTEGER,
      created_at: DATE,
      updated_at: DATE,
      language: STRING,
      privilege: STRING,
      signup_shop_id: INTEGER,
      is_sync: { type: BOOLEAN, defaultValue: false }
    },
    {
      underscored: true
    }
  );

  return wxUser;
};
