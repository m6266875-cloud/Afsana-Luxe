export const formatPKR = (value: number) =>
  `Rs. ${new Intl.NumberFormat("en-US").format(Math.round(value || 0))}`;

export const discountPercent = (price: number, oldPrice?: number) =>
  oldPrice && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

export const categoryName = (id: string, categories: { id: string; name: string }[]) =>
  categories.find((c) => c.id === id)?.name ?? id;

export const orderDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
