// Sélectionne tous les boutons de like
const likeButtons = document.querySelectorAll(".like-button")

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

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const data = await response.json()
      console.log("Like enregistré avec succès !")

      // Met à jour l'UI
      const likeCountElement = document.getElementById(`like-count-${animalId}`)
      if (likeCountElement && data.likes) {
        likeCountElement.textContent = data.likes
      }

      // Désactive le bouton pour éviter les likes multiples
      button.disabled = true
      button.classList.add("liked")
    } else {
      console.error("Erreur lors de l'enregistrement du like.")
      alert(
        "Une erreur est survenue lors de l'enregistrement du like. Veuillez réessayer."
      )
    }
  } catch (error) {
    console.error("Erreur réseau : ", error)
    alert("Erreur réseau : Veuillez vérifier votre connexion Internet.")
  }
}

// Ajoute l'événement de clic sur chaque bouton de like
likeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const animalId = this.closest(".jungle-box, .savane-box, .marais-box")
      .dataset.animalId
    if (animalId) {
      sendLike(animalId, this)
    } else {
      console.error("Aucun ID d'animal trouvé pour ce bouton de like.")
    }
  })
})

// Appelle la fonction pour récupérer les likes au chargement de la page
window.addEventListener("load", fetchLikes)
