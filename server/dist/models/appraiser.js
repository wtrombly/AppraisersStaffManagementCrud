"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../db");
const create = (appraiser, callback) => {
    const queryString = 'INSERT INTO emp (product_id, customer_id, product_quantity) VALUES (?, ?, ?)';
    db_1.db.query(queryString, [
        appraiser.emp_id,
        appraiser.first_name,
        appraiser.last_name,
        appraiser.street_number,
        appraiser.street_name,
        appraiser.city,
        appraiser.state_id,
        appraiser.zip_code,
        appraiser.employment_date,
        appraiser.license_level,
        appraiser.fha,
        appraiser.va,
    ], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findOne = (emp_id, callback) => {
    const queryString = `
    SELECT
      o.*,
    FROM emp AS o
    WHERE o.emp_id=?`;
    db_1.db.query(queryString, emp_id, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const appraiser = {
            emp_id: row.emp_id,
            first_name: row.first_name,
            last_name: row.last_name,
            street_number: row.street_number,
            street_name: row.street_name,
            city: row.city,
            state_id: row.state_id,
            zip_code: row.zip_code,
            employment_date: row.employment_date,
            license_level: row.license_level,
            fha: row.fha,
            va: row.va
        };
        callback(null, appraiser);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = `
    SELECT * FROM emp`;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const appraisers = [];
        rows.forEach((row) => {
            const appraiser = {
                emp_id: row.emp_id,
                first_name: row.first_name,
                last_name: row.last_name,
                street_number: row.street_number,
                street_name: row.street_name,
                city: row.city,
                state_id: row.state_id,
                zip_code: row.zip_code,
                employment_date: row.employment_date,
                license_level: row.license_level,
                fha: row.fha,
                va: row.va
            };
            appraisers.push(appraiser);
        });
        callback(null, appraisers);
    });
};
exports.findAll = findAll;
const update = (appraiser, callback) => {
    const queryString = `UPDATE Appraiser SET first_name=?, last_name=? WHERE order_id=?`;
    db_1.db.query(queryString, [appraiser.first_name, appraiser.last_name, appraiser.emp_id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;