export interface PoemLine {
  text: string;
  keywords: string[];
}

export interface Poem {
  id: string;
  title: string;
  author: string;
  lines: PoemLine[];
  bgImage?: string; // Optional background image URL
}

export const poems: Poem[] = [
  {
    id: "jiang-jin-jiu",
    title: "将进酒",
    author: "李白",
    lines: [
      { text: "君不见，黄河之水天上来，奔流到海不复回。", keywords: ["黄河", "天", "海"] },
      { text: "君不见，高堂明镜悲白发，朝如青丝暮成雪。", keywords: ["明镜", "白发", "青丝", "雪"] },
      { text: "人生得意须尽欢，莫使金樽空对月。", keywords: ["尽欢", "金樽", "月"] },
      { text: "天生我材必有用，千金散尽还复来。", keywords: ["有用", "千金"] },
      { text: "烹羊宰牛且为乐，会须一饮三百杯。", keywords: ["烹羊", "宰牛", "三百杯"] },
      { text: "岑夫子，丹丘生，将进酒，杯莫停。", keywords: ["岑夫子", "丹丘生", "杯"] },
      { text: "与君歌一曲，请君为我倾耳听。", keywords: ["歌一曲", "倾耳听"] },
      { text: "钟鼓馔玉不足贵，但愿长醉不复醒。", keywords: ["钟鼓", "馔玉", "长醉"] },
      { text: "古来圣贤皆寂寞，惟有饮者留其名。", keywords: ["圣贤", "寂寞", "饮者"] },
      { text: "陈王昔时宴平乐，斗酒十千恣欢谑。", keywords: ["陈王", "宴平乐", "斗酒"] },
      { text: "主人何为言少钱，径须沽取对君酌。", keywords: ["少钱", "沽取", "君酌"] },
      { text: "五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。", keywords: ["五花马", "千金裘", "换美酒", "万古愁"] }
    ]
  },
  {
    id: "jing-ye-si",
    title: "静夜思",
    author: "李白",
    lines: [
      { text: "床前明月光，疑是地上霜。", keywords: ["明月", "霜"] },
      { text: "举头望明月，低头思故乡。", keywords: ["望", "思", "故乡"] }
    ]
  },
  {
    id: "chun-xiao",
    title: "春晓",
    author: "孟浩然",
    lines: [
      { text: "春眠不觉晓，处处闻啼鸟。", keywords: ["春眠", "啼鸟"] },
      { text: "夜来风雨声，花落知多少。", keywords: ["风雨", "花落"] }
    ]
  }
];
