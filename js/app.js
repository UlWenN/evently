const events = [
    {
        name: "Вечер живой музыки",
        date: "2026-10-25",
        location: "Концертный зал",
        city: "Уфа",
        category: "Концерт",
        description: "Вечер с живой музыкой и выступлениями местных исполнителей",
        image: "assets/images/concert.jpg",
        imageAlt: "Музыканты выступают на сцене"
    },

    {
        name: "Кинопоказ под открытым небом",
        date: "2026-10-27",
        location: "Городской парк",
        city: "Уфа",
        category: "Кино",
        description: "Вечерний показ фильма на открытом воздухе",
        image: "assets/images/film.jpg",
        imageAlt: "Кинотеатр в парке"
    },

    {
        name: "Выставка современного искусства",
        date: "2026-10-30",
        location: "Галерея «Арт-пространство»",
        city: "Москва",
        category: "Выставка",
        description: "Работы молодых художников и авторов",
        image: "assets/images/art.jpg",
        imageAlt: "Выставка"
    },

    {
        name: "Лекция о космосе",
        date: "2026-11-05",
        location: "Научный центр",
        city: "Казань",
        category: "Лекция",
        description: "Популярная лекция о современных исследованиях космоса",
        image: "assets/images/cosmos.jpg",
        imageAlt: "Объявление о лекции"
    },

    {
        name: "Городской фестиваль",
        date: "2026-11-10",
        location: "Центральная площадь",
        city: "Москва",
        category: "Фестиваль",
        description: "Музыка, еда, мастер-классы и развлечения",
        image: "assets/images/fest.jpg",
        imageAlt: "Фестиваль"
    },

    {
        name: "Театральная постановка",
        date: "2026-11-07",
        location: "Драматический театр",
        city: "Уфа",
        category: "Театр",
        description: "Вечерняя постановка по мотивам современной пьесы",
        image: "assets/images/theater.jpg",
        imageAlt: "Театр"
    },
];


const formSearch = document.querySelector(".search form");

formSearch.addEventListener("submit", function(event) {
    event.preventDefault();
});



const locationInput = document.querySelector("#location");
const categorySelect = document.querySelector("#type");
const dateInput = document.querySelector("#date");

formSearch.addEventListener("submit", function(event) {
    event.preventDefault();
    const eventsFiltered = events.filter(function(event) {
        
    return (locationInput.value === "" || event.location.toLowerCase().includes( locationInput.value.toLowerCase()) || event.city.toLowerCase().includes( locationInput.value.toLowerCase())) && (categorySelect.value === "all" || event.category.toLowerCase().includes(categorySelect.value.toLowerCase())) && ( dateInput.value === "" || event.date.includes(dateInput.value));
    });
    renderEvents(eventsFiltered);
});






function renderEvents(events) {
    const container = document.querySelector("#events div");
    container.textContent = "";
    events.forEach(function(event) {
        const card = document.createElement("article");
        container.append(card);
        const image = document.createElement("img");
        image.src = event.image;
        image.alt = event.imageAlt;
        card.append(image);
        const name = document.createElement("h3");
        name.textContent = event.name;
        card.append(name);
        const date = document.createElement("p");
        date.textContent = "📅" + event.date;
        card.append(date);
        const location = document.createElement("p");
        location.textContent = "📍" + event.location + ", " + event.city;
        card.append(location);
        const category = document.createElement("p");
        category.textContent = "🎭" + event.category;
        card.append(category);
        const description = document.createElement("p");
        description.textContent = event.description;
        card.append(description);
    });

    
};

renderEvents(events);