import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'public', 'images', 'products');

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;
    const id = formData.get('id') as string;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    if (!id) {
      return NextResponse.json({ message: 'No product ID provided' }, { status: 400 });
    }

    const filename = `product-${id}.jpg`;
    const filePath = path.join(uploadDir, filename);

    // Write the file to the server
    fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));

    return NextResponse.json({ message: 'Image uploaded successfully', filename });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ message: 'Failed to upload image' }, { status: 500 });
  }
}
