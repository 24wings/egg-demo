import { Sequelize, STRING, INTEGER, DATE, Instance } from "sequelize";

interface IShop {
  shop_id: number;
  shop_name: string;
  telphone: string;
  province: string;
  city: string;
  addr: string;
  referrer: string;
  servicer: string;
  regist_time: Date;
  active_status: string;
  active_time: Date;
  legal_person_name: string;
  legal_person_mobi: string;
  boss_name: string;
  boss_mobi: string;
  manager_name: string;
  manager_mobi: string;
  area_size: number;
  rooms: number;
  skillers: number;
  branches: number;
  franchies: number;
  pictures: string;
  introduction: string;
  open_date: Date;
  lat_lng: string;
  update_time: Date;
}

type IShopInstance = Instance<IShop> & IShop;
export let Shop = (database: Sequelize) => {
  let shop = database.define<IShopInstance, IShop>(
    "shop",
    {
      shop_id: INTEGER,
      shop_name: STRING,
      telphone: STRING,
      province: STRING,
      city: STRING,
      addr: STRING,
      referrer: STRING,
      servicer: STRING,
      regist_time: DATE,
      active_status: STRING,
      active_time: DATE,
      legal_person_name: STRING,
      legal_person_mobi: STRING,
      boss_name: STRING,
      boss_mobi: STRING,
      manager_name: STRING,
      manager_mobi: STRING,
      area_size: INTEGER,
      rooms: INTEGER,
      skillers: INTEGER,
      branches: INTEGER,
      franchies: INTEGER,
      pictures: STRING,
      introduction: STRING,
      open_date: DATE,
      lat_lng: STRING,
      update_time: DATE
    },
    {
      freezeTableName: true,
      underscored: true,
      createdAt: false,
      updatedAt: false
    }
  );
  shop.removeAttribute("id");
  return shop;
};
