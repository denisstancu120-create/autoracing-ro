document.addEventListener("DOMContentLoaded", () => {
  const adminForm = document.getElementById("adminForm");
  const adminEventsList = document.getElementById("adminEventsList");

  function getEvents() {
    return JSON.parse(localStorage.getItem("customEvents")) || [];
  }

  function saveEvents(events) {
    localStorage.setItem("customEvents", JSON.stringify(events));
  }

  function renderAdminEvents() {
    const events = getEvents();
    adminEventsList.innerHTML = "";

    if (!events.length) {
      adminEventsList.innerHTML = '<p class="no-events">Nu există evenimente salvate.</p>';
      return;
    }

    events.forEach((event) => {
      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <div class="event-content">
          <h3>${event.title}</h3>
          <p><strong>Data:</strong> ${new Date(event.date).toLocaleString("ro-RO")}</p>
          <p><strong>Oraș:</strong> ${event.city}</p>
          <p><strong>Locație:</strong> ${event.location}</p>
          <button class="btn delete-btn" data-id="${event.id}">Șterge</button>
        </div>
      `;

      adminEventsList.appendChild(card);
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const updatedEvents = getEvents().filter((event) => event.id !== id);
        saveEvents(updatedEvents);
        renderAdminEvents();
      });
    });
  }

  adminForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newEvent = {
      id: "event-" + Date.now(),
      title: document.getElementById("title").value,
      date: document.getElementById("date").value,
      city: document.getElementById("city").value,
      location: document.getElementById("location").value,
      image: document.getElementById("image").value,
      mapLink: document.getElementById("mapLink").value,
      description: document.getElementById("description").value
    };

    const events = getEvents();
    events.push(newEvent);
    saveEvents(events);

    alert("Eveniment salvat cu succes!");
    adminForm.reset();
    renderAdminEvents();
  });

  renderAdminEvents();
});
