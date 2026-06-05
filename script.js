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
    { type: "兄贵♂", title: "入场♂契约", text: "全员喊出安全词，再用最严肃的脸说：哲♂学开始。" },
    { type: "兄贵♂", title: "黑夜♂身份", text: "给自己取一个兄贵代号，必须像 VHS 封面角色。" },
    { type: "兄贵♂", title: "Gachi♂清单", text: "说出 3 个今晚可玩的兄贵梗：pose、台词、旁白。" },
    { type: "兄贵♂", title: "VAN♂样指令", text: "用硬汉语气发出一个可改写指令。" },
    { type: "兄贵♂", title: "Yes♂Sir", text: "用一句兄贵式回应：Yes Sir / No Sir / 换题 Sir。" },
    { type: "兄贵♂", title: "眼神♂锁定", text: "对视 15 秒，笑场者喊：哲♂学胜利。" },
    { type: "兄贵♂", title: "VHS♂闭眼", text: "闭眼 10 秒，听对方用老录像带声线报幕。" },
    { type: "兄贵♂", title: "禁语♂训练", text: "到下回合前禁用一个普通词，改用 ♂ 代替。" },
    { type: "兄贵♂", title: "慢速♂登场", text: "用 5 秒做一个夸张硬汉入场动作。" },
    { type: "兄贵♂", title: "暗号♂演练", text: "设计继续 / 暂停手势，各演一次。" },
    { type: "兄贵♂", title: "哲♂学停顿", text: "全员沉默 8 秒，只保持硬汉表情。" },
    { type: "兄贵♂", title: "被选♂兄贵", text: "指定一位玩家给你的下一次 DDF 加一个 ♂ 字。" },
    { type: "兄贵♂", title: "低声♂报幕", text: "用低沉 VHS 旁白读出自己的兄贵代号。" },
    { type: "兄贵♂", title: "距离♂审判", text: "摆出双人封面构图，保持 10 秒。" },
    { type: "兄贵♂", title: "角色♂反转", text: "主导旁白和回应旁白交换，再喊一次标题。" },
    { type: "兄贵♂", title: "跳过♂惩罚", text: "跳过这题就喊一句：这就是哲♂学。" },
    { type: "兄贵♂", title: "三段♂气势", text: "用三档声音说：热身、加重、爆裂。" },
    { type: "兄贵♂", title: "台词♂改写", text: "把对方一句普通话改写成兄贵 VHS 台词。" },
    { type: "兄贵♂", title: "暗紫♂舞台", text: "用 3 个词布置一个暗紫霓虹摔跤舞台。" },
    { type: "兄贵♂", title: "停住♂别动", text: "定格成封面姿势 8 秒，任何人可喊停。" },
    { type: "兄贵♂", title: "只许♂复读", text: "接下来 1 分钟，你只能复读最后一个关键词加 ♂。" },
    { type: "兄贵♂", title: "黑夜♂奖励", text: "完成本轮后，指定下一位玩家拿到 DDF。" },
    { type: "兄贵♂", title: "最终♂确认", text: "全员确认：继续 / 减速 / 停止。" },
    { type: "兄贵♂", title: "收尾♂礼仪", text: "击掌、喝水、喊一次：Good♂Job。" },
    { type: "兄贵♂", title: "兄贵♂登场", text: "摆出最夸张硬汉 pose，再喊出今晚安全词。" },
    { type: "兄贵♂", title: "哲♂学宣言", text: "用录像带旁白腔宣读：同意、边界、随时停止。" },
    { type: "兄贵♂", title: "Gachi♂试炼", text: "接受一轮硬汉夸奖，夸奖必须夸张但不越界。" },
    { type: "兄贵♂", title: "VHS♂失真", text: "到下次行动前，说话像老录像带卡顿，每句不超过 8 个字。" },
    { type: "兄贵♂", title: "黑紫♂电流", text: "用 3 个词描述气势：暗紫、爆裂、哲♂学。" },
    { type: "兄贵♂", title: "爆裂♂凝视", text: "和一位玩家对视 15 秒，笑场算兄贵胜利。" },
    { type: "兄贵♂", title: "霓虹♂警报", text: "全员复述停止信号；说错的人回答真心话。" },
    { type: "兄贵♂", title: "肌肉♂审判", text: "指定一位玩家给你一个可拒绝的硬汉指令。" },
    { type: "兄贵♂", title: "硬汉♂反转", text: "主导权交换，下一次 DDF 由被选择者决定完成或改写。" },
    { type: "兄贵♂", title: "哲♂学爆燃", text: "说一句最中二、最像 VHS 封面的硬汉台词。" },
    { type: "兄贵♂", title: "粉紫♂封印", text: "选一个禁用词，到下一轮前说出口就后退 1 格。" },
    { type: "兄贵♂", title: "兄贵♂收束", text: "用一句 Good♂Job 把气氛拉回安全区。" },
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
      { title: "大屁股♂哲学", text: "在 DDF 宇宙里，大屁股代表力量、稳定、压迫感还是搞笑？" },
      { title: "摔跤♂角色", text: "今晚你是选手、裁判、解说、观众还是最终 Boss？" },
      { title: "擂台♂代号", text: "给自己取一个摔跤入场名，必须带一个 ♂。" },
      { title: "屁股♂评级", text: "用 1 到 10 给自己的擂台气势打分，不评价真实身材。" },
      { title: "Gachi♂入场曲", text: "你的摔跤入场曲叫什么？越 VHS 越好。" },
      { title: "VAN♂样名言", text: "说一句你想写在摔跤海报上的硬汉台词。" },
      { title: "压制♂宣言", text: "如果你赢下一回合，你的胜利宣言是什么？" },
      { title: "摔跤♂偏好", text: "更喜欢锁技、压制、反杀、逃脱还是夸张报幕？" },
      { title: "封面♂姿势", text: "描述一个双人 VHS 摔跤封面姿势。" },
      { title: "屁股♂镜头", text: "如果镜头突然推进，你会给这一幕取什么标题？" },
      { title: "暗紫♂擂台", text: "用 3 个词布置今晚的暗紫霓虹摔跤舞台。" },
      { title: "裁判♂规则", text: "如果你是裁判，今晚第一条 DDF 规则叫什么？" },
      { title: "Gachi♂冠军", text: "本局最像冠军的人是谁？给 TA 一个称号。" },
      { title: "热身♂菜单", text: "今天的 Gachi 热身项目叫什么名字？" },
      { title: "锁技♂命名", text: "发明一个不伤人的假摔跤招式名。" },
      { title: "大屁股♂台词", text: "说一句很夸张但不露骨的“大屁股登场”台词。" },
      { title: "哲♂学底线", text: "说一个不能被梗图气氛冲掉的停止信号。" },
      { title: "VHS♂回放", text: "复述上一轮最像录像带回放的一幕。" },
      { title: "粉紫♂警报", text: "说一个今晚禁止出现的普通词，把它封印成 ♂。" },
      { title: "观众♂呼声", text: "给在场观众设计一句应援口号。" },
      { title: "胜利♂姿势", text: "你赢下摔跤回合后的定格姿势叫什么？" },
      { title: "失败♂退场", text: "如果被压制失败，你会用什么台词退场？" },
      { title: "Good♂Job", text: "说一句最适合赛后收尾的 Good♂Job 台词。" },
      { title: "Deep♂Dark", text: "用一句话解释今晚为什么叫 Deep♂Dark♂Fantasy。" },
    ],
    dare: [
      { title: "大屁股♂Pose", text: "摆一个夸张大屁股摔跤 pose，保持 5 秒。" },
      { title: "屁股♂入场", text: "背对观众席完成 3 秒摔跤入场定格。" },
      { title: "Gachi♂锁定", text: "和一位同意的玩家做 5 秒假锁技构图，不用力。" },
      { title: "摔跤♂压制", text: "和一位同意的玩家做 5 秒安全压制姿势，可隔空。" },
      { title: "裁判♂拍地", text: "当裁判拍地三下，大喊：One! Two! Three!" },
      { title: "VHS♂报幕", text: "用老录像带旁白腔介绍下一位选手。" },
      { title: "屁股♂冠军", text: "给自己颁发“大屁股冠军腰带”，并发表 5 秒感言。" },
      { title: "擂台♂转身", text: "慢慢转身看向观众席，做硬汉凝视 5 秒。" },
      { title: "反杀♂定格", text: "表演一个安全反杀定格动作，其他人给招式名。" },
      { title: "霓虹♂锁技", text: "发明一个粉紫霓虹锁技名，并摆出对应姿势。" },
      { title: "Gachi♂倒数", text: "用低沉声音从 10 倒数到 1，每个数字加一个 ♂。" },
      { title: "Deep♂合唱", text: "全员一起喊：Deep♂Dark♂Fantasy。" },
      { title: "屁股♂字幕", text: "给当前画面配一句夸张摔跤字幕。" },
      { title: "VAN♂样入场", text: "从座位起身，用 3 秒完成硬汉入场。" },
      { title: "Gachi♂训练", text: "做 3 次空气深蹲或空气推举，每次喊一个 ♂。" },
      { title: "兄贵♂镜头", text: "假装镜头推进，慢慢抬头看向观众席。" },
      { title: "哲♂学击掌", text: "和一位玩家郑重击掌，宣布本回合成立。" },
      { title: "VHS♂卡顿", text: "接下来三句话都要像录像带卡顿。" },
      { title: "摔跤♂挑战", text: "和一位同意的玩家做 10 秒安全手腕角力。" },
      { title: "屁股♂警报", text: "大喊一句原创“大屁股警报”台词。" },
      { title: "粉紫♂封面", text: "摆出粉紫霓虹封面姿势，保持 6 秒。" },
      { title: "Good♂Job", text: "给一位玩家一个郑重 Good♂Job。" },
      { title: "兄贵♂宣誓", text: "全员各说一个不越界的摔跤规则。" },
      { title: "哲♂学退场", text: "用最严肃的表情完成本轮退场动作。" },
    ],
  },
};

