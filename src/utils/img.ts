// src/utils/image.ts
export const getImageUrl = (url: string | undefined | null): string => {
  if (!url) return '';
  
  // 如果已经是完整URL或blob URL，直接返回
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')) {
    return url;
  }
  
  const baseUrl = import.meta.env.VITE_APP_UPLOAD_URL as string;
  const path = url.startsWith('/') ? url : `/${url}`;
  return `${baseUrl}${path}`;
};