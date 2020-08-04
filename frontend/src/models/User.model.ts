import { Adress } from "./Adress.model";
import { Company } from "./Company.model";

export class User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Adress;
    phone: number;
    website: string;
    company: Company;
}