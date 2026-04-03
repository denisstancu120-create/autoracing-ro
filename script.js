alert("script nou incarcat");
document.addEventListener("DOMContentLoaded", () => {

  const events = [
    {
      title: "Drift Night Brașov",
      description: "Seară de drift cu atmosferă racing autentică.",
      image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "Drag Race București",
      description: "Eveniment de drag racing cu mașini modificate.",
      image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "Auto Show Cluj",
      description: "Expoziție auto cu modele sport și tuning.",
      image: "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=900&q=80"
    }
  ];

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

});
