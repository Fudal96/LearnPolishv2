import { creditCard } from "./creditCard";

export interface Customer {
  email: string;
  name: string;
  creditCard: creditCard[]
}
