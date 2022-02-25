/*
 * Copyright (C) Donald Gaeta <dj@gaeta.me>, February 2022-Current - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Elmer Fudd <efudd@yoyodyne.com>, September 1943
*/


/** 
 * The printer class of a printer
 * @class Printer
 */

class Printer {
  /** 
   * @description The Printer class of a printer
   * 
   * @param {MakerBot} client - The MakerBot client
   * 
   * @param {Object} data - The data of the printer
   * @param {String} data.id - The id of the printer
   * @param {String} data.name - The name of the printer
   * @param {String} data.type - The type of the printer
   * @param {String|null} data.imageUrl - The current image taken by the printer camera
   * @param {String} [data.ownedBy='user'] - The owner of the printer 
   * @param {Object} data.status - The status of the printer
   * @param {String} data.status.api_version - The api version of the printer
   * @param {String} data.status.auto_unload - The auto unload of the printer
   * @param {String} data.status.bot_type - The bot type of the printer
   * @param {String} data.status.current_process - The current process of the printer
   * @param {String} data.status.ip - The ip of the printer
   * @param {String} data.status.machine_name - The machine name of the printer
   * @param {String} data.status.machine_type - The machine type of the printer
   * @param {Boolean} [data.status.sound=true] - The sound of the printer
   * @param {Object} data.status.firmware_version - The firmware version of the printer
   * @param {Number|null} data.status.firmware_version.major - The major firmware version of the printer
   * @param {Number|null} data.status.firmware_version.minor - The minor firmware version of the printer
   * @param {Number|null} data.status.firmware_version.build - The build firmware version of the printer
   * @param {Number|null} data.status.firmware_version.bugfix - The bugfix firmware version of the printer
   * 
   * @returns {Object}
   */
  constructor (client, data) {
    /**
     * The MakerBot Client
     * @type {MakerBot}
     */
    this.client = client;
    /**
     * The id
     * @type {String|number}
     */
    this.id = data.id || null;
    /**
     * The name/username
     * @type {String|null}
     */
    this.name = data.name || null;
    /**
     * The type of the printer
     * @type {String}
     */
    this.type = data.type || null;
    /**
     * The image url of the printer
     * @type {String|null}
     */
    this.imageUrl = data.imageUrl || null;
    /**
     * The owner of the printer
     * @type {String}
     */
    this.ownedBy = data.ownedBy || 'user';
    /**
     * The status of the printer
     * @type {Object}
     */
    this.status = {};

    // Status Properties Object

    /**
     * The api version of the printer
     * @type {String}
     */
    this.status.api_version = data.status.api_version || null;
    /**
     * The auto unload of the printer
     * @type {String}
     * @default 'off'
     */
    this.status.auto_unload = data.status.auto_unload || 'off';
    /**
     * The bot type of the printer
     * @type {String}
     */
    this.status.bot_type = data.status.bot_type || null;
    /**
     * The current process of the printer
     * @type {String}
     */
    this.status.current_process = data.status.current_process || null;
    /**
     * The ip of the printer
     * @type {String}
     */
    this.status.ip = data.status.ip || null;
    /**
     * The machine name of the printer
     * @type {String}
     */
    this.status.machine_name = data.status.machine_name || null;
    /**
     * The machine type of the printer
     * @type {String}
     */
    this.status.machine_type = data.status.machine_type || null;
    /**
     * The sound of the printer
     * @type {Boolean}
     * @default true
     */
    this.status.sound =  data.status.sound === false ? false : true;
    /**
     * The firmware version of the printer
     * @type {Object}
     */
    this.status.firmware_version = {};
    /**
     * The major firmware version of the printer
     * @type {Number|null}
     */
    this.status.firmware_version.major = data.status.firmware_version.major || 0;
    /**
     * The minor firmware version of the printer
     * @type {Number|null}
     */
    this.status.firmware_version.minor = data.status.firmware_version.minor || 0;
    /**
     * The build firmware version of the printer
     * @type {Number|null}
     */
    this.status.firmware_version.build = data.status.firmware_version.build || 0;
    /**
     * The bugfix firmware version of the printer
     * @type {Number|null}
     */
    this.status.firmware_version.bugfix = data.status.firmware_version.bugfix || 0;
  }
}

module.exports = Printer;