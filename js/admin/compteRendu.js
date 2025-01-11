// Fonction pour récupérer la valeur d'un cookie par son nom
function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(";").shift()
}

// Fonction pour récupérer le token d'accès
function getToken() {
  return getCookie("accesstoken") // Remplacez par le bon nom de cookie
}

// Ajoutez un message de débogage pour confirmer le chargement
console.log("Fichier compteR.js chargé")

document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:8080/api/compteR" // URL de votre API
  const compteRenduTable = document.getElementById("compte-rendu-table")
  const filterForm = document.getElementById("filter-form") // Récupérer le formulaire

  // Fonction pour récupérer les comptes rendus de l'API
  function fetchCompteRendus(queryParams = "") {
    const token = getToken() // Utiliser la fonction ici
    console.log("Token d'authentification :", token) // Debug

    if (!token) {
      console.error("Token non trouvé")
      return
    }

    // Construire l'URL complète avec les paramètres de recherche
    const url = queryParams ? `${apiUrl}/search${queryParams}` : apiUrl

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur réseau: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        displayCompteRendus(data)
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des comptes rendus:",
          error
        )
      })
  }

  // Fonction pour afficher les comptes rendus dans le tableau
  function displayCompteRendus(compteRendus) {
    compteRenduTable.innerHTML = "" // Vider le tableau avant d'ajouter de nouveaux comptes rendus

    if (compteRendus.length === 0) {
      compteRenduTable.innerHTML =
        "<tr><td colspan='8'>Aucun compte-rendu trouvé</td></tr>"
    } else {
      compteRendus.forEach((cr) => {
        const row = document.createElement("tr")
        row.innerHTML = `
          <td>${cr.id}</td>
          <td>${cr.nom}</td>
          <td>${cr.race}</td>
          <td>${cr.habitat}</td>
          <td>${new Date(cr.date).toLocaleDateString()}</td>
          <td>${cr.nourriture}</td>
          <td>${cr.quantitee}</td>
          <td>${cr.commentaire}</td>
        `
        compteRenduTable.appendChild(row)
      })
    }
  }

  // Ajouter un écouteur sur le formulaire de recherche
  filterForm.addEventListener("submit", function (event) {
    event.preventDefault() // Empêche l'envoi du formulaire classique

    const animalName = document.getElementById("animal-name").value.trim() // Récupérer le nom de l'animal
    const date = document.getElementById("date").value // Récupérer la date

    let queryParams = `/${animalName}` // Initialiser les paramètres de requête avec le nom de l'animal

    // Ajouter la date comme paramètre de recherche si elle est spécifiée
    if (date) {
      queryParams += `?date=${date}` // Ajouter la date après le nom de l'animal
    }

    // Recharger les comptes rendus filtrés
    fetchCompteRendus(queryParams)
  })

  // Charger tous les comptes rendus au chargement de la page
  fetchCompteRendus() // Charger tous les comptes rendus au début
})
