// animaux.js

const apiUrl = "http://localhost:8080/api/animal"
const animalForm = document.getElementById("animalForm")
const animauxTable = document
  .getElementById("animauxTable")
  .getElementsByTagName("tbody")[0]

// Fonction pour récupérer et afficher la liste des animaux
async function fetchAnimaux() {
  try {
    const response = await fetch(apiUrl)
    const animaux = await response.json()

    // Vider le tableau avant de le remplir
    animauxTable.innerHTML = ""

    animaux.forEach((animal) => {
      const row = animauxTable.insertRow()
      row.innerHTML = `
                <td>${animal.nom}</td>
                <td>${animal.race}</td>
                <td>${animal.habitat}</td>
                <td>${animal.etat}</td>
                <td>
                    <button class="btn edit-btn" data-id="${animal.id}">Modifier</button>
                    <button class="btn delete-btn" data-id="${animal.id}">Supprimer</button>
                </td>
            `
    })
  } catch (error) {
    console.error("Erreur lors de la récupération des animaux:", error)
  }
}

// Fonction pour créer un nouvel animal
async function createAnimal(event) {
  event.preventDefault()

  const formData = {
    nom: document.getElementById("animalNom").value,
    race: document.getElementById("animalRace").value,
    habitat: document.getElementById("animalHabitat").value,
    etat: document.getElementById("animalEtat").value,
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      await fetchAnimaux() // Rafraîchir la liste
      animalForm.reset() // Réinitialiser le formulaire
    } else {
      console.error(
        "Erreur lors de la création de l'animal:",
        response.statusText
      )
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'animal:", error)
  }
}

// Fonction pour supprimer un animal
async function deleteAnimal(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      await fetchAnimaux() // Rafraîchir la liste
    } else {
      console.error(
        "Erreur lors de la suppression de l'animal:",
        response.statusText
      )
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'animal:", error)
  }
}

// Écouteurs d'événements
animalForm.addEventListener("submit", createAnimal)

// Chargement de la liste des animaux au démarrage
window.addEventListener("DOMContentLoaded", fetchAnimaux)

// Gestion des clics sur les boutons Modifier et Supprimer
animauxTable.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const id = event.target.dataset.id
    deleteAnimal(id)
  } else if (event.target.classList.contains("edit-btn")) {
    // Logique pour la modification (facultatif pour l'instant)
    const id = event.target.dataset.id
    alert(`Modifier l'animal avec l'ID: ${id}`)
  }
})
