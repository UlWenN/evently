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


const state = {
    items: events,
    searchQuery: "",
    selectedEvent: null,
    locationQuery: "",
    selectedDate: "",
    selectedCategory: "all",
    sortBy: "default",
    adminState: false,
    pendingEvents: []
};


const pendingEvents = localStorage.getItem("pendingEvents");

if (pendingEvents === null) {
    localStorage.setItem("pendingEvents", JSON.stringify(state.pendingEvents));
} else {
    state.pendingEvents = JSON.parse(pendingEvents);
}

const savedEvents = localStorage.getItem("events");

if (savedEvents === null) {
    localStorage.setItem("events", JSON.stringify(events));
} else {
    state.items = JSON.parse(savedEvents);
}



const formSearch = document.querySelector(".search form");
const locationInput = document.querySelector("#location");
const categorySelect = document.querySelector("#type");
const dateInput = document.querySelector("#date");
const sortSelect = document.querySelector("#sort");
const sortButton = document.querySelector(".sort-button");

const iconSearch = document.querySelector(".search-icon");
const modalSearch = document.querySelector(".search-modal");
const closeButtonSearch = document.querySelector(".search-close");
const overlaySearch = document.querySelector(".search-overlay");
const searchInput = document.querySelector("#search-input");
const result = document.querySelector(".form-result");

const modalEvent = document.querySelector(".modal-event");
const buttonSuggest = document.querySelector(".saggest-event");
const closeButtonSuggest = document.querySelector(".modal-close");
const overlayEvent = document.querySelector(".overlay-event");
const buttonCancelSuggest = document.querySelector(".cancel-event");

const eventName = document.querySelector("#event-name");
const nameError = document.querySelector(".name-error");
const eventForm = document.querySelector(".modal-event form");
const eventDate = document.querySelector("#event-date");
const dateError = document.querySelector(".date-error");
const eventLocation = document.querySelector("#event-location");
const locationError = document.querySelector(".location-error");
const eventCity = document.querySelector("#event-city");
const cityError = document.querySelector(".city-error");
const eventCategory = document.querySelector("#event-category");
const categoryError = document.querySelector(".category-error");
const eventDescription = document.querySelector("#event-description");
const descriptionError = document.querySelector(".description-error");

const buttonAdmin = document.querySelector("#admin-toggle");
const eventsList = document.querySelector(".events-list");
const moderationPanel = document.querySelector("#moderation-panel");
const pendingEventsList = document.querySelector(".pending-events-list");

buttonAdmin.addEventListener("click", function() {
    state.adminState = !state.adminState;
    render();
});

const fields = [
    {
        input: eventName,
        error: nameError,
        requiredMessage: "Введите название мероприятия",
        tooShortMessage: "Название должно содержать минимум 3 символа"
    },
    {
        input: eventDate,
        error: dateError,
        requiredMessage: "Укажите дату"
    },
    {
        input: eventLocation,
        error: locationError,
        requiredMessage: "Введите место проведения"
    },
    {
        input: eventCity,
        error: cityError,
        requiredMessage: "Введите город"
    },
        {
        input: eventCategory,
        error: categoryError,
        requiredMessage: "Выберете категорию",
    },
    {
        input: eventDescription,
        error: descriptionError,
        requiredMessage: "Введите описание",
        tooShortMessage: "Описание должно содержать минимум 10 символов",
        tooLongMessage: "Описание должно содержать максимум 500 символов"

    }

];


function syncFiltersFromForm() {
    state.locationQuery = locationInput.value.trim().toLowerCase();
    state.selectedCategory = categorySelect.value;
    state.selectedDate = dateInput.value;
    state.sortBy = sortSelect.value;
}

iconSearch.addEventListener("click", function() {
    modalSearch.style.display = "block";
})

closeButtonSearch.addEventListener("click", function() {
    modalSearch.style.display = "none";
})

overlaySearch.addEventListener("click", function() {
    modalSearch.style.display = "none";
})

searchInput.addEventListener("input", function() {
    state.searchQuery = searchInput.value.trim().toLowerCase();
    render();
});

formSearch.addEventListener("submit", function(event) {
    event.preventDefault();
    state.selectedEvent = null;
    

    syncFiltersFromForm();
    render();
});

formSearch.addEventListener("reset", function() {
    locationInput.value = "";
    categorySelect.value = "all";
    dateInput.value = "";
    sortSelect.value = "default";

    state.locationQuery = "";
    state.selectedCategory = "all";
    state.selectedDate = "";
    state.sortBy = "default";
    state.selectedEvent = null;

    render();
});

sortSelect.addEventListener("change", function() {
    state.sortBy = sortSelect.value;
    render();

    sortSelect.style.display = "none";
});

sortButton.addEventListener("click", function() {
     if (sortSelect.style.display !== "block") {
        sortSelect.style.display = "block";
     } else {
        sortSelect.style.display = "none";
     }
})

