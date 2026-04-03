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

  if (!localStorage.getItem("defaultEventsLoaded")) {
    localStorage.setItem("customEvents", JSON.stringify(defaultEvents));
    localStorage.setItem("defaultEventsLoaded", "true");
  }

  const savedEvents = JSON.parse(localStorage.getItem("customEvents")) || [];

  renderNextEvent(savedEvents);
  renderEvents(savedEvents);
  loadRealNews();

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

function renderNextEvent(events) {
  const nextEventBox = document.getElementById("nextEventBox");
  if (!nextEventBox) return;

  const now = new Date();
  const futureEvents = events
    .filter(event => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (!futureEvents.length) {
    nextEventBox.innerHTML = "<p>Nu există evenimente viitoare.</p>";
    return;
  }

  const nextEvent = futureEvents[0];

  nextEventBox.innerHTML = `
    <h3>${nextEvent.title}</h3>
    <p><strong>Data:</strong> ${formatDate(nextEvent.date)}</p>
    <p><strong>Oraș:</strong> ${nextEvent.city}</p>
    <p><strong>Locație:</strong> ${nextEvent.location}</p>
    <p>${nextEvent.description}</p>
    <a class="btn" href="event.html?id=${encodeURIComponent(nextEvent.id)}">Detalii eveniment</a>
  `;

  startCountdown(nextEvent.date);
}

function startCountdown(targetDate) {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

async function loadRealNews() {
  const newsContainer = document.getElementById("newsContainer");
  if (!newsContainer) return;

  try {
    const response = await fetch(
      "https://api.allorigins.win/raw?url=" +
      encodeURIComponent("https://www.motorsport.com/rss/f1/news/")
    );

    const text = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    const items = xml.querySelectorAll("item");

    newsContainer.innerHTML = "";

    if (!items.length) {
      newsContainer.innerHTML = "<p>Nu s-au găsit știri.</p>";
      return;
    }

    items.forEach((item, index) => {
      if (index >= 6) return;

      const title = item.querySelector("title")?.textContent || "Știre auto";
      const link = item.querySelector("link")?.textContent || "#";

      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <img src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80" alt="${title}">
        <div class="event-content">
          <h3>${title}</h3>
          <a href="${link}" target="_blank" class="btn">Citește</a>
        </div>
      `;

      newsContainer.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    newsContainer.innerHTML = "<p>Nu s-au putut încărca știrile.</p>";
  }
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
