export interface Location {
  type: string;
  coordinates: number[];
}

export interface ManagementAgency {
  name: string;
  phone: string;
}

export interface IFacility {
  _id: string;
  name: string;
  city: string;
  county: string;
  countyCode: string;
  adressDoro: string;
  adressJibun: string;
  location: Location;
  description: string;
  weekday: string[];
  saturday: string[];
  holiday: string[];
  numberOfChargeAtSameTime: number;
  canAirInjection: boolean;
  canPhoneCharge: boolean;
  managementAgency: ManagementAgency;
  dataBaseDate: string;
  providerCode: string;
  providerName: string;
}
