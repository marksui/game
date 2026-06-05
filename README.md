# 夜航游戏局

一个适合成年人情侣或双人约会局的静态网页游戏合集。支持 2-4 位玩家，当前包含夜航飞行棋和真心话大冒险，并提供 Deep♂Dark♂Fantasy 独立 DDF 页面。

直接打开 `index.html` 即可开始。兄贵♂DDF 内容在 `ddf.html` 独立页面中，进入后只玩专属真心话大冒险题库，并使用 `assets/ddf-vhs-poster.png` 作为 VHS 主视觉。

## GitHub Pages 发布

1. 把 `index.html`、`ddf.html`、`styles.css`、`script.js`、`README.md` 和 `assets/ddf-vhs-poster.png` 推到 GitHub 仓库根目录。
2. 进入仓库 `Settings` -> `Pages`。
3. `Source` 选择 `Deploy from a branch`，分支选 `main`，目录选 `/root`。
4. 保存后访问 `https://你的用户名.github.io/game/`。

## 发布前检查

1. 跑 `node --check script.js` 确认脚本语法通过。
2. 打开 `index.html`，确认默认 2 人是 `Boy`、`Girl`，切换 3/4 人后新增玩家是 `Player 3`、`Player 4`。
3. 打开 `ddf.html`，确认黑紫 VHS 主视觉加载，题库只显示兄贵♂DDF。
