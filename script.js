document.addEventListener("DOMContentLoaded", () => {
  const defaultEvents = [
    {
      id: "event-1",
      title: "Drift Night Brașov",
      date: "2026-05-20T18:00",
      city: "Brașov",
      location: "Circuitul Prejmer",
      description: "Seară de drift cu atmosferă racing autentică.",
      image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=900&q=80",
      mapLink: "https://www.google.com/maps?q=Prejmer,Brasov&output=embed"
    },
    {
      id: "event-2",
      title: "Drag Race București",
      date: "2026-06-10T14:00",
      city: "București",
      location: "Arena Motor Park",
      description: "Eveniment de drag racing cu mașini modificate.",
      image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=900&q=80",
      mapLink: "https://www.google.com/maps?q=Bucuresti&output=embed"
    }
  ];

  const news = [
    {
      title: "Formula 1 sezon nou",
      description: "Se anunță lupte intense în noul sezon.",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      url: "#"
    },
    {
      title: "Rally european",
      description: "Trasee spectaculoase și dueluri tari.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
      url: "#"
    }
  ];

  if (!localStorage.getItem("defaultEventsLoaded")) {
    localStorage.setItem("customEvents", JSON.stringify(defaultEvents));
    localStorage.setItem("defaultEventsLoaded", "true");
  }

  const savedEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
 async function loadRealNews() {
  const newsContainer = document.getElementById("newsContainer");
  if (!newsContainer) return;

  try {
    const response = await fetch(
      "https://api.allorigins.win/raw?url=" +
      encodeURIComponent("https://www.motorsport.com/rss/f1/news/")
    );

    const text = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    const items = xml.querySelectorAll("item");

    newsContainer.innerHTML = "";

    items.forEach((item, index) => {
      if (index >= 6) return;

      const title = item.querySelector("title")?.textContent;
      const link = item.querySelector("link")?.textContent;

      const card = document.createElement("div");
      card.className = "event-card";

      card.innerHTML = `
        <img src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c">
        <div class="event-content">
          <h3>${title}</h3>
          <a href="${link}" target="_blank" class="btn">Citește</a>
        </div>
      `;

      newsContainer.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    newsContainer.innerHTML = "<p>Nu s-au putut încărca știrile.</p>";
  }
}
