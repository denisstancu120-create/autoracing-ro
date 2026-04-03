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

  // 🔥 salvare inițială
  if (!localStorage.getItem("defaultEventsLoaded")) {
    localStorage.setItem("customEvents", JSON.stringify(defaultEvents));
    localStorage.setItem("defaultEventsLoaded", "true");
  }

  const savedEvents = JSON.parse(localStorage.getItem("customEvents")) || [];

  renderNextEvent(savedEvents);
  renderEvents(savedEvents);
  loadRealNews();

});
