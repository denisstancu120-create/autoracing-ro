document.addEventListener("DOMContentLoaded", () => {
  const defaultEvents = [
    {
      id: "event-1",
      title: "Drift Night Brașov",
      date: "2026-05-20T18:00",
      city: "Brașov",
      location: "Circuitul Prejmer",
      description: "Seară de drift cu atmosferă racing autentică.",
      image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=900&q=80",
      mapLink: "https://www.google.com/maps?q=Prejmer,Brasov&output=embed"
    },
    {
      id: "event-2",
      title: "Drag Race București",
      date: "2026-06-10T14:00",
      city: "București",
      location: "Arena Motor Park",
      description: "Eveniment de drag racing cu mașini modificate.",
      image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=900&q=80",
      mapLink: "https://www.google.com/maps?q=Bucuresti&output=embed"
    }
  ];

  const news = [
    {
      title: "Formula 1 sezon nou",
      description: "Se anunță lupte intense în noul sezon.",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      url: "#"
    },
    {
      title: "Rally european",
      description: "Trasee spectaculoase și dueluri tari.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
      url: "#"
    }
  ];

  if (!localStorage.getItem("defaultEventsLoaded")) {
    localStorage.setItem("customEvents", JSON.stringify(defaultEvents));
    localStorage.setItem("defaultEventsLoaded", "true");
  }

  const savedEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
  renderEvents(savedEvents);
  renderNews(news);

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Mesaj trimis cu succes!");
      this.reset();
    });
  }
});

function renderEvents(events) {
  const container = document.getElementById("eventsContainer");
  if (!container) return;

  container.innerHTML = "";

  if (!events.length) {
    container.innerHTML = '<p class="no-events">Nu există evenimente.</p>';
    return;
  }

  events.forEach((event) => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <div class="event-content">
        <h3>${event.title}</h3>
        <p><strong>Data:</strong> ${formatDate(event.date)}</p>
        <p><strong>Oraș:</strong> ${event.city}</p>
        <p><strong>Locație:</strong> ${event.location}</p>
        <p>${event.description}</p>
        <a class="btn" href="event.html?id=${encodeURIComponent(event.id)}">Vezi detalii</a>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderNews(newsItems) {
  const newsContainer = document.getElementById("newsContainer");
  if (!newsContainer) return;

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

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("ro-RO", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) + " " + date.toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
