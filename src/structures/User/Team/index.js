/*
 * Copyright (C) Donald Gaeta <dj@gaeta.me>, February 2022-Current - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Elmer Fudd <efudd@yoyodyne.com>, September 1943
*/

/** 
 * The Team user class of a team
 * @class TeamUser
 */

class TeamUser {
  /** 
   * @description A User in a team
   * 
   * @param {MakerBot} client - The MakerBot client
   * @param {Object} data - The data of the user
   * @param {String} data.id - The id of the user in the team
   * @param {String} data.name - The username
   * @param {String} data.onionId - The id of the user
   * @param {Date} data.createdAt - The date the user was created
   * @param {Date} data.updatedAt - The date the user was last updated
   * @param {String?} data.token - The token of the user
   * @param {Boolean} data.invited - Is the user invited
   * @param {Boolean} data.deleted - Is the user deleted
   * @param {Boolean} [data.is_admin=false] - Is the user an admin
   * @param {Object} [data.role={id: null, name: null, admin: false}] - The role the user has
   */

  constructor (client, data) {

    /** 
     * The client
     * @type {MakerBot}
     */
    this.client = client;
    /** 
     * The id of the user
     * @type {String|number}
     */
    this.id = data.id || null;

    /** 
     * The name/username
     * @type {String}
     */
    this.username = data.name || null;

    /** 
     * The id of the user
     * @type {String|number}
     */
    this.onionId = data.onionId || null;

    /** 
     * The date the user was created
     * @type {Date}
     */
    this.createdAt = data.createdAt || null;

    /** 
     * The date the user was last updated
     * @type {Date}
     */
    this.updatedAt = data.updatedAt || null;

    /** 
     * The token of the user
     * @type {String}
     */
    this.token = data.token || null;

    /** 
     * Is the user invited
     * @type {Boolean}
     */
    this.invited = data.invited || null;

    /** 
     * Is the user deleted
     * @type {Boolean}
     */
    this.deleted = data.deleted || false;

    /** 
     * Is the user an admin
     * @type {Boolean}
     */
    this.is_admin = data.is_admin || false;

    this.role = data.role ? { // Could just search for the role in the team
      id: data.role.id || null,
      name: data.role.name || null,
      admin: data.role.admin || false
    } : { // Could just search for the role in the team
      id: null,
      name: null,
      admin: false
    };
  }
}


module.exports = TeamUser;