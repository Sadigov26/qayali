export const defaultCategories = [
  "Ümumi",
  "Fitness",
  "Geyim",
  "Ayaqqabı",
  "Aksesuar",
  "Toplar",
  "Kampaniya",
];

export function uniqueCategories(products = []) {
  return [
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean),
    ),
  ];
}
