let lastScroll = 0;
const header = document.querySelector('.header');
const scrollThreshold = 100; // Порог скролла для появления тени

// Константы для Telegram (можно вынести в начало файла)
const BOT_TOKEN = "711876660:AAF2Tg6IsNSuS4dtRqTKHhUWbCUgUYQc-ks";
const CHAT_ID = "284614484";

// Константы для расчета на основе реальных цен в Испании
const PRICES = {
    basic: 850,     // Базовая комплектация (~850-900€/м²)
    standard: 1050, // Стандартная комплектация (~1000-1100€/м²)
    premium: 1250   // Премиум комплектация (~1200-1300€/м²)
};

const FLOOR_MULTIPLIERS = {
    1: 1,      // Одноэтажный - базовая цена
    2: 1.15,   // Двухэтажный - +15% (сложность конструкции)
    3: 1.25    // Трехэтажный - +25% (доп. укрепления)
};

const GARAGE_PRICES = {
    0: 0,      // Без гаража
    1: 12000,  // 1 место (~25-30м² × ~400€/м²)
    2: 20000   // 2 места (~40-45м² × ~400€/м²)
};

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Добавляем тень при скролле
    if (currentScroll > scrollThreshold) {
        header.classList.add('header--scrolled');
    } else {
        header.classList.remove('header--scrolled');
    }

    // Скрываем/показываем хедер при скролле вверх/вниз
    if (currentScroll > lastScroll && currentScroll > 80) {
        header.classList.add('header--hidden');
    } else {
        header.classList.remove('header--hidden');
    }

    lastScroll = currentScroll;
});

// Обработка переключения языков
document.addEventListener('DOMContentLoaded', () => {
    const langSwitchers = document.querySelectorAll('.lang-switch');

    // Убеждаемся, что только один язык активен изначально
    const setInitialActive = () => {
        const activeButtons = document.querySelectorAll('.lang-switch.active');
        if (activeButtons.length > 1) {
            activeButtons.forEach((btn, index) => {
                if (index > 0) btn.classList.remove('active');
            });
        }
    };

    setInitialActive();

    langSwitchers.forEach(switcher => {
        switcher.addEventListener('click', function () {
            // Убираем активный класс у всех кнопок
            langSwitchers.forEach(btn => {
                btn.classList.remove('active');
            });

            // Добавляем активный класс только нажатой кнопке
            this.classList.add('active');

            // Здесь можно добавить логику смены языка
            const lang = this.textContent.toLowerCase();
            console.log('Выбран язык:', lang);
        });
    });
});

// Обновляем обработчик загрузки изображений
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.project-card__image img');
    let loadedImages = 0;

    function handleImageLoad(img) {
        img.classList.add('loaded');
        loadedImages++;
        if (loadedImages === images.length) {
            document.querySelector('.projects__grid').classList.add('all-loaded');
        }
    }

    images.forEach(img => {
        // Проверяем, загружено ли уже изображение
        if (img.complete) {
            handleImageLoad(img);
        } else {
            img.addEventListener('load', () => handleImageLoad(img));
        }

        img.addEventListener('error', () => {
            // В случае ошибки загрузки
            console.log('Error loading image:', img.src);
            handleImageLoad(img);
        });
    });
});

// Добавляем IntersectionObserver для отложенной загрузки
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Фильтрация проектов
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projects = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projects.forEach(project => {
                // Сначала убираем все анимации
                project.style.animation = 'none';
                project.offsetHeight; // Форсируем reflow

                if (filterValue === 'all') {
                    project.style.display = 'block';
                    // Возвращаем анимацию
                    project.style.animation = 'fadeInUp 0.6s ease forwards';
                } else if (project.getAttribute('data-category') === filterValue) {
                    project.style.display = 'block';
                    // Возвращаем анимацию
                    project.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    project.style.display = 'none';
                }
            });

            // Добавляем задержку для каждого видимого проекта
            const visibleProjects = document.querySelectorAll('.project-card[style="display: block"]');
            visibleProjects.forEach((project, index) => {
                project.style.animationDelay = `${index * 0.1}s`;
            });
        });
    });

    // Активируем фильтр "Все" по умолчанию
    document.querySelector('.project-filter[data-filter="all"]').click();
});

