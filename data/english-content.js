(() => {
  const levels = ["soft", "warm", "hot"];

  function createPack() {
    return {
      flight: { soft: [], warm: [], hot: [] },
      truth: {
        soft: { truth: [], dare: [] },
        warm: { truth: [], dare: [] },
        hot: { truth: [], dare: [] },
        fantasy: { truth: [], dare: [] },
      },
      dice: { soft: [], warm: [], hot: [] },
      sync: { soft: [], warm: [], hot: [] },
      mini: {
        wheel: { soft: [], warm: [], hot: [] },
        box: { soft: [], warm: [], hot: [] },
        story: { soft: [], warm: [], hot: [] },
      },
    };
  }

  const levelMeta = {
    soft: {
      label: "Soft",
      flightType: "Soft Route",
      truthType: "Truth",
      dareType: "Dare",
      diceType: "Soft Dice",
      syncType: "Sync",
      wheelType: "Heart Wheel",
      boxType: "Mystery Box",
      storyType: "Role Scene",
      pace: "light and playful",
      timer: 20,
      boundary: "keep it easy to decline",
    },
    warm: {
      label: "Warm",
      flightType: "Warm Route",
      truthType: "Warm Truth",
      dareType: "Warm Dare",
      diceType: "Warm Dice",
      syncType: "Warm Sync",
      wheelType: "Warm Wheel",
      boxType: "Warm Box",
      storyType: "Warm Scene",
      pace: "closer, slower, and clearly consensual",
      timer: 30,
      boundary: "ask before moving closer",
    },
    hot: {
      label: "Late Night",
      flightType: "Late Route",
      truthType: "Late Truth",
      dareType: "Late Dare",
      diceType: "Late Dice",
      syncType: "Late Sync",
      wheelType: "Late Wheel",
      boxType: "Late Box",
      storyType: "Late Scene",
      pace: "bold but still reversible",
      timer: 45,
      boundary: "confirm continue, slow down, and stop signals first",
    },
  };

  const themes = [
    { title: "Eye Contact", focus: "eye contact", action: "hold eye contact", question: "what kind of eye contact feels exciting instead of awkward" },
    { title: "Nickname", focus: "nicknames", action: "give someone a one-round nickname", question: "what nickname would make you smile tonight" },
    { title: "Distance", focus: "distance", action: "adjust the distance between two players", question: "what distance feels comfortable and a little electric" },
    { title: "Compliment", focus: "praise", action: "give a specific compliment", question: "what compliment do you secretly want to hear" },
    { title: "Whisper", focus: "voice", action: "say one line in a low voice", question: "what tone makes a simple sentence feel intimate" },
    { title: "Permission", focus: "consent", action: "ask a clear permission question", question: "what question would make you feel safe saying yes or no" },
    { title: "Pause", focus: "pauses", action: "pause for a few seconds before continuing", question: "when does a pause make the moment better" },
    { title: "Aftercare", focus: "aftercare", action: "offer a small aftercare choice", question: "what helps you feel cared for after a charged moment" },
    { title: "Secret Signal", focus: "signals", action: "create a private continue and stop signal", question: "what signal would be easy for you to use" },
    { title: "Movie Line", focus: "romantic lines", action: "deliver a restrained movie-style line", question: "what kind of line feels charming rather than cheesy" },
    { title: "Touch Option", focus: "touch choices", action: "offer a touch or a no-touch alternative", question: "where is the clearest boundary for touch tonight" },
    { title: "Role Swap", focus: "role swap", action: "switch who leads the next small choice", question: "do you prefer leading, being led, or alternating tonight" },
    { title: "Slow Count", focus: "slow pacing", action: "count down slowly before the action", question: "what pace helps you stay present" },
    { title: "Shared Memory", focus: "memories", action: "turn a memory into a short challenge", question: "what tiny memory still feels warm" },
    { title: "Wish Card", focus: "wishes", action: "state one small wish for this week", question: "what small wish could someone help you complete" },
    { title: "Rewrite", focus: "rewriting", action: "rewrite a task into a safer version", question: "how would you rewrite a risky prompt into something fun" },
  ];

  const subjects = [
    "the current player",
    "the player on your left",
    "the player on your right",
    "a player you choose",
    "the quietest player",
    "the current leader",
    "the last player who completed a task",
    "the player with the best timing",
  ];

  const sceneSeeds = [
    "after a movie",
    "in a quiet hallway",
    "during a late-night call",
    "at the edge of a dance floor",
    "while sharing an umbrella",
    "in a tiny elevator",
    "at the kitchen counter",
    "on a balcony",
    "after missing the last train",
    "while the music gets softer",
  ];

  function variantTitle(theme, index) {
    return `${theme.title} ${String(index + 1).padStart(3, "0")}`;
  }

  function makeVariant(level, index) {
    const meta = levelMeta[level];
    const theme = themes[index % themes.length];
    const subject = subjects[(index + 3) % subjects.length];
    const scene = sceneSeeds[(index + 5) % sceneSeeds.length];
    const seconds = meta.timer + (index % 4) * 5;
    const title = variantTitle(theme, index);
    const target = index % 3 === 0 ? "with your partner" : `with ${subject}`;

    return {
      flight: {
        type: meta.flightType,
        title,
        text: `On your turn, ${theme.action} ${target}. Keep it ${meta.pace}; ${meta.boundary}.`,
        timerSeconds: seconds,
      },
      truth: {
        title,
        text: `Truth: around ${theme.focus}, ${theme.question}? Answer honestly, then name one boundary that should stay respected.`,
      },
      dare: {
        title,
        text: `Dare: ${theme.action} ${target} for up to ${seconds} seconds. ${meta.boundary}; anyone may rewrite or skip.`,
      },
      dice: {
        type: meta.diceType,
        title,
        text: `Use the highest die to set intensity and the lowest die to set a pause. Then ${theme.action}; ${meta.boundary}.`,
      },
      sync: {
        type: meta.syncType,
        title,
        text: `Both players secretly choose continue, slower, rewrite, or skip for ${theme.focus}. Reveal together and follow the safer answer.`,
      },
      wheel: {
        type: meta.wheelType,
        title,
        text: `Spin result: ${subject} chooses the direction for ${theme.focus}. The current player performs the safe version.`,
      },
      box: {
        type: meta.boxType,
        title,
        text: `Open the box: ${theme.action}. Before starting, give the other person one rewrite option and one skip option.`,
      },
      story: {
        type: meta.storyType,
        title,
        text: `Scene: ${scene}. Character A brings up ${theme.focus}; Character B decides continue, slow down, rewrite, or stop.`,
      },
    };
  }

  function buildPack(cardsPerLevel = 360) {
    const pack = createPack();
    levels.forEach((level) => {
      for (let index = 0; index < cardsPerLevel; index += 1) {
        const card = makeVariant(level, index);
        pack.flight[level].push(card.flight);
        pack.truth[level].truth.push({ ...card.truth });
        pack.truth[level].dare.push({ ...card.dare });
        pack.dice[level].push(card.dice);
        pack.sync[level].push(card.sync);
        pack.mini.wheel[level].push(card.wheel);
        pack.mini.box[level].push(card.box);
        pack.mini.story[level].push(card.story);
      }
    });
    return pack;
  }

  const ddfThemes = [
    "entrance pose",
    "training montage",
    "philosophy chant",
    "VHS narrator voice",
    "victory stance",
    "dungeon walk-in",
    "ASS WE CAN callout",
    "boss reveal",
    "crowd hype",
    "final freeze-frame",
  ];

  function buildDdfCards(count = 70) {
    return Array.from({ length: count }, (_, index) => {
      const theme = ddfThemes[index % ddfThemes.length];
      const seconds = 8 + (index % 5) * 3;
      const serial = String(index + 1).padStart(2, "0");
      return {
        title: `Rescue ${serial}`,
        text: `Perform a ${seconds}-second Deep Dark Fantasy ${theme}. End with a dramatic pose and shout one heroic line. Keep it theatrical, non-contact, and skippable.`,
      };
    });
  }

  const deckPack = buildPack();
  const ddfDareCards = buildDdfCards();
  deckPack.truth.fantasy.dare = ddfDareCards;

  window.NIGHT_VOYAGE_ENGLISH = {
    deckPack,
    ddf: {
      dareCards: ddfDareCards,
    },
    quickDiceCards: [
      { mode: "Quick Dice", type: "Fast Roll", title: "No Players Needed", text: "This page only rolls dice. It does not rotate players or keep score." },
      { mode: "Quick Dice", type: "Dice Count", title: "1-8 Dice", text: "Switch the number of dice at any time, then roll again instantly." },
      { mode: "Quick Dice", type: "History", title: "Roll Log", text: "Each roll records its formula and total so you can keep momentum at the table." },
    ],
    miniGameMeta: {
      wheel: {
        name: "Heart Wheel",
        action: "Spin the Wheel",
        waitingTitle: "Waiting for the Wheel",
        waitingText: "The wheel chooses the prompt, target, and rhythm for this round.",
        visual: "wheel",
      },
      box: {
        name: "Mystery Box",
        action: "Open a Box",
        waitingTitle: "Choose a Box",
        waitingText: "Open one box, then decide whether to complete, rewrite, or skip.",
        visual: "box",
      },
      story: {
        name: "Role Scene",
        action: "Draw a Scene",
        waitingTitle: "Waiting for a Scene",
        waitingText: "Draw a short two-person scene, assign roles, and improvise.",
        visual: "story",
      },
    },
    ui: {
      "夜航游戏局": "Night Voyage Game Room",
      "情侣成人桌游合集": "Adult couples party games",
      "游戏库": "Game Library",
      "题库预览": "Question Bank",
      "纯骰子": "Quick Dice",
      "页面导航": "Page navigation",
      "站点状态": "Site status",
      "页面状态": "Page status",
      "打开页面导航": "Open page navigation",
      "关闭页面导航": "Close page navigation",
      "夜航游戏大厅": "Night Voyage Lobby",
      "选择玩法、设置人数和尺度，直接进入本轮游戏。题库预览已经拆到独立页面，页眉可以直接进入检查。": "Choose a game, player count, and intensity, then start the round. Use the header to inspect the question bank or open quick dice.",
      "选择玩法": "Choose a Game",
      "选择游戏": "Choose game",
      "玩法概览": "Game overview",
      "大厅状态": "Lobby status",
      "默认玩家": "Default players",
      "发布状态": "Publish status",
      "页眉入口": "Header links",
      "8 种玩法": "8 game modes",
      "2-4 人": "2-4 players",
      "纯骰快掷": "Quick dice",
      "可跳过": "Skippable",
      "2-4 人 · 21+ · 可跳过": "2-4 players · 21+ · skippable",
      "种玩法": "game modes",
      "个题目": "prompts",
      "尺度档": "intensity levels",
      "题库筛选": "Question bank filters",
      "选择题库": "Choose deck",
      "当前题库": "Current Deck",
      "任务尺度": "Intensity",
      "暧昧": "Soft",
      "升温": "Warm",
      "夜深": "Late Night",
      "骰子数量": "Dice Count",
      "独立页面": "Standalone page",
      "可检查": "Inspectable",
      "夜航飞行棋": "Night Flight Ludo",
      "掷骰起飞、撞机回库、抽情侣任务卡。": "Roll to take off, bump pieces home, and draw couples task cards.",
      "真心话大冒险": "Truth or Dare",
      "轮流抽真心话或大冒险，完成得分。": "Take turns drawing truth or dare cards. Complete to score.",
      "骰子升温": "Dice Heat",
      "选择骰子数量，点数决定互动强度和时长。": "Choose the dice count. The roll sets intensity and duration.",
      "默契挑战": "Sync Challenge",
      "同步回答和关系互动。": "Synchronized answers and relationship prompts.",
      "心动轮盘": "Heart Wheel",
      "轮盘抽取的互动题目。": "Spin the wheel for an interaction prompt.",
      "任务盲盒": "Mystery Box",
      "三选一盲盒题目。": "Pick one of three mystery prompt boxes.",
      "角色剧本": "Role Scene",
      "情侣小剧本和角色任务。": "Short couple scenes and role prompts.",
      "策略 + 互动": "Strategy + interaction",
      "快速开局": "Fast start",
      "随机 + 升温": "Random + warm-up",
      "快选 + 动画": "Quick select + animation",
      "同步 + 盲猜": "Sync + guessing",
      "指针决定对象": "Pointer picks target",
      "三选一开盒": "Pick one of three",
      "角色扮演": "Role play",
      "棋盘任务": "Board tasks",
      "飞行棋格子任务和事件卡。": "Board tasks and event cards for the flight game.",
      "卡牌题库": "Card deck",
      "真心话、大冒险和随机抽卡。": "Truth, dare, and random card draws.",
      "骰子任务": "Dice tasks",
      "点数决定任务强度和时长。": "Roll totals decide prompt intensity and duration.",
      "默契题库": "Sync deck",
      "轮盘题库": "Wheel deck",
      "盲盒题库": "Box deck",
      "剧本题库": "Scene deck",
      "单独检查每个玩法的题目范围、分类和尺度。这里不启动游戏，只展示实际会抽取的内容。": "Inspect each game's prompt range, category, and intensity. This page does not start a game; it previews the cards that can be drawn.",
      "选择玩法和尺度后，这里会显示实际抽取范围。": "Choose a game and intensity to preview the real draw pool.",
      "玩家人数": "Players",
      "玩家昵称": "Player Names",
      "当前玩家": "Current player",
      "玩家状态": "Player status",
      "游戏记录": "Game log",
      "桌面状态": "Table status",
      "记录": "Log",
      "展开": "Expand",
      "收起": "Collapse",
      "展开记录": "Expand log",
      "收起记录": "Collapse log",
      "游戏大厅": "Lobby",
      "重新开局": "Restart",
      "结束回合": "End Turn",
      "跳过移动": "Skip Move",
      "掷骰": "Roll",
      "投骰子": "Roll Dice",
      "清空记录": "Clear Log",
      "总点数": "Total",
      "点数上限": "Max Total",
      "无玩家设置": "No player setup",
      "连续投掷": "Continuous rolls",
      "低功耗": "Low motion",
      "选几颗，马上投": "Pick dice, roll now",
      "这个页面只负责骰子点数，不轮换玩家、不记分。适合临时决定顺序、惩罚数值或任何需要快掷的场景。": "This page only rolls dice. It does not rotate players or keep score, so it is useful for turn order, quick stakes, or any fast roll.",
      "不设玩家": "No Players",
      "选择骰子数量后投掷": "Choose dice count, then roll",
      "等待投骰": "Waiting to Roll",
      "选择骰子数量后开始": "Choose dice count to start",
      "骰子点数会决定升温等级、互动时长和本轮任务。": "The dice total decides the intensity, duration, and prompt for this round.",
      "骰子滚动中": "Dice Rolling",
      "点数正在落下": "Dice are landing",
      "等骰子停稳后，本轮任务会自动翻开。": "When the dice stop, this round's prompt opens automatically.",
      "自动翻题": "Auto reveal",
      "投骰后出题": "Roll to reveal",
      "处理任务": "Handle task",
      "下一步": "Next Step",
      "完成或跳过当前骰子任务后进入下一位。": "Complete or skip the current dice task, then pass to the next player.",
      "点击投骰，点数会组合成升温任务。": "Roll the dice to create a warm-up prompt.",
      "等骰子停稳，任务会自动翻开。": "Wait for the dice to stop; the prompt opens automatically.",
      "完成得 1 分；不合适就跳过进入下一位。": "Complete for +1 point; skip if it does not fit and pass to the next player.",
      "选择骰子数量，然后投骰。": "Choose dice count, then roll.",
      "状态": "Status",
      "阶段": "Phase",
      "骰子": "Dice",
      "上限": "Max",
      "最近": "Latest",
      "未投": "Not rolled",
      "滚动中": "Rolling",
      "已落点": "Landed",
      "待投骰": "Ready to roll",
      "待处理": "Pending",
      "回合": "Round",
      "结束": "Finished",
      "游戏结束": "Game Over",
      "等待抽卡": "Waiting for Card",
      "等待题目": "Waiting for Prompt",
      "点击下一题开始": "Tap Next Prompt",
      "选择大冒险": "Choose Dare",
      "选择一种卡牌": "Choose a Card Type",
      "Deep♂Dark♂Fantasy 题目会显示在这里。完成后加 1 分，下一题会直接换给下一位。": "Deep Dark Fantasy prompts appear here. Complete one for +1 point; Next Prompt passes directly to the next player.",
      "Deep♂Dark♂Fantasy 大冒险题目会显示在这里。完成后加 1 分，跳过会记录一次。": "Deep Dark Fantasy dare prompts appear here. Complete one for +1 point; skips are recorded.",
      "抽到的任务会显示在这里。完成后加 1 分，跳过会记录一次。": "Drawn tasks appear here. Complete one for +1 point; skips are recorded.",
      "下一题": "Next Prompt",
      "跳过": "Skip",
      "跳过 / 换题": "Skip / New Card",
      "完成": "Complete",
      "完成 +1": "Complete +1",
      "可跳过 / 换题": "Skippable / redraw",
      "可跳过": "Skippable",
      "抽题": "Draw",
      "抽题开始": "Draw to start",
      "等待挑战": "Waiting for Challenge",
      "抽一个升温默契题": "Draw a Sync Prompt",
      "同步回答、盲猜偏好或完成一个双方都舒服的小互动。": "Answer together, guess preferences, or complete a mutually comfortable interaction.",
      "抽一个默契挑战，答对或完成得 1 分。": "Draw a sync challenge. A correct answer or completed prompt scores +1 point.",
      "完成或跳过当前默契挑战后进入下一位。": "Complete or skip the current sync challenge, then pass to the next player.",
      "处理挑战": "Handle Challenge",
      "待抽题": "Ready to draw",
      "自动出题": "Auto draw",
      "等待停下": "Wait for stop",
      "轮盘旋转中": "Wheel Spinning",
      "指针正在选择对象": "The pointer is choosing a target",
      "轮盘停下后，本轮题目会自动翻开。": "When the wheel stops, this round's prompt opens automatically.",
      "三选一": "Pick one of three",
      "可拒绝改写": "Can refuse or rewrite",
      "选择盲盒": "Choose Box",
      "任务盲盒": "Mystery Box",
      "三个盲盒都可以拒绝、改写或跳过。": "All three boxes can be refused, rewritten, or skipped.",
      "盲盒就绪": "Boxes Ready",
      "选择 A / B / C 后翻开任务。": "Choose A / B / C to reveal a prompt.",
      "本轮对象": "Target This Round",
      "玩法": "Mode",
      "尺度": "Intensity",
      "待开始": "Ready",
      "旋转中": "Spinning",
      "选盲盒": "Choose box",
      "处理题目": "Handle Prompt",
      "双方参与": "Both participate",
      "计时 30 秒": "30 sec timer",
      "计时 40 秒": "40 sec timer",
      "计时 45 秒": "45 sec timer",
      "真心话": "Truth",
      "大冒险": "Dare",
      "随机": "Random",
      "抽挑战": "Draw Challenge",
      "任务完成 +1": "Task Complete +1",
      "默契完成 +1": "Sync Complete +1",
      "已跳过": "Skipped",
      "记录已清空": "Log Cleared",
      "纯骰子历史重新开始。": "Quick Dice history restarted.",
      "开始": "Start",
      "开启盲盒": "Open Box",
      "旋转轮盘": "Spin Wheel",
      "抽剧本": "Draw Scene",
      "开始夜航飞行棋": "Start Night Flight Ludo",
      "开始真心话大冒险": "Start Truth or Dare",
      "开始骰子升温": "Start Dice Heat",
      "开始纯骰子": "Start Quick Dice",
      "开始默契挑战": "Start Sync Challenge",
      "开始心动轮盘": "Start Heart Wheel",
      "开始任务盲盒": "Start Mystery Box",
      "开始角色剧本": "Start Role Scene",
      "开始 DDF 飞行棋": "Start DDF Ludo",
      "开始 DDF 大冒险": "Start DDF Dare",
      "需要密码": "Password Required",
      "输入密码进入 DDF 页面": "Enter the password to open DDF",
      "进入": "Enter",
      "密码不对。": "Wrong password.",
      "独立 Deep♂Dark♂Fantasy": "Standalone Deep Dark Fantasy",
      "种玩法": "modes",
      "最多玩家": "max players",
      "大冒险词库": "Dare Bank",
      "风格标签": "Style tags",
      "哲♂学": "Philosophy",
      "21+ · 兄贵♂哲学": "21+ · DDF Philosophy",
      "兄贵♂ 神之♂救济 哲♂学救赎大冒险列表来啦！": "DDF rescue dares are ready.",
      "本格的♂ 兄贵♂本篇 哲♂学殿堂 传承之作！以新日暮里の王、森之♂妖精比♂利♂王、Van♂、木吉♂和也等兄贵三巨头 为救世主，通过王♂道征途般的肌肉摔♂角哲学，带你走上哲♂学之路，获得神之♂救济与Deep♂Dark♂Fantasy的灵魂救赎！每条皆为本格的哲♂学之旅，ASS♂WE♂CAN！": "A theatrical Deep Dark Fantasy challenge page with over-the-top poses, chants, and skippable performance prompts.",
      "兄贵♂哲学专属挑战，完成得分。": "DDF-only challenges. Complete to score.",
      "最多 4 人掷骰起飞，事件格抽挑战。": "Up to 4 players roll to take off and draw events.",
      "21+，全员同意进入兄贵♂哲学模式；任何题都可停止、换题或跳过。": "21+. Everyone consents to DDF mode; any prompt can stop, change, or skip.",
    },
  };
})();
