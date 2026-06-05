const TRACK_LENGTH = 48;
const HOME_STRETCH = 5;
const FINISH_PROGRESS = TRACK_LENGTH + HOME_STRETCH;
const PIECES_PER_PLAYER = 4;

const playerPresets = [
  { name: "Boy", color: "#dc5d72", start: 6, baseClass: "base-0" },
  { name: "Girl", color: "#e1ad4f", start: 18, baseClass: "base-1" },
  { name: "Player 3", color: "#3dc2b4", start: 30, baseClass: "base-2" },
  { name: "Player 4", color: "#8d78ea", start: 42, baseClass: "base-3" },
];

const flightDecks = {
  soft: [
    { type: "真心话", title: "心动开场", text: "说一个最容易让你心动的小动作。" },
    { type: "默契", title: "只看眼神", text: "和一位同意的玩家对视 10 秒，谁先笑谁后退 1 格。" },
    { type: "亲密", title: "手心暗号", text: "和伴侣设计一个只属于今晚的手心暗号。" },
    { type: "奖励", title: "跳过券", text: "获得一次跳过任务的资格，本局内任意时间可用。" },
    { type: "挑战", title: "低声昵称", text: "下一轮前，用一个新昵称称呼你选择的玩家。" },
    { type: "真心话", title: "偏爱清单", text: "说出对方身上一个你一直偏爱的细节。" },
    { type: "互动", title: "肩颈放松", text: "为一位同意的玩家做 20 秒肩颈或手部按摩。" },
    { type: "默契", title: "二选一", text: "问伴侣一个二选一问题，答中就前进 1 格，答错原地不动。" },
    { type: "互动", title: "十秒靠近", text: "和伴侣肩并肩靠近 10 秒，不需要说话。" },
    { type: "真心话", title: "今晚夸奖", text: "认真夸当前玩家一个今天的细节。" },
    { type: "默契", title: "心跳盲猜", text: "猜对方现在最想被怎样称呼，猜中前进 1 格。" },
    { type: "互动", title: "交换座位", text: "和一位同意的玩家交换位置，保持新的距离到下回合。" },
    { type: "真心话", title: "喜欢的距离", text: "说出你最舒服、也最心动的相处距离。" },
    { type: "挑战", title: "三词告白", text: "只用 3 个词表达今晚对对方的感觉。" },
    { type: "奖励", title: "安全暂停", text: "获得一次不受惩罚的跳过机会，任何任务都可使用。" },
    { type: "互动", title: "温度交换", text: "牵手 20 秒，然后各说一句此刻的感受。" },
  ],
  warm: [
    { type: "亲密", title: "耳边一句", text: "贴近对方耳边说一句只适合今晚听的话。" },
    { type: "挑战", title: "心跳计时", text: "和伴侣保持靠近 15 秒，期间不能笑场。" },
    { type: "真心话", title: "安全幻想", text: "描述一个你想安排的二人约会结尾，保持在彼此舒服的尺度里。" },
    { type: "互动", title: "温柔指令", text: "让对方给你一个 1 分钟的小限制：只说悄悄话、只能用昵称，或不能先笑。" },
    { type: "亲密", title: "可替换亲吻", text: "给一位同意的玩家一个额头、脸颊或手背吻；任何人都可改为拥抱。" },
    { type: "反转", title: "交换航线", text: "指定一位玩家抽任务卡，你替 TA 决定完成或跳过。" },
    { type: "真心话", title: "想被怎样靠近", text: "说出一种不会越界、但会让你心跳加快的靠近方式。" },
    { type: "奖励", title: "专属昵称", text: "指定一位玩家，TA 到下一轮前都要用你选择的昵称称呼你。" },
    { type: "默契", title: "同步呼吸", text: "和伴侣同步呼吸 20 秒，结束后各说一个感受。" },
    { type: "挑战", title: "只许轻声", text: "到你下次行动前，你和伴侣之间只能小声交流。" },
    { type: "真心话", title: "心动剧本", text: "描述一个你愿意在今晚尝试的暧昧小剧本。" },
    { type: "互动", title: "慢速倒数", text: "用 10 秒慢慢靠近对方，任何一方都可以停。" },
    { type: "挑战", title: "一句指令", text: "给对方一个温柔、可拒绝的小指令。" },
    { type: "反转", title: "指定抽卡", text: "指定一位玩家替你抽下一张任务卡。" },
    { type: "亲密", title: "低声邀请", text: "用低声说一句你希望对方靠近的话。" },
    { type: "默契", title: "同频选择", text: "同时说出一个今晚关键词，相同则双方各前进 1 格。" },
  ],
  hot: [
    { type: "亲密", title: "十五秒吻", text: "和伴侣交换一个不超过 15 秒的亲吻；任意一方可改为拥抱或碰杯。" },
    { type: "挑战", title: "慢动作邀请", text: "用 20 秒慢慢邀请对方靠近，语言要克制但让人听懂。" },
    { type: "真心话", title: "边界之内", text: "说一个你今晚愿意尝试的亲密互动，并说清楚你的边界。" },
    { type: "互动", title: "掌心路线", text: "让对方在你的掌心画一个符号，你猜中就前进 1 格。" },
    { type: "亲密", title: "靠近许可", text: "选择一个彼此都舒服的亲密动作，计时 20 秒，随时可以停。" },
    { type: "反转", title: "心动税", text: "对当前领先玩家说一句夸奖；TA 如果脸红或笑场，后退 1 格。" },
    { type: "挑战", title: "只准耳语", text: "到你下次行动前，你和伴侣之间只能用耳语交流。" },
    { type: "真心话", title: "今晚关键词", text: "给今晚选 3 个关键词，并解释为什么。" },
    { type: "亲密", title: "选择位置", text: "选择一个不越界的位置让伴侣轻触 10 秒，可随时改成握手。" },
    { type: "真心话", title: "心动开关", text: "说出一句你最容易被点燃情绪的话，并说明哪里是边界。" },
    { type: "互动", title: "安全词确认", text: "和伴侣确认今晚的暂停词、减速词和继续词。" },
    { type: "亲密", title: "被允许的靠近", text: "说出一种你允许的靠近方式，让对方执行 15 秒。" },
    { type: "挑战", title: "主导一分钟", text: "你来安排接下来 1 分钟的氛围，所有指令都必须可拒绝。" },
    { type: "真心话", title: "更深一点", text: "说出一个你想升级但仍保持安全边界的互动。" },
    { type: "反转", title: "权力交换", text: "下一张任务由对方决定完成、换题或跳过。" },
    { type: "亲密", title: "靠近倒计时", text: "从 10 倒数到 1，每个数字靠近一点，任何人可叫停。" },
  ],
  fantasy: [
    { type: "DDF", title: "入场契约", text: "所有玩家先说出安全词、减速词和绝对不碰的边界，确认后才能继续。" },
    { type: "DDF", title: "黑夜身份", text: "选择一个今晚限定身份，用这个身份向对方发出第一句邀请。" },
    { type: "DDF", title: "允许清单", text: "各说 3 个今晚允许的亲密方向，再说 1 个明确禁止项。" },
    { type: "DDF", title: "支配台词", text: "用克制但强势的语气给对方一个可拒绝的指令。" },
    { type: "DDF", title: "服从回应", text: "用一句话回应对方的指令，表达愿意、减速或拒绝。" },
    { type: "DDF", title: "眼神控制", text: "由当前玩家决定 20 秒内对方看哪里，任何人可随时停。" },
    { type: "DDF", title: "感官剥夺", text: "闭眼 20 秒，由对方用声音引导你想象一个安全场景。" },
    { type: "DDF", title: "禁语规则", text: "到你下次行动前，选一个词不能说；说了就抽一张真心话。" },
    { type: "DDF", title: "慢速命令", text: "给出一个必须慢慢完成的动作，例如靠近、停住、转身或伸手。" },
    { type: "DDF", title: "暗号测试", text: "设置一个继续暗号和一个暂停暗号，立即演练一次。" },
    { type: "DDF", title: "边缘停顿", text: "在气氛刚升温时暂停 10 秒，只用眼神交流。" },
    { type: "DDF", title: "被选择者", text: "当前玩家选择一位同意的玩家，由 TA 决定你下一张卡完成或跳过。" },
    { type: "DDF", title: "危险低语", text: "贴近耳边说一句强烈但不露骨的幻想台词。" },
    { type: "DDF", title: "掌控距离", text: "当前玩家决定两人之间的距离，保持 20 秒。" },
    { type: "DDF", title: "角色反转", text: "主导方和回应方交换身份，重新说一次邀请。" },
    { type: "DDF", title: "黑卡惩罚", text: "跳过本卡需说出一个真实渴望；不想说可直接跳过且不惩罚。" },
    { type: "DDF", title: "三段许可", text: "说出你允许的轻度、中度、高强度互动方向，高强度可留空。" },
    { type: "DDF", title: "命令改写", text: "对方给你一个指令，你可以改写到自己舒服的版本再完成。" },
    { type: "DDF", title: "幻想房间", text: "共同描述一个暗色幻想场景，只描述氛围、规则和边界。" },
    { type: "DDF", title: "停住别动", text: "当前玩家说停，对方保持姿势 10 秒；任何人可解除。" },
    { type: "DDF", title: "只许回答", text: "接下来 1 分钟，你只能回答对方的问题，不能主动提问。" },
    { type: "DDF", title: "黑夜奖励", text: "完成本卡后，可指定下一位玩家抽真心话或大冒险。" },
    { type: "DDF", title: "最终确认", text: "说出此刻你想继续、减速还是结束，并让对方复述确认。" },
    { type: "DDF", title: "安全收尾", text: "用拥抱、碰杯或一句照顾性的话结束这一轮强度。" },
  ],
};

