async function loadEventDetails() {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("id");
  const container = document.getElementById("eventDetails");

  try {
    const response = await fetch("./events.json");
    const baseEvents = await response.json();
    const savedEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
    const allEvents = [...baseEvents, ...savedEvents];

    const event = allEvents.find(e => e.id === eventId) || allEvents[0];

    if (!event) {
      container.innerHTML = "<p>Evenimentul nu a fost găsit.</p>";
      return;
    }

    container.innerHTML = `
      <div class="event-detail-card">
        <img src="${event.image}" alt="${event.title}" class="event-detail-image">
        <h1>${event.title}</h1>
        <p><strong>Data:</strong> ${formatDate(event.date)}</p>
        <p><strong>Oraș:</strong> ${event.city}</p>
        <p><strong>Locație:</strong> ${event.location}</p>
        <p>${event.description}</p>

        <h3>Hartă locație</h3>
        <div class="map-box">
          <iframe
            src="${event.mapLink}"
            width="100%"
            height="400"
            style="border:0;"
            allowfullscreen=""
            loading="lazy">
          </iframe>
        </div>

        <div style="margin-top:20px;">
          <a class="btn" href="index.html">Înapoi la evenimente</a>
        </div>
      </div>
    `;
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Eroare la încărcarea detaliilor evenimentului.</p>";
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

loadEventDetails();
