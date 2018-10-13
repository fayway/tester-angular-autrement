export interface Rental {
  id: number;
  title: string;
  description: string;
  city: string;
  type: Type;
  guestsNbr: number;
  roomsNbr: number;
  price: number;
  image: string;
}

export enum Type {
  ENTIRE_HOME = 'Logement entier',
  PRIVATE_ROOM = 'Chambre privée',
  SHARED_ROOM = 'Chambre partagée',
}

export interface RentalsQuery {
  city?: string;
}
