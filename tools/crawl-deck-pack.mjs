#!/usr/bin/env node

import { writeFile } from "node:fs/promises";

const args = process.argv.slice(2);
const valuedOptions = new Set(["--out", "--js-out", "--max-pages", "--cards-per-level", "--mini-per-level"]);

function optionValue(name, fallback = "") {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
}

function clampNumber(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(Math.max(Math.trunc(number), min), max);
}

function isOptionValue(index) {
  return valuedOptions.has(args[index - 1]);
}

const outFile = optionValue("--out");
const jsOutFile = optionValue("--js-out");
const maxPages = clampNumber(optionValue("--max-pages"), 6, 1, 40);
const cardsPerLevel = clampNumber(optionValue("--cards-per-level"), 6, 2, 24);
const miniPerLevel = clampNumber(optionValue("--mini-per-level"), Math.max(3, Math.ceil(cardsPerLevel / 2)), 1, 16);
const followLinks = !args.includes("--no-follow");
const urls = args.filter((arg, index) => !arg.startsWith("--") && !isOptionValue(index) && /^https?:\/\//i.test(arg));

const seedLabels = {
  gentle: "轻柔",
  playful: "玩心",
  steamy: "升温",
  spicy: "加码",
  wild: "冒险",
  truth: "真心话",
  dare: "大冒险",
  consent: "同意",
  boundary: "边界",
  boundaries: "边界",
  skip: "跳过",
  modify: "改写",
  customize: "自定义",
  intensity: "强度",
  levels: "分级",
  pace: "节奏",
  awkward: "不尴尬",
  score: "计分",
  timer: "计时",
  wheel: "轮盘",
  dice: "骰子",
  card: "卡牌",
  bingo: "宾果",
  keyword: "关键词",
  privacy: "隐私",
  romantic: "浪漫",
  intimate: "亲密",
  intimacy: "亲密",
  connection: "连接",
  aftercare: "收尾",
  date: "约会",
  question: "提问",
  truths: "真心话",
  dares: "大冒险",
  daring: "冒险",
  challenge: "挑战",
  challenges: "挑战",
  extreme: "高强度",
  open: "开放",
  spark: "火花",
  night: "夜深",
  friends: "朋友",
  ignite: "点燃",
  modes: "模式",
  roleplay: "剧本",
  relationship: "关系",
  touchy: "触碰",
  feely: "感受",
  couple: "情侣",
  couples: "情侣",
  party: "派对",
};

const stopWords = new Set([
  "about",
  "after",
  "again",
  "also",
  "app",
  "are",
  "android",
  "available",
  "because",
  "been",
  "being",
  "break",
  "can",
  "couple",
  "couples",
  "dare",
  "does",
  "each",
  "for",
  "free",
  "from",
  "download",
  "every",
  "game",
  "games",
  "get",
  "how",
  "image",
  "images",
  "into",
  "ios",
  "level",
  "lightbox",
  "made",
  "more",
  "play",
  "player",
  "players",
  "questions",
  "soft",
  "start",
  "that",
  "the",
  "their",
  "them",
  "this",
  "truth",
  "with",
  "you",
  "your",
]);

const fallbackSeeds = [
  "分级",
  "二选一",
  "同意",
  "边界",
  "跳过",
  "改写",
  "计时",
  "轮盘",
  "骰子",
  "收尾",
  "隐私",
  "浪漫",
  "连接",
  "挑战",
  "剧本",
  "派对",
];

function decodeEntities(html) {
  return html
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)))
    .replace(/&#x([a-f\d]+);/gi, (_, value) => String.fromCodePoint(Number.parseInt(value, 16)));
}