const importedTruthDareDecks = {
  soft: {
    truth: [
      { title: "旅行目的地", text: "如果可以去世界上任何一个地方旅行，你会去哪里？" },
      { title: "三种最爱", text: "说出你最喜欢的三种食物或饮品。" },
      { title: "手机阵营", text: "你更喜欢安卓手机还是苹果手机？为什么？" },
      { title: "上网时间", text: "你每天大概上网几个小时？" },
      { title: "流泪电影", text: "说一部你曾经看哭的电影。" },
      { title: "最难忘礼物", text: "你收到过最难忘的礼物是什么？" },
      { title: "最想重来", text: "你最想从头来过的一件事是什么？" },
      { title: "最想感谢", text: "此刻你最想感谢的人是谁？" },
      { title: "喜欢季节", text: "你最喜欢的季节是什么？" },
      { title: "喜欢颜色", text: "你最喜欢的颜色是什么？" },
      { title: "理想工作", text: "你理想中的工作是什么？" },
      { title: "未来五年", text: "讲述一下你未来 5 年的事业规划。" },
      { title: "三个愿望", text: "说出你最想实现的三个愿望。" },
      { title: "最怕失去", text: "你觉得失去什么最可怕？" },
      { title: "最可信的人", text: "在你心中，谁最值得信赖？" },
      { title: "家里脾气", text: "你们家里谁的脾气最大？" },
      { title: "谁管钱", text: "你们家里谁掌管钱财？" },
      { title: "最讨厌家务", text: "你最讨厌做的家务是什么？" },
      { title: "最长睡眠", text: "你最长一次连续睡了多久？" },
      { title: "小时候绰号", text: "你小时候的绰号是什么？" },
      { title: "最郁闷外号", text: "你觉得自己最郁闷的外号是什么？" },
      { title: "最喜欢歌曲", text: "你最喜欢的一首歌是什么？" },
      { title: "最喜欢电影", text: "你最喜欢的电影是哪一部？" },
      { title: "最喜欢小说", text: "你最喜欢的小说是什么？" },
      { title: "喜欢动画", text: "你小时候最喜欢哪部动画片？" },
      { title: "奇怪食物", text: "你吃过最奇怪的食物是什么？" },
      { title: "奇葩礼物", text: "你收到过最奇葩的礼物是什么？" },
      { title: "星巴克观察", text: "一个人抱着笔记本在咖啡店坐一下午，你怎么看？" },
      { title: "世界悲剧", text: "你觉得世界上最大的悲剧是什么？" },
      { title: "垃圾食品", text: "你能做到一周不吃垃圾食品吗？" },
      { title: "作弊手段", text: "你考试或游戏中用过哪些作弊手段？" },
      { title: "挂科经历", text: "大学到现在一共挂过几门课？" },
      { title: "不顺眼老师", text: "学生时代你最看不顺眼的老师是哪类？" },
      { title: "最糗事情", text: "说一件你做过最糗或最丢脸的事。" },
      { title: "最疯狂", text: "到目前为止你做过最疯狂的事情是什么？" },
      { title: "最严重谎言", text: "说出你撒过的最严重的谎。" },
      { title: "最奢侈消费", text: "你最奢侈的一次消费是什么？" },
      { title: "生活状态", text: "用四个字形容你现在的生活状态。" },
      { title: "如果重来", text: "如果时间倒流，你最想回到哪个时间点？" },
      { title: "超能力", text: "如果能拥有一种超能力，你想要什么？" },
      { title: "穿越选择", text: "给你机会穿越到过去或未来，你选哪一个？" },
      { title: "未来预知", text: "如果能预知未来，你最不希望看到什么？" },
      { title: "天降金币", text: "如果从天而降 99 枚金币，你的第一反应是什么？" },
      { title: "按钮选择", text: "按下按钮能得到十万，但讨厌的明星会爆红，你会按吗？" },
      { title: "荒岛电话", text: "流落荒岛突然有信号，你第一个电话打给谁？" },
      { title: "最美画面", text: "你觉得最美的画面是什么？" },
      { title: "最感动", text: "最近或曾经最让你感动的事情是什么？" },
      { title: "最宝贵财富", text: "你觉得自己拥有的最宝贵财富是什么？" },
      { title: "父母偏好", text: "比较喜欢爸爸还是妈妈？可以解释原因。" },
      { title: "宠物选择", text: "小猫和小狗，你更喜欢哪一个？" },
      { title: "百事可乐", text: "百事或可口，你选哪一个？" },
      { title: "早中晚", text: "今天早上、中午、晚上分别吃了什么？" },
    ],
    dare: [
      { title: "唱高音", text: "唱《青藏高原》最后一句。" },
      { title: "走秀一圈", text: "学超级名模走秀绕场一周。" },
      { title: "满意鬼脸", text: "做一个大家都满意的鬼脸。" },
      { title: "月亮台词", text: "模仿美少女战士水冰月，大声喊出台词。" },
      { title: "三句假话", text: "从现在开始说 3 句假话，让大家猜哪句最像真的。" },
      { title: "我们造句", text: "说出 3 个含有“我们”并且符合实际情况的句子。" },
      { title: "喜欢的歌", text: "唱一句自己最喜欢的歌。" },
      { title: "四字状态", text: "用夸张语气说出你现在的四字生活状态。" },
    ],
  },
  warm: {
    truth: [
      { title: "真实评价", text: "说说你对上一位玩家的真实评价。" },
      { title: "我在你眼里", text: "上一位玩家在你眼里是什么样的人？" },
      { title: "最像的人", text: "你曾经喜欢的人和在座哪位最像？" },
      { title: "朋友或恋人", text: "朋友和男/女朋友哪个更重要？" },
      { title: "爱情或面包", text: "在爱情和面包中，你会选择哪一个？" },
      { title: "爱或被爱", text: "你会选择爱人，还是被爱？" },
      { title: "主动被动", text: "在感情中，你是主动型还是被动型？" },
      { title: "一见钟情", text: "你相信一见钟情吗？" },
      { title: "真爱存在", text: "你认为真爱真的存在吗？" },
      { title: "理想爱人", text: "你心目中理想的爱人是什么样子？" },
      { title: "择偶标准", text: "你的择偶标准是什么？" },
      { title: "理想型", text: "说说你的理想型。" },
      { title: "理想婚礼", text: "你理想中的婚礼是什么样？" },
      { title: "求婚幻想", text: "你对求婚有什么幻想？" },
      { title: "情人节礼物", text: "情人节最想收到什么礼物？" },
      { title: "浪漫方式", text: "你最想给别人怎样的浪漫？" },
      { title: "完美约会", text: "描述一下你心中的完美约会。" },
      { title: "最差约会", text: "描述一次你体验最差的约会。" },
      { title: "约会遇前任", text: "和喜欢的人约会时碰到前任，你会有什么表现？" },
      { title: "前任回头", text: "前任回头找你，你会有一丝心动吗？" },
      { title: "前任现状", text: "你的初恋或前任现在过得怎么样？" },
      { title: "初恋感觉", text: "初恋是什么感觉？" },
      { title: "初恋年龄", text: "你的初恋是几岁？" },
      { title: "暗恋人数", text: "你暗恋过多少个人？" },
      { title: "暗恋表白", text: "你会不会向暗恋的人表白？会怎么表白？" },
      { title: "最喜欢的人", text: "此刻你心里最喜欢的人是谁？可选择跳过。" },
      { title: "每天想起", text: "每天睡觉前最容易想起的人是谁？" },
      { title: "梦中情人", text: "你的梦中情人是谁？" },
      { title: "选现场对象", text: "如果必须从在座的人里选一位做男女朋友，你会选谁？" },
      { title: "谁最幸福", text: "在你的朋友当中，你最希望谁得到幸福？" },
      { title: "吵架伤心", text: "你和在场的谁吵架会最伤心？" },
      { title: "如果我哭了", text: "如果上一位玩家哭了，你会怎么办？" },
      { title: "吵架处理", text: "如果你和伴侣吵架，你会怎么办？" },
      { title: "是否低头", text: "吵架以后你愿意先低头吗？" },
      { title: "怎么哄你", text: "吵架后你希望对方怎么哄你？" },
      { title: "是否粘人", text: "你喜欢另一半粘人一点还是不粘人？" },
      { title: "不喜欢什么", text: "你不喜欢对方做什么事情？" },
      { title: "受不了行为", text: "你最受不了别人对你做什么？" },
      { title: "在意过去", text: "你会不会在意 TA 的过去？为什么？" },
      { title: "异地恋", text: "关于异地恋，你觉得会有结果吗？" },
      { title: "姐弟恋", text: "你对姐弟恋有什么看法？可接受几岁差？" },
      { title: "恋爱资金", text: "你会为爱情筹备恋爱资金吗？" },
      { title: "婚后孩子", text: "结婚后希望生男孩还是女孩？为什么？" },
      { title: "婆媳矛盾", text: "如果婚后有婆媳矛盾，你会怎么平衡？" },
      { title: "物质感情", text: "决定婚姻时，物质和感情各占多大比重？" },
      { title: "分手朋友", text: "男女朋友分手后还能做普通朋友吗？" },
      { title: "心动别人", text: "在一起后遇到更心动的人，你会怎么办？" },
      { title: "对象出国", text: "你的爱人要出国，你会怎么做？" },
      { title: "爱情规则", text: "如果制定一条爱情规则，你会写什么？" },
      { title: "陪伴时间", text: "你希望和对象每天待在一起多久？" },
      { title: "最心动瞬间", text: "那一瞬间你会认定一个人是特别的？" },
      { title: "共同点", text: "你觉得你和上一位玩家有哪些共同点？" },
      { title: "三个缺点", text: "说出自己或上一位玩家的三个小缺点。" },
      { title: "最欣赏部位", text: "你最欣赏自己哪个部位？最不满意哪个部位？" },
      { title: "长相评价", text: "你觉得自己长得如何？" },
      { title: "最迷人时刻", text: "你认为男生或女生什么时候最迷人？" },
      { title: "希望哪好看", text: "你希望另一半哪个部位最好看？" },
      { title: "身体接触边界", text: "你觉得恋人之间身体接触到哪一步算舒服？" },
      { title: "初吻年龄", text: "你的初吻年龄是几岁？" },
      { title: "初吻场景", text: "初吻是在什么情况下发生的？可跳过细节。" },
      { title: "接吻体验", text: "体验最差的一次接吻是什么情况？" },
      { title: "亲吻人数", text: "你亲吻过多少人？可选择不回答。" },
      { title: "街上接吻", text: "你会在大街上和另一半接吻吗？" },
      { title: "婚前亲密", text: "你怎么看婚前亲密关系？" },
      { title: "没有亲密的爱", text: "你认同没有亲密关系的爱情吗？" },
      { title: "恋爱次数", text: "你谈过几次恋爱？" },
      { title: "最多同时", text: "你最多同时喜欢或暧昧过几个人？" },
      { title: "最短恋爱", text: "你最短的一次恋爱是什么情况？" },
      { title: "当过第三者", text: "你有没有卷入过复杂的感情关系？可跳过。" },
      { title: "感情劈腿", text: "你怎么看感情里的劈腿？" },
      { title: "偷吃问题", text: "如果恋爱期间对方在外面偷吃，你会怎么办？" },
      { title: "交友软件", text: "恋爱期间对方还在玩交友软件，你能接受吗？" },
      { title: "前任新欢", text: "前任官宣新欢后半夜发暧昧信息，你会怎么做？" },
    ],
    dare: [
      { title: "公开拥抱", text: "和一位同意的玩家当众拥抱 30 秒。" },
      { title: "亲密称呼", text: "给上一位玩家取一个今晚限定亲密昵称。" },
      { title: "真诚夸奖", text: "认真夸上一位玩家 3 个细节。" },
      { title: "对视挑战", text: "和一位同意的玩家对视 15 秒，不能先笑。" },
      { title: "纸牌传递", text: "用嘴吸住纸牌，让另一位玩家从另一面吸走；不舒服可改成手递。" },
      { title: "夹菜挑战", text: "吃下每个人为你夹的一小口菜；可拒绝不适合的食物。" },
      { title: "厕纸头巾", text: "用卷纸缠头，摆成阿拉丁造型，保持到下一轮。" },
      { title: "厕所唱歌", text: "去门口或角落唱一句歌，让大家能听到。" },
      { title: "撒娇台词", text: "用撒娇语气说：人家受委屈了啦，快来哄哄我。" },
      { title: "吻墙十秒", text: "深情地吻墙或杯子 10 秒。" },
    ],
  },
  hot: {
    truth: [
      { title: "亲密进度", text: "你和恋人进展到哪一步了？可跳过。" },
      { title: "初吻细节", text: "初吻是怎样的？只说你愿意说的部分。" },
      { title: "身体成熟", text: "你觉得自己什么时候身体发育成熟？可跳过。" },
      { title: "身材满意", text: "对自己哪个身体部位最满意？哪个最不满意？" },
      { title: "特殊癖好", text: "你生活中有什么比较特殊的小癖好？可跳过。" },
      { title: "最奇怪癖好", text: "你最奇怪的癖好是什么？可跳过。" },
      { title: "私密幻想", text: "你是否幻想过和喜欢的人做更亲密的事？只回答有或没有。" },
      { title: "希望被怎样靠近", text: "你喜欢对方做哪些小动作？" },
      { title: "男生讨厌女生", text: "男生最讨厌女生哪些行为？女生也可以反向回答。" },
      { title: "女友或男友出轨", text: "如果男/女朋友出轨，你会怎么办？" },
      { title: "分手打算", text: "你会因为什么决定和对象分手？" },
      { title: "责任压力", text: "你觉得我现在是你的责任吗？会有压力吗？" },
      { title: "是否快乐", text: "我们在一起你快乐吗？可按现场关系改成上一位玩家。" },
      { title: "是否最爱", text: "你现在的爱人是你的最爱吗？可跳过。" },
      { title: "是否结婚", text: "你有没有想过和现在喜欢的人结婚？" },
      { title: "什么时候结婚", text: "你打算什么时候结婚？" },
      { title: "奉子成婚", text: "你怎么看奉子成婚？能接受吗？" },
      { title: "介意第一次", text: "你会介意伴侣过去的亲密经历吗？为什么？" },
      { title: "亲密人数", text: "你有多少任对象或亲密经历？可选择跳过。" },
      { title: "存款问题", text: "你现在的存款是多少？可说范围。" },
      { title: "罩杯问题", text: "关于身材尺寸类问题，你愿意回答到什么程度？" },
      { title: "经期问题", text: "涉及生理期这类隐私问题，你希望别人怎样问才不冒犯？" },
      { title: "整容问题", text: "说真的，你整过容吗？可用玩笑回答。" },
      { title: "偷看大片", text: "有没有偷偷看过成人电影？可跳过。" },
      { title: "舌吻看法", text: "你觉得好的接吻最重要的是什么？" },
      { title: "会为爱牺牲", text: "你愿意为爱情牺牲到什么程度？" },
      { title: "为爱自杀", text: "你怎么看“为爱伤害自己”这件事？" },
      { title: "讨厌明星按钮", text: "为了十万让讨厌的明星爆红，你会按按钮吗？" },
      { title: "情敌落水", text: "如果情敌掉水里，你会怎么做？" },
      { title: "母亲伴侣选择", text: "伴侣和父母同时需要你，你会怎么处理？" },
      { title: "同时约你", text: "我和你恋人同时约你，你会陪谁？" },
      { title: "保养话题", text: "你怎么看“被有钱人保养”这类关系？" },
      { title: "底线问题", text: "感情里你绝对不能接受的底线是什么？" },
      { title: "最难释怀", text: "你最难以释怀的事情是什么？" },
      { title: "最想忘记", text: "你最想忘记的事情是什么？" },
      { title: "上次哭", text: "你上次哭是因为什么？" },
      { title: "想到就哭", text: "有没有一个人让你一想到就想哭？" },
      { title: "最近大哭", text: "最近一次大哭是什么时候？为什么？" },
      { title: "最伤心哭", text: "哭得最伤心的是哪一次？为什么？" },
      { title: "离死亡最近", text: "你离死亡最近的一次经历是什么？" },
      { title: "生过重病", text: "你生过最严重的病是什么？" },
      { title: "如果入狱", text: "假如你入狱了，你会怎么打发时间？" },
      { title: "世界末日", text: "如果明天是世界末日，你现在最想做什么？" },
      { title: "救一个人", text: "世界末日你只能救一个人，你会救谁？" },
    ],
    dare: [
      { title: "俯卧撑上方", text: "一位玩家仰躺，另一位玩家在上方做 5 下俯卧撑；双方同意，不舒服可改平板支撑。" },
      { title: "撑在上方", text: "一位玩家仰躺，另一位玩家在上方撑住 5 秒；双方同意，不舒服可改成隔空支撑。" },
      { title: "便秘表演", text: "蹲在凳子旁边，做 5 秒便秘状表情。" },
      { title: "舌头手肘", text: "试试看能不能用舌头舔到手肘。" },
      { title: "舔到鼻子", text: "试试看能不能用舌头碰到鼻子。" },
      { title: "挖鼻指头", text: "说出你通常用哪只手指挖鼻子；不想说就做鬼脸代替。" },
      { title: "上厕所洗手", text: "用最认真语气回答：上厕所后洗手吗？" },
      { title: "拉肚子应急", text: "模拟去喜欢的人家里突然想拉肚子的 10 秒反应。" },
      { title: "尿床宣言", text: "围绕屋子走一圈，并喊：我再也不尿床啦。" },
      { title: "便便二选一", text: "巧克力味的粑粑和粑粑味的巧克力，必须选一个并解释。" },
      { title: "夹菜全吃", text: "每人给你夹一小口菜，能吃的都吃下；不能吃就跳过。" },
      { title: "动作模仿", text: "点击或指定一张图片，模仿动作 3 秒。" },
      { title: "公开亲密拥抱", text: "和一位同意的玩家亲密拥抱 1 分钟；可改成击掌或并肩站。" },
      { title: "举高高撒娇", text: "用撒娇语气说：要亲亲要抱抱要举高高；动作可跳过。" },
    ],
  },
};