const truthDecks = {
  soft: {
    truth: [
      { title: "第一眼", text: "第一次注意到对方时，你记住了哪个细节？" },
      { title: "心动瞬间", text: "最近一次对对方心动是什么时候？" },
      { title: "理想约会", text: "描述一个今晚就能实现的小约会。" },
      { title: "偏爱动作", text: "你最喜欢对方对你做的哪个小动作？" },
      { title: "安全感", text: "什么样的回应会让你更有安全感？" },
      { title: "秘密夸奖", text: "说一个你很少说出口的夸奖。" },
      { title: "默契测试", text: "猜对方今天最想听到的一句话。" },
      { title: "小愿望", text: "说一个这周想让对方陪你完成的小愿望。" },
      { title: "喜欢的称呼", text: "你最喜欢对方怎样称呼你？" },
      { title: "靠近信号", text: "你发出什么信号时，代表希望对方靠近？" },
      { title: "浪漫底线", text: "什么样的玩笑或互动会让你不舒服？" },
      { title: "理想氛围", text: "灯光、音乐、距离里，你最在意哪一个？" },
    ],
    dare: [
      { title: "十秒对视", text: "和一位同意的玩家对视 10 秒。" },
      { title: "昵称挑战", text: "给当前玩家取一个今晚限定昵称。" },
      { title: "手心温度", text: "牵手 15 秒，然后各说一个词形容感觉。" },
      { title: "温柔夸奖", text: "用不重复的 3 个形容词夸对方。" },
      { title: "靠近一步", text: "向对方靠近一步，保持 10 秒。" },
      { title: "共同暗号", text: "设计一个只有今晚能用的眼神暗号。" },
      { title: "轻声朗读", text: "用轻声读出你抽到的题目标题。" },
      { title: "二选一", text: "让对方出一道二选一，答错就跳过本轮得分。" },
      { title: "靠近三步", text: "用 3 步慢慢靠近对方，每一步都可暂停。" },
      { title: "掌心留言", text: "在对方掌心写一个字，让 TA 猜。" },
      { title: "今晚暗号", text: "给今晚设计一个继续暗号和一个停止暗号。" },
      { title: "温柔邀请", text: "用一句不超过 10 个字的话邀请对方靠近。" },
    ],
  },
  warm: {
    truth: [
      { title: "喜欢被靠近", text: "你喜欢对方用哪种方式靠近你？" },
      { title: "约会结尾", text: "你最期待一次约会怎样结束？" },
      { title: "心跳词", text: "哪一个称呼或语气最容易让你心跳加快？" },
      { title: "亲密边界", text: "说一个你喜欢的亲密互动，以及一个你不想要的边界。" },
      { title: "今晚节奏", text: "你希望今晚更慢一点还是更主动一点？为什么？" },
      { title: "隐藏偏好", text: "说一个你希望对方更常做的小事。" },
      { title: "被看见", text: "你希望对方更懂你的哪一种情绪？" },
      { title: "升温邀请", text: "用一句话邀请对方进入更亲密的氛围。" },
      { title: "触发心动", text: "哪一种眼神、距离或称呼最容易让你心动？" },
      { title: "主动偏好", text: "你更喜欢主动一点，还是被温柔引导？" },
      { title: "想被照顾", text: "亲密氛围后，你最希望对方怎样照顾你？" },
      { title: "今晚请求", text: "向对方提出一个今晚可以完成的亲密请求。" },
    ],
    dare: [
      { title: "耳边邀请", text: "贴近对方耳边说一句克制的邀请。" },
      { title: "肩颈放松", text: "为一位同意的玩家做 20 秒肩颈或手部按摩。" },
      { title: "慢慢靠近", text: "用 15 秒慢慢靠近对方，任何一方都可以叫停。" },
      { title: "额头或手背", text: "给对方额头、脸颊或手背一个吻；可改为拥抱。" },
      { title: "心动台词", text: "用认真语气说一句让对方心动的话。" },
      { title: "同步呼吸", text: "一起同步呼吸 20 秒。" },
      { title: "眼神停留", text: "看着对方说完一句完整夸奖。" },
      { title: "不许先笑", text: "靠近 15 秒，谁先笑谁少 1 分。" },
      { title: "低声倒数", text: "贴近对方，用低声从 10 倒数到 1。" },
      { title: "手腕暗号", text: "轻触对方手腕一次代表继续，两次代表暂停，先演练。" },
      { title: "慢慢邀请", text: "用 20 秒慢慢做出邀请对方靠近的动作。" },
      { title: "今晚台词", text: "说一句你觉得最适合今晚氛围的台词。" },
    ],
  },
  hot: {
    truth: [
      { title: "今晚许可", text: "说一个你今晚愿意尝试的亲密动作，并明确可停止信号。" },
      { title: "心动开关", text: "什么样的语气、距离或动作最容易点燃你的情绪？" },
      { title: "想被邀请", text: "你希望对方怎样邀请你进入更亲密的状态？" },
      { title: "边界词", text: "说一个你会用来暂停的词，以及你希望对方怎样回应。" },
      { title: "慢一点", text: "描述一种你喜欢的慢节奏亲密方式。" },
      { title: "主动权", text: "今晚你更想主导、被引导，还是轮流？" },
      { title: "心跳场景", text: "描述一个不露骨但让你心跳加快的场景。" },
      { title: "收尾方式", text: "你喜欢亲密互动后怎样被照顾？" },
      { title: "开放程度", text: "用 1 到 10 说出你今晚的开放程度，并说明为什么。" },
      { title: "想被掌控", text: "你愿意在哪些小事上让对方做决定？" },
      { title: "不能越过", text: "说一个无论气氛多好也不能越过的边界。" },
      { title: "强烈幻想", text: "描述一个强烈但安全、可停止的幻想方向。" },
    ],
    dare: [
      { title: "十五秒吻", text: "和伴侣交换一个不超过 15 秒的吻；任意一方可改为拥抱。" },
      { title: "靠近许可", text: "选择一个双方舒服的靠近动作，计时 20 秒，随时可以停。" },
      { title: "掌心路线", text: "让对方在掌心画一个符号，你猜中就得 1 分。" },
      { title: "耳语规则", text: "到你下次行动前，你和伴侣之间只能耳语。" },
      { title: "温柔命令", text: "给对方一个温柔、可拒绝的小指令。" },
      { title: "慢动作邀请", text: "用 20 秒慢慢邀请对方靠近。" },
      { title: "选择触碰", text: "选择一个舒服的位置让对方轻触 10 秒，可随时换成牵手。" },
      { title: "只说关键词", text: "用 3 个关键词描述你现在的心情。" },
      { title: "主导一句", text: "用强势但温柔的语气说一句指令，对方可拒绝。" },
      { title: "停顿游戏", text: "气氛升温时突然停住 10 秒，只看着对方。" },
      { title: "许可确认", text: "问对方一个许可问题，得到明确同意后再完成一个靠近动作。" },
      { title: "交换主动权", text: "把下一张卡的完成方式交给对方决定。" },
    ],
  },
  fantasy: {
    truth: [
      { title: "DDF 入场", text: "你今晚最想探索的深色幻想是什么？先说边界，再说期待。" },
      { title: "安全词", text: "说出你的安全词、减速词和继续词，并解释它们的含义。" },
      { title: "权力偏好", text: "你更想掌控、回应，还是在两者之间切换？" },
      { title: "黑夜身份", text: "给自己设定一个今晚限定身份，并说出 TA 的规则。" },
      { title: "允许被命令", text: "你愿意接受哪类可拒绝的指令？哪类绝对不行？" },
      { title: "禁忌边界", text: "说一个让你心动但必须小心处理的幻想边界。" },
      { title: "幻想场景", text: "描述一个深色幻想房间，只说氛围、角色和规则。" },
      { title: "可控失控", text: "什么样的“失控感”对你是安全且有吸引力的？" },
      { title: "被注视", text: "你喜欢被怎样注视？怎样的注视会让你不舒服？" },
      { title: "被选择", text: "如果今晚由对方选择节奏，你希望 TA 先确认什么？" },
      { title: "强度刻度", text: "用 1 到 10 标记你此刻能接受的强度，并说原因。" },
      { title: "命令台词", text: "说一句你愿意听到的命令式台词，保持可拒绝。" },
      { title: "禁止清单", text: "列出 3 个绝对不进入游戏的内容。" },
      { title: "收尾照顾", text: "高强度玩法结束后，你希望对方怎样安抚你？" },
    ],
    dare: [
      { title: "签订黑卡", text: "双方复述安全词和边界，确认后本轮才算完成。" },
      { title: "强势邀请", text: "用强势但不露骨的一句话邀请对方进入角色。" },
      { title: "服从回应", text: "对对方说一句“我愿意 / 我想减速 / 我拒绝”，任选其一。" },
      { title: "眼神命令", text: "只用眼神和手势指挥对方靠近、停住或后退。" },
      { title: "闭眼引导", text: "闭眼 20 秒，由对方用声音引导一个安全幻想场景。" },
      { title: "距离掌控", text: "当前玩家决定两人距离，保持 20 秒，任何人可停。" },
      { title: "禁语一分钟", text: "接下来 1 分钟不能说一个你们共同选定的词。" },
      { title: "角色反转", text: "主导方和回应方交换身份，各说一句台词。" },
      { title: "停住别动", text: "当前玩家说停，对方停住 10 秒；不舒服立即解除。" },
      { title: "黑夜审问", text: "问对方 3 个只能回答“愿意 / 减速 / 拒绝”的问题。" },
      { title: "许可动作", text: "提出一个靠近动作，必须等对方明确说愿意后再做。" },
      { title: "暗号演练", text: "演练继续暗号、减速暗号和停止暗号各一次。" },
      { title: "低声命令", text: "贴近耳边给一个可拒绝的低声指令。" },
      { title: "安全收尾", text: "用拥抱、碰杯或照顾性语言结束这一张黑卡。" },
    ],
  },
};

