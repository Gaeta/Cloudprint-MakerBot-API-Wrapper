/*
 * Copyright (C) Donald Gaeta <dj@gaeta.me>, February 2022-Current - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Elmer Fudd <efudd@yoyodyne.com>, September 1943
*/

const Axios = require('axios');

/** 
 * The HTTP module is used to make HTTP requests to the Cloudprint API. 
 * 
 * @returns Axios.instance
 * @private
 */
module.exports = Axios.create({
  baseURL: 'https://cloudprint.makerbot.com/org',
  timeout: 5000,
  headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36'}
});