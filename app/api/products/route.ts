import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'products.json');

const readProducts = () => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileData);
};

const writeProducts = (products: any) => {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
};

export async function GET() {
  const products = readProducts();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const newProduct = await req.json();
  const products = readProducts();
  products.push(newProduct);
  writeProducts(products);
  return NextResponse.json(newProduct);
}

export async function PUT(req: Request) {
  const updatedProduct = await req.json();
  const products = readProducts();
  const index = products.findIndex((p: any) => p.id === updatedProduct.id);
  if (index > -1) {
    products[index] = updatedProduct;
    writeProducts(products);
  }
  return NextResponse.json(updatedProduct);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get('id') || '', 10);

  let products = readProducts();
  products = products.filter((product: any) => product.id !== id);
  writeProducts(products);

  return NextResponse.json({ message: 'Product deleted' });
}
