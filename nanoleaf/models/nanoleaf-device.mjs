/**
 * @property {string} uuid
 * @property {URL} location
 * @property {string} deviceId
 */
class NanoleafDevice {
  constructor(obj) {
    this.uuid = obj.uuid;
    this.location = new URL(obj.location);
    this.deviceId = obj.deviceId;
    this.deviceName = obj.deviceName;
  }
}

export default NanoleafDevice;