const eventTypes = [
  { key: "truth", color: "#e1ad4f" },
  { key: "touch", color: "#3dc2b4" },
  { key: "kiss", color: "#dc5d72" },
  { key: "reverse", color: "#8d78ea" },
];

const trackCoordinates = Array.from({ length: TRACK_LENGTH }, (_, index) => {
  if (index <= 12) return { row: 1, col: index + 1 };
  if (index <= 23) return { row: index - 11, col: 13 };
  if (index <= 36) return { row: 13, col: 37 - index };
  return { row: 49 - index, col: 1 };
});

const runwayCoordinates = [
  [
    { row: 2, col: 7 },
    { row: 3, col: 7 },
    { row: 4, col: 7 },
    { row: 5, col: 7 },
    { row: 6, col: 7 },
  ],
  [
    { row: 7, col: 12 },
    { row: 7, col: 11 },
    { row: 7, col: 10 },
    { row: 7, col: 9 },
    { row: 7, col: 8 },
  ],
  [
    { row: 12, col: 7 },
    { row: 11, col: 7 },
    { row: 10, col: 7 },
    { row: 9, col: 7 },
    { row: 8, col: 7 },
  ],
  [
    { row: 7, col: 2 },
    { row: 7, col: 3 },
    { row: 7, col: 4 },
    { row: 7, col: 5 },
    { row: 7, col: 6 },
  ],
];

