const users = [
  {
    id: '2560d018-0fd0-4373-a1f6-c7cb42b87da2',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    introduction: `自己紹介です。
    自由に書けます。`,
    thumbnail_path: ""
  }
]

const scenarios = [
  {
    name: 'ハイフェッツをなぞる病',
    author: '~さくしゃ~',
    distribution_url: 'https://www.youtube.com/',
    thumbnail_path: null,
    short_description: 'これは天才と秀才の物語である。',
    description: 'これは天才と秀才の物語である。',
    min_player: 2,
    max_player: 6,
    min_playtime: 168,
    max_playtime: 438,
    ho_type: '秘匿',
    uploaded_by: '2560d018-0fd0-4373-a1f6-c7cb42b87da2',
  },
  {
    name: '毒入りスープ',
    author: '~さくしゃ~',
    distribution_url: 'https://www.youtube.com/',
    thumbnail_path: null,
    short_description: '探索者はある日の夜、目を覚ますと正方形の部屋に閉じ込められていました。その真ん中には、机の上に乗った真っ赤なスープが一つぽつんと置かれています。そして椅子の上にはこの部屋の地図と、毒入りスープを飲め、という警告文。知らず知らずの内にチャウグナー・フォーンの気まぐれによってこの世界に閉じ込められた探索者達。彼等は無事、この世界から抜け出すことが出来るのだろうか？',
    description: '探索者はある日の夜、目を覚ますと正方形の部屋に閉じ込められていました。その真ん中には、机の上に乗った真っ赤なスープが一つぽつんと置かれています。そして椅子の上にはこの部屋の地図と、毒入りスープを飲め、という警告文。知らず知らずの内にチャウグナー・フォーンの気まぐれによってこの世界に閉じ込められた探索者達。彼等は無事、この世界から抜け出すことが出来るのだろうか？',
    min_player: 4,
    max_player: 7,
    min_playtime: 178,
    max_playtime: 465,
    ho_type: 'なし',
    uploaded_by: '2560d018-0fd0-4373-a1f6-c7cb42b87da2',
  },
  {
    name: '沼男は誰だ？',
    author: '~さくしゃ~',
    distribution_url: 'https://www.youtube.com/',
    thumbnail_path: null,
    short_description: '「最近、夫の様子がおかしいんです。」――本日未明、都内で３名分の血溜まりが発見されました。今月に入って同様の事件が…「すみません、ここは一体どこですか？急いで家に帰らないといけないんです！」貴方たちは、そうして非日常に巻き込まれた。“その程度”だったら、どれだけ良かっただろうか。そう思い知ることになるのは、もう少し後のこと。',
    description: '「最近、夫の様子がおかしいんです。」――本日未明、都内で３名分の血溜まりが発見されました。今月に入って同様の事件が…「すみません、ここは一体どこですか？急いで家に帰らないといけないんです！」貴方たちは、そうして非日常に巻き込まれた。“その程度”だったら、どれだけ良かっただろうか。そう思い知ることになるのは、もう少し後のこと。',
    min_player: 3,
    max_player: 7,
    min_playtime: 144,
    max_playtime: 336,
    ho_type: 'なし',
    uploaded_by: '2560d018-0fd0-4373-a1f6-c7cb42b87da2',
  },
  {
    name: 'とある幸せな家族の話',
    author: '~さくしゃ~',
    distribution_url: 'https://www.youtube.com/',
    thumbnail_path: null,
    short_description: 'あなたたちは、互いが互いを想い合う家族だ。これは、とある幸せな家族の話である。',
    description: 'あなたたちは、互いが互いを想い合う家族だ。これは、とある幸せな家族の話である。',
    min_player: 4,
    max_player: 6,
    min_playtime: 145,
    max_playtime: 419,
    ho_type: 'なし',
    uploaded_by: '2560d018-0fd0-4373-a1f6-c7cb42b87da2',
  },
  {
    name: '狂気山脈 ～邪神の山嶺～',
    author: '~さくしゃ~',
    distribution_url: 'https://www.youtube.com/',
    thumbnail_path: null,
    short_description: 'ニュージーランド航空の南極飛行観光旅客ジェット機が、謎の失踪を遂げた。南極調査隊の必死の捜索の末、旅客機の無線信号が途絶えた座標の先には、未知の巨大な山脈が立ちはだかっていた。前人未踏のその山脈は、最高高度が海抜一万メートルを越える、エベレストを超える新たなる世界最高峰であることが明らかになった。誰が呼んだか、“狂気山脈”そのあまりに暴力的な山嶺に、今、無謀にも挑もうとするものがいる。はたして、神々の頂の上で、登山家たちが出会うものとは――',
    description: 'ニュージーランド航空の南極飛行観光旅客ジェット機が、謎の失踪を遂げた。南極調査隊の必死の捜索の末、旅客機の無線信号が途絶えた座標の先には、未知の巨大な山脈が立ちはだかっていた。前人未踏のその山脈は、最高高度が海抜一万メートルを越える、エベレストを超える新たなる世界最高峰であることが明らかになった。誰が呼んだか、“狂気山脈”そのあまりに暴力的な山嶺に、今、無謀にも挑もうとするものがいる。はたして、神々の頂の上で、登山家たちが出会うものとは――',
    min_player: 2,
    max_player: 4,
    min_playtime: 191,
    max_playtime: 271,
    ho_type: '公開',
    uploaded_by: '2560d018-0fd0-4373-a1f6-c7cb42b87da2',
  },
  {
    name: '百輝夜行',
    author: '~さくしゃ~',
    distribution_url: 'https://www.youtube.com/',
    thumbnail_path: null,
    short_description: '輝く夜をドライブする話。',
    description: '輝く夜をドライブする話。',
    min_player: 3,
    max_player: 6,
    min_playtime: 243,
    max_playtime: 516,
    ho_type: 'なし',
    uploaded_by: '2560d018-0fd0-4373-a1f6-c7cb42b87da2',
  },
]

const tags = [
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