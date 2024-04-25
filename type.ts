export interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface CategoryHasProduct {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  productId: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  storeId: string;
  billboardId?: string;
  value?: string;
}

export interface Image {
  id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
}

export interface ProductHasColor {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  colorId: string;
  color: Color;
}

export interface ProductHasSize {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
  sizeId: string;
  size: Size;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  storeId: string;
  images: Image[];
  productHasSizes: ProductHasSize[];
  productHasColors: ProductHasColor[];
  categoryHasProducts: CategoryHasProduct[];
}

export interface Size {
  id: string;
  name: string;
  value: string;
}
export interface Color {
  id: string;
  name: string;
  value: string;
}
export interface Image {
  id: string;
  url: string;
}
