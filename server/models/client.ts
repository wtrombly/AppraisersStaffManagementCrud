import { Client } from '../types/client';
import { db } from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const create = (client: Client, callback: Function) => {
  const queryString =
    'INSERT INTO clients (client_id, business_name, poc_first_name, poc_last_name, street_number, street_name, city, state_id, zip_code, poc_phone, email) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
  console.log('create Client query has begun');

  db.query(
    queryString,
    [
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

    ],
    (err, result) => {
      if (err) {
        callback(err);
      }

      const insertId = (<OkPacket>result).insertId;

      callback(null, insertId);
    }
  );
};

export const findOne = (client_id: number, callback: Function) => {
  const queryString = `
    SELECT
      o.*
    FROM clients AS o
    WHERE o.id=?`;

  db.query(queryString, client_id, (err, result) => {
    if (err) {
      callback(err);
    }

    const row = (<RowDataPacket>result)[0];
    const client: Client = {
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

export const findAll = (callback: Function) => {
  const queryString = `
    SELECT
      o.*
    FROM clients AS o`;
  debugger;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const clients: Client[] = [];

    rows.forEach((row) => {
      const client: Client = {

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

export const update = (
  client: Client,
  client_id: number,
  callback: Function
) => {
  const queryString = `UPDATE clients SET client_id=?, business_name=?, poc_first_name=?, poc_last_name=?, street_number=?, street_name=?, city=?, state_id=?, zip_code=?, poc_phone=?, email=? WHERE client_id=?`;

  db.query(
    queryString,
    [client.business_name,
      client.poc_first_name,
      client.poc_last_name,
      client.street_number,
      client.street_name,
      client.city,
      client.state_id,
      client.zip_code,
      client.poc_phone,
      client.email,
      client.client_id],
    (err, result) => {
      if (err) {
        console.log(err);
        callback(err);
      }
      console.log(result);
      callback(null);
    }
  );
};


export const remove = (client_id: number, callback: Function) => {
  const queryString = `DELETE FROM clients WHERE id = ?`;

  db.query(queryString, [client_id], (err, result) => {
    if (err) {
      callback(err, 0);
    } else if (!result) {
      callback(null, 0);
    } else {
      const affectedRows = (<OkPacket>result).affectedRows || 0;
      callback(null, affectedRows);
    }
  });
};
