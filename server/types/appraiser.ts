
export interface BasicAppraiser {
  emp_id: number,
}

export interface Appraiser extends BasicAppraiser {
  firsrt_name: string,
  last_name: string,
  street_number: string,
  street_name: string,
  city: string,
  state_id: number,
  zip_code: number,
  employment_date: Date,
  license_level: string,
  fha: boolean,
  va: boolean
}