// Данные проектов
const projectsData = {
    "projects": [
        {
            "id": "1",
            "title": "Casa Moderna Valencia",
            "category": "modern",
            "specs": {
                "area": "200",
                "floors": "2",
                "rooms": "4",
                "bathrooms": "3",
                "garage": "2"
            },
            "description": "Moderna casa con diseño vanguardista que combina funcionalidad y estética. Amplios espacios abiertos con abundante luz natural y tecnología de última generación.",
            "features": [
                "Paneles solares",
                "Domótica",
                "Piscina",
                "Jardín inteligente",
                "Ventanas panorámicas"
            ],
            "images": {
                "main": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                ]
            },
            "price": "350000"
        },
        {
            "id": "2",
            "title": "Casa Minimalista Barcelona",
            "category": "minimal",
            "specs": {
                "area": "180",
                "floors": "1",
                "rooms": "3",
                "bathrooms": "2",
                "garage": "1"
            },
            "description": "Diseño minimalista que maximiza el espacio y la luz. Líneas limpias y materiales nobles crean un ambiente de serenidad y elegancia.",
            "features": [
                "Diseño minimalista",
                "Materiales sostenibles",
                "Espacios diáfanos",
                "Iluminación LED",
                "Terraza zen"
            ],
            "images": {
                "main": "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
                    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                ]
            },
            "price": "280000"
        },
        {
            "id": "3",
            "title": "Casa Eco Madrid",
            "category": "eco",
            "specs": {
                "area": "150",
                "floors": "2",
                "rooms": "3",
                "bathrooms": "2",
                "garage": "1"
            },
            "description": "Vivienda sostenible con certificación energética A+. Diseñada para minimizar el impacto ambiental sin comprometer el confort.",
            "features": [
                "Energía 100% renovable",
                "Recuperación de agua",
                "Materiales ecológicos",
                "Aislamiento térmico",
                "Huerto urbano"
            ],
            "images": {
                "main": "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                ]
            },
            "price": "295000"
        },
        {
            "id": "4",
            "title": "Casa Moderna Sevilla",
            "category": "modern",
            "specs": {
                "area": "220",
                "floors": "2",
                "rooms": "4",
                "bathrooms": "3",
                "garage": "2"
            },
            "description": "Residencia de lujo con diseño contemporáneo. Espacios versátiles y acabados premium para un estilo de vida exclusivo.",
            "features": [
                "Cine en casa",
                "Gimnasio privado",
                "Domótica avanzada",
                "Piscina infinity",
                "Garaje inteligente"
            ],
            "images": {
                "main": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
                    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                ]
            },
            "price": "420000"
        },
        {
            "id": "5",
            "title": "Casa Minimalista Málaga",
            "category": "minimal",
            "specs": {
                "area": "160",
                "floors": "1",
                "rooms": "3",
                "bathrooms": "2",
                "garage": "1"
            },
            "description": "Equilibrio perfecto entre simplicidad y sofisticación. Espacios minimalistas que invitan a la tranquilidad y el bienestar.",
            "features": [
                "Ventanales minimalistas",
                "Domótica integrada",
                "Jardín zen",
                "Cocina de diseño",
                "Sistema de sonido"
            ],
            "images": {
                "main": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
                    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
                ]
            },
            "price": "310000"
        },
        {
            "id": "6",
            "title": "Casa Eco Valencia",
            "category": "eco",
            "specs": {
                "area": "170",
                "floors": "1",
                "rooms": "3",
                "bathrooms": "2",
                "garage": "1"
            },
            "description": "Vivienda autosuficiente con diseño bioclimático. Perfecta integración con el entorno natural y máxima eficiencia energética.",
            "features": [
                "Geotermia",
                "Paneles fotovoltaicos",
                "Jardín sostenible",
                "Materiales reciclados",
                "Ventilación cruzada"
            ],
            "images": {
                "main": "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                "gallery": [
                    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                ]
            },
            "price": "330000"
        }
    ]
};