const setupPanel = document.querySelector("#setupPanel");
const setupForm = document.querySelector("#setupForm");
const nameFields = document.querySelector("#nameFields");
const gameCards = document.querySelectorAll(".game-card");
const startButton = document.querySelector("#startButton");
const bankSection = document.querySelector("#bankSection");
const questionBank = document.querySelector("#questionBank");
const bankSummary = document.querySelector("#bankSummary");
const heroQuestionCount = document.querySelector("#heroQuestionCount");

const gameView = document.querySelector("#gameView");
const board = document.querySelector("#board");
const roundTitle = document.querySelector("#roundTitle");
const currentPlayerName = document.querySelector("#currentPlayerName");
const turnHint = document.querySelector("#turnHint");
const turnCard = document.querySelector("#turnCard");
const diceValue = document.querySelector("#diceValue");
const rollButton = document.querySelector("#rollButton");
const endTurnButton = document.querySelector("#endTurnButton");
const movesPanel = document.querySelector("#movesPanel");
const playersList = document.querySelector("#playersList");
const logList = document.querySelector("#logList");
const restartButton = document.querySelector("#restartButton");
const flightHomeButton = document.querySelector("#flightHomeButton");

const truthView = document.querySelector("#truthView");
const truthRoundTitle = document.querySelector("#truthRoundTitle");
const truthTurnCard = document.querySelector("#truthTurnCard");
const truthPlayerName = document.querySelector("#truthPlayerName");
const truthHint = document.querySelector("#truthHint");
const truthButton = document.querySelector("#truthButton");
const dareButton = document.querySelector("#dareButton");
const randomPromptButton = document.querySelector("#randomPromptButton");
const promptCard = document.querySelector("#promptCard");
const promptType = document.querySelector("#promptType");
const promptTitle = document.querySelector("#promptTitle");
const promptText = document.querySelector("#promptText");
const skipPromptButton = document.querySelector("#skipPromptButton");
const completePromptButton = document.querySelector("#completePromptButton");
const truthPlayersList = document.querySelector("#truthPlayersList");
const truthLogList = document.querySelector("#truthLogList");
const truthHomeButton = document.querySelector("#truthHomeButton");
const truthRestartButton = document.querySelector("#truthRestartButton");

