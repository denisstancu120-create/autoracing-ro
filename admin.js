document.addEventListener("DOMContentLoaded", () => {
  const adminForm = document.getElementById("adminForm");
  const adminEventsList = document.getElementById("adminEventsList");
  const saveBtn = document.getElementById("saveBtn");

  function getEvents() {
    return JSON.parse(localStorage.getItem("customEvents")) || [];
  }

  function saveEvents(events) {
    localStorage.setItem("customEvents", JSON.stringify(events));
  }

  function clearForm() {
    document.getElementById("editId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("city").value = "";
    document.getElementById("location").value = "";
    document.getElementById("image").value = "";
    document.getElementById("mapLink").value = "";
    document.getElementById("description").value = "";
    saveBtn.textContent = "Salvează eveniment";
  }

  function fillForm(event) {
    document.getElementById("editId").value = event.id;
    document.getElementById("title").value = event.title;
    document.getElementById("date").value = event.date;
    document.getElementById("city").value = event.city;
    document.getElementById("location").value = event.location;
    document.getElementById("image").value = event.image;
    document.getElementById("mapLink").value = event.mapLink;
    document.getElementById("description").value = event.description;
    saveBtn.textContent = "Actualizează evenimentul";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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
          <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
            <button class="btn edit-btn" data-id="${event.id}">Editează</button>
            <button class="btn delete-btn" data-id="${event.id}">Șterge</button>
          </div>
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

        if (document.getElementById("editId").value === id) {
          clearForm();
        }
      });
    });

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const event = getEvents().find((e) => e.id === id);
        if (event) {
          fillForm(event);
        }
      });
    });
  }

  adminForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editId = document.getElementById("editId").value;

    const eventData = {
      id: editId || "event-" + Date.now(),
      title: document.getElementById("title").value,
      date: document.getElementById("date").value,
      city: document.getElementById("city").value,
      location: document.getElementById("location").value,
      image: document.getElementById("image").value,
      mapLink: document.getElementById("mapLink").value,
      description: document.getElementById("description").value
    };

    const events = getEvents();

    if (editId) {
      const updatedEvents = events.map((event) =>
        event.id === editId ? eventData : event
      );
      saveEvents(updatedEvents);
      alert("Eveniment actualizat cu succes!");
    } else {
      events.push(eventData);
      saveEvents(events);
      alert("Eveniment salvat cu succes!");
    }

    clearForm();
    renderAdminEvents();
  });

  renderAdminEvents();
});
