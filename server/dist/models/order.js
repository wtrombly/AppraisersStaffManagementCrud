"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../db");
const create = (order, callback) => {
    const queryString = 'INSERT INTO assigned_orders (id, street_number, street_name, city, state_id, zip_code, client_name, order_fee, notes, assigned_emp_id) VALUES (?,?,?,?,?,?,?,?,?,?)';
    console.log("create Order query has begun");
    db_1.db.query(queryString, [
        order.id,
        order.street_number,
        order.street_name,
        order.city,
        order.state_id,
        order.zip_code,
        order.client_name,
        order.order_fee,
        order.notes,
        order.assigned_emp_id,
    ], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findOne = (id, callback) => {
    const queryString = `
    SELECT
      o.*
    FROM assigned_orders AS o
    WHERE o.id=?`;
    db_1.db.query(queryString, id, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const order = {
            id: row.id,
            street_number: row.street_number,
            street_name: row.street_name,
            city: row.city,
            state_id: row.state_id,
            zip_code: row.zip_code,
            client_name: row.client_name,
            order_fee: row.order_fee,
            notes: row.notes,
            assigned_emp_id: row.assigned_emp_id,
        };
        callback(null, order);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = `
    SELECT
      o.*
    FROM assigned_orders AS o`;
    debugger;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const orders = [];
        rows.forEach((row) => {
            const order = {
                id: row.id,
                street_number: row.street_number,
                street_name: row.street_name,
                city: row.city,
                state_id: row.state_id,
                zip_code: row.zip_code,
                client_name: row.client_name,
                order_fee: row.order_fee,
                notes: row.notes,
                assigned_emp_id: row.assigned_emp_id,
            };
            orders.push(order);
        });
        callback(null, orders);
    });
};
exports.findAll = findAll;
const update = (order, id, callback) => {
    const queryString = `UPDATE assigned_orders SET street_number=?, street_name=?, city=?, state_id=?, zip_code=?,client_name=?, order_fee=?, notes=?, assigned_emp_id=?, WHERE id=?`;
    db_1.db.query(queryString, [order.street_number, order.street_name, order.city, order.state_id, order.zip_code, order.client_name, order.order_fee, order.notes, order.assigned_emp_id, order.id], (err, result) => {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.update = update;
const remove = (id, callback) => {
    const queryString = `DELETE FROM assigned_orders WHERE id = ?`;
    db_1.db.query(queryString, [id], (err, result) => {
        if (err) {
            callback(err, 0);
        }
        else if (!result) {
            callback(null, 0);
        }
        else {
            const affectedRows = result.affectedRows || 0;
            callback(null, affectedRows);
        }
    });
};
exports.remove = remove;
