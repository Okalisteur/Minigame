# Maky — App web d'apprentissage MIL

Application web autonome (séparée de l'extension Facebook du dossier parent)
qui enseigne le MIL façon Duolingo : sentier de leçons, mascotte, séries,
micro-leçons.

## Démarrer

```bash
cd web-app
npm install
npm run dev
```

## Identité visuelle

Univers : la brume matinale des hautes-terres qui se dégage à mesure que le
regard critique s'affûte. Mascotte **Maky** (« lémurien » en malgache), à
lunettes rondes — les grands yeux cerclés symbolisent le regard critique
qu'on développe en apprenant le MIL.

- `src/tokens/tokens.css` — **source de vérité** du design : couleurs
  nommées (brume, encre, corail, ravinala, kabary, alerte, lavande), police
  d'affichage (Baloo 2), police de corps (Inter), police de compteurs
  (Space Mono). Modifier le thème = modifier ce fichier, jamais les
  couleurs en dur dans les composants.
- `src/components/` — briques réutilisables : `Button`, `Card`, `Maky`
  (mascotte), `LessonNode` (terrasse du sentier), `StatPill` (série/points/
  cœurs).
- `src/pages/PathHome.jsx` — écran d'accueil : le sentier en lacets à
  travers les collines, élément signature de l'app.

## Prochaines étapes possibles

- Écran de leçon (question à choix, feedback immédiat, cœurs)
- Système de répétition espacée pour la rétention (rappels de notions vues)
- Micro-leçons chronométrées (3–5 min) pour s'adapter à un temps
  d'attention court
- Mode "professeur" : suivi de classe, création de leçons
- Système de séries persistant (localStorage puis backend)
