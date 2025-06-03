const express = require("express");
const port = 3000;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/todo", (req, res) => {
  res.json([
    {
      id: 1,
      label: "Finaliser le rapport mensuel",
      tags: ["travail", "rapport", "urgent"],
      deadline: new Date("2024-03-25T17:00:00"),
      done: false
    },
    {
      id: 2,
      label: "Réservation restaurant anniversaire",
      tags: ["personnel", "événement"],
      deadline: new Date("2024-03-30T12:00:00"),
      done: false
    },
    {
      id: 3,
      label: "Mise à jour des dépendances npm",
      tags: ["développement", "maintenance"],
      deadline: new Date("2024-03-22T16:00:00"),
      done: true
    },
    {
      id: 4,
      label: "Préparation entretien d'embauche",
      tags: ["carrière", "préparation"],
      deadline: new Date("2024-03-28T10:00:00"),
      done: false
    },
    {
      id: 5,
      label: "Révision du code pour la release",
      tags: ["développement", "code review"],
      deadline: new Date("2024-03-27T14:00:00"),
      done: false
    }
  ])
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})