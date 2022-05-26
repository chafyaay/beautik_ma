export interface ProductCardProps {
  id: number;
  brandName: string;
  title: string;
  desc?: string;
  price?: number;
  discountedPrice?: number;
  cover?: string;
  imagesUrls?: string[];
  comments?: {
    userNname?: string;
    comment?: string;
    dateComment?: Date;
    rating?: number;
  }[];
  rating?: number;
  stock: number;
}

export interface Icart {
  product: any;
  qnte: number;
}
