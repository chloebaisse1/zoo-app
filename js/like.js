// Fonction pour récupérer les likes actuels de l'API
async function fetchLikes() {
  const url = `http://localhost:8080/likes`

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const data = await response.json()
      console.log("Likes récupérés : ", data.likes) // Vérification des données

      // Met à jour les compteurs de likes pour chaque animal
      for (const [animalId, likeCount] of Object.entries(data.likes)) {
        const likeCountElement = document.getElementById(
          `like-count-${animalId}`
        )
        if (likeCountElement) {
          likeCountElement.textContent = likeCount
        }
      }
    } else {
      console.error("Erreur lors de la récupération des likes.")
    }
  } catch (error) {
    console.error("Erreur réseau : ", error)
  }
}

// Fonction pour envoyer un like à l'API
async function sendLike(animalId, button) {
  const url = `http://localhost:8080/like/${animalId}`

  // Désactive temporairement le bouton pour éviter les spams
  button.disabled = true

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const data = await response.json()
      console.log("Like enregistré avec succès !", data)

      // Vérifie la structure des données reçues
      if (data.likes !== undefined) {
        const likeCountElement = document.getElementById(
          `like-count-${animalId}`
        )
        if (likeCountElement) {
          likeCountElement.textContent = data.likes
        }
      } else {
        console.error("Structure des données reçues incorrecte.")
      }

      // Ajoute une animation ou un effet visuel
      button.classList.add("liked")
      setTimeout(() => {
        button.classList.remove("liked")
      }, 300) // Animation pendant 300ms
    } else {
      console.error("Erreur lors de l'enregistrement du like.")
      alert(
        "Une erreur est survenue lors de l'enregistrement du like. Veuillez réessayer."
      )
    }
  } catch (error) {
    console.error("Erreur réseau : ", error)
    alert("Erreur réseau : Veuillez vérifier votre connexion Internet.")
  } finally {
    // Réactive le bouton après la requête
    button.disabled = false
  }
}

// Ajoute un délégateur d'événements pour les boutons "like"
document.addEventListener("click", (event) => {
  const button = event.target.closest(".like-button")
  if (button) {
    // Recherche de l'ID de l'animal à partir du conteneur
    const animalId =
      button.closest(".savane-box")?.dataset.animalId ||
      button.closest(".jungle-box")?.dataset.animalId ||
      button.closest(".marais-box")?.dataset.animalId

    if (animalId) {
      sendLike(animalId, button)
    } else {
      console.error("Aucun ID d'animal trouvé pour ce bouton de like.")
    }
  }
})

// Appelle la fonction pour récupérer les likes au chargement de la page
window.addEventListener("load", fetchLikes)

// (Optionnel) Met à jour les likes automatiquement toutes les 10 secondes
setInterval(fetchLikes, 10000)
