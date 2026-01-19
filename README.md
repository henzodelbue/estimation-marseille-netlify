# Estimation Immobilière Marseille

Landing page avec les couleurs Llinares Immobilier (#c9a962 doré).

## 🚀 Déploiement sur Vercel

### Option 1 : Via GitHub (Recommandé)
1. Crée un repo GitHub
2. Upload tous les fichiers de ce dossier
3. Va sur [vercel.com](https://vercel.com)
4. "New Project" → Sélectionne ton repo
5. Vercel détecte automatiquement Next.js et build !

### Option 2 : CLI Vercel
```bash
npm install -g vercel
cd estimation-marseille-vercel
vercel
```

## 🎨 Couleurs personnalisées

Les couleurs Llinares sont définies dans `tailwind.config.js` :
- `gold` : #c9a962 (doré)
- `gold-light` : #e8d4a0 (beige doré)
- `primary` : #1a1a2e (bleu marine foncé)
- `text-gray` : #6c757d (gris)
- `surface` : #f8f9fa (gris très clair)

## 📁 Structure

```
estimation-marseille-vercel/
├── pages/
│   ├── index.jsx          # Page principale
│   └── _app.jsx           # Config Next.js
├── styles/
│   └── globals.css        # Styles Tailwind
├── tailwind.config.js     # Config Tailwind avec couleurs custom
├── postcss.config.js      # Config PostCSS
├── package.json           # Dépendances
└── README.md              # Ce fichier
```

## 🔧 Développement local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)
