# TASSE Score Premium

Application web premium pour évaluer la vulnérabilité aux risques dans 5 domaines (framework TASSE Score).

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Recharts
- FontAwesome + Lucide icons

## Mode de déploiement

Le projet est configuré en **export statique** (`output: "export"`).

Conséquences:

- Le build produit des fichiers statiques dans `out/`
- Déploiement possible sur shared hosting, cPanel, Netlify, Vercel, Cloudflare Pages, VPS, etc.
- Pas d'exécution Node.js requise en production pour cette version

## Scripts utiles

```bash
npm run dev         # développement local
npm run lint        # lint
npm run build       # build selon NEXT_PUBLIC_BASE_PATH actuel
npm run build:root  # build pour domaine racine (base path vide)
npm run build:tasse # build pour sous-dossier /tasse
```

## Installation locale

```bash
git clone https://github.com/memoire-gemba-ia-supply-chain/tasse-score-premium.git
cd tasse-score-premium
npm install
npm run dev
```

Ouvrir `http://localhost:3000`.

---

## Déploiement universel (méthode recommandée)

## 1) Choisir le mode URL

- Déploiement en racine: `https://example.com/`
- Déploiement en sous-dossier: `https://example.com/tasse/`

## 2) Générer le bon build

```bash
# racine
npm run build:root

# sous-dossier /tasse
npm run build:tasse
```

## 3) Publier le dossier `out/`

Copier **le contenu** de `out/` dans le dossier web cible de ton hébergement.

Exemples de dossier cible:

- Racine du site: `public_html/`
- Sous-dossier: `public_html/tasse/`

## 4) Vérifier les routes

```bash
curl -I https://example.com/
curl -I https://example.com/assessment/
curl -I https://example.com/results/
```

Pour un sous-dossier `/tasse`:

```bash
curl -I https://example.com/tasse/
curl -I https://example.com/tasse/assessment/
curl -I https://example.com/tasse/results/
```

---

## Shared Hosting (HostGator, Bluehost, OVH, cPanel)

## Option A: cPanel File Manager (sans SSH)

1. `npm run build:root` ou `npm run build:tasse`
2. Compresser `out/` en zip
3. Dans cPanel > File Manager, aller au dossier cible (`public_html` ou `public_html/tasse`)
4. Upload du zip
5. Extract du zip
6. Vérifier que `index.html` est bien au bon niveau

## Option B: SSH/SCP (générique, sans info sensible)

```bash
# Exemple générique (placeholders)
ssh -i ~/.ssh/<private_key> -o IdentitiesOnly=yes <user>@<host> "mkdir -p <target_folder>"
scp -i ~/.ssh/<private_key> -o IdentitiesOnly=yes -r out/* <user>@<host>:<target_folder>/
```

Remplace toujours:

- `<private_key>`
- `<user>`
- `<host>`
- `<target_folder>`

---

## Netlify

- Connecter le repo GitHub
- Build command: `npm run build:root`
- Publish directory: `out`

Pour un sous-dossier, préférer un domaine/sous-domaine dédié, ou conserver la stratégie `build:tasse` selon ton routing.

---

## Cloudflare Pages

- Connecter le repo
- Build command: `npm run build:root`
- Build output directory: `out`

---

## Vercel

Version actuelle (export statique):

- Build command: `npm run build:root`
- Output directory: `out`

Si tu veux plus tard du SSR/API, retire `output: "export"` et adapte le déploiement Vercel standard.

---

## VPS (Nginx)

1. Build local: `npm run build:root` ou `npm run build:tasse`
2. Copier `out/` sur le serveur
3. Servir les fichiers avec Nginx

Exemple Nginx pour sous-dossier `/tasse`:

```nginx
server {
  listen 80;
  server_name example.com;

  root /var/www/main-site;
  index index.html;

  location /tasse/ {
    alias /var/www/tasse/;
    try_files $uri $uri/ /tasse/index.html;
  }
}
```

Puis:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## CI/CD générique (GitHub Actions, GitLab CI, etc.)

Pipeline type:

1. `npm ci`
2. `npm run lint`
3. `npm run build:root` (ou `build:tasse`)
4. Publier `out/` vers la cible (S3, FTP, SCP, Pages)

Important:

- Ne jamais commiter de clés SSH
- Stocker les secrets dans les variables sécurisées CI

---

## Dépannage

## 403 sur une sous-route (`/assessment/`)

- Vérifier que `out/assessment/index.html` existe
- Vérifier que le dossier `assessment` a bien été uploadé
- Vérifier les permissions (`755` dossiers, `644` fichiers)

## CSS/JS cassés

- Vérifier le bon script de build:
  - racine: `npm run build:root`
  - sous-dossier: `npm run build:tasse`

## Mauvais dossier de publication

- Vérifier que les fichiers sont dans le dossier servi par le serveur web
- Vérifier la présence de `index.html` à la racine du dossier publié

---

## Sécurité et confidentialité

- Ne pas exposer d'IP, user, clé SSH ou chemins privés dans la documentation
- Utiliser des placeholders dans les exemples
- Garder les secrets en local ou dans le coffre de secrets CI/CD

---

## Notes produit

- Progression et réponses stockées en `localStorage` navigateur
- Export PDF actuel via impression navigateur (`Report > Print / Save PDF`)
- Architecture prête pour extension API/DB/auth
