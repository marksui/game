# 夜航游戏局

一个适合成年人情侣或双人约会局的静态网页游戏合集。支持 2-4 位玩家，当前包含夜航飞行棋、真心话大冒险、骰子升温、纯骰子、默契挑战、心动轮盘、任务盲盒和角色剧本，并提供题库预览、纯骰子快掷和 Deep♂Dark♂Fantasy 独立页面。

直接打开 `index.html` 即可进入游戏库。题库预览在 `bank.html`，纯骰子快掷在 `dice.html`，Deep♂Dark♂Fantasy 内容在 `ddf.html` 独立页面中，并使用 `assets/ddf-vhs-poster.png` 作为主视觉。

## GitHub Pages 发布

1. 把 `index.html`、`bank.html`、`dice.html`、`ddf.html`、`styles.css`、`script.js`、`README.md` 和 `assets/ddf-vhs-poster.png` 推到 GitHub 仓库根目录。
2. 进入仓库 `Settings` -> `Pages`。
3. `Source` 选择 `Deploy from a branch`，分支选 `main`，目录选 `/root`。
4. 保存后访问 `https://你的用户名.github.io/game/`。

## 发布前检查

1. 跑 `node --check script.js` 确认脚本语法通过。
2. 打开 `index.html`，确认默认 2 人是 `Boy`、`Girl`，切换 3/4 人后新增玩家是 `Player 3`、`Player 4`。
3. 打开 `bank.html`，切换玩法和尺度，确认题库预览会跟随玩法和尺度变化。
4. 打开 `dice.html`，确认 1-8 颗骰子快选、投掷动画和记录都正常。
5. 打开 `ddf.html`，确认主视觉加载，并且页眉可跳转到游戏库、题库预览和纯骰子。
