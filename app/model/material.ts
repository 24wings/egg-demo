import { Sequelize, STRING, INTEGER, DATE, Instance } from "sequelize";

// app/model/user.js

interface IMaterial {
  coupon_id?: number;
  shopuser_id?: number;
  home_image_url?: string;
  ticket_image_url?: string;
  share_image_url?: string;
  shop_phone?: string;
  created_at?: Date;
  updated_at?: Date;
}
type IMaterialInstance = Instance<IMaterial> & IMaterial;

export let Material = (database: Sequelize) => {
  const MaterialModel = database.define<IMaterialInstance, IMaterial>(
    "material",
    {
      shopuser_id: { type: INTEGER, allowNull: false },
      home_image_url: { type: STRING, allowNull: false },
      ticket_image_url: { type: STRING, allowNull: false },
      created_at: { type: DATE },
      updated_at: { type: DATE },
      share_image_url: { type: STRING },
      shop_phone: { type: STRING },
      coupon_id: { type: INTEGER }
    },
    { createdAt: false, underscored: true }
  );

  return MaterialModel;
};
