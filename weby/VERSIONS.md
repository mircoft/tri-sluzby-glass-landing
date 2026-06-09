# Signal House — prepínanie verzií

Dve verzie stránky `/weby/`:

| Súbor | Verzia | URL |
|-------|--------|-----|
| `index.html` | **Minimal** — editoriálna brand stránka (Yeezy / Bianca štýl) | `/weby/` |
| `index.full.html` | **Full** — pôvodný marketing landing | `/weby/index.full.html` |

## Ako prepnúť späť na plnú verziu

**Dočasne (bez zmeny kódu):** otvor `/weby/index.full.html` — link je aj v pätičke minimal stránky („Plná verzia“).

**Natrvalo:** premenuj súbory:

```bash
cd weby
mv index.html index.minimal.html
mv index.full.html index.html
```

Späť na minimal:

```bash
cd weby
mv index.html index.full.html
mv index.minimal.html index.html
```
