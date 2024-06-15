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

const dummyScenarios = [
  {
    name: 'ACTOR：０',
    author: 'とりPRO',
    description: `事前に渡された台本を読む新感覚？CoC

    最後まで演じきることができずに終幕した
    その脚本はいつしか、
    
    「ACTOR：0（アクターゼロ）」と呼ばれた。
    
    PL難易度★★★☆☆
    KP難易度★☆☆☆☆
    
    舞台：現代日本
    人数：2-4人
    時間：3-6時間（RPしだいで伸びる）
    共通HO：貴方は役者だ。
    （職業：役者/俳優/女優　固定）
    ロスト率：運が悪いと死ぬ
    
    継続可能/新規可能
    推奨技能：目星/交渉系/芸術（演技）`,
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 1,
    maxPlayer: 4,
    minPlaytime: 300,
    maxPlaytime: 360,
    handoutType: 'PUBLIC',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc',
    scenarioTag: ["TRPG", "クトゥルフ神話(6版)"]
  },
  {
    name: 'ANOMALIA',
    author: 'おぼろそぼろ',
    description: `──その湖畔の洋館で、多くの人々が犠牲となった。 推理×脱出、王道にして新生のクラシックシナリオ。  生き残りたければ、RP(ロールプレイ)をせよ。  

    ◆シナリオ傾向 
    クラシカルホラー 
    
    ◆セッション目安時間
    ６～８時間 
    
    ◆プレイヤー数
    ２～４人(タイマン不可) 
    
    ◆必須技能 
    《言語(英語)》 
    ※PCは英語話者としてください。RPに必須です。  
    
    ◆推奨技能
    《目星》《図書館》《日本語》 
    
    ◆準推奨技能 
    《戦闘技能》`,
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 1,
    maxPlayer: 4,
    minPlaytime: 400,
    maxPlaytime: 480,
    handoutType: 'NONE',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc',
    scenarioTag: ["TRPG", "クトゥルフ神話(6版)"]
  },
  {
    name: 'Bye-Bye-Summer Days',
    author: 'あべべん',
    description: `【 時代設定 】現代日本 【 推奨人数 】４～５人
    【 プレイ時間 】９～１２時間（要二日の可能性大） 
    【 難易度 】高め（謎解き要素あり／大幅な正気度ポイント減少あり） 
    【 探索者の設定 】同じ学校に通い、同じ部活動(オカルト部)に所属している
    高校生である（２年生と３年生にそれぞれ１名以上となるよう振り分ける）。
    オカルト部所属のＰＣとＮＰＣは、互いに中学校以前から付き合いがある。`,
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 1,
    maxPlayer: 4,
    minPlaytime: 600,
    maxPlaytime: 999,
    handoutType: 'PUBLIC',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc',
    scenarioTag: ["TRPG", "クトゥルフ神話(6版)"]
  },
  {
    name: `C'est la vie`,
    author: `すぎうらきりと`,
    description: `プレイヤー人数：3人　プレイ時間：2～3時間
    これは、『人に憧れる怪異たち』の物語。
    「始めていきましょうか！　君たちが“人間”になるために！」`,
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 1,
    maxPlayer: 3,
    minPlaytime: 300,
    maxPlaytime: 360,
    handoutType: 'PUBLIC',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc',
    scenarioTag: ["TRPG", "エモクロワ"]
  },
  {
    name: `Case;Crows File‐01.XXXXXの発端に至る話`,
    author: `宴規`,
    description: `プレイヤー数： 2〜3人　プレイ時間 ：3〜4時間
    新人特異対員としての初任務。植物の生えた不審死体と、それを発端とする都市伝説の正体とは……？`,
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 1,
    maxPlayer: 3,
    minPlaytime: 300,
    maxPlaytime: 360,
    handoutType: 'PUBLIC',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc',
    scenarioTag: ["TRPG", "エモクロワ"]
  },
  {
    name: `Case：Myosotis　side-gecko`,
    author: `つきのわむく（つきめぐり）`,
    description: `シリーズ分類：プロトコルA（メインストーリー（特殊））
    時系列：六畳一間のミソロジーの６年以上前～〃直後～〃の1年後
    必須：六畳一間のミソロジー通過済
    推奨技能：コンピューター、目星、聞き耳、図書館、戦闘技能
    プレイ時間：ボイセ８～１０時間（一本道気味。ＲＰ重視　特殊な戦闘や組織の立場を楽しむ）
    プレイ人数：１～４人
    
    特記：新規限定
    もしくはプロトコルＡのサイドストーリー（あトの祀リなど　つきめぐりＨＰにて一覧を掲載）において作成したキャラクターシートを“複製”して使用できる。
    成長した技能はそのままに、職業技能/興味技能の再分配は可能　ベース職業自由　
    （※人外探索者等の特殊なキャラメイク/設定が付与されたキャラクターシートの場合は特殊な技能や習得した魔術はリセットされる。
    元のキャラクターシートとは別人扱いであり、普通の人間となる。
    あくまで引き継げるのは外見の要素とステータス、技能値+成長した技能ポイントのみ。）


    【ハンドアウト】
    HO
    ・あなたは■■組織「■■■」の構成員である。
    
    
    【注意事項】
    本シナリオにはわずかながらメタフィクションの要素が含まれる。
    ただしこのメタフィクションはPCを創作物と貶めるものではなく　またPCがPLを知覚したり会話を行う等の行為は含まれない。
    あくまで背景設定上存在するのみの要素である。`,
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 1,
    maxPlayer: 4,
    minPlaytime: 400,
    maxPlaytime: 600,
    handoutType: 'PUBLIC',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc',
    scenarioTag: ["TRPG", "クトゥルフ神話(6版)"]
  },
  {
    name: `Death : Incarnation`,
    author: `中尾ヤスヒロ`,
    description: `プレイヤー数：2人　プレイ時間：6～8時間
    同僚刑事のHO1が謎の失踪を遂げた。行方を捜すHO2は夜の路地裏でHO1と似た16歳の人物と出会う。`,
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 1,
    maxPlayer: 2,
    minPlaytime: 400,
    maxPlaytime: 480,
    handoutType: 'PUBLIC',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc',
    scenarioTag: ["TRPG", "エモクロワ"]
  },
  {
    name: `DolL`,
    author: `おぎーノ`,
    description: `シナリオ製作者：おぎーノ
    プレイ人数：2～5人
    プレイ時間：1～4時間
    推奨技能：<<目星>>、<<医学>>、<<図書館>>+<<戦闘技能>>
    
    【あらすじ】
    あなた方は、気がついたら、見知らぬ部屋にいた。
    その部屋は、とても重厚な作りをしている。
    窓の外には雲が見える。
    自動人形がカタカタ動く。
    人形は人となり得るのか。`,
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 1,
    maxPlayer: 4,
    minPlaytime: 200,
    maxPlaytime: 240,
    handoutType: 'NONE',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc',
    scenarioTag: ["TRPG", "クトゥルフ神話(6版)"]
  },
  {
    name: `Dの信仰`,
    author: `みくろ`,
    description: `あなた達はとある日、それぞれ違う友人に呼び出され、同じ相談を受けることとなる。
    「「「最近、友人の様子がおかしくて」」」
    信仰の果てにあるものは、確かな幸福、なのだろうか。
    _________________________________________________________________________________
    【時代設定や舞台】現代日本／舞台は多楽津町という架空の町
    【推奨人数】3人固定（HOあり）
    　個々のNPCと友人設定が付き、その友人の詳細を事前情報として得ることが出来ます。全員24歳。五年ほど前に知り合っており、経緯は好きに決めて構いません。また、PC年齢も特に指定はありません。
    【推奨技能】目星、交渉技能、図書館（無くても可）
    【推奨】継続探索者向け
    【準推奨技能】聞き耳（なくとも構わない）
    【プレイ時間】ボイスセッション：5、6時間～`,
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 1,
    maxPlayer: 3,
    minPlaytime: 300,
    maxPlaytime: 360,
    handoutType: 'PUBLIC',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc',
    scenarioTag: ["TRPG", "クトゥルフ神話(6版)"]
  },
  {
    name: `Gift from...`,
    author: `さんとなな`,
    description: `プレイヤー数：2人　プレイ時間：3～4時間
    共鳴者たちはどうにも最近『つかれやすい』気がする。共に休日を過ごしている時にとある事件に巻き込まれ――。`,
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 1,
    maxPlayer: 2,
    minPlaytime: 180,
    maxPlaytime: 240,
    handoutType: 'NONE',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc',
    scenarioTag: ["TRPG", "クトゥルフ神話(6版)"]
  },
  {
    name: 'Good morinig ALL',
    author: 'あお（キメオール）',
    description: `【概要】
    文明が滅んだ地球を歩き回った。
    無限の退屈は、自身が何者であるかも忘れさせたが、それでも毎日願う。
    
    今日が最高の日になればいい。
    
    
    ■推定プレイ時間 
    4 時間~ 6 時間
    
    ■推奨プレイ人数 
    2 人
    
    ■舞台
    数万年後の地球
    
    ■推奨技能
    目星、聞き耳、図書館、自衛程度の戦闘技能
    
    ■推奨能力値
     [CON] [POW] [APP]
    
     ■公開HO
    ●HO不老不死
    あなたは不老不死のようだ。
    
    ●HO重病人 
    あなたは大病を患っている。`,
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 1,
    maxPlayer: 2,
    minPlaytime: 300,
    maxPlaytime: 360,
    handoutType: 'PUBLIC',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc',
    scenarioTag: ["TRPG", "クトゥルフ神話(6版)"]
  },
  {
    name: 'ⅡⅩⅩⅠ',
    author: '杜明治（QUIET ROOM）',
    description: `クリーム色のタイルの隙間を、赤い糸で繋いで
    いつから狂ってしまった？
    何はともあれ、ここでは言葉より行動が全てだ
    
    
    【テーマ】
    同棲　×　監禁　×　記念日
    
    【導入】
    貴方たちは2人、KPCの家で同棲している。
    2月21日で、同棲1年だ。
    
    同棲1周年　最高の記念日を
    
    
    【基本情報】
    プレイ人数：KPCとのタイマン
    プレイ時間：タイマンボイセ5時間～（テスト時）
    使用サプリ：基本ルールブック（6版）、キーパーコンパニオン、クトゥルフ2015
    ロスト率：？
    舞台：国籍不問、現代
    注意： KPCとのタイマンの場合、KPCはHO1：家主固定。
    R15G程度のグロゴア描写アリ。
    生還しても継続が難しくなる可能性が非常に高い。
    人を選ぶシナリオです。
    倫理的観点からR18。18歳未満の方は閲覧・プレイしないでください。`,
    shortDescription: null,
    thumbnailPath: null,
    minPlayer: 1,
    maxPlayer: 2,
    minPlaytime: 300,
    maxPlaytime: 420,
    handoutType: 'SECRET',
    uploadedUserId: '867370cc-5a74-4dea-b7c7-68946ec095fc',
    scenarioTag: ["TRPG", "クトゥルフ神話(6版)"]
  },
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
  dummyScenarios,
};