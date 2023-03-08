export interface Order {
  id: number;
  street_number: string,
  street_name: string,
  city: string,
  state_id: number,
  zip_code: number,
 /*  employment_date: Date, */
  client_name: string,
  order_fee: number,
  notes: string,
}