// Изменяем функцию загрузки
function loadProjects() {
    try {
        renderProjects(projectsData.projects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Оптимизируем функцию рендеринга
function renderProjects(projects) {
    const grid = document.querySelector('.projects__grid');
    // Очищаем grid перед добавлением новых карточек
    grid.innerHTML = '';

    const fragment = document.createDocumentFragment();

    projects.forEach(project => {
        const card = createProjectCard(project);
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-id', project.id);

    card.innerHTML = `
        <div class="project-card__image">
            <img src="${project.images.main}" alt="${project.title}" loading="lazy">
            <div class="project-card__overlay">
                <span class="project-card__tag">${project.category}</span>
                <button class="project-card__link">Ver Proyecto</button>
            </div>
        </div>
        <div class="project-card__content">
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__specs">${project.specs.area}m² • ${project.specs.floors} Plantas • ${project.specs.rooms} Habitaciones</p>
        </div>
    `;

    // Добавляем обработчик для открытия попапа
    card.querySelector('.project-card__link').addEventListener('click', () => {
        openProjectPopup(project);
    });

    return card;
}

// Оптимизируем функцию открытия попапа
function openProjectPopup(project) {
    const popup = document.getElementById('projectPopup');

    // Обновляем содержимое попапа
    const popupTitle = popup.querySelector('.project-popup__title');
    const popupMainImage = document.getElementById('popupMainImage');
    const popupArea = popup.querySelector('.specs__value--area');
    const popupFloors = popup.querySelector('.specs__value--floors');
    const popupRooms = popup.querySelector('.specs__value--rooms');
    const popupBathrooms = popup.querySelector('.specs__value--bathrooms');
    const popupGarage = popup.querySelector('.specs__value--garage');
    const popupDescription = popup.querySelector('.project-popup__description');
    const popupPrice = popup.querySelector('.price-value');
    const popupThumbnails = popup.querySelector('.project-popup__thumbnails');
    const popupFeatures = popup.querySelector('.project-popup__features');

    // Безопасно обновляем значения
    if (popupTitle) popupTitle.textContent = project.title;
    if (popupMainImage) {
        popupMainImage.src = project.images.main;
        popupMainImage.alt = project.title;
    }
    if (popupArea) popupArea.textContent = `${project.specs.area}m²`;
    if (popupFloors) popupFloors.textContent = `${project.specs.floors} Plantas`;
    if (popupRooms) popupRooms.textContent = `${project.specs.rooms} Habitaciones`;
    if (popupBathrooms) popupBathrooms.textContent = `${project.specs.bathrooms} Baños`;
    if (popupGarage) popupGarage.textContent = `${project.specs.garage} Plazas`;
    if (popupDescription) popupDescription.textContent = project.description;
    if (popupPrice) popupPrice.textContent = `€${project.price}`;

    // Обновляем галерею
    if (popupThumbnails && project.images.gallery) {
        popupThumbnails.innerHTML = project.images.gallery
            .map(img => `<img src="${img}" alt="Thumbnail" class="popup-thumbnail">`)
            .join('');
    }

    // Обновляем характеристики
    if (popupFeatures && project.features) {
        popupFeatures.innerHTML = project.features
            .map(feature => `<span class="feature-tag">${feature}</span>`)
            .join('');
    }

    // Сохраняем ID проекта
    popup.setAttribute('data-project-id', project.id);

    // Показываем попап
    popup.classList.add('active');

    // Инициализируем галерею
    if (typeof initializePopupGallery === 'function') {
        initializePopupGallery();
    }

    // Обновляем обработчик формы
    const popupForm = popup.querySelector('.project-popup__form');
    if (popupForm) {
        popupForm.onsubmit = async (e) => {
            e.preventDefault();

            const submitBtn = e.target.querySelector('.btn--primary');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span class="spinner"></span>
                    Enviando...
                `;
            }

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            try {
                await sendTelegramMessage(data, project);

                showNotification('¡Gracias! Nos pondremos en contacto contigo pronto.', 'success');
                popup.classList.remove('active');
                e.target.reset();
            } catch (error) {
                console.error('Error:', error);
                showNotification('Ha ocurrido un error. Por favor, inténtalo de nuevo.', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar consulta';
                }
            }
        };
    }

    // Добавляем обработчики закрытия
    const closeBtn = popup.querySelector('.project-popup__close');
    if (closeBtn) {
        closeBtn.onclick = () => popup.classList.remove('active');
    }

    // Закрытие по клику вне попапа
    popup.onclick = (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    };

    // Находим кнопку "Solicitar Información" в попапе проекта
    const requestInfoBtn = popup.querySelector('.btn--primary');
    if (requestInfoBtn) {
        // Удаляем существующие обработчики
        requestInfoBtn.replaceWith(requestInfoBtn.cloneNode(true));
        const newRequestInfoBtn = popup.querySelector('.btn--primary');

        newRequestInfoBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const projectId = popup.getAttribute('data-project-id');
            const project = projectsData.projects.find(p => p.id === projectId);

            if (!project) {
                console.error('Project not found');
                return;
            }

            // Открываем попап с формой
            const contactPopup = document.getElementById('contactPopup');
            const projectTitleSpan = contactPopup.querySelector('#projectTitle');

            if (projectTitleSpan) {
                projectTitleSpan.textContent = project.title;
            }

            // Показываем попап с формой
            contactPopup.classList.add('active');

            // Находим форму в попапе контактов
            const contactForm = contactPopup.querySelector('#contactForm');
            if (contactForm) {
                // Удаляем существующие обработчики
                const newForm = contactForm.cloneNode(true);
                contactForm.parentNode.replaceChild(newForm, contactForm);

                // Добавляем новый обработчик
                newForm.onsubmit = async (e) => {
                    e.preventDefault();
                    console.log('Project contact form submitted');

                    const name = newForm.querySelector('[name="name"]').value;
                    const email = newForm.querySelector('[name="email"]').value;
                    const phone = newForm.querySelector('[name="phone"]').value;
                    const message = newForm.querySelector('[name="message"]').value;

                    const submitBtn = newForm.querySelector('.btn--primary');
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.innerHTML = `
                            <span class="spinner"></span>
                            Enviando...
                        `;
                    }

                    const data = {
                        name: name,
                        email: email,
                        phone: phone,
                        message: message
                    };

                    try {
                        await sendTelegramMessage(data, project);
                        showNotification('¡Gracias! Nos pondremos en contacto contigo pronto.', 'success');
                        contactPopup.classList.remove('active');
                        newForm.reset();
                    } catch (error) {
                        console.error('Error:', error);
                        showNotification('Ha ocurrido un error. Por favor, inténtalo de nuevo.', 'error');
                    } finally {
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Enviar mensaje';
                        }
                    }
                };
            }
        });
    }
}

// Добавляем оптимизированный обработчик для галереи
function initializePopupGallery() {
    const thumbnailsContainer = document.getElementById('popupThumbnails');
    const mainImage = document.getElementById('popupMainImage');

    thumbnailsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-thumbnail')) {
            mainImage.src = e.target.src;
            document.querySelectorAll('.popup-thumbnail').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
}

// Добавим функцию фильтрации
function filterProjects(category) {
    const projects = category === 'all'
        ? projectsData.projects
        : projectsData.projects.filter(project => project.category === category);

    renderProjects(projects);
}

// Обновляем инициализацию
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация проектов
    loadProjects();

    // Обработчики для фильтров
    const filterButtons = document.querySelectorAll('.project-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterProjects(button.getAttribute('data-filter'));
        });
    });

    // Оптимизированное закрытие попапа
    const popup = document.getElementById('projectPopup');
    const closeBtn = document.querySelector('.project-popup__close');

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });

    // Добавляем обработчик для кнопки запроса информации
    document.querySelector('.project-popup .btn--primary').addEventListener('click', () => {
        const projectId = document.getElementById('projectPopup').getAttribute('data-project-id');
        const project = projectsData.projects.find(p => p.id === projectId);
        if (project) {
            // Закрываем попап проекта
            document.getElementById('projectPopup').classList.remove('active');
            // Открываем форму
            openContactForm(project);
        }
    });

    // Обработчик формы
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = e.target.querySelector('.btn--primary');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span class="spinner"></span>
                    Enviando...
                `;
            }

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            try {
                const contactInquiry = {
                    title: 'Consulta desde Sección de Contacto',
                    price: 'N/A'
                };

                await sendTelegramMessage(data, contactInquiry);

                showNotification('¡Gracias! Nos pondremos en contacto contigo pronto.', 'success');
                e.target.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar mensaje';
            } catch (error) {
                console.error('Error:', error);
                showNotification('Ha ocurrido un error. Por favor, inténtalo de nuevo.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar mensaje';
            }
        });
    }

    // Обработчики закрытия формы
    const contactPopupClose = document.querySelector('.contact-popup__close');
    if (contactPopupClose) {
        contactPopupClose.addEventListener('click', () => {
            document.getElementById('contactPopup').classList.remove('active');
        });
    }

    const contactPopup = document.getElementById('contactPopup');
    if (contactPopup) {
        contactPopup.addEventListener('click', (e) => {
            if (e.target === contactPopup) {
                contactPopup.classList.remove('active');
            }
        });
    }

    // Обработчик для формы в hero секции тоже обновим
    const heroForm = document.querySelector('.hero__form');

    if (heroForm) {
        heroForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = e.target.querySelector('.btn--primary');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span class="spinner"></span>
                    Enviando...
                `;
            }

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            try {
                const generalInquiry = {
                    title: 'Consulta General',
                    price: 'N/A'
                };

                await sendTelegramMessage(data, generalInquiry);

                showNotification('¡Gracias! Nos pondremos en contacto contigo pronto.', 'success');
                e.target.reset();
            } catch (error) {
                console.error('Error:', error);
                showNotification('Ha ocurrido un error. Por favor, inténtalo de nuevo.', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar consulta';
                }
            }
        });
    }

    // Обработчик для кнопки "Solicitar Información"
    const projectPopup = document.getElementById('projectPopup');

    if (projectPopup) {
        const requestInfoBtn = projectPopup.querySelector('.btn--primary');
        if (requestInfoBtn) {
            requestInfoBtn.addEventListener('click', async (e) => {
                e.preventDefault();

                const projectId = projectPopup.getAttribute('data-project-id');
                const project = projectsData.projects.find(p => p.id === projectId);

                if (!project) {
                    console.error('Project not found');
                    return;
                }

                const formData = new FormData(e.target.closest('form'));
                const data = Object.fromEntries(formData);

                try {
                    await sendTelegramMessage(data, project);

                    showNotification('¡Gracias! Nos pondremos en contacto contigo pronto.', 'success');
                    projectPopup.classList.remove('active');

                } catch (error) {
                    console.error('Error:', error);
                    showNotification('Ha ocurrido un error. Por favor, inténtalo de nuevo.', 'error');
                }
            });
        }
    }

    const processItems = document.querySelectorAll('.process__item');
    const timeline = document.querySelector('.process__timeline');
    let timelineStarted = false;

    // Intersection Observer для каждого элемента
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Запускаем анимацию линии при первом элементе
                if (!timelineStarted) {
                    timeline.classList.add('started');
                    timelineStarted = true;
                }

                // Добавляем класс с задержкой
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, 200);
            }
        });
    }, {
        threshold: 0.5, // Элемент должен быть виден на 50%
        rootMargin: '-10% 0px' // Триггер немного ближе к центру
    });

    // Наблюдаем за каждым элементом отдельно
    processItems.forEach(item => {
        itemObserver.observe(item);
    });

    const track = document.querySelector('.testimonials__track');
    const slides = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.testimonials__dots');
    const prevButton = document.querySelector('.testimonials__arrow--prev');
    const nextButton = document.querySelector('.testimonials__arrow--next');

    const slidesToShow = 3;
    const totalSlides = slides.length;

    // Клонируем слайды для бесконечной прокрутки
    const cloneFirst = [...slides].slice(0, slidesToShow).map(slide => slide.cloneNode(true));
    const cloneLast = [...slides].slice(-slidesToShow).map(slide => slide.cloneNode(true));

    cloneLast.forEach(clone => track.insertBefore(clone, track.firstChild));
    cloneFirst.forEach(clone => track.appendChild(clone));

    let currentSlide = 0;
    let isTransitioning = false;

    function updateSlideClasses() {
        const allSlides = document.querySelectorAll('.testimonial');
        allSlides.forEach((slide, index) => {
            slide.classList.remove('active', 'semi-active');

            // Определяем видимые слайды
            const visibleIndex = index - slidesToShow;
            if (visibleIndex >= currentSlide && visibleIndex < currentSlide + slidesToShow) {
                // Центральный слайд
                if (visibleIndex === currentSlide + 1) {
                    slide.classList.add('active');
                    slide.style.opacity = '1';
                }
                // Боковые слайды
                else {
                    slide.classList.add('semi-active');
                    slide.style.opacity = '0.7';
                }
            } else {
                slide.style.opacity = '0.3';
            }
        });
    }

    function createDots() {
        dotsContainer.innerHTML = ''; // Очищаем контейнер
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('testimonials__dot');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = document.querySelectorAll('.testimonials__dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index, instant = false) {
        if (isTransitioning && !instant) return;

        currentSlide = index;
        const translateX = -((currentSlide + slidesToShow) * (100 / slidesToShow));

        if (instant) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            isTransitioning = true;
        }

        track.style.transform = `translateX(${translateX}%)`;
        updateSlideClasses();
        updateDots(); // Добавляем обновление точек

        if (instant) {
            setTimeout(() => {
                track.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            }, 50);
        }
    }

    function handleTransitionEnd() {
        isTransitioning = false;

        if (currentSlide >= totalSlides) {
            currentSlide = 0;
            goToSlide(currentSlide, true);
        } else if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
            goToSlide(currentSlide, true);
        }
        updateDots(); // Обновляем точки после перехода
    }

    // Обработчики кнопок
    prevButton.addEventListener('click', () => {
        if (!isTransitioning) {
            goToSlide(currentSlide - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (!isTransitioning) {
            goToSlide(currentSlide + 1);
        }
    });

    // Слушаем окончание анимации
    track.addEventListener('transitionend', handleTransitionEnd);

    // Инициализация
    createDots();
    goToSlide(0, true);
    updateDots();

    // Автопрокрутка
    let autoplayInterval = setInterval(() => {
        if (!isTransitioning) {
            goToSlide(currentSlide + 1);
        }
    }, 5000);

    // Останавливаем автопрокрутку при наведении
    track.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    track.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            if (!isTransitioning) {
                goToSlide(currentSlide + 1);
            }
        }, 5000);
    });

    // Обработка свайпов для мобильных устройств с passive параметром
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchmove', e => {
        e.preventDefault();
    }, { passive: false });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(currentSlide - 1);
            }
        }
    }
});

function openContactForm(project) {
    const contactPopup = document.getElementById('contactPopup');
    document.getElementById('projectTitle').textContent = project.title;
    contactPopup.classList.add('active');
}


async function sendTelegramMessage(data, project) {
    const BOT_TOKEN = "711876660:AAF2Tg6IsNSuS4dtRqTKHhUWbCUgUYQc-ks";
    const CHAT_ID = "284614484";

    // Формируем сообщение
    const message = `
🏠 *Nueva solicitud de información*
------------------
*Proyecto:* ${project.title}
*Precio:* €${project.price}

👤 *Datos del cliente:*
*Nombre:* ${data.name}
*Email:* ${data.email}
*Teléfono:* ${data.phone}

💬 *Mensaje:*
${data.message}

�� Fecha: ${new Date().toLocaleString()}
    `;

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send Telegram message');
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}


// Обработчик формы контакта
document.addEventListener('DOMContentLoaded', () => {
    const mainContactForm = document.getElementById('mainContactForm');
    if (mainContactForm) {
        mainContactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = e.target.querySelector('.btn--primary');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span class="spinner"></span>
                    Enviando...
                `;
            }

            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);

            try {
                const contactInquiry = {
                    title: 'Consulta desde Sección de Contacto',
                    price: 'N/A'
                };

                await sendTelegramMessage(data, contactInquiry);

                showNotification('¡Gracias! Nos pondremos en contacto contigo pronto.', 'success');
                e.target.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar mensaje';
            } catch (error) {
                console.error('Error:', error);
                showNotification('Ha ocurrido un error. Por favor, inténtalo de nuevo.', 'error');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar mensaje';
            }
        });
    }
});

