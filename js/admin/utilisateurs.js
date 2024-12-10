document.addEventListener("DOMContentLoaded", function () {
  const userForm = document.getElementById("userForm")
  const userTableBody = document
    .getElementById("userTable")
    .getElementsByTagName("tbody")[0]

  // Fonction pour récupérer la liste des utilisateurs
  function fetchUsers() {
    fetch("http://localhost:8080/api/users", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("apiToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des utilisateurs")
        }
        return response.json()
      })
      .then((data) => {
        // Effacez le contenu existant
        userTableBody.innerHTML = ""
        data.forEach((user) => {
          const row = userTableBody.insertRow()
          row.insertCell(0).textContent = user.lastName // Nom
          row.insertCell(1).textContent = user.firstName // Prénom
          row.insertCell(2).textContent = user.email // Email

          // Actions
          const actionsCell = row.insertCell(3)
          const editButton = document.createElement("button")
          editButton.className = "btn edit-btn"
          editButton.innerHTML = "<i class='bx bx-edit'></i> Modifier"
          actionsCell.appendChild(editButton)

          const deleteButton = document.createElement("button")
          deleteButton.className = "btn delete-btn"
          deleteButton.innerHTML = "<i class='bx bx-trash'></i> Supprimer"
          actionsCell.appendChild(deleteButton)

          // Ajouter l'événement de suppression
          deleteButton.addEventListener("click", function () {
            deleteUser(user.id) // Appel de la fonction pour supprimer l'utilisateur
          })
        })
      })
      .catch((error) => console.error(error))
  }

  // Fonction pour supprimer un utilisateur
  function deleteUser(userId) {
    fetch(`https://localhost:8000/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("apiToken"), // Assurez-vous que le token est correct
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de l'utilisateur")
        }
        console.log("Utilisateur supprimé:", userId)
        fetchUsers() // Mettre à jour la liste des utilisateurs après suppression
      })
      .catch((error) => console.error(error))
  }

  // Événement de soumission du formulaire
  userForm.addEventListener("submit", function (event) {
    event.preventDefault() // Empêche le rechargement de la page
    const formData = {
      firstName: document.getElementById("userFirstName").value,
      lastName: document.getElementById("userLastName").value,
      email: document.getElementById("userEmail").value,
      password: "tempPassword", // Remplacez par un vrai mot de passe ou un champ pour le mot de passe
      role: "ROLE_USER", // Mettez ici le rôle par défaut ou un champ de sélection
    }

    fetch("https://localhost:8000/api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la création de l’utilisateur")
        }
        return response.json()
      })
      .then((data) => {
        console.log("Utilisateur créé:", data)
        // Réinitialisez le formulaire
        userForm.reset()
        // Récupérez à nouveau la liste des utilisateurs
        fetchUsers()
      })
      .catch((error) => console.error(error))
  })

  // Initialisez la récupération des utilisateurs au chargement de la page
  fetchUsers()
})
