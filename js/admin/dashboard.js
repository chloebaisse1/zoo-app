async function fetchLikesData() {
  const response = await fetch("http://localhost:8080/api/likes")
  const data = await response.json()
  console.log("Données des likes récupérées :", data) // Log des données
  return data
}

async function createCharts() {
  const likesData = await fetchLikesData()

  if (!likesData || Object.keys(likesData).length === 0) {
    console.error("Aucune donnée des likes trouvée !")
    return // Quitte la fonction si aucune donnée
  }

  const chartContainer = document.getElementById("chartContainer")

  // Pour chaque habitat, crée un graphique
  Object.keys(likesData).forEach((habitat) => {
    const habitatData = likesData[habitat]
    const labels = habitatData.map((item) => item.animalId)
    const likes = habitatData.map((item) => item.likes)

    const canvas = document.createElement("canvas")
    canvas.id = `${habitat}LikesChart`
    chartContainer.appendChild(canvas)

    new Chart(canvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: `Nombre de Likes (${habitat})`,
            data: likes,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  })
}

document.addEventListener("DOMContentLoaded", createCharts)
