// features/PhotoCreateModal/utils/cropImage.ts

export type CropCoords = {
  x: number
  y: number
  width: number
  height: number
}

export const getCroppedBlob = async (imageUrl: string, crop: CropCoords): Promise<Blob> => {
  const image = await createImage(imageUrl)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) throw new Error('Canvas 2D context is not available')

  const pixelRatio = window.devicePixelRatio || 1

  canvas.width = crop.width * pixelRatio
  canvas.height = crop.height * pixelRatio

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
  ctx.imageSmoothingQuality = 'high'

  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height)

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (blob) resolve(blob)
        else reject(new Error('Failed to create blob from canvas'))
      },
      'image/jpeg',
      0.92
    )
  })
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
