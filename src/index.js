/*
 * Copyright (C) Donald Gaeta <dj@gaeta.me>, February 2022-Current - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Elmer Fudd <efudd@yoyodyne.com>, September 1943
*/

const Util = new require('./util');
const Http = require('./helpers/http');
const EventEmmiter = require('events');
const User = require('./structures/User');
const PrinterManager = require('./managers/PrinterManager');

/** 
 * The MakerBot class is used to interact with the Cloudprint API.
 * @class MakerBot
 */
class MakerBot extends EventEmmiter {
  /** 
   * @description An Cloudprint MakerBot API Wrapper library built in Node.JS
   * 
   * @param {Object} options - An object containing the following properties.
   * @param {String} options.username - The username of the account you wish to use.
   * @param {String} options.password - The password of the account you wish to use.
   * @param {String} options.token - The token of the account you wish to use. This is only required if you wish to use a token instead of a username and password. This is not recommended. Once Logged in this will get placed with a token.
   * @param {Boolean=} [options.debug=false] If true, the library will log out all requests and responses.
   * @returns {Object}
   * 
   * @example
   * const MB = new MakerBot({
   *  username: 'username',
   *  password: 'password',
   *  debug: true,
   * })
   */
  constructor(options = {}) {
    super();
    this.options = Util.mergeDefault({
      username: null,
      password: null,
      mbToken: {
        token: null,
        token_made: null,
      },
      cloudSlicer: {
        token: null,
        token_made: null,
      },
      debug: false,
    }, options);

    this.http = Http;

    /** 
     * @description If the library is ready to be used.
     * 
     * @type {Boolean}
     * @default false
     */
    this.ready = false;

    /**
     * The User logged in.
     * @type {User}
     */
    this.user = null;

    /**
     * The Printers linked to this account.
     * @type {PrinterManager|null}
     */
     this.printerManager = null;

    if ((!this.options.username || !this.options.password) && !this.options.mbToken.token) throw new Error('You must provide either a username/password or a token');

    if (this.options.username && this.options.password) this.initCreds({ username: this.options.username, password: this.options.password, token: this.options.mbToken.token});
    else throw new Error('You must provide either a username/password or a token'); 
  }
  /**
  * @description Debug related events
  * 
  * @event MakerBot#debug
  * @param {String} info The debug info
  * @memberof MakerBot
  * 
  * @example
  * MakerBot.on("debug", console.log);
  */

 /**
  * @description When the process has an error event.
  * 
  * @event MakerBot#error
  * @param {Error} error The error object
  * @memberof MakerBot
  * 
  * @example
  * MakerBot.on("error", console.log);
  */

 /**
  * @description When the process is all logged in and ready.
  * 
  * @event MakerBot#read
  * @param {Ready} read The error object
  * @memberof MakerBot
  * 
  * @example
  * MakerBot.on("ready", console.log);
  */

  /**
   * @description Logs in with a username and password. If you have a token you can use that instead.
   * 
   * @param {Object} options - An object containing the following properties.
   * @param {String} options.username - The username of the account you wish to use.
   * @param {String} options.password - The password of the account you wish to use.
   * @param {String} options.token - The token of the account you wish to use. This is only required if you wish to use a token instead of a username and password. This is not recommended. Once Logged in this will get placed with a token.
   * @memberof MakerBot
   * 
   * @example
   * (async () => {
   *    const result = await MB.initCreds({ username: 'dgaeta2004', password: 'Bambam911!!' });
   *    console.log(result);
   * })();
   */

  initCreds (settings = {}) {
    settings = Util.mergeDefault({
      username: null,
      password: null,
      token: null,
    }, settings || this.options);

    this.http.defaults.headers.Cookie = null;
    if (settings.username && settings.password) {
      if (this.options.debug) this.emit('debug', 'Logging in with username and password');
      this.http.post('https://login.makerbot.com/login', {
        username: settings.username,
        password: settings.password,
      }).then(response => {
        const Token = response.headers['set-cookie'].filter(g => g.includes('makerbot.jwt='))[0];
        if (!Token) throw new Error('Could not find a token in the response');
        settings.token = Token.split('makerbot.jwt=')[1].split(';')[0];
        if (this.options.debug) this.emit('debug', 'Logged in with username and password');
        this.http.defaults.headers.Cookie = `makerbot.jwt=${settings.token};`;
        this.options.mbToken.token = settings.token;
        this.options.mbToken.token_made = new Date();

        // Call All Functions Needed to be ready
        
        // this.user = this.getUser();
        // this.emit('ready', this);
        return Promise.all([this.getUser(), this.getPrinters()]).then(() => {this.ready = true; this.emit('ready', this);});
      }).catch(error => {
        if (this.options.debug) this.emit('debug', "Login failed: " + error.message);
        this.emit('error', error);
        this.ready = false;
        throw error;
      })
    } else if (settings.token) {
      if (this.options.debug) this.emit('debug', 'Adding in token to cookie');
      this.http.defaults.headers.Cookie = `makerbot.jwt=${settings.token};`;
      if (this.options.debug) this.emit('debug', 'Added token to cookie');
      return true;
    }
  }

  /**
  * @description Calls the User that were logged into.
  * 
  * @returns {User} The User object
  * @memberof MakerBot
  */

  getUser () {
    return new Promise(async (resolve, reject) => {
      this.user = await new User(this);
      return resolve(this.user);
    });
  }

  /**
  * @description Calls the Printers if they have not been called yet.
  * 
  * @returns {PrinterManager} The Printer Manager
  * @memberof MakerBot
  */

  getPrinters () {
    return new Promise(async (resolve, reject) => {
      if (!this.printerManager) this.printerManager = await new PrinterManager(this, true);
      return resolve(this.printerManager);
    });
  }

}

module.exports = MakerBot;