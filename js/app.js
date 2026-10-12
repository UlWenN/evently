const events = [
    {
        name: "Вечер живой музыки",
        date: "25 сентября",
        location: "Концертный зал",
        city: "Уфа",
        category: "Концерт",
        description: "Вечер с живой музыкой и выступлениями местных исполнителей",
        image: "assets/images/concert.jpg",
        imageAlt: "Музыканты выступают на сцене"
    },

    {
        name: "Кинопоказ под открытым небом",
        date: "27 сентября",
        location: "Городской парк",
        city: "Уфа",
        category: "Кино",
        description: "Вечерний показ фильма на открытом воздухе",
        image: "assets/images/film.jpg",
        imageAlt: "Кинотеатр в парке"
    },

    {
        name: "Выставка современного искусства",
        date: "29 сентября",
        location: "Галерея «Арт-пространство»",
        city: "Москва",
        category: "Выставка",
        description: "Работы молодых художников и авторов",
        image: "assets/images/art.jpg",
        imageAlt: "Выставка"
    },

    {
        name: "Лекция о космосе",
        date: "30 сентября",
        location: "Научный центр",
        city: "Казань",
        category: "Лекция",
        description: "Популярная лекция о современных исследованиях космоса",
        image: "assets/images/cosmos.jpg",
        imageAlt: "Объявление о лекции"
    },

    {
        name: "Городской фестиваль",
        date: "4 октября",
        location: "Центральная площадь",
        city: "Москва",
        category: "Фестиваль",
        description: "Музыка, еда, мастер-классы и развлечения",
        image: "assets/images/fest.jpg",
        imageAlt: "Фестиваль"
    },

    {
        name: "Театральная постановка",
        date: "7 октября",
        location: "Драматический театр",
        city: "Уфа",
        category: "Театр",
        description: "Вечерняя постановка по мотивам современной пьесы",
        image: "assets/images/theater.jpg",
        imageAlt: "Театр"
    },
];


function renderEvents() {
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
        date.textContent = event.date;
        card.append(date);
        const location = document.createElement("p");
        location.textContent = event.location;
        card.append(location);
        const city = document.createElement("p");
        city.textContent = event.city;
        card.append(city);
        const category = document.createElement("p");
        category.textContent = event.category;
        card.append(category);
        const description = document.createElement("p");
        description.textContent = event.description;
        card.append(description);
    });
};

renderEvents(events);