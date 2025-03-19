export type PostType={imgName: String, species: String, category: String, age: number, status: 'Adopted'|'WaitingForAVisit'|'Returned'|'WaitingForAdoption', location:String};

export type ShelterType={name: String, statusCount: {adoptedCount: number, waitingForAVisitCount: number,returnedCount: number, waitingForAdoptionCount: number}};