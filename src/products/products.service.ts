import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  insertProduct(title: string, decsription: string, price: number) {
    const productId = Math.random().toString();
    const newProduct = new Product(productId, title, decsription, price);
    this.products.push(newProduct);
    return productId;
  }
  getAllProducts() {
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }
  deleteProduct(productId: string) {
    const [_, index] = this.findProduct(productId);
    this.products.splice(index, 1);
  }

  private findProduct(productId: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId,
    );
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException();
    }
    return [product, productIndex];
  }
}
