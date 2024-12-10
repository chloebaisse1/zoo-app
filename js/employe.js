const inputNom = document.getElementById("NomInput")
const inputRace = document.getElementById("RaceInput")
const inputHabitat = document.getElementById("HabitatInput")
const inputNourriture = document.getElementById("NourritureInput")
const inputQuantitee = document.getElementById("QuantiteeInput")
const inputDate = document.getElementById("DateInput")
const inputHeure = document.getElementById("HeureInput")
const formPassage = document.getElementById("formulairePassage")
const btnValidation = document.getElementById("btn-validation-passage")
const messageDiv = document.createElement("div") // Créer un élément pour afficher les messages
formPassage.appendChild(messageDiv) // Ajouter l'élément au formulaire

// Événements pour tous les champs d'entrée
;[inputNom, inputRace, inputHabitat, inputNourriture, inputQuantitee].forEach(
  (input) => {
    input.addEventListener("keyup", validateForm)
  }
)

inputDate.addEventListener("change", validateForm) // Changer l'événement pour inputDate
inputHeure.addEventListener("change", validateForm) // Changer l'événement pour inputHeure

btnValidation.addEventListener("click", EnvoyerPassage)

function validateForm() {
  const nomOk = validateRequired(inputNom)
  const raceOk = validateRequired(inputRace)
  const habitatOk = validateRequired(inputHabitat)
  const nourritureOk = validateRequired(inputNourriture)
  const quantiteeOk = validateRequired(inputQuantitee)
  const dateOk = validateRequired(inputDate)
  const heureOk = validateRequired(inputHeure)

  btnValidation.disabled = !(
    nomOk &&
    raceOk &&
    habitatOk &&
    nourritureOk &&
    quantiteeOk &&
    dateOk &&
    heureOk
  )
}

function EnvoyerPassage(event) {
  event.preventDefault()

  let dataForm = new FormData(formPassage)

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")
  myHeaders.append("X-AUTH-TOKEN", getToken()) // Utilise le token récupéré

  const raw = JSON.stringify({
    nom: dataForm.get("nom"),
    race: dataForm.get("race"),
    habitat: dataForm.get("habitat"),
    nourriture: dataForm.get("nourriture"),
    quantitee: dataForm.get("quantitee"),
    date: dataForm.get("date"),
    heure: dataForm.get("time"),
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  fetch("http://localhost:8080/api/passage", requestOptions)
    .then((response) => {
      console.log("Réponse brute:", response) // Affiche la réponse brute
      if (!response.ok) {
        return response.text().then((err) => {
          throw new Error(err || "Erreur dans la soumission du formulaire")
        })
      }
      return response.json() // Utilisez .json() pour traiter la réponse
    })
    .then((data) => {
      console.log("Réponse du serveur:", data)
      messageDiv.textContent = "Passage enregistré avec succès!"
      messageDiv.classList.remove("text-danger")
      messageDiv.classList.add("text-success")
      formPassage.reset() // Réinitialiser le formulaire
      validateForm() // Réévaluer l'état du formulaire
    })
    .catch((error) => {
      console.error("Erreur:", error)
      messageDiv.textContent = error.message // Afficher le message d'erreur
      messageDiv.classList.remove("text-success")
      messageDiv.classList.add("text-danger")
    })
}

// Fonction pour vérifier si un champ est requis
function validateRequired(input) {
  if (!input.value.trim()) {
    input.classList.add("is-invalid")
    return false
  } else {
    input.classList.remove("is-invalid")
    return true
  }
}
