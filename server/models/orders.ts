import { Order } from '../types/orders';
import { db } from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const create = (order: Order, callback: Function) => {
  const queryString =
    'INSERT INTO assigned_orders (street_number, street_name, city, state_id, zip_code, client_name, order_fee, notes) VALUES (?,?,?,?,?,?,?,?)';

  db.query(
    queryString,
    [
      order.street_number,
      order.street_name,
      order.city,
      order.state_id,
      order.zip_code,
      order.client_name,
      order.order_fee,
      order.notes,
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

