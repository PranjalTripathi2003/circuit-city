// src/utils/api.ts

const STRAPI_URL = 'http://localhost:1337';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  tag?: string;
  category?: string;
  inStock: boolean;
  description?: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${STRAPI_URL}/api/products?populate=*`);
    
    if (!res.ok) {
      console.error('Failed to fetch products:', res.status, res.statusText);
      return [];
    }

    const data = await res.json();

    console.log('Raw API response:', JSON.stringify(data, null, 2));

    if (!data || !data.data) {
      console.error('Invalid API response:', data);
      return [];
    }

    const products: Product[] = data.data.map((item: any) => {
      const { id, attributes } = item;

      if (!attributes) {
        console.error(`Product with id ${id} is missing attributes`);
        return null;
      }

      const {
        name,
        price,
        image,
        tag,
        category,
        inStock,
        description,
      } = attributes;

      if (!name || price === undefined || !image) {
        console.error(`Product with id ${id} is missing required fields`);
        return null;
      }

      const imageUrl = image?.data?.attributes?.url
        ? `${STRAPI_URL}${image.data.attributes.url}`
        : '/images/placeholder.jpg';

      return {
        id,
        name,
        price: parseFloat(price),
        image: imageUrl,
        tag: tag || '',
        category: category || '',
        inStock: inStock ?? true,
        description: description || '',
      };
    }).filter((product: Product | null) => product !== null) as Product[];

    console.log('Processed products:', products);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${STRAPI_URL}/api/products/${id}?populate=*`);

    if (!res.ok) {
      console.error(`Failed to fetch product with id ${id}:`, res.status, res.statusText);
      return null;
    }

    const data = await res.json();

    console.log(`Raw API response for product ${id}:`, JSON.stringify(data, null, 2));

    if (!data || !data.data) {
      console.error('Invalid API response:', data);
      return null;
    }

    const { id: productId, attributes } = data.data;

    if (!attributes) {
      console.error(`Product with id ${productId} is missing attributes`);
      return null;
    }

    const {
      name,
      price,
      image,
      tag,
      category,
      inStock,
      description,
    } = attributes;

    if (!name || price === undefined || !image) {
      console.error(`Product with id ${productId} is missing required fields`);
      return null;
    }

    const imageUrl = image?.data?.attributes?.url
      ? `${STRAPI_URL}${image.data.attributes.url}`
      : '/images/placeholder.jpg';

    return {
      id: productId,
      name,
      price: parseFloat(price),
      image: imageUrl,
      tag: tag || '',
      category: category || '',
      inStock: inStock ?? true,
      description: description || '',
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};