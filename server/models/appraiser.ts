import { Appraiser } from './../types/appraiser';
import { db } from '../db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const create = (appraiser: Appraiser, callback: Function) => {
  const queryString =
    'INSERT INTO emp ( first_name, last_name, street_number, street_name, city, state_id, zip_code,  license_level, license_number, fha, va, state_coverage) VALUES (?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?)';

  db.query(
    queryString,
    [
      appraiser.first_name,
      appraiser.last_name,
      appraiser.street_number,
      appraiser.street_name,
      appraiser.city,
      appraiser.state_id,
      appraiser.zip_code,
      /*  appraiser.employment_date, */
      appraiser.license_level,
      appraiser.license_number,
      appraiser.fha,
      appraiser.va,
      appraiser.state_coverage,
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
      o.*
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
      /*   employment_date: row.employment_date, */
      license_level: row.license_level,
      license_number: row.license_number,
      fha: row.fha,
      va: row.va,
      state_coverage: row.state_coverage,
    };
    callback(null, appraiser);
  });
};

export const findAll = (callback: Function) => {
  const queryString = `
    SELECT
    o.*,
    p.*
    FROM emp AS o
    INNER JOIN states AS p ON p.id = o.state_id`;

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
        /*  employment_date: row.employment_date, */
        license_level: row.license_level,
        license_number: row.license_number,
        fha: row.fha,
        va: row.va,
        state_coverage: row.state_coverage,
      };
      appraisers.push(appraiser);
    });
    callback(null, appraisers);
  });
};

export const update = (appraiser: Appraiser, emp_id: number, callback: Function) => {
  const queryString = `UPDATE emp SET first_name=?, last_name=? WHERE emp_id=?`;

  db.query(
    queryString,
    [appraiser.first_name, appraiser.last_name, emp_id],
    (err, result) => {
      if (err) {
        callback(err);
      }
      callback(null);
    }
  );
};

export const remove = (emp_id: number, callback: Function) => {
  const queryString = `DELETE FROM emp WHERE emp_id = ?`;

  db.query(queryString, [emp_id], (err, result) => {
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

