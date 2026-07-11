export const mediaVideos = [
  {
    youtubeId: "ZXX94-tWyAo",
    playlistId: "UUejPutS80JMPlmKsoieop8A",
    title: "Qayalı Sport — ən son video",
    label: "Ən son video",
  },
];

const rawPosts = [
  [
    "Dan5-JKiHu6",
    "https://www.instagram.com/p/Dan5-JKiHu6/",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783783768/SnapInsta.to_743995976_18186956602389996_5694124764123100931_n_tfwctt.jpg",
  ],
  [
    "DanvGe7qLZz",
    "https://www.instagram.com/p/DanvGe7qLZz/",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783783911/SnapInsta.to_744782391_18186948145389996_5047049386514745953_n_n5ti54.jpg",
  ],
  [
    "DalZxnJgrSv-1",
    "https://www.instagram.com/p/DalZxnJgrSv/?img_index=1",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783783906/SnapInsta.to_729661351_18186849964389996_6845348795485085976_n_qealjv.jpg",
  ],
  [
    "DalZxnJgrSv-2",
    "https://www.instagram.com/p/DalZxnJgrSv/?img_index=2",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783783894/SnapInsta.to_743951530_18186849976389996_631286862775484775_n_jem8id.jpg",
  ],
  [
    "DalONIuglI2-1",
    "https://www.instagram.com/p/DalONIuglI2/?img_index=1",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783783952/SnapInsta.to_731573109_18186842956389996_7287015539544164987_n_eseez9.jpg",
  ],
  [
    "DalONIuglI2-2",
    "https://www.instagram.com/p/DalONIuglI2/?img_index=2",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783783949/SnapInsta.to_733342536_18186842947389996_5483460683546097337_n_ve5p3v.jpg",
  ],
  [
    "DalONIuglI2-3",
    "https://www.instagram.com/p/DalONIuglI2/?img_index=3",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783783945/SnapInsta.to_733171647_18186842938389996_7696245162325804582_n_krvjhn.jpg",
  ],
  [
    "Dakv5FQghNx-1",
    "https://www.instagram.com/p/Dakv5FQghNx/?img_index=1",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783784024/SnapInsta.to_733868634_18186817432389996_6273384315004526275_n_ylf9w7.jpg",
  ],
  [
    "Dakv5FQghNx-2",
    "https://www.instagram.com/p/Dakv5FQghNx/?img_index=2",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783784022/SnapInsta.to_731462229_18186817423389996_144716996362728672_n_aq0sax.jpg",
  ],
  [
    "DaiasyQimCy",
    "https://www.instagram.com/p/DaiasyQimCy/",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783784029/SnapInsta.to_736479226_18186730627389996_5397510886892871422_n_zy2kd6.jpg",
  ],
  [
    "DagKxJHglPS",
    "https://www.instagram.com/p/DagKxJHglPS/?img_index=1",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783784063/SnapInsta.to_734039292_18186652012389996_2836725097234831043_n_da8upf.jpg",
  ],
  [
    "Dadtl3LgnXb",
    "https://www.instagram.com/p/Dadtl3LgnXb/?img_index=1",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783784091/SnapInsta.to_731111385_18186552226389996_5141537606812226988_n_rnmp4s.jpg",
  ],
  [
    "Dadn4TIglr8",
    "https://www.instagram.com/p/Dadn4TIglr8/?img_index=1",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783784127/SnapInsta.to_729589907_18186549232389996_7574958831488202248_n_fpumzv.jpg",
  ],
  [
    "DadXzRliqa2",
    "https://www.instagram.com/p/DadXzRliqa2/",
    "https://res.cloudinary.com/lulbel02/image/upload/v1783784124/SnapInsta.to_734313834_18186538669389996_2559780558063660403_n_ztfi4e.jpg",
  ],
];

export const instagramPosts = rawPosts.map(([id, url, image], index) => ({
  id,
  type: "p",
  url,
  image,
  label:
    index < 2
      ? "Yeni modellər artıq mağazamızda!"
      : "Qayalı Sport-dan yeni seçim",
  date: "Son paylaşım",
  description:
    "Yeni modellər artıq mağazamızda! Mağazada bütün kartlar keçərlidir (Taksit, Debit). Əlaqə: 070 722 39 39. Ünvan: Sumqayıt, 9-cu mkr.",
}));

export const instagramComments = [
  {
    username: "vuqar_mir",
    text: "Keyfiyyət təsadüf deyil 🔥",
    postUrl: "https://www.instagram.com/p/Dan5-JKiHu6/",
  },
  {
    username: "gunaiboutique",
    text: "Əziyyətə dəyər 👏",
    postUrl: "https://www.instagram.com/p/DanvGe7qLZz/",
  },
  {
    username: "qoshqar_behbudzadeh",
    text: "Fərqi hamı hiss edəcək bir gün 😍",
    postUrl: "https://www.instagram.com/p/DalZxnJgrSv/",
  },
  {
    username: "elseveryusifov",
    text: "Qəşəng 🔥",
    postUrl: "https://www.instagram.com/p/DalONIuglI2/",
  },
  {
    username: "shaiq_rzayev",
    text: "👏👏👏",
    postUrl: "https://www.instagram.com/p/Dakv5FQghNx/",
  },
  {
    username: "intigamhasanov__039",
    text: "👍👍👍",
    postUrl: "https://www.instagram.com/p/DaiasyQimCy/",
  },
];

export const social = {
  instagram: "https://www.instagram.com/qayalisport.az/",
  tiktok: "https://www.tiktok.com/@qayalisport.az",
  youtube: "https://www.youtube.com/@qayalisport",
};
