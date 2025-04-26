import { PostType } from "../shelters/shelters.model";
export type Adopter = {
  name: string;
  email: string;
  password: string;
  savedPets: string[]; 
  requestedPets: PostType [];
  adoptedPets: PostType []; 
};