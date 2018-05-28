import { Sequelize, Instance, STRING, INTEGER, BOOLEAN } from "sequelize";

interface IRewardRecord {
  share_user_id?: number;
  share_url?: string;
  /**新注册用户id */
  user_id: number;
  /**奖励类型  1.注册奖励 , 2.分享奖励 */
  reward_type: number;
  material_id: number;
  /**是否派发完 结算奖金 */
  is_send_reward?: boolean;
}

type IRewardRecordInstance = Instance<IRewardRecord> & IRewardRecord;
export let RewardRecord = (database: Sequelize) => {
  const RewordRecord = database.define<IRewardRecordInstance, IRewardRecord>(
    "reward_records",
    {
      user_id: INTEGER,
      share_url: STRING,
      share_user_id: INTEGER,
      ticket_id: INTEGER,
      /**新注册用户id */
      newUser_id: INTEGER,
      /**奖励类型  1.注册奖励 , 2.分享奖励 */
      reward_type: { type: INTEGER, allowNull: false },
      // reward_value: { type: FLOAT, allowNull: false },
      material_id: { type: INTEGER, allowNull: false },
      /**是否派发完 结算奖金 */
      is_send_reward: { type: BOOLEAN, defaultValue: false }
    }
  );

  return RewordRecord;
};
