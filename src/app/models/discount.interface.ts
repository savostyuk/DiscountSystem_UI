export interface IDiscount {
    id: string;
    vendorName: string;
    vendorId: string;
    tags: Array<string>;
    title: string;
    categoryId: string;
    condition: string;
    promocode?: string;
    workingHours: string;
    startDate?: Date;
    endDate?: Date;
    isFavorite?: boolean;
  }
  