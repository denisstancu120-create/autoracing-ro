const adminForm = document.getElementById("adminForm");
const adminEventsList = document.getElementById("adminEventsList");

function getSavedEvents() {
  return JSON.parse(localStorage.getItem("customEvents")) || [];
}

function saveEvents(events) {
  localStorage.setItem("customEvents", JSON.stringify(events));
}

function renderAdminEvents() {
  const events = getSavedEvents();
  adminEventsList.innerHTML = "";

  if (!events.length) {
    adminEventsList.innerHTML = '<p class="no-events">Nu ai adăugat încă evenimente din admin.</p>';
    return;
  }

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <div class="event-content">
        <h3>${event.title}</h3>
        <p><strong>Data:</strong> ${new Date(event.date).toLocaleString("ro-RO")}</p>
        <p><strong>Oraș:</strong> ${event.city}</p>
        <p><strong>Locație:</strong> ${event.location}</p>
        <button class="btn delete-btn" onclick="deleteEvent('${event.id}')">Șterge</button>
      </div>
    `;
    adminEventsList.appendChild(card);
  });
}

function deleteEvent(id) {
  const events = getSavedEvents().filter(event => event.id !== id);
  saveEvents(events);
  renderAdminEvents();
}

adminForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const newEvent = {
    id: "event-" + Date.now(),
    title: document.getElementById("title").value,
    date: document.getElementById("date").value,
    city: document.getElementById("city").value,
    location: document.getElementById("location").value,
    mapLink: document.getElementById("mapLink").value,
    image: document.getElementById("image").value,
    description: document.getElementById("description").value
  };

  const events = getSavedEvents();
  events.push(newEvent);
  saveEvents(events);

  alert("Eveniment salvat cu succes!");
  adminForm.reset();
  renderAdminEvents();
});

renderAdminEvents();
