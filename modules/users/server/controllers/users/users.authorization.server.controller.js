'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'SERVER.INVALID_OBJECTID'
    });
  }

  User.findOne({
    _id: id
  }, '-remarks')
    .populate('invited_by', 'username displayName profileImageURL isVip score uploaded downloaded')
    .populate('makers', 'name')
    .exec(function (err, user) {
      if (err) {
        return next(err);
      } else if (!user) {
        return next(new Error('Failed to load User ' + id));
      }

      req.profile = user;
      next();
    });
};
