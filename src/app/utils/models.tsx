export interface IPoroduct {
  id: number;
  brandName: string;
  title: string;
  desc: string;
  price: number;
  discountedPrice: number;
  shippingFee: number;
  cover: string;
  imagesUrls: string[];
  comments: {
    userNname: string;
    comment: string;
    dateComment: Date;
    rating: number;
  }[];
  rating: number;
  stock: number;
}
