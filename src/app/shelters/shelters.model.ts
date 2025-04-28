export type PostStatusType = 'Adopted'|'WaitingForAVisit'|'Returned'|'WaitingForAdoption';
export type PostType ={ID: number, shelterEmail: string,imgName: string, species: string, category: string, age: number, status: PostStatusType, location:string, wasReturned?: boolean};

export type shelterEssentialType={name: string, email:string, password: string,locations: string[]}
export type ShelterType= shelterEssentialType & {statusCount: {adoptedCount: number, waitingForAVisitCount: number,returnedCount: number, waitingForAdoptionCount: number}};