// Функция для показа уведомлений
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Анимация появления
    setTimeout(() => notification.classList.add('active'), 100);

    // Удаляем уведомление через 3 секунды
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Добавляем стили для уведомлений, если их еще нет
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 2000;
    }

    .notification.active {
        transform: translateY(0);
        opacity: 1;
    }

    .notification--success {
        background: #4CAF50;
        color: white;
    }

    .notification--error {
        background: #f44336;
        color: white;
    }
`;
document.head.appendChild(style);

// Инициализация калькулятора
document.addEventListener('DOMContentLoaded', () => {
    const areaInput = document.getElementById('area');
    const areaSlider = document.getElementById('areaSlider');
    const qualitySelect = document.getElementById('quality');
    const floorsSelect = document.getElementById('floors');
    const garageSelect = document.getElementById('garage');
    const priceElement = document.querySelector('.calculator__price-value');

    // Синхронизация input и slider
    areaInput.addEventListener('input', () => {
        areaSlider.value = areaInput.value;
        calculatePrice();
    });

    areaSlider.addEventListener('input', () => {
        areaInput.value = areaSlider.value;
        calculatePrice();
    });

    // Обработчики изменений других полей
    qualitySelect.addEventListener('change', calculatePrice);
    floorsSelect.addEventListener('change', calculatePrice);
    garageSelect.addEventListener('change', calculatePrice);

    // Функция расчета цены
    function calculatePrice() {
        const area = parseInt(areaInput.value);
        const quality = qualitySelect.value;
        const floors = parseInt(floorsSelect.value);
        const garage = parseInt(garageSelect.value);

        // Базовая цена за м²
        const basePrice = PRICES[quality];

        // Множитель этажности (теперь увеличивает цену с количеством этажей)
        const floorMultiplier = FLOOR_MULTIPLIERS[floors];

        // Цена гаража
        const garagePrice = GARAGE_PRICES[garage];

        // Расчет общей цены
        const totalPrice = (area * basePrice * floorMultiplier) + garagePrice;

        // Форматирование цены
        const formattedPrice = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(totalPrice);

        // Обновление отображения
        priceElement.textContent = formattedPrice;
    }

    // Первоначальный расчет
    calculatePrice();
});

// Функция показа формы обратной связи
function showContactPopup(calculatorData) {
    const popup = document.createElement('div');
    popup.className = 'contact-popup active';

    popup.innerHTML = `
        <div class="contact-popup__content">
            <button class="contact-popup__close">&times;</button>
            <h3 class="contact-popup__title">Solicitar Presupuesto Detallado</h3>
            <form class="contact-popup__form">
                <input type="text" name="name" placeholder="Nombre" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="tel" name="phone" placeholder="Teléfono" required>
                <textarea name="message" placeholder="Mensaje adicional"></textarea>
                <button type="submit" class="btn btn--primary">Enviar Solicitud</button>
            </form>
        </div>
    `;

    document.body.appendChild(popup);

    // Обработчик закрытия
    const closeBtn = popup.querySelector('.contact-popup__close');
    closeBtn.onclick = () => popup.remove();

    // Обработчик клика вне формы
    popup.onclick = (e) => {
        if (e.target === popup) popup.remove();
    };

    // Обработчик отправки формы
    const form = popup.querySelector('form');
    form.onsubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            // Отправляем данные в Telegram
            await sendTelegramMessage(data, {
                title: 'Solicitud de Presupuesto',
                description: calculatorData
            });

            showNotification('¡Gracias! Nos pondremos en contacto contigo pronto.', 'success');
            popup.remove();
        } catch (error) {
            console.error('Error:', error);
            showNotification('Ha ocurrido un error. Por favor, inténtalo de nuevo.', 'error');
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.faq__category');
    const groups = document.querySelectorAll('.faq__group');
    const questions = document.querySelectorAll('.faq__question');

    // Переключение категорий
    categories.forEach(category => {
        category.addEventListener('click', () => {
            // Убираем активный класс у всех категорий
            categories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');

            // Показываем нужную группу вопросов
            const targetCategory = category.dataset.category;
            groups.forEach(group => {
                if (group.dataset.category === targetCategory) {
                    group.classList.add('active');
                } else {
                    group.classList.remove('active');
                }
            });
        });
    });

    // Переключение вопросов
    questions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq__item');
            const answer = item.querySelector('.faq__answer');

            // Закрываем другие открытые вопросы в той же группе
            const currentGroup = item.closest('.faq__group');
            currentGroup.querySelectorAll('.faq__item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq__answer').style.maxHeight = '0';
                }
            });

            // Переключаем текущий вопрос
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // Инициализация: активируем первую категорию и группу
    if (categories[0] && groups[0]) {
        categories[0].classList.add('active');
        groups[0].classList.add('active');
    }
});

function handleCalculatorSubmit(calculatorData) {
    const calculatorPopup = document.getElementById('calculatorPopup');
    const calculatedPriceSpan = calculatorPopup.querySelector('#calculatedPrice');

    // Получаем данные из калькулятора
    const area = document.getElementById('area').value;
    const quality = document.getElementById('quality').value;
    const floors = document.getElementById('floors').value;
    const garage = document.getElementById('garage').value;

    // Получаем текстовые значения для качества
    const qualityText = {
        'basic': 'Básico (850€/m²)',
        'standard': 'Estándar (1050€/m²)',
        'premium': 'Premium (1250€/m²)'
    }[quality];

    // Показываем рассчитанную цену
    if (calculatedPriceSpan) {
        calculatedPriceSpan.textContent = document.querySelector('.calculator__price-value').textContent;
    }

    // Находим форму в попапе калькулятора
    const calculatorForm = calculatorPopup.querySelector('#calculatorForm');
    if (calculatorForm) {
        // Удаляем существующие обработчики
        const newForm = calculatorForm.cloneNode(true);
        calculatorForm.parentNode.replaceChild(newForm, calculatorForm);

        // Добавляем новый обработчик
        newForm.onsubmit = async (e) => {
            e.preventDefault();
            console.log('Calculator form submitted');

            const submitBtn = newForm.querySelector('.btn--primary');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span class="spinner"></span>
                    Enviando...
                `;
            }

            const formData = {
                name: newForm.querySelector('[name="name"]').value,
                email: newForm.querySelector('[name="email"]').value,
                phone: newForm.querySelector('[name="phone"]').value,
                message: newForm.querySelector('[name="message"]').value
            };

            // Создаем объект с данными калькулятора для отправки
            const calculatorInfo = {
                title: 'Presupuesto desde Calculadora',
                price: document.querySelector('.calculator__price-value').textContent,
                details: {
                    area: `${area} m²`,
                    quality: qualityText,
                    floors: `${floors} ${floors === '1' ? 'Planta' : 'Plantas'}`,
                    garage: garage === '0' ? 'Sin garaje' : `${garage} ${garage === '1' ? 'plaza' : 'plazas'}`
                }
            };

            try {
                await sendTelegramMessage(formData, calculatorInfo);
                showNotification('¡Gracias! Nos pondremos en contacto contigo pronto.', 'success');
                calculatorPopup.classList.remove('active');
                newForm.reset();
            } catch (error) {
                console.error('Error:', error);
                showNotification('Ha ocurrido un error. Por favor, inténtalo de nuevo.', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar mensaje';
                }
            }
        };
    }

    // Показываем попап
    calculatorPopup.classList.add('active');
}

// Добавляем обработчик для кнопки "Solicitar Presupuesto Detallado"
document.querySelector('.calculator__result .btn--primary').addEventListener('click', () => {
    handleCalculatorSubmit();
});

// Обработчики закрытия попапов
document.addEventListener('DOMContentLoaded', () => {
    // Находим все попапы
    const popups = document.querySelectorAll('.contact-popup');

    popups.forEach(popup => {
        // Находим кнопку закрытия в каждом попапе
        const closeBtn = popup.querySelector('.contact-popup__close');

        if (closeBtn) {
            // Добавляем обработчик на кнопку закрытия
            closeBtn.addEventListener('click', () => {
                popup.classList.remove('active');
            });
        }

        // Закрытие по клику вне попапа
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            popups.forEach(popup => {
                popup.classList.remove('active');
            });
        }
    });
});

