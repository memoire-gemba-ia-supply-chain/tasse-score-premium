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

Cela signifie:

- Pas besoin de Node.js sur le serveur de production (shared hosting OK)
- Le build génère des fichiers HTML/CSS/JS dans `out/`
- Déploiement simple par `scp`, `rsync`, FTP ou File Manager cPanel

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

Ouvrir: `http://localhost:3000`

---

## Déploiement détaillé: Shared Hosting (HostGator)

### Objectif: publier sur `acode.tech/tasse` sans toucher au site actuel

Le site principal reste inchangé. On déploie uniquement dans un dossier dédié.

### 1. Build pour sous-dossier `/tasse`

```bash
cd tasse-score-premium
npm install
npm run build:tasse
```

Le build final sera dans `out/`.

### 2. Créer le dossier cible sur le serveur

```bash
ssh -i ~/.ssh/safetyplant_premium_ed25519 -o IdentitiesOnly=yes zezeuute@108.167.172.119 \
"mkdir -p ~/public_html/website_2adfe34f/tasse"
```

### 3. Uploader les fichiers statiques

```bash
scp -i ~/.ssh/safetyplant_premium_ed25519 -o IdentitiesOnly=yes -r out/* \
zezeuute@108.167.172.119:~/public_html/website_2adfe34f/tasse/
```

### 4. Vérifier

```bash
curl -I https://acode.tech/tasse/
curl -I https://acode.tech/tasse/assessment/
curl -I https://acode.tech/tasse/results/
curl -I https://acode.tech/tasse/report/
```

Tu dois obtenir `HTTP 200`.

### 5. Mise à jour future

Pour chaque nouvelle version:

```bash
npm run build:tasse
scp -i ~/.ssh/safetyplant_premium_ed25519 -o IdentitiesOnly=yes -r out/* \
zezeuute@108.167.172.119:~/public_html/website_2adfe34f/tasse/
```

Aucun impact sur `public_html` racine tant que tu restes dans `.../tasse`.

---

## Déploiement HostGator sans SSH (cPanel File Manager)

Si SSH n'est pas disponible:

1. `npm run build:tasse`
2. Compresser localement le dossier `out/` en zip
3. Dans cPanel > File Manager, aller dans `public_html/website_2adfe34f/tasse`
4. Upload du zip
5. Extract du zip
6. Vérifier que `index.html` est directement dans `tasse/`

---

## Déploiement sur d'autres plateformes

## 1) cPanel shared hosting (générique)

Même procédure que HostGator:

- Build static (`npm run build:root` ou `npm run build:tasse`)
- Upload contenu de `out/` dans le dossier web cible

## 2) Netlify (Static)

- Connecter repo GitHub
- Build command: `npm run build:root` (ou `npm run build:tasse` selon besoin)
- Publish directory: `out`

## 3) Cloudflare Pages (Static)

- Connecter repo
- Build command: `npm run build:root`
- Output directory: `out`

## 4) Vercel

Deux options:

- Option A: rester en export statique (comme ci-dessus)
- Option B: supprimer `output: "export"` si tu veux des fonctionnalités serveur plus tard

## 5) VPS (Nginx + fichiers statiques)

Build:

```bash
npm run build:tasse
```

Copier `out/` vers `/var/www/tasse` puis config Nginx:

```nginx
server {
  listen 80;
  server_name acode.tech;

  root /var/www/main-site;
  index index.html;

  location /tasse/ {
    alias /var/www/tasse/;
    try_files $uri $uri/ /tasse/index.html;
  }
}
```

Reload Nginx:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## Dépannage

## 403 sur `/tasse/assessment/`

- Vérifier que `out/assessment/index.html` existe
- Vérifier que le dossier `assessment` a bien été uploadé dans `tasse/`
- Vérifier les permissions (dossiers `755`, fichiers `644` en général)

## Assets cassés (CSS/JS)

- Vérifier que le build a été fait avec le bon base path:
  - sous-dossier: `npm run build:tasse`
  - racine: `npm run build:root`

## Site principal affecté

- Vérifier que tu n'as pas écrasé `public_html` racine
- Déployer uniquement dans un sous-dossier dédié (`/tasse`)

---

## Notes

- Les données de progression utilisateur sont stockées en `localStorage` navigateur
- L'export PDF actuel est un mode impression navigateur (`Report > Print / Save PDF`)
- Architecture prête pour évolution DB/API/auth ensuite
