const inputNom = document.getElementById("NomInput")
const inputPrenom = document.getElementById("PrenomInput")
const inputMessage = document.getElementById("MessageInput")
const formAvis = document.getElementById("formulaireAvis")
const btnValidation = document.getElementById("btn-validation-avis")

inputNom.addEventListener("keyup", validateForm)
inputPrenom.addEventListener("keyup", validateForm)
inputMessage.addEventListener("keyup", validateForm)

btnValidation.addEventListener("click", EnvoyerAvis)

function validateForm() {
  const nomOk = validateRequired(inputNom)
  const prenomOk = validateRequired(inputPrenom)
  const messageOk = validateRequired(inputMessage)

  btnValidation.disabled = !(nomOk && prenomOk && messageOk)
}

function validateRequired(input) {
  if (input.value.trim() !== "") {
    input.classList.add("is-valid")
    input.classList.remove("is-invalid")
    return true
  } else {
    input.classList.remove("is-valid")
    input.classList.add("is-invalid")
    return false
  }
}

function EnvoyerAvis(event) {
  event.preventDefault() // Empêche le rechargement de la page

  let dataForm = new FormData(formAvis)

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const raw = JSON.stringify({
    nom: dataForm.get("nom"),
    prenom: dataForm.get("prenom"),
    message: dataForm.get("message"),
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  fetch(apiUrl + "avis", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        alert("Erreur lors de l'envoi de l'avis")
        throw new Error("Erreur lors de l'envoi de l'avis")
      }
    })
    .then((result) => {
      alert("Avis envoyé avec succès")
      formAvis.reset()
      validateForm()
    })
    .catch((error) => console.error("Erreur :", error))
}
