import { Service } from "egg";

export default class Alidayu extends Service {
  regexp = {
    phone: /^1[3-9]\d{9}$/g
  };
}
