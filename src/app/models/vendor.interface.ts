import { IDiscount } from "./discount.interface";

export interface IVendor {
    id: string;
    name: string;
    email: string;
    address: string;
    website?: string;
    phone: string;
    workingHours?: string;
    discounts?: Array<IDiscount>;
  }
