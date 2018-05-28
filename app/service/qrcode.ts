import { Service } from "egg";
var qrcodeImage = require("qr-image");

export default class Qrcode extends Service {
  urlToQrcode(url, type: "svg" | "png" | "base64" = "base64") {
    switch (type) {
      case "png":
      case "svg":
        return qrcodeImage.imageSync(url, { type });
      case "base64":
        return qrcodeImage.imageSync(url, { type: "png" }).toString("base64");
    }
  }
}
