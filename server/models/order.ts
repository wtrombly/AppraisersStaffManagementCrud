import { Order } from '../types/order';
import { db } from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const create = (order: Order, callback: Function) => {
  const queryString =
    'INSERT INTO assigned_orders (id, street_number, street_name, city, state_id, zip_code, client_name, order_fee, notes, assigned_emp_id) VALUES (?,?,?,?,?,?,?,?,?,?)';
    console.log("create Order query has begun")


  db.query(
    queryString,
    [
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

export const findOne = (id: number, callback: Function) => {
  const queryString = `
    SELECT
      o.*
    FROM assigned_orders AS o
    WHERE o.id=?`;

  db.query(queryString, id, (err, result) => {
    if (err) {
      callback(err);
    }

    const row = (<RowDataPacket>result)[0];
    const order: Order = {
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

export const findAll = (callback: Function) => {
  const queryString = `
    SELECT
      o.*
    FROM assigned_orders AS o`;
    debugger;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const orders: Order[] = [];

    rows.forEach((row) => {
      const order: Order = {
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


export const update = (order: Order, id: number, callback: Function) => {
  const queryString = `UPDATE assigned_orders SET street_number=?, street_name=?, city=?, state_id=?, zip_code=?,client_name=?, order_fee=?, notes=?, assigned_emp_id=?, WHERE id=?`;

  db.query(
    queryString,
    [order.street_number, order.street_name, order.city, order.state_id, order.zip_code, order.client_name, order.order_fee, order.notes, order.assigned_emp_id, order.id],
    (err, result) => {
      if (err) {
        callback(err);
      }
      callback(null);
    }
  );
};

export const remove = (id: number, callback: Function) => {
  const queryString = `DELETE FROM assigned_orders WHERE id = ?`;

  db.query(queryString, [id], (err, result) => {
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
