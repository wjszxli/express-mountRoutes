/*!
 * express-autoRoutes
 * Copyright(c) 2017 wjs
 * MIT Licensed
 */
'use strict';
const path = require('path')
const fs = require('fs')
const express = require('express');
const router = express.Router();

/**
 * Automatic mount routing
 * 
 * Examples：
 * app.use(routes(__dirname + '/routes'))
 *
 * @param {String} dir
 * @return 
 */
module.exports = (dir) => {
    console.log('dir', dir)
    if (!dir || !fs.statSync(dir)) {
      throw Error('file dir is not exists')
    }
    // Start reading files from the entire routing folder
    fs.readdirSync(dir).forEach((file) => {
    // Stitching one route
       const fpath = path.resolve(dir,file)
       // Check if the file exists (read file information)
       const status = fs.statSync(fpath)
       if (status.isFile()) {
         const extIndex = file.lastIndexOf('.')
          // Using the module loading principle, a reference to each file module.exports is read
             const routes = require(dir + '/' + file.slice(0, extIndex))
             // If it is an array, start assembling routing
             if (Array.isArray(routes) && routes.length) {
                 routes.forEach((r) => {
                     // Assemble by category
                     switch (r[0]) {
                       case 'get': router.get(r[1], r[2])
                         break;
                      case 'post': router.post(r[1], r[2])
                        break;
                      case 'put': router.put(r[1], r[2])
                         break;
                      case 'delete': router.delete(r[1], r[2])
                         break;
                       case 'trace': router.trace(r[1], r[2])
                         break;
                       case 'connect': router.connect(r[1], r[2])
                         break;
                       default: router.get(r[1], r[2])
                     }
                 })
             }
        }
    })
    // Returns the assembled route
    return router
}