buttonSuggest.addEventListener("click", function() {
    modalEvent.style.display = "block";
})

overlayEvent.addEventListener("click", function() {
    modalEvent.style.display = "none";
})

closeButtonSuggest.addEventListener("click", function() {
    modalEvent.style.display = "none";
})

buttonCancelSuggest.addEventListener("click", function() {
    modalEvent.style.display = "none";
})

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        modalEvent.style.display = "none";
    }
})

eventName.addEventListener("input", function() {

    validateField(fields[0]);
})

eventDate.addEventListener("change", function() {

    validateField(fields[1]);
})

eventLocation.addEventListener("input", function() {

    validateField(fields[2]);
})

eventCity.addEventListener("input", function() {

    validateField(fields[3]);
})

eventCategory.addEventListener("change", function() {

    validateField(fields[4]);
})

eventDescription.addEventListener("input", function() {

    validateField(fields[5]);
})



eventForm.addEventListener("submit", function(event) {
    event.preventDefault();

    fields.forEach(function(field) {
        validateField(field);
    });

    const hasInvalidField = fields.some(function(field) {
        return field.input.validity.valid === false;
    });

    if (hasInvalidField) {
        return;
    }

    const pendingCard = {
        name: eventName.value,
        date: eventDate.value,
        location: eventLocation.value,
        city: eventCity.value,
        category: eventCategory.value,
        description: eventDescription.value
    };

    state.pendingEvents.push(pendingCard);

    localStorage.setItem(
        "pendingEvents",
        JSON.stringify(state.pendingEvents)
    );

    eventForm.reset();

    fields.forEach(function(field) {
        field.error.textContent = "";
    });

    modalEvent.style.display = "none";

    render()

    alert("Предложение отправлено на модерацию");
});



function renderSearchResults() {
    result.textContent = "";

    if (state.searchQuery === "") {
        return;
    }

    const filteredEvents = state.items.filter(function(event) {
        return (
            event.name.toLowerCase().includes(state.searchQuery) ||
            event.city.toLowerCase().includes(state.searchQuery) ||
            event.location.toLowerCase().includes(state.searchQuery) ||
            event.category.toLowerCase().includes(state.searchQuery) ||
            event.description.toLowerCase().includes(state.searchQuery)
        );
    });

    if (filteredEvents.length === 0) {
        const noResult = document.createElement("p");
        noResult.textContent = "Ничего не найдено";
        result.append(noResult);
        return;
    }

    filteredEvents.forEach(function(event) {
        const item = document.createElement("div");
        item.classList.add("search-result-item");

        const eventButton = document.createElement("button");
        eventButton.type = "button";
        eventButton.classList.add("search-result-event");
        eventButton.dataset.eventIndex = state.items.indexOf(event);
        eventButton.textContent = event.name;

        const categoryButton = document.createElement("button");
        categoryButton.type = "button";
        categoryButton.classList.add("search-result-category");
        categoryButton.dataset.category = event.category;
        categoryButton.textContent = event.category;

        item.append(eventButton, categoryButton);
        result.append(item);
    });
}


result.addEventListener("click", function(event) {
    const eventButton = event.target.closest(".search-result-event");
    const categoryButton = event.target.closest(".search-result-category");

    if (eventButton === null && categoryButton === null) {
        return;
    }

    if (eventButton !== null) {
        const index = Number(eventButton.dataset.eventIndex);

        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= state.items.length
        ) {
            return;
        }

        state.selectedEvent = state.items[index];

        locationInput.value = "";
        categorySelect.value = "all";
        dateInput.value = "";
        sortSelect.value = "default";

        state.locationQuery = "";
        state.selectedCategory = "all";
        state.selectedDate = "";
        state.sortBy = "default";
    } else {
        state.selectedEvent = null;

        locationInput.value = "";
        categorySelect.value = categoryButton.dataset.category;
        dateInput.value = "";
        sortSelect.value = "default";

        state.locationQuery = "";
        state.selectedCategory = categoryButton.dataset.category;
        state.selectedDate = "";
        state.sortBy = "default";
    }

    modalSearch.style.display = "none";
    render();
});


function getFilteredEvents() {
    let eventsFiltered = state.items.filter(function(event) {
        const matchesSelectedEvent =
            state.selectedEvent === null ||
            event === state.selectedEvent;

        const matchesLocation =
            state.locationQuery === "" ||
            event.location.toLowerCase().includes(state.locationQuery) ||
            event.city.toLowerCase().includes(state.locationQuery);

        const matchesCategory =
            state.selectedCategory === "all" ||
            event.category.toLowerCase() === state.selectedCategory.toLowerCase();

        const matchesDate =
            state.selectedDate === "" ||
            event.date === state.selectedDate;

        return matchesSelectedEvent &&
            matchesLocation &&
            matchesCategory &&
            matchesDate;
    });

    if (state.sortBy === "data-asc") {
        eventsFiltered = [...eventsFiltered].sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
        });
    } else if (state.sortBy === "data-desc") {
        eventsFiltered = [...eventsFiltered].sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }

    return eventsFiltered;
}


