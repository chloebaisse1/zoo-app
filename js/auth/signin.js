const mailInput = document.getElementById("EmailInput")
const passwordInput = document.getElementById("PasswordInput")
const btnSingin = document.getElementById("btnSignin")
const signinForm = document.getElementById("signinForm")

btnSingin.addEventListener("click", checkCredentials)

function checkCredentials() {
  let dataForm = new FormData(signinForm)

  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const raw = JSON.stringify({
    username: dataForm.get("email"),
    password: dataForm.get("mdp"),
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  fetch(apiUrl + "login", requestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        mailInput.classList.add("is-invalid")
        passwordInput.classList.add("is-invalid")
      }
    })
    .then((result) => {
      if (result) {
        const token = result.apiToken
        setToken(token)
        // placer ce token en cookie
        setCookie(RoleCookieName, result.roles[0], 1)

        // Redirection en fonction du rôle
        const roles = result.roles
        if (roles.includes("ROLE_VETERINAIRE")) {
          window.location.replace("/veterinaire")
        } else if (roles.includes("ROLE_EMPLOYEE")) {
          window.location.replace("/employe")
        } else if (roles.includes("ROLE_ADMIN")) {
          window.location.replace("/dashboard")
        } else {
          window.location.replace("/") // Page par défaut si aucun rôle ne correspond
        }
      }
    })
    .catch((error) => console.log("Error:", error))
}
