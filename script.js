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
    }
  ];

  const news = [
    {
      title: "Formula 1 sezon nou",
      description: "Se anunță lupte intense",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80"
    },
    {
      title: "Rally european",
      description: "Trasee spectaculoase",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
    }
  ];

  const eventsContainer = document.getElementById("eventsContainer");
  const newsContainer = document.getElementById("newsContainer");

  if (eventsContainer) {
    eventsContainer.innerHTML = "";
    events.forEach(e => {
      eventsContainer.innerHTML += `
        <div class="event-card">
          <img src="${e.image}">
          <div class="event-content">
            <h3>${e.title}</h3>
            <p>${e.description}</p>
          </div>
        </div>
      `;
    });
  }

  if (newsContainer) {
    newsContainer.innerHTML = "";
    news.forEach(n => {
      newsContainer.innerHTML += `
        <div class="event-card">
          <img src="${n.image}">
          <div class="event-content">
            <h3>${n.title}</h3>
            <p>${n.description}</p>
          </div>
        </div>
      `;
    });
  }

});
