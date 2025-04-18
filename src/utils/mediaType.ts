export function getMediaType(url: string): "image" | "video" {
  const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
  const videoExtensions = [".mp4", ".mkv", ".webm", ".mov"];

  const lowered = url.toLowerCase();

  if (imageExtensions.some((ext) => lowered.endsWith(ext))) return "image";
  if (videoExtensions.some((ext) => lowered.endsWith(ext))) return "video";

  return "video";
}
