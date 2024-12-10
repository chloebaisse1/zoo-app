export default class Route {
  constructor(url, title, pathHtml, authorize, pathJS = "") {
    this.url = url
    this.title = title
    this.pathHtml = pathHtml
    this.pathJS = pathJS
    this.authorize = authorize
  }

  // Méthode pour vérifier l'accès
  canAccess(user) {
    if (this.authorize.length === 0) return true // Tout le monde peut y accéder

    if (!user || !user.isConnected) {
      // Si l'utilisateur n'est pas connecté, vérifier si la page est réservée aux déconnectés
      return this.authorize.includes("disconnected")
    }

    // Vérification des rôles
    return this.authorize.some((role) => user.roles.includes(role))
  }
}

/*

[] -> Tout le monde peux y acceder
["disconnected"] -> Réserver aux utilisateurs déconnectés
["admin"] -> reserver aux utilisateurs admin
["employe"] -> reserver aux utilisateurs employe
["veterinaire"] ->  reserver aux utilisateurs veterinaire
["admin", "employe"] -> reserver aux utilisateurs admin et employe
["admin", "employe", "veterinaire"] -> reserver aux utilisateurs admin, employe et veterinaire

*/