Object.entries(importedTruthDareDecks).forEach(([level, deck]) => {
  truthDecks[level].truth.push(...deck.truth);
  truthDecks[level].dare.push(...deck.dare);
});

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

const isFantasyPage = document.body.classList.contains("fantasy-mode");
let selectedGame = isFantasyPage ? "truth" : "flight";
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
  if (spiceLevel === "fantasy") {
    return [...getTruthDeck("truth", spiceLevel), ...getTruthDeck("dare", spiceLevel)].map((card) => ({
      ...card,
      mode: "DDF 真心话大冒险",
    }));
  }
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
  const spiceName = { soft: "暧昧", warm: "升温", hot: "夜深", fantasy: "Deep♂Dark♂Fantasy" }[spiceLevel];
  const gameName =
    spiceLevel === "fantasy" ? "DDF 真心话大冒险" : selectedGame === "flight" ? "夜航飞行棋" : "真心话大冒险";
  document.body.classList.toggle("fantasy-mode", spiceLevel === "fantasy");
  heroQuestionCount.textContent = String(cards.length);
  bankSummary.textContent =
    spiceLevel === "fantasy"
      ? `${gameName} · ${spiceName}：只显示 DDF 题目，共 ${cards.length} 个。`
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
  const fantasy = getSelectedSpiceLevel() === "fantasy";
  selectedGame = fantasy ? "truth" : game;
  gameCards.forEach((card) => {
    const active = card.dataset.game === selectedGame;
    card.classList.toggle("is-active", active);
    card.setAttribute("aria-pressed", String(active));
  });
  startButton.textContent =
    selectedGame === "flight"
      ? fantasy
        ? "开始 DDF 真心话大冒险"
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
  if (isFantasyPage || selectedGame === "truth") {
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
    setSelectedGame(isFantasyPage ? "truth" : "flight");
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
  addLog("真心话大冒险开始。完成题目得 1 分，跳过会记录一次。");
  if (state.spiceLevel === "fantasy") {
    state.log = ["DDF 真心话大冒险开始。完成挑战得 1 分，跳过会记录一次。"];
  }
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
  truthHint.textContent =
    state.spiceLevel === "fantasy"
      ? state.currentPrompt
        ? "完成或跳过当前 DDF 后进入下一位。"
        : "选择真心话、大冒险或随机题。"
      : state.currentPrompt
        ? "完成或跳过当前卡牌后进入下一位。"
        : "选择真心话、大冒险或随机抽卡。";
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
  addLog(
    state.spiceLevel === "fantasy"
      ? `${getCurrentPlayer().name} 拿到${card.type}：${card.title}。`
      : `${getCurrentPlayer().name} 抽到${card.type}：${card.title}。`,
  );
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
  const isFantasy = state.spiceLevel === "fantasy";
  promptType.textContent = isFantasy ? "等待题目" : "等待抽卡";
  promptTitle.textContent = isFantasy ? "选择一种 DDF" : "选择一种卡牌";
  promptText.textContent = isFantasy
    ? "兄贵♂DDF 会显示在这里。完成后加 1 分，跳过会记录一次。"
    : "抽到的任务会显示在这里。完成后加 1 分，跳过会记录一次。";
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
    const player = state.players.find((item) => entry.startsWith(item.name));
    const item = document.createElement("div");
    item.className = "log-item";
    if (player) item.style.setProperty("--log-color", player.color);
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
setSelectedGame(selectedGame);