const taskDialog = document.querySelector("#taskDialog");
const taskType = document.querySelector("#taskType");
const taskTitle = document.querySelector("#taskTitle");
const taskText = document.querySelector("#taskText");
const skipTaskButton = document.querySelector("#skipTaskButton");

let selectedGame = "flight";
let state = createEmptyState();
let pendingTask = null;

function createEmptyState() {
  return {
    mode: "setup",
    players: [],
    currentPlayerIndex: 0,
    round: 1,
    lastRoll: null,
    phase: "setup",
    spiceLevel: "soft",
    log: [],
    winnerId: null,
    lastMovedPieceId: null,
    currentPrompt: null,
  };
}

function getSelectedSpiceLevel() {
  return new FormData(setupForm).get("spiceLevel") || "soft";
}

function getDeckLevels(spiceLevel) {
  if (spiceLevel === "fantasy") return ["fantasy"];
  if (spiceLevel === "soft") return ["soft"];
  if (spiceLevel === "warm") return ["soft", "warm"];
  return ["soft", "warm", "hot"];
}

function getFlightDeck(spiceLevel = state.spiceLevel) {
  return getDeckLevels(spiceLevel).flatMap((level) => flightDecks[level]);
}

function getTruthDeck(kind, spiceLevel = state.spiceLevel) {
  const cards = getDeckLevels(spiceLevel).flatMap((level) => truthDecks[level][kind]);
  return cards.map((card) => ({
    ...card,
    type: kind === "truth" ? "真心话" : "大冒险",
    kind,
  }));
}

function getVisibleQuestionCards() {
  const spiceLevel = getSelectedSpiceLevel();
  if (selectedGame === "flight") {
    return getFlightDeck(spiceLevel).map((card) => ({
      ...card,
      mode: "飞行棋",
    }));
  }
  return [...getTruthDeck("truth", spiceLevel), ...getTruthDeck("dare", spiceLevel)].map((card) => ({
    ...card,
    mode: "真心话大冒险",
  }));
}

function renderQuestionBank() {
  const cards = getVisibleQuestionCards();
  const spiceLevel = getSelectedSpiceLevel();
  const spiceName = { soft: "暧昧", warm: "升温", hot: "夜深", fantasy: "Deep Dark Fantasy" }[spiceLevel];
  const gameName =
    spiceLevel === "fantasy"
      ? selectedGame === "flight"
        ? "DDF 飞行棋"
        : "DDF 真心话大冒险"
      : selectedGame === "flight"
        ? "夜航飞行棋"
        : "真心话大冒险";
  document.body.classList.toggle("fantasy-mode", spiceLevel === "fantasy");
  heroQuestionCount.textContent = String(cards.length);
  bankSummary.textContent =
    spiceLevel === "fantasy"
      ? `${gameName} · ${spiceName}：只抽取 DDF 专属黑卡，共 ${cards.length} 张。`
      : `${gameName} · ${spiceName}：当前测试会抽取 ${cards.length} 张卡。`;
  questionBank.innerHTML = "";

  cards.forEach((card, index) => {
    const item = document.createElement("article");
    item.className = "bank-card";
    item.style.animationDelay = `${Math.min(index, 12) * 24}ms`;
    item.innerHTML = `
      <span>${card.mode} / ${card.type}</span>
      <strong>${card.title}</strong>
      <p>${card.text}</p>
    `;
    questionBank.append(item);
  });
}

function setSelectedGame(game) {
  selectedGame = game;
  const fantasy = getSelectedSpiceLevel() === "fantasy";
  gameCards.forEach((card) => {
    const active = card.dataset.game === game;
    card.classList.toggle("is-active", active);
    card.setAttribute("aria-pressed", String(active));
  });
  startButton.textContent =
    game === "flight"
      ? fantasy
        ? "开始 DDF 飞行棋"
        : "开始夜航飞行棋"
      : fantasy
        ? "开始 DDF 真心话大冒险"
        : "开始真心话大冒险";
  renderQuestionBank();
}

function syncNameFields() {
  const count = Number(new FormData(setupForm).get("playerCount"));
  const existing = new FormData(setupForm);
  nameFields.querySelectorAll(".name-input").forEach((node) => node.remove());

  playerPresets.slice(0, count).forEach((preset, index) => {
    const label = document.createElement("label");
    label.className = "name-input";
    label.innerHTML = `
      <span>玩家 ${index + 1}</span>
      <input name="playerName${index}" maxlength="12" value="${existing.get(`playerName${index}`) || preset.name}" />
    `;
    nameFields.append(label);
  });
}

function buildPlayers(includePieces) {
  const formData = new FormData(setupForm);
  const playerCount = Number(formData.get("playerCount"));
  return playerPresets.slice(0, playerCount).map((preset, index) => {
    const player = {
      id: index,
      name: (formData.get(`playerName${index}`) || preset.name).toString().trim() || preset.name,
      color: preset.color,
      start: preset.start,
      baseClass: preset.baseClass,
      skipTokens: 0,
      score: 0,
      skips: 0,
    };
    if (includePieces) {
      player.pieces = Array.from({ length: PIECES_PER_PLAYER }, (_, pieceIndex) => ({
        id: pieceIndex,
        progress: -1,
      }));
    }
    return player;
  });
}

function startGame(event) {
  event.preventDefault();
  if (selectedGame === "truth") {
    startTruthGame();
    return;
  }
  startFlightGame();
}

function hideLobby() {
  setupPanel.classList.add("is-hidden");
  bankSection.classList.add("is-hidden");
  scrollToTop();
}

function showLobby(resetForm = false) {
  state = createEmptyState();
  pendingTask = null;
  if (taskDialog.open) taskDialog.close();
  gameView.classList.add("is-hidden");
  truthView.classList.add("is-hidden");
  setupPanel.classList.remove("is-hidden");
  bankSection.classList.remove("is-hidden");
  if (resetForm) {
    setupForm.reset();
    setSelectedGame("flight");
  }
  syncNameFields();
  renderQuestionBank();
  scrollToTop();
}

