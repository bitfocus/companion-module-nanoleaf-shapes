import { NanoleafDevice } from './models/index.mjs';
import dgram from 'dgram';
import c from './const.mjs';

/**
 * Class for discovering nanoleaf devices over the Wi-Fi network
 */
class ServiceDiscovery {
  /**
   * Send ssdp message via socket
   * 
   * @param {dgram.Socket} socket 
   */
  _broadcastSsdp(socket, target) {
    var query = Buffer.from( // eslint-disable-line no-undef
      'M-SEARCH * HTTP/1.1\r\n' +
        `HOST: ${c.SSDP_DEFAULT_IP}:${c.SSDP_DEFAULT_PORT}\r\n` +
        'MAN: "ssdp:discover"\r\n' +
        'MX: 1\r\n' +
        `ST: ${target}\r\n\r\n`
    );

    socket.send(query, 0, query.length, c.SSDP_DEFAULT_PORT, c.SSDP_DEFAULT_IP);
  }

  /**
   * Make the search to discover nanoleaf devices
   *
   * @returns {Promise<NanoleafDevice[]>} array of discovered devices
   */
  discoverNanoleaf(targets = [c.NANOLEAF_AURORA_TARGET, c.NANOLEAF_SHAPES_TARGET, c.NANOLEAF_ELEMENTS_TARGET, c.NANOLEAF_CANVAS_TARGET]) {
    var socket = dgram.createSocket('udp4');
    var devices = [];
    let self = this;

    socket.on('listening', function() {
      targets.forEach( (target) => {
        self._broadcastSsdp(socket, target);
      })
    });

    socket.on('message', function(chunk, info) { // eslint-disable-line no-unused-vars
      var response = chunk
        .toString()
        .trim()
        .split('\r\n');
      let result = {};
      response.forEach(item => {
        var splitter = item.indexOf(':');

        if (splitter > -1) {
          let key = item.slice(0, splitter);
          let value = item.slice(splitter, item.length);

          if (key === 'S') {
            result.uuid = value.slice(7);
          } else if (key === 'Location') {
            result.location = value.slice(2);
          } else if (key === 'nl-deviceid') {
            result.deviceId = value.slice(2);
          } else if (key === 'nl-devicename') {
	    result.deviceName = value.slice(2);
          }
        }
      });

      devices.push(new NanoleafDevice(result));
    });

    socket.bind(c.SSDP_SOURCE_PORT, c.ANY_IP);

    return new Promise(resolve => {
      setTimeout(() => {
        socket.close();
        resolve(devices);
      }, 3000);
    });
  }
}

export default ServiceDiscovery;
