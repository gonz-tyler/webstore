import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function POST(request: Request) {
  try {
    // Parse the request body to get the image URL
    const { imageUrl } = await request.json();

    // Construct the file path based on the image URL
    // Assuming the images are stored in the "public/images/products" directory
    const imagePath = path.join(process.cwd(), 'public', imageUrl);

    // Check if the file exists
    if (fs.existsSync(imagePath)) {
      // Delete the image file
      fs.unlinkSync(imagePath);

      return NextResponse.json({ success: true, message: 'Image deleted successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Image not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ success: false, message: 'Error deleting image' }, { status: 500 });
  }
}
