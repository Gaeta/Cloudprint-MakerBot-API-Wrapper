/*
 * Copyright (C) Donald Gaeta <dj@gaeta.me>, February 2022-Current - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Elmer Fudd <efudd@yoyodyne.com>, September 1943
*/

const TeamUser = require('./Team');

/** 
 * The User class of users
 * @class User
 */

class User {
  /**
   * @description The User logged in.
   * 
   * @param {MakerBot} client - The MakerBot client
   * @returns {Object}
   * 
  */
  constructor (client) {
    /**
     * The MakerBot Client
     * @type {MakerBot}
     */
    this.client = client;
    /**
     * The id
     * @type {String|number}
     */
    this.id = null;
    /**
     * The name/username
     * @type {String|null}
     */
    this.username = null;
    /**
     * The first name
     * @type {String}
     */
    this.first_name = null;
    /**
     * The last name
     * @type {String}
     */
    this.last_name = null;
    /**
     * The image id of the user
     * @type {String|number}
     */
    this.image_id = null;
    /**
     * The indrustry the user is from
     * @type {String|null}
     */
    this.industry = null;
    /**
     * Is an admin (Might be Makerbot Internal var)
     * @type {Boolean}
     * @default false
     */
    this.is_admin = null;
    /**
     * Is an creator (Might be Makerbot Internal var)
     * @type {Boolean}
     * @default false
     */
    this.is_curator = null;
    /**
     * Is an creator (Might be Makerbot Internal var)
     * @type {Boolean}
     * @default false
     */
    this.is_moderator = null;
    /**
     * Can the user signin with sso?
     * @type {Boolean}
     * @default false
     */
    this.has_active_sso = null;
    /**
     * Does the user have a password?
     * @type {Boolean}
     * @default true
     */
    this.has_basic_auth = null;
    /**
     * The country the user is from
     * @type {String}
     * @default 'US'
     */
    this.country = null;
    /**
     * Was the user forced to change their password?
     * @type {Boolean}
     * @default false
     */
    this.forced_pass_reset = null;
    // this.user_attributes = null;
    /**
     * The Users full name
     * @type {String}
     */
    this.full_name = null;
    /**
     * The Users username
     * @type {String}
     */
    this.name = null;
    /**
     * The Users email address
     * @type {String}
     */
    this.email = null;
    // this.tokens = null;
    /**
     * The Users Profile Image
     * @type {URL|String}
     */
    this.thumbnail = null;
    /**
     * The Users Notification Settings
     * @type {Object}
     * @param {Boolean} notificationSetting.isNotificationEnabled
     * @param {Boolean} notificationSetting.isOnlyOwnPrintJobs
     */
    this.notificationSetting = {
      isNotificationEnabled: true,
      isOnlyOwnPrintJobs: true
    };
    // this.registrationInfo;

    /** 
     * The basic Info Of the User
     * @type {TeamUser}
     */
    this.teamsUser = null;
    // this.teams;
    // this.generalSettings

    this.client.emit('debug', `Loading User`);
    return this.getUser();
  }

  getUser () {
    if (this.client.options.debug) this.client.emit('debug', `Getting User`);
    return new Promise((resolve, reject) => {
      this.client.http.get('/user').then(response => {
        if (response.status !== 200) throw new Error(`User.getUser() - ${response.statusCode} - ${response.statusMessage}`);
        Object.keys(response.data).forEach(key => {
          if (!Object.keys(this).includes(key)) return;
          if (key === 'teamsUser') {
            this.teamsUser = new TeamUser(this.client, response.data[key]);
          } else this[key] = response.data[key];
        });
        if (this.client.options.debug) this.client.emit('debug', `User Loaded: ${this.full_name}`);
        return resolve(this);
      }).catch(error => {
        if (this.client.debug) this.client.emit('debug', "Login failed: " + error.message);
        this.client.emit('error', error);
        throw error;
      })
    });
  }
}

module.exports = User;
