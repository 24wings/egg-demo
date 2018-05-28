import {
  Sequelize,
  // STRING,
  INTEGER,
  // DATE,
  // TINYINT,
  Instance,
  BOOLEAN
} from "sequelize";

interface ISyncUser {
  shop_id?: number;
  user_id?: number;
  is_sync?: boolean;
}

type ISyncUserInstance = Instance<ISyncUser> & ISyncUser;
export let SyncUser = (database: Sequelize) => {
  let syncUser = database.define<ISyncUserInstance, ISyncUser>(
    "sync_user",
    {
      shop_id: INTEGER,
      user_id: INTEGER,
      is_sync: BOOLEAN
    },
    {
      createdAt: false,
      updatedAt: false
    }
  );
  return syncUser;
};
