
# Night Voyage Game Tools

## Extra deck packs

The game can load extra prompt packs before `script.js` runs:

```html
<script src="data/extra-decks.generated.js"></script>
```

Build that generated file from one or more JSON packs:

```powershell
node tools\build-extra-decks.mjs data\extra-deck.example.json --out data\extra-decks.generated.js
```

Generate an original Chinese deck pack from public pages used only as idea seeds:

```powershell
node tools\crawl-deck-pack.mjs https://example.com/page --out data\crawled-pack.json
node tools\crawl-deck-pack.mjs https://example.com/page --js-out data\extra-decks.generated.js
node tools\crawl-deck-pack.mjs https://example.com/page --max-pages 24 --cards-per-level 28 --mini-per-level 18 --out data\open-pack.json
```

The crawler follows same-origin links by default, capped by `--max-pages`. Use `--no-follow` for a single-page seed crawl.

`data/extra-decks.generated.js` currently contains one generated pack with 582 original cards from a 24-page HTML seed crawl and 56 cleaned theme seeds.

At runtime, a pack can also be imported from the browser console:

```js
window.NightVoyageDecks.addPack(pack, { persist: true });
```
