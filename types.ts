export enum ViewType {
  HOME = 'HOME',
  NEWS = 'NEWS',
  NEWS_DETAIL = 'NEWS_DETAIL',
  DESIGN_INSPIRATION = 'DESIGN_INSPIRATION',
  ECOMMERCE = 'ECOMMERCE',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  GRAPHIC_DESIGN = 'GRAPHIC_DESIGN',
  WEB_DESIGN = 'WEB_DESIGN',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  ADMIN = 'ADMIN',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT'
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'logo' | 'poster' | 'banner' | 'thumbnail' | 'website' | 'uiux';
  image: string;
  description: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  content: string;
  date: string;
}

export interface AppData {
  news: NewsItem[];
  products: Product[];
  portfolio: PortfolioItem[];
  messages: Message[];
}