const users = [
  {
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    introduction: `自己紹介です。
    自由に書けます。`,
    thumbnailPath: ""
  }
]

const scenarios = [
  {
    name: 'ハイフェッツをなぞる病',
    author: '〜 さくしゃ 〜',
    description: 'これは天才と秀才の物語である。',
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 2,
    maxPlayer: 6,
    minPlaytime: 178,
    maxPlaytime: 217,
    handoutType: 'NONE',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc'
  },
  {
    name: '毒入りスープ',
    author: '〜 さくしゃ 〜',
    description: '探索者はある日の夜、目を覚ますと正方形の部屋に閉じ込められていました。その真ん中には、机の上に乗った真っ赤なスープが一つぽつんと置かれています。そして椅子の上にはこの部屋の地図と、毒入りスープを飲め、という警告文。知らず知らずの内にチャウグナー・フォーンの気まぐれによってこの世界に閉じ込められた探索者達。彼等は無事、この世界から抜け出すことが出来るのだろうか？',
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 2,
    maxPlayer: 5,
    minPlaytime: 254,
    maxPlaytime: 633,
    handoutType: 'NONE',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc'
  },
  {
    name: '沼男は誰だ？',
    author: '〜 さくしゃ 〜',
    description: '「最近、夫の様子がおかしいんです。」――本日未明、都内で３名分の血溜まりが発見されました。今月に入って同様の事件が…「すみません、ここは一体どこですか？急いで家に帰らないといけないんです！」貴方たちは、そうして非日常に巻き込まれた。“その程度”だったら、どれだけ良かっただろうか。そう思い知ることになるのは、もう少し後のこと。',
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 4,
    maxPlayer: 8,
    minPlaytime: 58,
    maxPlaytime: 471,
    handoutType: 'SECRET',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc'
  },
  {
    name: 'とある幸せな家族の話',
    author: '〜 さくしゃ 〜',
    description: 'あなたたちは、互いが互いを想い合う家族だ。これは、とある幸せな家族の話である。',
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 4,
    maxPlayer: 5,
    minPlaytime: 74,
    maxPlaytime: 278,
    handoutType: 'PUBLIC',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc'
  },
  {
    name: '狂気山脈 ～邪神の山嶺～',
    author: '〜 さくしゃ 〜',
    description: 'ニュージーランド航空の南極飛行観光旅客ジェット機が、謎の失踪を遂げた。南極調査隊の必死の捜索の末、旅客機の無線信号が途絶えた座標の先には、未知の巨大な山脈が立ちはだかっていた。前人未踏のその山脈は、最高高度が海抜一万メートルを越える、エベレストを超える新たなる世界最高峰であることが明らかになった。誰が呼んだか、“狂気山脈”そのあまりに暴力的な山嶺に、今、無謀にも挑もうとするものがいる。はたして、神々の頂の上で、登山家たちが出会うものとは――',
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 4,
    maxPlayer: 5,
    minPlaytime: 184,
    maxPlaytime: 291,
    handoutType: 'SECRET',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc'
  },
  {
    name: '百輝夜行',
    author: '〜 さくしゃ 〜',
    description: '輝く夜をドライブする話。',
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 2,
    maxPlayer: 4,
    minPlaytime: 210,
    maxPlaytime: 403,
    handoutType: 'NONE',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc'
  },
]

const tags = [
  { name: "TRPG", color: "130 183 69" },
  { name: "マダミス", color: "207 85 196" },
  { name: "クトゥルフ神話(6版)", color: "212 96 59" },
  { name: "新クトゥルフ神話(7版)", color: "60 214 128" },
  { name: "エモクロワ", color: "12 93 158" },
  { name: "パラノイア", color: "115 51 220" }
]

module.exports = {
  users,
  scenarios,
  tags,
};