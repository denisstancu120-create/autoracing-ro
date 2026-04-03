document.addEventListener("DOMContentLoaded", () => {
  const events = [
    {
      id: "event-1",
      title: "Drift Night Brașov",
      description: "Seară de drift cu atmosferă racing autentică.",
      image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "event-2",
      title: "Drag Race București",
      description: "Eveniment de drag racing cu mașini modificate.",
      image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "event-3",
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

  renderEvents(events);
  renderNews(news);
  console.log("NEWS:", news);
});

function renderNews(newsItems) {
  const newsContainer = document.getElementById("newsContainer");

  if (!newsContainer) {
    console.log("NU EXISTA newsContainer");
    return;
  }

  newsContainer.innerHTML = "";

  newsItems.forEach((item) => {
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

