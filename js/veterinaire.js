const inputNom = document.getElementById("NomInput")
const inputRace = document.getElementById("RaceInput")
const inputHabitat = document.getElementById("HabitatInput")
const inputNourriture = document.getElementById("NourritureInput")
const inputQuantitee = document.getElementById("QuantiteeInput")
const inputDate = document.getElementById("DateInput")
const inputCommentaire = document.getElementById("CommentaireInput")
const formCompteR = document.getElementById("formulaireCompte-rendu")
const btnValidation = document.getElementById("btn-validation-compte-rendu")

inputNom.addEventListener("keyup", validateForm)
inputRace.addEventListener("keyup", validateForm)
inputHabitat.addEventListener("keyup", validateForm)
inputNourriture.addEventListener("keyup", validateForm)
inputQuantitee.addEventListener("keyup", validateForm)
inputDate.addEventListener("keyup", validateForm)
inputCommentaire.addEventListener("keyup", validateForm)

formCompteR.addEventListener("submit", EnvoyerCompteR)

function validateForm() {
  const nomOk = validateRequired(inputNom)
  const raceOk = validateRequired(inputRace)
  const habitatOk = validateRequired(inputHabitat)
  const nourritureOk = validateRequired(inputNourriture)
  const quantiteeOk = validateRequired(inputQuantitee)
  const dateOk = validateRequired(inputDate)
  const commentaireOk = validateRequired(inputCommentaire)

  btnValidation.disabled = !(
    nomOk &&
    raceOk &&
    habitatOk &&
    nourritureOk &&
    quantiteeOk &&
    dateOk &&
    commentaireOk
  )
}

function validateRequired(input) {
  if (!input.value.trim()) {
    input.classList.add("is-invalid")
    return false
  } else {
    input.classList.remove("is-invalid")
    return true
  }
}

function EnvoyerCompteR(event) {
  event.preventDefault()

  let dataForm = new FormData(formCompteR)

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("X-AUTH-TOKEN", getToken()) // Utilise le token récupéré

  const raw = JSON.stringify({
    nom: dataForm.get("nom"), // Assurez-vous que le nom correspond à celui défini dans le HTML
    race: dataForm.get("race"),
    habitat: dataForm.get("habitat"),
    nourriture: dataForm.get("nourriture"),
    quantitee: dataForm.get("quantitee"),
    date: dataForm.get("date"),
    commentaire: dataForm.get("commentaire"),
  })

  console.log("Données envoyées:", raw) // Log des données envoyées

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  }

  fetch("http://localhost:8080/api/compteR", requestOptions)
    .then((response) => {
      console.log("Réponse brute:", response) // Affiche la réponse brute
      return response.text() // Obtenez le texte brut d'abord
    })
    .then((text) => {
      console.log("Texte brut de la réponse:", text) // Affichez le texte brut pour le débogage
      try {
        const data = JSON.parse(text) // Essayez de parser le texte en JSON
        console.log("Réponse du serveur:", data)

        // Affichez une alerte de succès et réinitialisez le formulaire
        alert("Compte-rendu créé avec succès!")
        formCompteR.reset() // Réinitialise le formulaire
      } catch (error) {
        console.error("Erreur lors du parsing JSON:", error)
        alert("Erreur de parsing JSON: " + text)
      }
    })
    .catch((error) => {
      console.error("Erreur:", error)
      alert(error.message)
    })
}
