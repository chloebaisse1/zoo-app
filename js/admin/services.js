const API_URL = "http://localhost:8080/api/service"

// Création d'un service
document
  .getElementById("serviceForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault()

    const serviceName = document.getElementById("serviceName").value
    const serviceDescription =
      document.getElementById("serviceDescription").value

    const newService = {
      name: serviceName,
      description: serviceDescription,
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      })

      if (response.ok) {
        alert("Service créé avec succès")
        loadServices() // Recharger la liste des services
        this.reset() // Réinitialiser le formulaire ici
      } else {
        alert("Erreur lors de la création du service")
      }
    } catch (error) {
      console.error("Erreur:", error)
    }
  })

// Afficher la liste des services
async function loadServices() {
  try {
    const response = await fetch(API_URL)
    const services = await response.json()

    const servicesTable = document.querySelector("#servicesTable tbody")
    servicesTable.innerHTML = ""

    services.forEach((service) => {
      const row = document.createElement("tr")
      row.innerHTML = `
                <td>${service.name}</td>
                <td>${service.description}</td>
                <td>
                    <button class="btn edit-btn" data-id="${service.id}"><i class="bx bx-edit"></i> Modifier</button>
                    <button class="btn delete-btn" data-id="${service.id}"><i class="bx bx-trash"></i> Supprimer</button>
                </td>
            `
      servicesTable.appendChild(row)
    })

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", deleteService)
    })

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", editService)
    })
  } catch (error) {
    console.error("Erreur lors du chargement des services:", error)
  }
}

// Modifier un service
async function editService(event) {
  const serviceId = event.target.dataset.id
  const serviceName = prompt("Entrez le nouveau nom du service:")
  const serviceDescription = prompt(
    "Entrez la nouvelle description du service:"
  )

  const updatedService = {
    name: serviceName,
    description: serviceDescription,
  }

  try {
    const response = await fetch(`${API_URL}/${serviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedService),
    })

    if (response.ok) {
      alert("Service modifié avec succès")
      loadServices() // Recharger la liste des services
    } else {
      alert("Erreur lors de la modification du service")
    }
  } catch (error) {
    console.error("Erreur:", error)
  }
}

// Supprimer un service
async function deleteService(event) {
  const serviceId = event.target.dataset.id

  if (confirm("Voulez-vous vraiment supprimer ce service ?")) {
    try {
      const response = await fetch(`${API_URL}/${serviceId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        alert("Service supprimé avec succès")
        loadServices() // Recharger la liste des services
      } else {
        alert("Erreur lors de la suppression du service")
      }
    } catch (error) {
      console.error("Erreur:", error)
    }
  }
}

// Charger les services au démarrage
document.addEventListener("DOMContentLoaded", loadServices)
