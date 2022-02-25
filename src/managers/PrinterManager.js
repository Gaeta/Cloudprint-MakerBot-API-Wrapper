/*
 * Copyright (C) Donald Gaeta <dj@gaeta.me>, February 2022-Current - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Elmer Fudd <efudd@yoyodyne.com>, September 1943
*/

const Util = require("../util");
const Printer = require("../structures/Printer");

/**
 * The Manager that will manage our Printers.
 * @class PrinterManager
*/

class PrinterManager {
  /**
   * @description The Manager that will manage our Printers.
   * 
   * @param {MakerBot} client - The MakerBot client
   * @returns {Object}
   * 
  */
   constructor (client, live = true) {
    /**
     * The MakerBot Client
     * @type {MakerBot}
     */
    this.client = client;

    /** 
     * When to resync the printers
     * @type {setInterval}
     */
    this.resync = null;

    /** 
     * If to resync the printers every 5s
     * @type {boolean}
     * @default true
     */
    this.live = live;

    /**
     * The list of Printers avaiable
     * @type {Map<string, Printer>}
     */
    this.printers = new Map();

    this.client.emit('debug', `Loading Printers`);
    if (this.live) this.resync = setInterval(() => {
      if (!this.live || this.printers.size <= 0) return;
      if (this.client.options.debug) this.client.emit('debug', `Resyncing Printers`);
      this.getPrinters().then(() => {
        if (this.client.options.debug) this.client.emit('debug', `Resynced Printers`);
      });
    }, 5000);
    
    return this.getPrinters().then(() => {
      if (this.client.options.debug) this.client.emit('debug', `Loaded Printers`);
      return this;
    });
  }

  /**
  * @description Calls the static/live info of the printers (idk why there is a live and a static api.)
  * 
  * @param {Boolean} [live=false] - If the live api should be used.
  * 
  * @returns {Map<string, Printer>}
  * @memberof PrinterManager
  */

  getPrinters (live = false) {
    return new Promise((resolve, reject) => {
      if (this.client.options.debug) this.client.emit('debug', `Getting Printers via ${live ? 'live' : 'static'} api`);
      this.client.http.get(`/${live ? 'live' : 'static'}-printers-info`).then(response => {
        if (this.client.options.debug) this.client.emit('debug', `Got Printers`);
        if (response.status !== 200) throw new Error(`User.getPrinters(${live}) - ${response.statusCode} - ${response.statusMessage}`);
        for (const printer of response.data) {
          this.printers.set(printer.id, new Printer(this.client, printer));
        }
        return resolve(this.printers);
      }).catch(err => {
        this.client.emit('error', `Failed to get Printers: ${err}`);
        throw new Error(`User.getPrinters(${live}) - ${err}`);
      });
    });
  }

  /**
   * @description Gets the Printer by the given id.
   * @param {String} id - The id of the Printer.
   * @returns {Printer}
   * @memberof PrinterManager
   */
  getPrinter (id) {
    if (this.printers.size <= 0) throw new Error(`User.getPrinter(${id}) - No Printers yet loaded.`);
    return this.printers.get(id);
  }
}

module.exports = PrinterManager