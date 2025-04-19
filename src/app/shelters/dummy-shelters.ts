import { ShelterType } from './shelters.model';

export const shelters: ShelterType[] = [
  {
    name: 'Happy Paws Shelter',
    email: 'info@happypaws.org',
    password: 'secure123',
    locations: ['123 Bark St, Cityville', '456 Meow Ave, Townsville'],
    statusCount: {
      adoptedCount: 1,
      waitingForAVisitCount: 1,
      returnedCount: 0,
      waitingForAdoptionCount: 1,
    },
  },
  {
    name: 'Furry Friends Rescue',
    email: 'info@furryfriends.org',
    password: 'secure456',
    locations: ['789 Woof Rd, Petstown'],
    statusCount: {
      adoptedCount: 1,
      waitingForAVisitCount: 0,
      returnedCount: 1,
      waitingForAdoptionCount: 1,
    },
  },
  {
    name: 'Paws & Claws Haven',
    email: 'info@paws&claws.org',
    password: 'secure789',
    locations: [
      '101 Tail Ln, Villagetown',
      '202 Fur Blvd, Metro City',
      '799 Woof Rd, Petstown',
    ],
    statusCount: {
      adoptedCount: 0,
      waitingForAVisitCount: 1,
      returnedCount: 1,
      waitingForAdoptionCount: 2,
    },
  },
];
