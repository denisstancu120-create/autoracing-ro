async function //loadNews();
  const newsContainer = document.getElementById("newsContainer");

  // dacă nu există secțiunea, ieșim
  if (!newsContainer) return;

  try {
    const response = await fetch(
      "https://api.allorigins.win/raw?url=" +
      encodeURIComponent(
        "https://newsapi.org/v2/everything?q=formula%201 OR rally OR cars&language=en&sortBy=publishedAt&apiKey=CHEIA_TA"
      )
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
function loadNews() {
  const newsContainer = document.getElementById("newsContainer");
  if (!newsContainer) return;

  const news = [
    {
      title: "Formula 1: sezon spectaculos în 2026",
      description: "Lupta pentru titlu devine din ce în ce mai intensă.",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
      url: "#"
    },
    {
      title: "Rally: curse spectaculoase în Europa",
      description: "Campionatul de rally aduce trasee noi și dueluri intense.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
      url: "#"
    },
    {
      title: "Industria auto accelerează electrificarea",
      description: "Producătorii investesc masiv în mașini electrice.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
      url: "#"
    }
  ];

  newsContainer.innerHTML = "";

  news.forEach(article => {
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
