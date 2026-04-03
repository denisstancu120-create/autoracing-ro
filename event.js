document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const eventId = params.get("id");
  const container = document.getElementById("eventDetails");

  const events = JSON.parse(localStorage.getItem("customEvents")) || [];

  const event = events.find((e) => e.id === eventId);

  if (!event) {
    container.innerHTML = "<p class='no-events'>Evenimentul nu a fost găsit.</p>";
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

      <h3 style="margin-top:20px; color:#ff2e2e;">Hartă locație</h3>
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
        <a class="btn" href="index.html">Înapoi</a>
      </div>
    </div>
  `;
});

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
