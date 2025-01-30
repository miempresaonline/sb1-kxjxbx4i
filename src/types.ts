export interface Car {
  id: string;
  title: string;
  price: number;
  year: number;
  kilometers: number;
  fuel: string;
  image: string;
  features: string[];
}

export interface TestimonialType {
  id: string;
  name: string;
  text: string;
  rating: number;
}