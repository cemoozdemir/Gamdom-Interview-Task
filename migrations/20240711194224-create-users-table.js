"use strict";

exports.up = function (db, callback) {
  db.createTable(
    "users",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      username: { type: "string", unique: true, notNull: true },
      password: { type: "string", notNull: true },
    },
    callback
  );

  db.createTable(
    "betting_slips",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      user_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "betting_slips_user_id_fk",
          table: "users",
          mapping: "id",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
        },
      },
      event_id: { type: "int", notNull: true },
      amount: { type: "decimal", notNull: true },
      winning_team_id: { type: "int", notNull: true },
      timestamp: {
        type: "timestamp",
        defaultValue: new String("CURRENT_TIMESTAMP"),
      },
    },
    callback
  );
};

exports.down = function (db, callback) {
  db.dropTable("betting_slips", callback);
  db.dropTable("users", callback);
};
