async function loadNews() {
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