function textFromHtml(html) {
  return decodeEntities(html)
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractLinks(html, baseUrl) {
  const base = new URL(baseUrl);
  const links = [];
  for (const match of html.matchAll(/\bhref\s*=\s*["']([^"']+)["']/gi)) {
    const href = match[1].trim();
      if (!href || /^(#|mailto:|tel:|javascript:)/i.test(href)) continue;
    try {
      const url = new URL(href, base);
      url.hash = "";
      if (url.origin !== base.origin) continue;
      if (
        /\.(?:avif|css|gif|ico|jpe?g|json|map|mp3|mp4|otf|pdf|png|svg|ttf|webm|webp|woff2?|xml|zip)$/i.test(
          url.pathname,
        )
      ) {
        continue;
      }
      links.push(url.href);
    } catch {
      // Ignore malformed links from crawled pages.
    }
  }
  return [...new Set(links)].slice(0, 12);
}

function extractSeeds(text) {
  const counts = new Map();
  const normalized = text.toLowerCase();
  Object.keys(seedLabels).forEach((seed) => {
    const hits = normalized.match(new RegExp(`\\b${seed}\\b`, "g"))?.length || 0;
    if (hits) counts.set(seed, (counts.get(seed) || 0) + hits * 5);
  });

  normalized
    .match(/\b[a-z][a-z-]{3,18}\b/g)
    ?.filter((word) => !stopWords.has(word))
    .forEach((word) => counts.set(word, (counts.get(word) || 0) + 1));

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 24)
    .map(([seed]) => seedLabels[seed] || seed);
}

async function crawlPage(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "NightVoyageDeckSeedCrawler/1.1 (+local development)",
    },
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  const contentType = response.headers.get("content-type") || "";
  if (contentType && !/text\/html|application\/xhtml\+xml/i.test(contentType)) {
    throw new Error(`${url} is ${contentType}, not HTML`);
  }
  const html = await response.text();
  const text = textFromHtml(html);
  return {
    url,
    links: extractLinks(html, url),
    seeds: extractSeeds(text),
  };
}

async function crawlMany(startUrls) {
  const queue = [...new Set(startUrls)];
  const seen = new Set();
  const results = [];

  while (queue.length && results.length < maxPages) {
    const url = queue.shift();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    try {
      const page = await crawlPage(url);
      results.push({ url: page.url, seeds: page.seeds });
      if (followLinks) {
        page.links.filter((link) => !seen.has(link)).forEach((link) => queue.push(link));
      }
    } catch (error) {
      console.warn(`[skip] ${error.message}`);
    }
  }

  return results;
}

function uniqueSeeds(sourceResults) {
  const seeds = sourceResults.flatMap((item) => item.seeds);
  return [...new Set([...seeds, ...fallbackSeeds])].filter(Boolean).slice(0, 28);
}

function pick(seeds, index, fallback) {
  return seeds[index % seeds.length] || fallback;
}

function makeSeries(count, factory) {
  return Array.from({ length: count }, (_, index) => factory(index));
}

function levelLabel(level) {
  return { soft: "暧昧", warm: "升温", hot: "夜深" }[level] || "暧昧";
}

function levelVerb(level) {
  return { soft: "轻一点", warm: "靠近一点", hot: "更开放一点" }[level] || "轻一点";
}

function duration(level, index) {
  const base = { soft: 10, warm: 20, hot: 30 }[level] || 10;
  return base + (index % 3) * 5;
}

function choose(items, index) {
  return items[index % items.length];
}

function consentTail(level) {
  if (level === "hot") return "开始前必须说清继续、减速、停止信号；任何人都可以改写或跳过。";
  if (level === "warm") return "先确认对方愿意，过程中可以减速、换题或跳过。";
  return "保持轻松，任何人都可以换成更舒服的版本。";
}

function buildFlightCard(level, seeds, index) {
  const seed = pick(seeds, index, "边界");
  const partnerSeed = pick(seeds, index + 5, "同意");
  const title = choose(["停靠点", "邀请", "暗号", "交换", "刻度", "收尾"], index);
  const action = choose(
    {
      soft: [
        `围绕“${seed}”问一个轻松问题，再给对方一次不解释的换题权。`,
        `用“${seed}”设计一个继续手势和一个暂停手势，马上演练一遍。`,
        `说一句和“${seed}”有关的认真夸奖，时间不超过 ${duration(level, index)} 秒。`,
      ],
      warm: [
        `围绕“${seed}”提出一个靠近一点的邀请，让对方选择继续、慢一点或改写。`,
        `用“${partnerSeed}”做一次节奏确认，再执行 ${duration(level, index)} 秒互动。`,
        `把“${seed}”变成一个低声任务，只在双方都舒服时继续。`,
      ],
      hot: [
        `围绕“${seed}”提出一个更开放的邀请，对方可以决定主导、被引导、暂停或收尾。`,
        `用“${partnerSeed}”确认许可后，安排 ${duration(level, index)} 秒克制但明确的亲密节奏。`,
        `把“${seed}”升级一点点，同时说出今天绝对不碰的边界。`,
      ],
    }[level],
    index,
  );
  return {
    type: `${levelLabel(level)}航线`,
    title: `${seed}${title}`,
    text: `${action} ${consentTail(level)}`,
    timerSeconds: duration(level, index),
  };
}

function buildTruthCard(level, seeds, index) {
  const seed = pick(seeds, index, "连接");
  const partnerSeed = pick(seeds, index + 7, "隐私");
  const title = choose(["偏好", "边界", "愿望", "刻度", "许可", "收尾"], index);
  const prompt = choose(
    {
      soft: [
        `说一个你愿意继续探索的“${seed}”偏好。`,
        `讲一个让你感到被尊重的“${seed}”瞬间。`,
        `如果今晚需要换题，你希望大家怎样自然接住？`,
      ],
      warm: [
        `说一种和“${seed}”有关、会让你心动但不紧张的靠近方式。`,
        `你希望对方怎样用“${partnerSeed}”确认你的节奏？`,
        `说一个愿意尝试的小升级，以及一个必须保留的边界。`,
      ],
      hot: [
        `说一个你今晚愿意探索的更开放方向，再给出明确停止信号。`,
        `你更想主导、被引导、轮流，还是只负责说“继续/慢一点”？为什么？`,
        `描述一种强烈但安全、可暂停的“${seed}”幻想方向，不需要细节。`,
      ],
    }[level],
    index,
  );
  return {
    title: `${seed}${title}`,
    text: `${prompt} 再补一句和“${partnerSeed}”有关、今晚不想被碰到的边界。`,
  };
}

function buildDareCard(level, seeds, index) {
  const seed = pick(seeds, index + 2, "挑战");
  const partnerSeed = pick(seeds, index + 9, "改写");
  const title = choose(["改写", "邀请", "停顿", "主导", "交换", "收口"], index);
  const dare = choose(
    {
      soft: [
        `把“${seed}”改成一个轻松动作，例如夸奖、对视或共同设计暗号。`,
        `问对方一个舒服的问题，再允许 TA 反问你。`,
        `用一句不油腻的话邀请对方进入游戏状态。`,
      ],
      warm: [
        `把“${seed}”变成一个双方都愿意试的靠近动作，最长 ${duration(level, index)} 秒。`,
        `用低声给对方一个可拒绝的小邀请。`,
        `让对方在继续、减速、${partnerSeed}和跳过之间选一个。`,
      ],
      hot: [
        `安排一段 ${duration(level, index)} 秒的温柔主导，对方可以随时改写任意细节。`,
        `提出一个更开放的靠近请求，得到明确同意后才执行。`,
        `停顿 10 秒只看着对方，然后问“继续、慢一点，还是收尾？”`,
      ],
    }[level],
    index,
  );
  return {
    title: `${seed}${title}`,
    text: `${dare} ${consentTail(level)}`,
  };
}

function buildDiceCard(level, seeds, index) {
  const seed = pick(seeds, index + 3, "骰子");
  const mode = choose(["点数", "倒数", "刻度", "二选一", "节奏", "收尾"], index);
  const diceRule = choose(
    {
      soft: [
        `低点数提问，高点数夸奖；围绕“${seed}”给出同样数量的关键词。`,
        `按总点数倒数，然后说一个今晚舒服的信号。`,
      ],
      warm: [
        `低点数保持距离，中点数靠近一点，高点数做一个可暂停的${levelVerb(level)}动作。`,
        `用总点数决定秒数，让对方选择牵手、对视、靠肩或换题。`,
      ],
      hot: [
        `用总点数映射开放刻度，再说一个继续条件和一个停止条件。`,
        `高点数由当前玩家安排节奏，低点数由对方安排收尾。`,
      ],
    }[level],
    index,
  );
  return {
    type: `${levelLabel(level)}骰子`,
    title: `${seed}${mode}`,
    text: `${diceRule} ${consentTail(level)}`,
    timerSeconds: duration(level, index),
  };
}

function buildSyncCard(level, seeds, index) {
  const seed = pick(seeds, index + 4, "默契");
  const partnerSeed = pick(seeds, index + 10, "节奏");
  const title = choose(["同频", "排序", "投票", "猜测", "许可", "收尾"], index);
  const sync = choose(
    {
      soft: [
        `两人同时说出一个和“${seed}”有关的选择。`,
        `同时选择继续、慢一点或换题，看看是否一致。`,
        `同时说一个让自己放松的关键词。`,
      ],
      warm: [
        `把牵手、靠肩、对视、耳语按舒适度排序。`,
        `同时选择今晚更想主动、被引导、轮流还是安静陪伴。`,
        `各说一个能让“${partnerSeed}”更舒服的条件。`,
      ],
      hot: [
        `同时说一个愿意继续的点和一个今天不碰的点。`,
        `猜对方现在更想主导、被引导、暂停还是收尾。`,
        `同步选择更开放一点、慢一点、换题或温柔结束。`,
      ],
    }[level],
    index,
  );
  return {
    type: `${levelLabel(level)}默契`,
    title: `${seed}${title}`,
    text: `${sync} 如果答案接近，就一起决定下一步要更慢、更近，还是换成“${partnerSeed}”。`,
    timerSeconds: duration(level, index),
  };
}

function buildMiniCard(game, level, seeds, index) {
  const seed = pick(seeds, index + 6, "轮盘");
  const gameType = { wheel: "轮盘", box: "盲盒", story: "剧本" }[game] || "小游戏";
  const gameAction = {
    wheel:
      level === "hot"
        ? `指针指到的人决定本轮更开放、减速、交换主动权或收尾。`
        : `指针指到的人围绕“${seed}”给出一个可拒绝的小指令。`,
    box:
      level === "hot"
        ? `打开后把“${seed}”变成 A 主导、B 被引导、C 温柔收尾中的一个版本。`
        : `打开后把“${seed}”变成 A 轻松、B 升温、C 收尾中的一个版本。`,
    story:
      level === "hot"
        ? `两人用“${seed}”开一个 ${duration(level, index)} 秒许可谈判短剧，结束后确认继续或收尾。`
        : `两人用“${seed}”开一个 ${duration(level, index)} 秒短剧，结束后互换一句照顾需求。`,
  }[game];
  return {
    type: `${levelLabel(level)}${gameType}`,
    title: `${seed}${gameType}`,
    text: `${gameAction} 任何人都可以喊停、改写或跳过。`,
    timerSeconds: duration(level, index),
  };
}

function buildLevelMap(factory, count) {
  return Object.fromEntries(["soft", "warm", "hot"].map((level) => [level, makeSeries(count, (index) => factory(level, index))]));
}

function buildPack(sourceResults) {
  const seeds = uniqueSeeds(sourceResults);
  return {
    _meta: {
      generatedBy: "tools/crawl-deck-pack.mjs",
      note: "Sources are used as idea seeds only. Prompts below are original Chinese rewrites.",
      sources: sourceResults.map((item) => item.url),
      crawl: {
        followedSameOriginLinks: followLinks,
        maxPages,
        pagesRead: sourceResults.length,
        cardsPerLevel,
        miniPerLevel,
      },
      seeds,
    },
    flight: buildLevelMap((level, index) => buildFlightCard(level, seeds, index), cardsPerLevel),
    truth: Object.fromEntries(
      ["soft", "warm", "hot"].map((level) => [
        level,
        {
          truth: makeSeries(cardsPerLevel, (index) => buildTruthCard(level, seeds, index)),
          dare: makeSeries(cardsPerLevel, (index) => buildDareCard(level, seeds, index)),
        },
      ]),
    ),
    dice: buildLevelMap((level, index) => buildDiceCard(level, seeds, index), cardsPerLevel),
    sync: buildLevelMap((level, index) => buildSyncCard(level, seeds, index), cardsPerLevel),
    mini: {
      wheel: buildLevelMap((level, index) => buildMiniCard("wheel", level, seeds, index), miniPerLevel),
      box: buildLevelMap((level, index) => buildMiniCard("box", level, seeds, index), miniPerLevel),
      story: buildLevelMap((level, index) => buildMiniCard("story", level, seeds, index), miniPerLevel),
    },
  };
}

const fallbackResults = [
  {
    url: "local:fallback",
    seeds: fallbackSeeds,
  },
];

const crawledResults = urls.length ? await crawlMany(urls) : [];
const results = crawledResults.length ? crawledResults : fallbackResults;
const pack = buildPack(results);
const output = JSON.stringify(pack, null, 2);

if (jsOutFile) {
  await writeFile(jsOutFile, `window.NIGHT_VOYAGE_EXTRA_DECKS = [${output}];\n`, "utf8");
  console.log(`Wrote ${jsOutFile}`);
}

if (outFile) {
  await writeFile(outFile, `${output}\n`, "utf8");
  console.log(`Wrote ${outFile}`);
} else if (!jsOutFile) {
  console.log(output);
}
