let allEvents = [];
let countdownInterval = null;

async function loadEvents() {
  try {
    const response = await fetch("./events.json");
    const baseEvents = await response.json();

    const savedEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    allEvents = [...baseEvents, ...savedEvents].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    populateCityFilter(allEvents);
    renderEvents(allEvents);
    renderNextEvent(allEvents);
    setupFilters();
    loadNews();
  } catch (error) {
    console.error("Eroare la încărcarea evenimentelor:", error);
    document.getElementById("eventsContainer").innerHTML =
      '<p class="no-events">Nu s-au putut încărca evenimentele.</p>';
    document.getElementById("nextEventCard").innerHTML =
      "<p>Nu s-a putut încărca următorul eveniment.</p>";
    loadNews();
  }
}

function populateCityFilter(events) {
  const cityFilter = document.getElementById("cityFilter");
  cityFilter.innerHTML = `<option value="all">Toate orașele</option>`;
  const cities = [...new Set(events.map(event => event.city))];

  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    cityFilter.appendChild(option);
  });
}

function renderEvents(events) {
  const container = document.getElementById("eventsContainer");
  container.innerHTML = "";

  if (!events.length) {
    container.innerHTML = '<p class="no-events">Nu există evenimente găsite.</p>';
    return;
  }

  events.forEach((event, index) => {
    const card = document.createElement("div");
    card.className = "event-card";

    const eventId = event.id || `event-${index}`;

    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <div class="event-content">
        <h3>${event.title}</h3>
        <p><strong>Data:</strong> ${formatDate(event.date)}</p>
        <p><strong>Oraș:</strong> ${event.city}</p>
        <p><strong>Locație:</strong> ${event.location}</p>
        <p>${event.description}</p>
        <a class="btn" href="event.html?id=${encodeURIComponent(eventId)}">Vezi detalii</a>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderNextEvent(events) {
  const now = new Date();
  const nextEvent = events.find(event => new Date(event.date) > now);
  const nextEventCard = document.getElementById("nextEventCard");

  if (!nextEvent) {
    nextEventCard.innerHTML = "<p>Nu există evenimente viitoare momentan.</p>";
    stopCountdown();
    return;
  }

  const eventId = nextEvent.id || "next-event";

  nextEventCard.innerHTML = `
    <h3>${nextEvent.title}</h3>
    <p><strong>Data:</strong> ${formatDate(nextEvent.date)}</p>
    <p><strong>Oraș:</strong> ${nextEvent.city}</p>
    <p><strong>Locație:</strong> ${nextEvent.location}</p>
    <p>${nextEvent.description}</p>
    <a class="btn" href="event.html?id=${encodeURIComponent(eventId)}">Detalii eveniment</a>
  `;

  startCountdown(nextEvent.date);
}

function startCountdown(targetDate) {
  stopCountdown();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;

    if (distance <= 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      stopCountdown();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
}

function stopCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

function setupFilters() {
  const searchInput = document.getElementById("searchInput");
  const cityFilter = document.getElementById("cityFilter");

  function applyFilters() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedCity = cityFilter.value;

    const filtered = allEvents.filter(event => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchValue) ||
        event.description.toLowerCase().includes(searchValue) ||
        event.location.toLowerCase().includes(searchValue) ||
        event.city.toLowerCase().includes(searchValue);

      const matchesCity =
        selectedCity === "all" || event.city === selectedCity;

      return matchesSearch && matchesCity;
    });

    renderEvents(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  cityFilter.addEventListener("change", applyFilters);
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

function loadNews() {
  const newsContainer = document.getElementById("newsContainer");
  if (!newsContainer) return;

  const fakeNews = [
    {
      title: "Formula 1: duel intens în noul sezon",
      description: "Se anunță un sezon spectaculos cu bătălii strânse în fruntea clasamentului.",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      url: "#"
    },
    {
      title: "Rally european cu trasee spectaculoase",
      description: "Competițiile de rally atrag tot mai mulți fani și echipe puternice.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
      url: "#"
    },
    {
      title: "Industria auto accelerează spre electrificare",
      description: "Constructorii auto investesc masiv în platforme noi și tehnologii smart.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
      url: "#"
    }
  ];

  newsContainer.innerHTML = "";

  fakeNews.forEach(article => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <img src="${article.image}" alt="${article.title}">
      <div class="event-content">
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <a href="${article.url}" class="btn">Citește</a>
      </div>
    `;
    newsContainer.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Mesaj trimis cu succes! Vom reveni cât mai curând.");
      this.reset();
    });
  }

  loadEvents();
});