eventsList.addEventListener("click", function(e) {
    const deleteButton = e.target.closest(".delete-event");

    if (deleteButton === null) {
        return;
    }

    if (state.adminState !== true) {
        return;
    }

    const card = deleteButton.closest("article");

    if (card === null) {
        return;
    }

    const index = Number(card.dataset.eventIndex);

    if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= state.items.length
    ) {
        return;
    }

    const removedEvent = state.items[index];

    state.items.splice(index, 1);

    if (state.selectedEvent === removedEvent) {
        state.selectedEvent = null;
    }

    localStorage.setItem("events", JSON.stringify(state.items));

    render();
});


function renderEvents(events) {
    const container = eventsList;
    container.textContent = "";

    if (events.length === 0) {
        const noEvents = document.createElement("p");
        noEvents.textContent = "Мероприятия не найдены";
        container.append(noEvents);
        return;
    };
    
    events.forEach(function(event) {
        const card = document.createElement("article");
        card.dataset.eventIndex = state.items.indexOf(event);
        container.append(card);
        if (event.image) {
            const image = document.createElement("img");
            image.src = event.image;
            image.alt = event.imageAlt || event.name;
            card.append(image);
        }
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

        if (state.adminState === true) {
            const deleteButton = document.createElement("button");

            deleteButton.type = "button";
            deleteButton.classList.add("delete-event");
            deleteButton.textContent = "Удалить";

            card.append(deleteButton);
        }

    });

};

function renderPendingEvents() {
    const container = pendingEventsList;
    container.textContent = "";

    if (state.pendingEvents.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Нет предложений на модерацию";
        container.append(emptyMessage);
        return;
    }

    state.pendingEvents.forEach(function(event, index) {
        const card = document.createElement("article");
        card.dataset.pendingIndex = index;

        const name = document.createElement("h3");
        name.textContent = event.name;
        card.append(name);

        const date = document.createElement("p");
        date.textContent = "📅 " + event.date;
        card.append(date);

        const location = document.createElement("p");
        location.textContent = "📍 " + event.location + ", " + event.city;
        card.append(location);

        const category = document.createElement("p");
        category.textContent = "🎭 " + event.category;
        card.append(category);

        const description = document.createElement("p");
        description.textContent = event.description;
        card.append(description);

        const actions = document.createElement("div");
        actions.classList.add("pending-event-actions");

        const approveButton = document.createElement("button");
        approveButton.type = "button";
        approveButton.classList.add("approve-event");
        approveButton.textContent = "Одобрить";

        const rejectButton = document.createElement("button");
        rejectButton.type = "button";
        rejectButton.classList.add("reject-event");
        rejectButton.textContent = "Отклонить";

        actions.append(approveButton, rejectButton);
        card.append(actions);

        container.append(card);
    });
}

pendingEventsList.addEventListener("click", function(event) {
    if (state.adminState !== true) {
        return;
    }

    const approveButton = event.target.closest(".approve-event");
    const rejectButton = event.target.closest(".reject-event");

    if (approveButton === null && rejectButton === null) {
        return;
    }

    const card = event.target.closest("article");

    if (card === null) {
        return;
    }

    const index = Number(card.dataset.pendingIndex);

    if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= state.pendingEvents.length
    ) {
        return;
    }

    if (approveButton !== null) {
        const approvedEvent = state.pendingEvents[index];

        state.items.push(approvedEvent);
        state.pendingEvents.splice(index, 1);

        localStorage.setItem("events", JSON.stringify(state.items));
        localStorage.setItem("pendingEvents", JSON.stringify(state.pendingEvents));

        render();
        return;
    }

    if (rejectButton !== null) {
        state.pendingEvents.splice(index, 1);

        localStorage.setItem("pendingEvents", JSON.stringify(state.pendingEvents));

        render();
    }
});

function validateField(field) {

    if (field.input.validity.valueMissing === true) {
        field.error.textContent = field.requiredMessage;
    } else if (field.input.validity.tooShort === true) {
        field.error.textContent = field.tooShortMessage;
    } else if (field.input.validity.tooLong === true) {
        field.error.textContent = field.tooLongMessage;
    } else field.error.textContent = "";

}

function render() {
    buttonAdmin.textContent = state.adminState ? "А:вкл" : "А:выкл";

    moderationPanel.style.display =
        state.adminState ? "block" : "none";

    
    renderEvents(getFilteredEvents());
    renderSearchResults();
    renderPendingEvents();
}

render();