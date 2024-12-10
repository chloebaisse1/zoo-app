const API_URL_HABITAT = "http://localhost:8080/api/habitat"

// Création d'un habitat
document
  .getElementById("habitatForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault()

    const habitatName = document.getElementById("habitatName").value
    const habitatDescription =
      document.getElementById("habitatDescription").value
    const habitatAnimaux = document.getElementById("habitatAnimals").value // Correction ici

    const newHabitat = {
      name: habitatName,
      description: habitatDescription,
      animaux: habitatAnimaux,
    }

    try {
      const response = await fetch(API_URL_HABITAT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHabitat),
      })

      if (response.ok) {
        alert("Habitat créé avec succès")
        loadHabitats() // Recharger la liste des habitats
      } else {
        alert("Erreur lors de la création de l'habitat")
      }
    } catch (error) {
      console.error("Erreur:", error)
    }
  })

// Afficher la liste des habitats
async function loadHabitats() {
  try {
    const response = await fetch(API_URL_HABITAT)
    const habitats = await response.json()

    const habitatsTable = document.querySelector("#habitatsTable tbody")
    habitatsTable.innerHTML = ""

    habitats.forEach((habitat) => {
      const row = document.createElement("tr")
      row.innerHTML = `
                <td>${habitat.name}</td>
                <td>${habitat.description}</td>
                <td>${habitat.animaux}</td>
                <td>
                    <button class="btn edit-btn" data-id="${habitat.id}"><i class="bx bx-edit"></i> Modifier</button>
                    <button class="btn delete-btn" data-id="${habitat.id}"><i class="bx bx-trash"></i> Supprimer</button>
                </td>
            `
      habitatsTable.appendChild(row)
    })

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", deleteHabitat)
    })

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", editHabitat)
    })
  } catch (error) {
    console.error("Erreur lors du chargement des habitats:", error)
  }
}

// Modifier un habitat
async function editHabitat(event) {
  const habitatId = event.target.dataset.id
  const habitatName = prompt("Entrez le nouveau nom de l'habitat:")
  const habitatDescription = prompt(
    "Entrez la nouvelle description de l'habitat:"
  )
  const habitatAnimaux = prompt("Entrez les nouveaux animaux de l'habitat:")

  const updatedHabitat = {
    name: habitatName,
    description: habitatDescription,
    animaux: habitatAnimaux,
  }

  try {
    const response = await fetch(`${API_URL_HABITAT}/${habitatId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedHabitat),
    })

    if (response.ok) {
      alert("Habitat modifié avec succès")
      loadHabitats() // Recharger la liste des habitats
    } else {
      alert("Erreur lors de la modification de l'habitat")
    }
  } catch (error) {
    console.error("Erreur:", error)
  }
}

// Supprimer un habitat
async function deleteHabitat(event) {
  const habitatId = event.target.dataset.id

  if (confirm("Voulez-vous vraiment supprimer cet habitat ?")) {
    try {
      const response = await fetch(`${API_URL_HABITAT}/${habitatId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        alert("Habitat supprimé avec succès")
        loadHabitats() // Recharger la liste des habitats
        this.reset() // Réinitialiser le formulaire ici
      } else {
        alert("Erreur lors de la suppression de l'habitat")
      }
    } catch (error) {
      console.error("Erreur:", error)
    }
  }
}

// Charger les habitats au démarrage
document.addEventListener("DOMContentLoaded", loadHabitats)
