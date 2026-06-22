const PHONE_NUMBER = "201003418966";

export function getWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${PHONE_NUMBER}?text=${encoded}`;
}

export function getWhatsAppNumber(): string {
  return PHONE_NUMBER;
}