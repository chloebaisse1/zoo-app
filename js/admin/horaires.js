document.addEventListener("DOMContentLoaded", async () => {
  const horairesTableBody = document.getElementById("horairesTbody")

  // Fonction pour récupérer les horaires
  async function fetchHoraires() {
    try {
      const response = await fetch("http://localhost:8080/api/horaire")
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des horaires")
      return await response.json()
    } catch (error) {
      console.error(error)
      return []
    }
  }

  // Fonction pour afficher les horaires dans le tableau
  function displayHoraires(horaires) {
    horairesTableBody.innerHTML = ""
    horaires.forEach((horaire) => {
      const jour = horaire.jour || "Non défini"
      const ouverture = horaire.ouverture || "Non défini"
      const fermeture = horaire.fermeture || "Non défini"

      const row = document.createElement("tr")
      row.innerHTML = `
          <td>${jour}</td>
          <td>${ouverture}</td>
          <td>${fermeture}</td>
          <td>
              <button class="btn edit-btn" onclick="editHoraire(${horaire.id})">
                  <i class="bx bx-edit"></i> Modifier
              </button>
              <button class="btn delete-btn" onclick="deleteHoraire(${horaire.id})">
                  <i class="bx bx-trash"></i> Supprimer
              </button>
          </td>
      `
      horairesTableBody.appendChild(row)
    })
  }

  // Récupérer et afficher les horaires
  const horaires = await fetchHoraires()
  displayHoraires(horaires)

  // Gestion du formulaire de création d'horaire
  const horaireForm = document.getElementById("horaireForm")
  horaireForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const formData = new FormData(horaireForm)
    const newHoraire = {
      jour: formData.get("horaireJour"),
      ouverture: formData.get("horaireOuverture"),
      fermeture: formData.get("horaireFermeture"),
    }

    try {
      const response = await fetch("https://localhost:8000/api/horaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHoraire),
      })

      if (!response.ok)
        throw new Error("Erreur lors de la création de l'horaire")
      const createdHoraire = await response.json()
      displayHoraires([...horaires, createdHoraire])
      horaireForm.reset()
    } catch (error) {
      console.error(error)
    }
  })

  // Rendre la fonction deleteHoraire accessible globalement
  window.deleteHoraire = async function (id) {
    try {
      const response = await fetch(`https://localhost:8000/api/horaire/${id}`, {
        method: "DELETE",
      })

      if (!response.ok)
        throw new Error("Erreur lors de la suppression de l'horaire")

      // Récupérer à nouveau les horaires après suppression
      const horaires = await fetchHoraires()
      displayHoraires(horaires)
    } catch (error) {
      console.error(error)
    }
  }
})
