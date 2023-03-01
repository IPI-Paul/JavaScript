import { ComponentFactory } from "@angular/core";

export interface DbUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
export interface Geo {
  lat: number;
  long: number;
}
export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}