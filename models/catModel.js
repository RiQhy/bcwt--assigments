// ./models/catModel.js
"use strict";
const pool = require("../db/db");
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
        const sql = `SELECT wop_cat.*, wop_user.name AS ownername FROM wop_cat 
                LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id`;
    const [rows] = await promisePool.query(sql);
    console.log(rows);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql query failed');
  }
};

const getCatById = async () => {
  try {
       const sql = `SELECT wop_cat.*, wop_user.name AS ownername FROM wop_cat 
                LEFT JOIN wop_user ON wop_cat.owner = wop_user.user_id 
                WHERE cat_id = ?`;
    const [rows] = await promisePool.query(sql, [id]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql query failed');
  }
};

const insertCat = async () => {
try {
  const sql = `INSERT INTO wop_cat VALUES (?, ?, ?, ?, ?, ?):`;
  const [rows] = await promisePool.query(sql, [
    null,
    cat.name, 
    cat.weight, 
    cat.owner, 
    cat.filename, 
    cat.birthdate
  ]);
  return rows;
} catch (e) {
  console.error("error", e.message);
  throw new Error('sql query failed');
}
};
const modifyCat = async () => {
  try {
    const sql = `UPDATE wop_cat SET name=?,weight=?,owner=?,birthdate=? WHERE cat_id=?`;
    const [rows] = await promisePool.query(sql, [
      cat.name, 
      cat.weight, 
      cat.owner,
      cat.birthdate,
      cat.id
    ]);
    return rows;
  } catch (e) {
    console.error("error", e.message);
    throw new Error('sql update cat failed');
  }
};
const deleteCat = async () => {
  try {
    const sql = `DELETE FROM wop_cat WHERE cat_id=?`;
    const [rows] = await promisePool.query(sql, [id]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql delete cat failed');
  }
};

module.exports = {
  getAllCats,
  getCatById,
  insertCat,
  modifyCat,
  deleteCat
};