export const AppraiserProfiles: AppraiserProfile[] = [
 { id: 0, firstName: "Hermite", lastName: "Smith", stateOfResidency: "Texas", licenseLevel: "trainee", licenseNumber: 1234567, FHA: false, VA: false, dateOfEmployment: "01/01/2022", stateOfCoverage: "Texas", },
 { id: 1, firstName: "Louisa", lastName: "Valuaison", stateOfResidency: "Texas", licenseLevel: "licensed", licenseNumber: 2345678, FHA: false, VA: false, dateOfEmployment: "01/01/2020", stateOfCoverage: "Texas", },
 { id: 2, firstName: "Peter", lastName: "Pinkelton", stateOfResidency: "Texas", licenseLevel: "Certified Residential", licenseNumber: 3456789, FHA: true, VA: false, dateOfEmployment: "01/01/2018", stateOfCoverage: "Texas", },
 { id: 3, firstName: "Sara", lastName: "Sanders", stateOfResidency: "Texas", licenseLevel: "Certified General", licenseNumber: 1234569, FHA: true, VA: true, dateOfEmployment: "01/01/2005", stateOfCoverage: "Texas", },
];


export interface AppraiserProfile {
  id: number;
  firstName: string;
  lastName: string;
  stateOfResidency: string;
  licenseLevel: string;
  licenseNumber: number;
  FHA: boolean
  VA: boolean
  dateOfEmployment: string;
  stateOfCoverage: string;
}