function startFlightGame() {
  state = createEmptyState();
  state.mode = "flight";
  state.phase = "roll";
  state.spiceLevel = getSelectedSpiceLevel();
  state.players = buildPlayers(true);

  hideLobby();
  truthView.classList.add("is-hidden");
  gameView.classList.remove("is-hidden");
  addLog("游戏开始。掷到 6 可以起飞，四架飞机全部进入终点即获胜。");
  buildBoard();
  renderFlight();
}

function startTruthGame() {
  state = createEmptyState();
  state.mode = "truth";
  state.phase = "draw";
  state.spiceLevel = getSelectedSpiceLevel();
  state.players = buildPlayers(false);

  hideLobby();
  gameView.classList.add("is-hidden");
  truthView.classList.remove("is-hidden");
  addLog("真心话大冒险开始。完成卡牌得 1 分，跳过会记录一次。");
  renderTruth();
}

function buildBoard() {
  board.innerHTML = "";

  trackCoordinates.forEach((coord, index) => {
    const cell = document.createElement("div");
    const isStart = playerPresets.some((player) => player.start === index);
    const isSafe = isStart || index % 6 === 0;
    const event = eventTypes[index % eventTypes.length];
    cell.className = `cell ${isSafe ? "safe" : "event"} ${isStart ? "start" : ""}`;
    cell.dataset.trackIndex = index;
    cell.style.gridColumn = String(coord.col);
    cell.style.gridRow = String(coord.row);
    cell.style.setProperty("--cell-mark", event.color);
    board.append(cell);
  });

  playerPresets.forEach((preset, playerIndex) => {
    runwayCoordinates[playerIndex].forEach((coord) => {
      const cell = document.createElement("div");
      cell.className = "cell runway";
      cell.dataset.runway = String(playerIndex);
      cell.style.gridColumn = String(coord.col);
      cell.style.gridRow = String(coord.row);
      cell.style.setProperty("--cell-mark", preset.color);
      board.append(cell);
    });
  });

  const finish = document.createElement("div");
  finish.className = "cell finish";
  finish.dataset.finish = "true";
  finish.innerHTML = '<span class="finish-label">终点<br />LOUNGE</span>';
  board.append(finish);

  state.players.forEach((player) => {
    const base = document.createElement("div");
    base.className = `base ${player.baseClass}`;
    base.dataset.basePlayer = String(player.id);
    base.dataset.name = player.name;
    base.style.setProperty("--base-color", player.color);
    board.append(base);
  });
}

function renderFlight() {
  renderBoardPieces();
  renderFlightSidebar();
  renderMoves();
  renderLog(logList);
}

function renderBoardPieces() {
  board.querySelectorAll(".stack").forEach((stack) => stack.remove());
  board.querySelectorAll(".base .plane").forEach((plane) => plane.remove());

  const grouped = new Map();
  state.players.forEach((player) => {
    player.pieces.forEach((piece) => {
      const key = getPieceLocationKey(player, piece);
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push({ player, piece });
    });
  });

  grouped.forEach((items, key) => {
    const target = getLocationElement(key);
    if (!target) return;

    if (key.startsWith("base")) {
      items.forEach(({ player, piece }) => target.append(createPlaneElement(player, piece)));
      return;
    }

    const stack = document.createElement("div");
    stack.className = "stack";
    items.forEach(({ player, piece }) => stack.append(createPlaneElement(player, piece)));
    target.append(stack);
  });
}

function createPlaneElement(player, piece) {
  const plane = document.createElement("button");
  plane.type = "button";
  plane.className = "plane";
  plane.style.setProperty("--plane-color", player.color);
  plane.innerHTML = `<span>${piece.id + 1}</span>`;
  plane.setAttribute("aria-label", `${player.name} 的 ${piece.id + 1} 号飞机`);
  if (piece.progress === FINISH_PROGRESS) plane.classList.add("finished");

  const movable = getMovablePieces().some((item) => item.player.id === player.id && item.piece.id === piece.id);
  if (movable) {
    plane.classList.add("is-movable");
    plane.addEventListener("click", () => movePiece(player.id, piece.id));
  } else {
    plane.disabled = true;
  }
  return plane;
}

function getPieceLocationKey(player, piece) {
  if (piece.progress < 0) return `base-${player.id}`;
  if (piece.progress === FINISH_PROGRESS) return "finish";
  if (piece.progress >= TRACK_LENGTH) return `runway-${player.id}-${piece.progress - TRACK_LENGTH}`;
  return `track-${(player.start + piece.progress) % TRACK_LENGTH}`;
}

function getLocationElement(key) {
  if (key === "finish") return board.querySelector("[data-finish='true']");
  if (key.startsWith("base")) return board.querySelector(`[data-base-player='${key.split("-")[1]}']`);
  if (key.startsWith("track")) return board.querySelector(`[data-track-index='${key.split("-")[1]}']`);
  if (key.startsWith("runway")) {
    const [, playerId, runwayIndex] = key.split("-");
    return board.querySelectorAll(`[data-runway='${playerId}']`)[Number(runwayIndex)];
  }
  return null;
}

function renderFlightSidebar() {
  const player = getCurrentPlayer();
  roundTitle.textContent = `第 ${state.round} 轮`;
  currentPlayerName.textContent = player?.name || "游戏结束";
  turnCard.style.borderLeftColor = player?.color || "var(--gold)";
  turnHint.textContent = getTurnHint();
  diceValue.textContent = state.lastRoll || "?";
  rollButton.disabled = state.phase !== "roll" || state.winnerId !== null;
  endTurnButton.disabled = !["choose", "afterMove"].includes(state.phase) || state.winnerId !== null;

  renderPlayers(playersList, (item, index) => {
    const finished = item.pieces.filter((piece) => piece.progress === FINISH_PROGRESS).length;
    const prefix = index === state.currentPlayerIndex && state.winnerId === null ? "当前 · " : "";
    return { name: `${prefix}${item.name}`, score: `${finished}/${PIECES_PER_PLAYER}` };
  });
}

