const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const analytics = sequelize.define(
    'analytics',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

student_engagement: {
        type: DataTypes.INTEGER,

      },

completion_rate: {
        type: DataTypes.INTEGER,

      },

instructor_performance: {
        type: DataTypes.INTEGER,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  analytics.associate = (db) => {

    db.analytics.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.analytics.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return analytics;
};

