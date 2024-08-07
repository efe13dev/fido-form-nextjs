import path from 'path';
import { writeFile, unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const image = data.get('file');

    if (!image || typeof image === 'string') {
      return NextResponse.json('No se ha subido ninguna imagen', {
        status: 400
      });
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filePath = path.join(process.cwd(), 'public', image.name);
    const outputFilePath = path.join(
      process.cwd(),
      'public',
      'resized-' + image.name
    );

    await writeFile(filePath, buffer);

    const metadata = await sharp(filePath).metadata();
    let width = metadata.width;
    let height = metadata.height || 0;

    try {
      if (width && width > 900) {
        width = 900;
        height = 600;
      }
      const watermarkPath = path.join(
        process.cwd(),
        'public',
        'marca-agua.png'
      );
      await sharp(filePath)
        .resize(width, height)
        .composite([
          {
            input: watermarkPath,
            top: height - 100,
            left: 50
          }
        ])
        .toFormat('webp')
        .toFile(outputFilePath);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error al redimensionar la imagen:', error);
    }

    // Subir la imagen a Cloudinary
    const response = await cloudinary.uploader.upload(outputFilePath);

    // Eliminar la imagen de la carpeta public después de subirla a Cloudinary
    await unlink(filePath);
    await unlink(outputFilePath);

    return NextResponse.json({
      message: 'Imagen subida',
      url: response.secure_url
    });
  } catch (error) {
    // eslint-disable-next-line
    console.error('Error al procesar la imagen:', error);
    return NextResponse.json('Error al procesar la imagen', { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { public_id } = await request.json();
    console.log(public_id);
    if (!public_id) {
      return NextResponse.json(
        { error: 'Public ID is required' },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === 'ok') {
      return NextResponse.json({ message: 'Image deleted successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete image', details: result },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'An error occurred while deleting the image',
        details: error.message
      },
      { status: 500 }
    );
  }
}