function getTurnHint() {
  if (state.winnerId !== null) return `${state.players[state.winnerId].name} 已抵达终点。`;
  if (state.phase === "roll") return "点击掷骰开始这一回合。";
  if (state.phase === "choose") return `掷出 ${state.lastRoll}，选择一架可移动的飞机。`;
  if (state.phase === "afterMove" && state.lastRoll === 6) return "掷到 6，完成任务后可继续掷骰。";
  return "完成当前互动后结束回合。";
}

function renderMoves() {
  movesPanel.innerHTML = "";
  if (state.phase !== "choose") return;

  const moves = getMovablePieces();
  if (!moves.length) {
    const note = document.createElement("p");
    note.className = "log-item";
    note.textContent = "没有可移动的飞机。";
    movesPanel.append(note);
    return;
  }

  moves.forEach(({ player, piece, label }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "move-button";
    button.innerHTML = `
      <span class="mini-plane" style="background: ${player.color}">${piece.id + 1}</span>
      <span>${label}</span>
    `;
    button.addEventListener("click", () => movePiece(player.id, piece.id));
    movesPanel.append(button);
  });
}

function rollDice() {
  if (state.phase !== "roll" || state.winnerId !== null) return;
  state.lastRoll = Math.floor(Math.random() * 6) + 1;
  const player = getCurrentPlayer();
  addLog(`${player.name} 掷出 ${state.lastRoll}。`);

  const moves = getMovablePieces();
  if (!moves.length) {
    addLog(`${player.name} 没有可移动的飞机，回合结束。`);
    state.phase = "afterMove";
    renderFlight();
    return;
  }

  state.phase = "choose";
  renderFlight();
}

function getMovablePieces() {
  if (state.mode !== "flight" || (state.phase !== "choose" && state.phase !== "roll")) return [];
  const player = getCurrentPlayer();
  if (!player || !state.lastRoll) return [];

  return player.pieces
    .filter((piece) => {
      if (piece.progress === FINISH_PROGRESS) return false;
      if (piece.progress < 0) return state.lastRoll === 6;
      return piece.progress + state.lastRoll <= FINISH_PROGRESS;
    })
    .map((piece) => ({
      player,
      piece,
      label: getMoveLabel(piece),
    }));
}

function getMoveLabel(piece) {
  if (piece.progress < 0) return `让 ${piece.id + 1} 号飞机起飞`;
  const nextProgress = piece.progress + state.lastRoll;
  if (nextProgress === FINISH_PROGRESS) return `让 ${piece.id + 1} 号飞机进入终点`;
  if (nextProgress >= TRACK_LENGTH) return `让 ${piece.id + 1} 号飞机进入专属航道`;
  return `移动 ${piece.id + 1} 号飞机 ${state.lastRoll} 格`;
}

function movePiece(playerId, pieceId) {
  if (state.phase !== "choose" || state.winnerId !== null) return;
  const player = state.players[playerId];
  const piece = player.pieces[pieceId];
  const legal = getMovablePieces().some((item) => item.piece === piece);
  if (!legal) return;

  const oldProgress = piece.progress;
  piece.progress = oldProgress < 0 ? 0 : piece.progress + state.lastRoll;
  state.lastMovedPieceId = piece.id;

  if (piece.progress === FINISH_PROGRESS) {
    addLog(`${player.name} 的 ${piece.id + 1} 号飞机进入终点。`);
  } else {
    handleCollision(player, piece);
    drawFlightTask(player);
  }

  if (player.pieces.every((item) => item.progress === FINISH_PROGRESS)) {
    state.winnerId = player.id;
    state.phase = "finished";
    addLog(`${player.name} 获胜。今晚的夜航抵达终点。`);
    renderFlight();
    showFlightTask({
      type: "终局奖励",
      title: "胜者加冕",
      text: `${player.name} 可以指定一个所有人都舒服的终局奖励，或直接选择一个温柔收尾。`,
    });
    return;
  }

  state.phase = "afterMove";
  renderFlight();
}

function handleCollision(player, piece) {
  if (piece.progress >= TRACK_LENGTH) return;
  const absoluteIndex = (player.start + piece.progress) % TRACK_LENGTH;
  const isSafe = playerPresets.some((preset) => preset.start === absoluteIndex) || absoluteIndex % 6 === 0;
  if (isSafe) return;

  const bumped = [];
  state.players.forEach((other) => {
    if (other.id === player.id) return;
    other.pieces.forEach((otherPiece) => {
      if (otherPiece.progress < 0 || otherPiece.progress >= TRACK_LENGTH) return;
      const otherIndex = (other.start + otherPiece.progress) % TRACK_LENGTH;
      if (otherIndex === absoluteIndex) {
        otherPiece.progress = -1;
        bumped.push(`${other.name} 的 ${otherPiece.id + 1} 号`);
      }
    });
  });

  if (bumped.length) addLog(`${player.name} 撞机，${bumped.join("、")} 飞机回库。`);
}

function drawFlightTask(player) {
  const deck = getFlightDeck();
  const task = deck[Math.floor(Math.random() * deck.length)];
  if (task.title === "跳过券") player.skipTokens += 1;
  showFlightTask(task);
}

function showFlightTask(task) {
  pendingTask = task;
  taskType.textContent = task.type;
  taskTitle.textContent = task.title;
  taskText.textContent = task.text;
  skipTaskButton.disabled = false;
  if (taskDialog.showModal) {
    taskDialog.showModal();
  } else {
    alert(`${task.title}\n${task.text}`);
  }
}

