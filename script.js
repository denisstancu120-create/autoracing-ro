let allEvents = [];

async function loadEvents() {
  try {
    const response = await fetch("./events.json");
    const events = await response.json();

    allEvents = events;

    renderEvents(events);
  } catch (error) {
    console.error("Eroare:", error);
  }
}

function renderEvents(events) {
  const container = document.getElementById("eventsContainer");
  if (!container) return;

  container.innerHTML = "";

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    card.innerHTML = `
      <img src="${event.image}">
      <div class="event-content">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
});
