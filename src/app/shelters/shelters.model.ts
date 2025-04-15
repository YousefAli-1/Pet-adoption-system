export type PostType={ID: number,imgName: String, species: String, category: String, age: number, status: 'Adopted'|'WaitingForAVisit'|'Returned'|'WaitingForAdoption', location:String};

export type shelterEssentialType={ID: number, name: String, password: String,locations: String[]}
export type ShelterType= shelterEssentialType & {statusCount: {adoptedCount: number, waitingForAVisitCount: number,returnedCount: number, waitingForAdoptionCount: number}};