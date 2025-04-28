import { PostType } from "../shelters/shelters.model";
export type Adopter = {
  name: string;
  email: string;
  password: string;
  savedPets: PostType[]; 
  requestedPets: PostType [];
  adoptedPets: PostType []; 
};