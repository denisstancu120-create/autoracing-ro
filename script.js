let allEvents = [];
let countdownInterval = null;

async function loadEvents() {
  try {
    const response = await fetch("./events.json");
    const events = await response.json();

    allEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

    populateCityFilter(allEvents);
    renderEvents(allEvents);
    renderNextEvent(allEvents);
    setupFilters();
  } catch (error) {
    console.error("Eroare la încărcarea evenimentelor:", error);
    document.getElementById("eventsContainer").innerHTML =
      '<p class="no-events">Nu s-au putut încărca evenimentele.</p>';
    document.getElementById("nextEventCard").innerHTML =
      "<p>Nu s-a putut încărca următorul eveniment.</p>";
  }
}

function populateCityFilter(events) {
  const cityFilter = document.getElementById("cityFilter");
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

  events.forEach(event => {
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

  nextEventCard.innerHTML = `
    <h3>${nextEvent.title}</h3>
    <p><strong>Data:</strong> ${formatDate(nextEvent.date)}</p>
    <p><strong>Oraș:</strong> ${nextEvent.city}</p>
    <p><strong>Locație:</strong> ${nextEvent.location}</p>
    <p>${nextEvent.description}</p>
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
  });
}

loadEvents();

document.querySelector(".contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Mesaj trimis cu succes! Vom reveni cât mai curând.");
  this.reset();
});
async function loadNews() {
  const newsContainer = document.getElementById("newsContainer");

  try {
    const response = await fetch(
      "https://newsapi.org/v2/everything?q=formula%201 OR rally OR cars&language=en&sortBy=publishedAt&apiKey=YOUR_API_KEY"
    );

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>Nu sunt știri disponibile.</p>";
      return;
    }

    newsContainer.innerHTML = "";

    data.articles.slice(0, 6).forEach(article => {
      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/400'}">
        <div class="event-content">
          <h3>${article.title}</h3>
          <p>${article.description || ""}</p>
          <a href="${article.url}" target="_blank" class="btn">Citește</a>
        </div>
      `;

      newsContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    newsContainer.innerHTML = "<p>Eroare la încărcarea știrilor.</p>";
  }
}

loadNews();
function loadNews() {
  const newsContainer = document.getElementById("newsContainer");

  const fakeNews = [
    {
      title: "Formula 1: Verstappen domină sezonul",
      description: "Max Verstappen continuă să impresioneze în campionatul F1.",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
      url: "#"
    },
    {
      title: "Rally spectaculos în Finlanda",
      description: "Etapă intensă de rally cu dueluri spectaculoase.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      url: "#"
    }
  ];

  newsContainer.innerHTML = "";

  fakeNews.forEach(article => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <img src="${article.image}">
      <div class="event-content">
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        <a href="${article.url}" class="btn">Citește</a>
      </div>
    `;

    newsContainer.appendChild(card);
  });
}

loadNews();
