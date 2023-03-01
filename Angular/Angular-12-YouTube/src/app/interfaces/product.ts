export interface Product {
  sno: string;
  name: string;
  image: string;
  qty: number;
  price: number;
}

export const Products: Product[] = [
  {
    sno: 'AA101',
    name: 'Mi Watch',
    image: 'http://localhost:8080/Pictures/pi.png',
    qty: 2,
    price: 1500
  },
  {
    sno: 'AA102',
    name: 'Apple Watch',
    image: 'http://localhost:8080/Pictures/akonadiconsole.png',
    qty: 2,
    price: 1800
  },
  {
    sno: 'AA103',
    name: 'RedMe Watch',
    image: 'http://localhost:8080/Pictures/code-icon.svg',
    qty: 2,
    price: 1400
  },
  {
    sno: 'AA104',
    name: 'Oppo Watch',
    image: 'http://localhost:8080/Pictures/fcitx-translit-ua.png',
    qty: 2,
    price: 1400
  }
];