import Route from "./Route.js"

//Définir ici vos routes
export const allRoutes = [
  new Route("/", "Accueil", "/pages/home.html", []),
  new Route(
    "/jungle",
    "Jungle",
    "/pages/habitats/jungle.html",
    [],
    "/js/like.js"
  ),
  new Route(
    "/veterinaire",
    "Veterinaire",
    "/pages/veterinaire.html",
    ["ROLE_VETERINAIRE"],
    "/js/veterinaire.js"
  ),
  new Route(
    "/employe",
    "Employé",
    "/pages/employe.html",
    ["ROLE_EMPLOYEE"],
    "/js/employe.js"
  ),
  new Route(
    "/savane",
    "Savane",
    "/pages/habitats/savane.html",
    [],
    "/js/like.js"
  ),
  new Route(
    "/marais",
    "Marais",
    "/pages/habitats/marais.html",
    [],
    "/js/like.js"
  ),
  new Route("/contact", "Contact", "/pages/contact.html", [], "/js/contact.js"),
  new Route("/avis", "Avis", "/pages/avis.html", [], "/js/avis.js"),
  new Route(
    "/signin",
    "Connexion",
    "/pages/auth/signin.html",
    ["disconnected"],
    "/js/auth/signin.js"
  ),
  new Route(
    "/signup",
    "Inscription",
    "/pages/auth/signup.html",
    ["disconnected"],
    "/js/auth/signup.js"
  ),
  new Route("/account", "Mon compte", "pages/auth/account.html", [
    "ROLE_VETERINAIRE, ROLE_EMPLOYEE, ROLE_ADMIN",
  ]),
  new Route(
    "/editPassword",
    "Changement de mot de passe",
    ["ROLE_VETERINAIRE, ROLE_EMPLOYEE, ROLE_ADMIN"],
    "pages/auth/editPassword.html"
  ),
  new Route(
    "/dashboard",
    "dashboard",
    "/pages/admin/dashboard.html",
    ["ROLE_ADMIN"],
    "/js/admin/dashboard.js"
  ),
  new Route(
    "/admin/services",
    "Services",
    "/pages/admin/services.html",
    ["ROLE_ADMIN"],
    "js/admin/services.js"
  ),
  new Route(
    "/admin/habitats",
    "Habitats",
    "/pages/admin/habitats.html",
    ["ROLE_ADMIN"],
    "js/admin/habitats.js"
  ),
  new Route(
    "/admin/utilisateurs",
    "Utilisateurs",
    "/pages/admin/utilisateurs.html",
    ["ROLE_ADMIN"],
    "/js/admin/utilisateurs.js"
  ),
  new Route(
    "/admin/animaux",
    "Animaux",
    "/pages/admin/animaux.html",
    ["ROLE_ADMIN"],
    "js/admin/animaux.js"
  ),
  new Route(
    "/admin/compteR",
    "CompteR",
    "/pages/admin/compteR.html",
    ["ROLE_ADMIN"],
    "js/admin/compteRendu.js"
  ),
  new Route(
    "/admin/horaires",
    "Horaires",
    "/pages/admin/horaires.html",
    ["ROLE_ADMIN"],
    "/js/admin/horaires.js"
  ),
]

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Zoo Arcadia"