function handleTaskClose() {
  if (!pendingTask || state.mode !== "flight") return;
  const player = getCurrentPlayer();
  if (taskDialog.returnValue === "skip") {
    if (player?.skipTokens > 0) {
      player.skipTokens -= 1;
      addLog(`${player.name} 使用跳过券。`);
    } else {
      addLog(`${player?.name || "玩家"} 跳过任务，后退 1 格。`);
      stepBackCurrentPiece();
    }
  } else {
    addLog(`${player?.name || "玩家"} 完成任务：${pendingTask.title}。`);
  }
  pendingTask = null;
  renderFlight();
}

function stepBackCurrentPiece() {
  const player = getCurrentPlayer();
  if (!player) return;
  const piece = player.pieces.find((item) => item.id === state.lastMovedPieceId);
  if (piece && piece.progress > 0 && piece.progress < FINISH_PROGRESS) piece.progress -= 1;
}

function nextTurn() {
  if (state.winnerId !== null) return;
  const keepTurn = state.lastRoll === 6 && state.phase === "afterMove";
  if (!keepTurn) {
    advancePlayer();
  } else {
    addLog(`${getCurrentPlayer().name} 掷到 6，继续行动。`);
  }
  state.lastRoll = null;
  state.lastMovedPieceId = null;
  state.phase = "roll";
  renderFlight();
}

function renderTruth() {
  const player = getCurrentPlayer();
  truthRoundTitle.textContent = `第 ${state.round} 轮`;
  truthPlayerName.textContent = player?.name || "游戏结束";
  truthTurnCard.style.borderLeftColor = player?.color || "var(--teal)";
  truthHint.textContent = state.currentPrompt ? "完成或跳过当前卡牌后进入下一位。" : "选择真心话、大冒险或随机抽卡。";
  truthButton.disabled = Boolean(state.currentPrompt);
  dareButton.disabled = Boolean(state.currentPrompt);
  randomPromptButton.disabled = Boolean(state.currentPrompt);
  skipPromptButton.disabled = !state.currentPrompt;
  completePromptButton.disabled = !state.currentPrompt;

  renderPlayers(truthPlayersList, (item, index) => {
    const prefix = index === state.currentPlayerIndex ? "当前 · " : "";
    return { name: `${prefix}${item.name}`, score: `${item.score} 分 / 跳过 ${item.skips}` };
  });
  renderLog(truthLogList);
}

function drawPrompt(kind) {
  if (state.mode !== "truth" || state.currentPrompt) return;
  const resolvedKind = kind === "random" ? (Math.random() > 0.5 ? "truth" : "dare") : kind;
  const deck = getTruthDeck(resolvedKind);
  const card = deck[Math.floor(Math.random() * deck.length)];
  state.currentPrompt = card;
  promptType.textContent = card.type;
  promptTitle.textContent = card.title;
  promptText.textContent = card.text;
  promptCard.classList.remove("is-dealt");
  void promptCard.offsetWidth;
  promptCard.classList.add("is-dealt");
  addLog(`${getCurrentPlayer().name} 抽到${card.type}：${card.title}。`);
  renderTruth();
}

function completePrompt() {
  if (!state.currentPrompt) return;
  const player = getCurrentPlayer();
  player.score += 1;
  addLog(`${player.name} 完成：${state.currentPrompt.title}，获得 1 分。`);
  clearPromptCard();
  advancePlayer();
  renderTruth();
}

function skipPrompt() {
  if (!state.currentPrompt) return;
  const player = getCurrentPlayer();
  player.skips += 1;
  addLog(`${player.name} 跳过：${state.currentPrompt.title}。`);
  clearPromptCard();
  advancePlayer();
  renderTruth();
}

function clearPromptCard() {
  state.currentPrompt = null;
  promptType.textContent = "等待抽卡";
  promptTitle.textContent = "选择一种卡牌";
  promptText.textContent = "抽到的任务会显示在这里。完成后加 1 分，跳过会记录一次。";
  promptCard.classList.remove("is-dealt");
}

function advancePlayer() {
  state.currentPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
  if (state.currentPlayerIndex === 0) state.round += 1;
}

function renderPlayers(target, getMeta) {
  target.innerHTML = "";
  state.players.forEach((item, index) => {
    const meta = getMeta(item, index);
    const row = document.createElement("div");
    row.className = "player-row";
    row.innerHTML = `
      <span class="player-color" style="--player-color: ${item.color}"></span>
      <span class="player-name">${meta.name}</span>
      <span class="player-score">${meta.score}</span>
    `;
    target.append(row);
  });
}

function renderLog(target) {
  target.innerHTML = "";
  state.log.slice(0, 10).forEach((entry) => {
    const item = document.createElement("div");
    item.className = "log-item";
    item.textContent = entry;
    target.append(item);
  });
}

function getCurrentPlayer() {
  return state.players[state.currentPlayerIndex];
}

function addLog(message) {
  state.log.unshift(message);
}

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

gameCards.forEach((card) => {
  card.addEventListener("click", () => setSelectedGame(card.dataset.game));
});

setupForm.addEventListener("change", (event) => {
  if (event.target.name === "playerCount") syncNameFields();
  if (event.target.name === "spiceLevel" || event.target.name === "playerCount") renderQuestionBank();
});
setupForm.addEventListener("submit", startGame);

rollButton.addEventListener("click", rollDice);
endTurnButton.addEventListener("click", nextTurn);
restartButton.addEventListener("click", () => showLobby(true));
flightHomeButton.addEventListener("click", () => showLobby(false));
taskDialog.addEventListener("close", handleTaskClose);

truthButton.addEventListener("click", () => drawPrompt("truth"));
dareButton.addEventListener("click", () => drawPrompt("dare"));
randomPromptButton.addEventListener("click", () => drawPrompt("random"));
completePromptButton.addEventListener("click", completePrompt);
skipPromptButton.addEventListener("click", skipPrompt);
truthRestartButton.addEventListener("click", () => showLobby(true));
truthHomeButton.addEventListener("click", () => showLobby(false));

syncNameFields();
setSelectedGame("flight");
