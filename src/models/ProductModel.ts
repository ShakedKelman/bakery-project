// models/ProductModel.ts
export interface ProductModel {
    available: boolean;
    category: string;
    description: string;
    father: null | number;
    id: number;
    images: { id: number; url: string }[];
    mkt: string;
    name: string;
    price: number;
    store: number;
  }