export const products = [
  {
    id: 1,
    name: "Qantel, polad, gümüşü",
    category: "Fitness",
    detail: "Xromlanmış polad · Bütöv tökmə",
    weight: "7.5 kq",
    price: "98.50 ₼",
    image:
      "https://strgimgr.umico.az/img/product/280/5748048a-30e8-44ee-bf98-e8106bbda6f4.jpeg",
    source: "https://birmarket.az/product/1502880-xrom-qantel-7-5-kq",
  },
  {
    id: 2,
    name: "Qantel Sweat",
    category: "Fitness",
    detail: "Dəmir / kauçuk · Qırmızı",
    weight: "3 kq",
    price: "29.99 ₼",
    image:
      "https://strgimgr.umico.az/img/product/280/146ebc68-1a1f-4d09-9184-1a79f08bf3e1.jpeg",
    source: "https://birmarket.az/product/1500816-qantel-sweat-3-kq",
  },
  {
    id: 3,
    name: "Qantel Sweat",
    category: "Fitness",
    detail: "Dəmir / kauçuk · Qırmızı",
    weight: "4 kq",
    price: "35.90 ₼",
    image:
      "https://strgimgr.umico.az/img/product/280/5794aa27-b703-44ce-802d-3620f384f82a.jpeg",
    source: "https://birmarket.az/product/1500864-qantel-sweat-4-kq",
  },
  {
    id: 4,
    name: "Qantel, polad, gümüşü",
    category: "Fitness",
    detail: "Xromlanmış polad · Bütöv tökmə",
    weight: "10 kq",
    price: "116.99 ₼",
    image:
      "https://strgimgr.umico.az/img/product/280/7557d268-12be-4e66-acb1-c4901b6ec738.jpeg",
    source: "https://birmarket.az/product/1502844-xrom-qantel",
  },
];

export const whatsappNumber = "994707223939";

export const orderLink = (name, url = "") => {
  const extra = url ? `\nPost linki: ${url}` : "";
  const text = `Salam, Qayalı Sport saytından müraciət edirəm. ${name} haqqında məlumat almaq istəyirəm.${extra}`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
};
