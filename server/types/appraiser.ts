
export interface BasicAppraiser {
  emp_id: number,
}

export interface Appraiser extends BasicAppraiser {
  first_name: string,
  last_name: string,
  street_number: string,
  street_name: string,
  city: string,
  state_id: number,
  state_name: string,
  zip_code: number,
  employment_date: Date,
  license_level: string,
  license_number: string,
  fha: boolean,
  va: boolean
}
