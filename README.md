# 🎨 Printed — Print Your Style

> Plateforme d'impression à la demande — Bénin  
> Stack : React 18 · React Router v6 · Lucide React · CSS inline

---

## 🚀 Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. (Optionnel) Télécharger les assets Figma en local
npm run download-assets

# 3. Lancer le serveur de développement
npm start
```

Ouvre [http://localhost:3000](http://localhost:3000)

---

## 🔑 Comptes démo

| Rôle      | Email                  | Mot de passe |
|-----------|------------------------|--------------|
| **Admin** | `admin@printed.bj`     | `admin123`   |
| **Client**| `client@printed.bj`    | `client123`  |

---

## 📁 Structure du projet

```
printed/
├── public/
│   └── index.html
├── scripts/
│   └── download-assets.js     ← télécharge les images Figma
├── src/
│   ├── assets/
│   │   └── images/            ← images (remplies par download-assets)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx     ← nav sticky, mobile, dropdown user
│   │   │   └── Footer.jsx     ← 5 colonnes + réseaux sociaux
│   │   └── ui/
│   │       ├── ProductCard.jsx  ← carte avec hover, like, add to cart
│   │       └── FormElements.jsx ← Button + Input réutilisables
│   ├── context/
│   │   └── AppContext.jsx     ← CartContext + AuthContext (localStorage)
│   ├── pages/
│   │   ├── Home.jsx           ← hero, about, pourquoi nous, produits, FAQ, newsletter
│   │   ├── Catalogue.jsx      ← filtres sidebar, tri, pagination, active filters
│   │   ├── ProductDetail.jsx  ← galerie, tailles, qty, tabs avis/livraison
│   │   ├── Cart.jsx           ← liste panier, résumé, livraison gratuite
│   │   ├── Checkout.jsx       ← stepper 3 étapes (livraison → paiement → confirmation)
│   │   ├── Personnalisation.jsx ← outil drag & drop, texte, modèles, preview live
│   │   ├── Blog.jsx           ← grille articles avec catégories
│   │   ├── Entreprise.jsx     ← offres B2B, stats, cas d'usage
│   │   ├── Contact.jsx        ← formulaire + infos
│   │   ├── NotFound.jsx       ← page 404
│   │   ├── auth/
│   │   │   ├── Login.jsx          ← split screen, comptes démo affichés
│   │   │   ├── Register.jsx       ← split screen
│   │   │   └── ForgotPassword.jsx ← flux 4 étapes avec OTP
│   │   ├── client/
│   │   │   └── Profile.jsx        ← onglets : profil, commandes, favoris, notifs, params
│   │   └── admin/
│   │       ├── AdminLayout.jsx    ← sidebar noire fixe
│   │       ├── Dashboard.jsx      ← KPIs, commandes récentes, top produits
│   │       ├── AdminProducts.jsx  ← CRUD produits avec modal
│   │       ├── AdminOrders.jsx    ← tableau commandes, filtres, changement statut
│   │       ├── AdminUsers.jsx     ← liste users, filtres rôle
│   │       ├── AdminStats.jsx     ← bar chart revenues, donut catégories
│   │       └── AdminSettings.jsx  ← paramètres plateforme
│   ├── utils/
│   │   └── constants.js       ← assets, couleurs, nav, catégories, produits mock
│   ├── App.jsx                ← router + guards auth/admin
│   ├── index.js
│   └── index.css              ← Google Fonts + variables CSS + animations
├── package.json
└── README.md
```

---

## 🗺️ Pages disponibles

| URL                       | Page                          | Accès     |
|---------------------------|-------------------------------|-----------|
| `/`                       | Accueil                       | Public    |
| `/catalogue`              | Catalogue (filtres + tri)     | Public    |
| `/produit/:id`            | Détail produit                | Public    |
| `/personnalisation`       | Outil de personnalisation     | Public    |
| `/blog`                   | Blog                          | Public    |
| `/entreprise`             | Solutions entreprise          | Public    |
| `/contact`                | Contact                       | Public    |
| `/panier`                 | Panier                        | Public    |
| `/commande`               | Processus commande (3 étapes) | Connecté  |
| `/profil`                 | Profil client                 | Connecté  |
| `/commandes`              | Mes commandes                 | Connecté  |
| `/connexion`              | Login                         | Public    |
| `/inscription`            | Register                      | Public    |
| `/mot-de-passe-oublie`    | Reset password                | Public    |
| `/admin`                  | Dashboard admin               | Admin     |
| `/admin/produits`         | Gestion produits              | Admin     |
| `/admin/commandes`        | Gestion commandes             | Admin     |
| `/admin/utilisateurs`     | Gestion utilisateurs          | Admin     |
| `/admin/statistiques`     | Statistiques & graphiques     | Admin     |
| `/admin/parametres`       | Paramètres plateforme         | Admin     |

---

## 🎨 Design System

| Token          | Valeur        |
|----------------|---------------|
| Couleur primaire | `#017BFE`   |
| Bleu clair      | `#CBF6FD`   |
| Succès          | `#02AB84`   |
| Avertissement   | `#E6B95E`   |
| Font titre      | Mochiy Pop One |
| Font corps      | Poppins     |

---

## 🖼️ Assets Figma

Les images viennent de ta maquette Figma. Les URLs sont valables **~7 jours**.  
Pour les conserver en local :

```bash
npm run download-assets
```

Si les URLs ont expiré, reconnecte Figma dans Claude et demande de les regénérer.
