# MIL Education — Extension Facebook

Extension navigateur (Manifest V3) qui analyse le feed Facebook avec des
heuristiques (sans IA) pour détecter les signaux de désinformation, et
affiche des conseils MIL pour développer le sens critique.

## Démarrer

```bash
npm install
npm run dev
```

Puis dans Chrome :
1. Va sur `chrome://extensions`
2. Active le "Mode développeur" (en haut à droite)
3. Clique "Charger l'extension non empaquetée"
4. Sélectionne le dossier `dist` (généré par `npm run dev` ou `npm run build`)

Ouvre ensuite `facebook.com` : les badges de fiabilité apparaissent sur
chaque post du feed. Clique sur l'icône de l'extension pour voir le
dashboard (% de posts suspects, historique).

## Structure

- `src/content/contentScript.jsx` — scanne le feed Facebook, injecte les badges
- `src/overlay/PostBadge.jsx` — composant React du badge sur chaque post
- `src/lib/heuristics.js` — les règles de scoring (à ajuster/enrichir)
- `src/lib/sourceList.js` — listes de domaines fiables/suspects (à enrichir)
- `src/lib/storage.js` — historique local (chrome.storage.local)
- `src/popup/` — dashboard React affiché au clic sur l'icône

## Prochaines étapes possibles

- Enrichir `sourceList.js` avec de vraies listes de médias malgaches
- Brancher l'API gratuite Google Fact Check Tools dans `heuristics.js`
- Ajouter plus de leçons MIL contextuelles dans `getTipFor`
- Publier sur le Chrome Web Store
