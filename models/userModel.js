'use strict';
const pool = require("../db/db");
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const sql = `SELECT user_id, name, email FROM wop_user`;
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql query failed');
  }
};

const getUserById = async () => {
  try {
    const sql = `SELECT wop_user.* FROM wop_user WHERE user_id = ?`;
    const [rows] = await promisePool.query(sql, [id]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql query failed');
  }
};

const insertUser = async () => {
try {
  const sql = `INSERT INTO wop_user VALUES (?, ?, ?, ?):`;
  const [rows] = await promisePool.query(sql, [
    null,
    user.name, 
    user.email,
    user.password,
    user.role
  ]);
  return rows;
} catch (e) {
  console.error("error", e.message);
  throw new Error('sql query failed');
}
};
const modifyUser = async () => {
  try {
    const sql = `UPDATE wop_user SET name=?,email=?,password=?,role=? WHERE _id=?`;
    const [rows] = await promisePool.query(sql, [
      user.name, 
      user.email,
      user.password,
      user.role
    ]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql update user failed');
  }
};
const deleteUser = async () => {
  try {
    const sql = `DELETE FROM wop_user where user_id=?`;
    const [rows] = await promisePool.query(sql, [id]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql delete user failed');
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  insertUser,
  modifyUser,
  deleteUser
};