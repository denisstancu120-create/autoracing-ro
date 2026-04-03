document.addEventListener("DOMContentLoaded", function () {
  const events = [
    {
      title: "Drift Night Brașov",
      description: "Seară de drift cu atmosferă racing autentică.",
      image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "Drag Race București",
      description: "Eveniment de drag racing cu mașini modificate.",
      image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "Auto Show Cluj",
      description: "Expoziție auto cu modele sport și tuning.",
      image: "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=900&q=80"
    }
  ];

  const news = [
    {
      title: "Formula 1: sezon spectaculos",
      description: "Lupta pentru podium promite dueluri intense și multă adrenalină.",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      url: "#"
    },
    {
      title: "Rally european în plină forță",
      description: "Etapele de rally aduc trasee tehnice și mașini pregătite de spectacol.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
      url: "#"
    },
    {
      title: "Industria auto accelerează",
      description: "Constructorii investesc în performanță, electrificare și tehnologii smart.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
      url: "#"
    }
  ];

  const eventsContainer = document.getElementById("eventsContainer");
  const newsContainer = document.getElementById("newsContainer");

  if (eventsContainer) {
    eventsContainer.innerHTML = "";

    events.forEach(function (event) {
      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <div class="event-content">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
        </div>
      `;

      eventsContainer.appendChild(card);
    });
  }

  if (newsContainer) {
    newsContainer.innerHTML = "";

    news.forEach(function (item) {
      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="event-content">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a href="${item.url}" class="btn">Citește</a>
        </div>
      `;

      newsContainer.appendChild(card);
    });
  }
});
