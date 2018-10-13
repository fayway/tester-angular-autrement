import { Rental, Type } from './rental.models';

export const rentals: Rental[] = [
  {
    id: 1,
    title: 'Très beau studio avec terrasse à 2 pas de la mer',
    description:
      'Studio 25m² à deux pas de la plage et de tout commerce. ' +
      'En centre-ville mais au calme car au centre de la résidence dans une cour.',
    city: 'Nice',
    guestsNbr: 2,
    roomsNbr: 1,
    type: Type.ENTIRE_HOME,
    price: 40,
    image: 'http://localhost:3000/rentals/laspalmas1.jpg',
  },
  {
    id: 2,
    title: 'Bel Appartement, vue sur mer',
    description:
      'Logement de 80 m2 avec jardin pouvant accueillir jusqu’à 4 personnes. \n' +
      'Bien situé pour découvrir Sidi Ifni, Legzira, Sidi Warzeg, Goulimine, l’oasis de Tighmert, le marché aux chameaux, etc, ' +
      'la maison se trouve à 1 km de la plage, et de la montagne. Accès à pied à une plage déserte et à une montagne. ' +
      'Baignade, surf (plusieurs spots de surf à proximité), randonnées, pêche, parapente…\n' +
      'Idéal si vous avez une voiture ou une moto.',
    city: 'Agadir',
    guestsNbr: 4,
    roomsNbr: 6,
    type: Type.ENTIRE_HOME,
    price: 35,
    image: 'http://localhost:3000/rentals/laspalmas2.jpg',
  },
  {
    id: 3,
    title: 'Chambre indépendante avec Bain',
    description:
      'Chambre très agréable avec une entrée desservant la salle de bains , le WC et la chambre, rangements importants, Tv, ' +
      'Wifi , petit Frigo et bouilloire pour faire le petit dejeuner, 1 Grand Lit pour 2 personnes.' +
      'très proche du centre ville. parking gratuit sur réservation préalable',
    city: 'Saint-Tropez',
    guestsNbr: 2,
    roomsNbr: 1,
    type: Type.PRIVATE_ROOM,
    price: 25,
    image: 'http://localhost:3000/rentals/maurice1.jpg',
  },
  {
    id: 4,
    title: 'Chambre indépendante avec Bain',
    description:
      'Chambre très agréable avec une entrée desservant la salle de bains , le WC et la chambre, rangements importants, Tv, ' +
      'Wifi , petit Frigo et bouilloire pour faire le petit dejeuner, 1 Grand Lit pour 2 personnes.' +
      'très proche du centre ville. parking gratuit sur réservation préalable',
    city: 'Saint-Tropez',
    guestsNbr: 2,
    roomsNbr: 1,
    type: Type.PRIVATE_ROOM,
    price: 25,
    image: 'http://localhost:3000/rentals/maurice2.jpg',
  },
  {
    id: 5,
    title: 'Dortoir mixte au centre ville',
    description:
      'Dortoir mixte dans appartements au centre ville près de la gare (5 min à pied). Il y à un Monoprix et un Auchan tous près.\n' +
      '14 min en train de la gare de Marseille St Charles et 20 min en voiture.\n' +
      'Pour tous renseignements n\'existez pas à me contacter.',
    city: 'Marseille',
    guestsNbr: 1,
    roomsNbr: 1,
    type: Type.SHARED_ROOM,
    price: 18,
    image: 'http://localhost:3000/rentals/mirleft1.jpg',
  },
  {
    id: 6,
    title: 'Apartamento en 1ª linea al Mar',
    description:
      'Confortable apartamento con excelentes vistas al mar (vistas a Cala Marçal y Cala de Porto Colom). ' +
      'Situado a 200 metros de la preciosa playa de Cala Marçal. Dispone de un jardin de cespet, arboles, piscinas (una para niños) ' +
      'y acceso directo al mar.',
    city: 'Majorque',
    guestsNbr: 5,
    roomsNbr: 2,
    type: Type.ENTIRE_HOME,
    price: 60,
    image: 'http://localhost:3000/rentals/mirleft2.jpg',
  },
  {
    id: 7,
    title: 'Tropical Coconut - Logement de Vacances',
    description:
      'Notre logement de vacances comprend deux chambres climatisées avec salles de bain attenante. ' +
      'Nous sommes situés a 150 a vol d\'oiseau de la cote. Vous apprécierez la quietude des lieux et toutes ' +
      'les facilités nécessaires pour de bonnes vacances sur la cote la plus ensoleillée de l\'ile.',
    city: 'Maurice',
    guestsNbr: 6,
    roomsNbr: 2,
    type: Type.ENTIRE_HOME,
    price: 55,
    image: 'http://localhost:3000/rentals/taghazout1.jpg',
  },
  {
    id: 8,
    title: 'Bel Appartement pied sur mer',
    description:
      'Appartement de style moderne pied sur mer avec terrasse panoramique trés bien entretenu dispose ' +
      'd\'une cuisine americaine bien équipée d\'un salon de style moderne avec téléviseur smart tv ( netflix +youtube) et ' +
      'd\'une chambre acoucher avec grand lit .',
    city: 'Agadir',
    guestsNbr: 4,
    roomsNbr: 2,
    type: Type.ENTIRE_HOME,
    price: 44,
    image: 'http://localhost:3000/rentals/tiznit1.jpg',
  },
];
