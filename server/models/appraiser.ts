import { Appraiser, BasicAppraiser } from './../types/appraiser';
import { db } from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const create = (appraiser: Appraiser, callback: Function) => {
  const queryString =
    'INSERT INTO emp (product_id, customer_id, product_quantity) VALUES (?, ?, ?)';

  db.query(
    queryString,
    [
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

export const findOne = (emp_id: number, callback: Function) => {
  const queryString = `
    SELECT
      o.*,
    FROM emp AS o
    WHERE o.emp_id=?`;

  db.query(queryString, emp_id, (err, result) => {
    if (err) {
      callback(err);
    }

    const row = (<RowDataPacket>result)[0];
    const appraiser: Appraiser = {
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

export const findAll = (callback: Function) => {
  const queryString = `
    SELECT
      o.*,
      FROM emp AS o`


  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const appraisers: Appraiser[] = [];

    rows.forEach((row) => {
      const appraiser: Appraiser = {
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

export const update = (order: Order, callback: Function) => {
  const queryString = `UPDATE ProductOrder SET product_id=?, product_quantity=? WHERE order_id=?`;

  db.query(
    queryString,
    [order.product.id, order.productQuantity, order.orderId],
    (err, result) => {
      if (err) {
        callback(err);
      }
      callback(null);
    }
  );
};
