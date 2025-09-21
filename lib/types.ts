export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
};

export type CartItem = Product & {
  quantity: number;
};
