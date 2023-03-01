export interface Country {
  name: string;
  code: string;
  capital: string;
  region: string;
  currency: Currency;
  language: Language;
  flag: string;
}
export interface Region {
  name: string;
  code: string;
}
export interface Currency {
  code: string;
  name: string;
  symbol: string;
}
export interface Language {
  code: string;
  name: string;
}