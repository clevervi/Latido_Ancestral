export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  color?: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}
