"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.findAll = exports.findOne = exports.create = void 0;
const db_1 = require("../db");
const create = (client, callback) => {
    const queryString = 'INSERT INTO clients (client_id, business_name, poc_first_name, poc_last_name, street_number, street_name, city, state_id, zip_code, poc_phone, email) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    console.log('create Client query has begun');
    db_1.db.query(queryString, [
        client.client_id,
        client.business_name,
        client.poc_first_name,
        client.poc_last_name,
        client.street_number,
        client.street_name,
        client.city,
        client.state_id,
        client.zip_code,
        client.poc_phone,
        client.email,
    ], (err, result) => {
        if (err) {
            callback(err);
        }
        const insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
const findOne = (client_id, callback) => {
    const queryString = `
    SELECT
      o.*
    FROM clients AS o
    WHERE o.id=?`;
    db_1.db.query(queryString, client_id, (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        const client = {
            client_id: row.client_id,
            business_name: row.business_name,
            poc_first_name: row.poc_first_name,
            poc_last_name: row.poc_last_name,
            street_number: row.street_number,
            street_name: row.street_name,
            city: row.city,
            state_id: row.state_id,
            zip_code: row.zip_code,
            poc_phone: row.poc_phone,
            email: row.email,
        };
        callback(null, client);
    });
};
exports.findOne = findOne;
const findAll = (callback) => {
    const queryString = `
    SELECT
      o.*
    FROM clients AS o`;
    debugger;
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const clients = [];
        rows.forEach((row) => {
            const client = {
                client_id: row.client_id,
                business_name: row.business_name,
                poc_first_name: row.poc_first_name,
                poc_last_name: row.poc_last_name,
                street_number: row.street_number,
                street_name: row.street_name,
                city: row.city,
                state_id: row.state_id,
                zip_code: row.zip_code,
                poc_phone: row.poc_phone,
                email: row.email,
            };
            clients.push(client);
        });
        callback(null, clients);
    });
};
exports.findAll = findAll;
const update = (client, client_id, callback) => {
    const queryString = `UPDATE clients SET client_id=?, business_name=?, poc_first_name=?, poc_last_name=?, street_number=?, street_name=?, city=?, state_id=?, zip_code=?, poc_phone=?, email=? WHERE client_id=?`;
    db_1.db.query(queryString, [client.business_name,
        client.poc_first_name,
        client.poc_last_name,
        client.street_number,
        client.street_name,
        client.city,
        client.state_id,
        client.zip_code,
        client.poc_phone,
        client.email,
        client.client_id], (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        console.log(result);
        callback(null);
    });
};
exports.update = update;
const remove = (client_id, callback) => {
    const queryString = `DELETE FROM clients WHERE id = ?`;
    db_1.db.query(queryString, [client_id], (err, result) => {
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
