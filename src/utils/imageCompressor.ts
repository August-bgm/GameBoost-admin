export async function convertImgToWebP(file: File, quality: number = 0.75): Promise<File> {
  const imageBitmap = await createImageBitmap(file);
  const offscreenCanvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
  const ctx = offscreenCanvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get 2d context');
  }
  ctx.drawImage(imageBitmap, 0, 0);
  const blob = await offscreenCanvas.convertToBlob({
    type: 'image/webp',
    quality
  });
  imageBitmap.close();
  return new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' });
}