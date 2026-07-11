export const googleReviews = {
  placeId: "ChIJl_KCDzCRMEARmu8eql-cXj8",
  rating: 4.3,
  totalReviews: 15,
mapsUrl: "https://maps.app.goo.gl/44dJza2s5fP97xmq6",
  reviews: [
    ["Ferid Rustemli", "3 il əvvəl", "Çox yaxşı", false],
    ["Kamral Gasimov", "6 ay əvvəl", "Bir Nömrəli Qayalı Sport", true],
    ["Cahangir Abdullayev", "3 il əvvəl", "Tək sözlə, Möhtəşəm mağaza", true],
    ["Ziya Aleskerov", "1 il əvvəl", "Uyğun qiymətlər", true],
    ["Ömer Qasımlı", "3 il əvvəl", "Bəyəndim.", false],
    ["Muhammad Rustamov", "2 il əvvəl", "Möhtəşəm", false],
    ["Axmadzada", "3 il əvvəl", "Möhtəşəm", false],
    ["T Agazade", "2 həftə əvvəl", "Gülərüzlü personal. Uyğun qiymət.", true],
    [
      "Huseyn Bagirov",
      "2 həftə əvvəl",
      "Əla yerdir, idman haqqında hər şey mövcuddur. Aldığım əlcək çox keyfiyyətlidir.",
      true,
    ],
  ].map(([author, time, text, localGuide]) => ({
    author,
    time,
    text,
    localGuide,
  })),
};
