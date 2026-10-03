"use strict";

/* =========================================
   WA GUIDE URDU
   Professional JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------
       ELEMENTS
    ----------------------------------------- */

    const darkModeBtn = document.getElementById("darkModeBtn");
    const searchInput = document.getElementById("searchInput");
    const articles = document.querySelectorAll(".article-card");
    const readButtons = document.querySelectorAll(".read-btn");


    /* -----------------------------------------
       DARK MODE
    ----------------------------------------- */

    function updateDarkModeIcon() {

        if (!darkModeBtn) return;

        const isDark = document.body.classList.contains("dark");

        darkModeBtn.textContent = isDark ? "☀️" : "🌙";

        darkModeBtn.setAttribute(
            "aria-label",
            isDark ? "Light Mode" : "Dark Mode"
        );
    }


    function loadDarkMode() {

        const savedMode = localStorage.getItem("wa-guide-theme");

        if (savedMode === "dark") {
            document.body.classList.add("dark");
        }

        updateDarkModeIcon();
    }


    function toggleDarkMode() {

        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        localStorage.setItem(
            "wa-guide-theme",
            isDark ? "dark" : "light"
        );

        updateDarkModeIcon();
    }


    if (darkModeBtn) {
        darkModeBtn.addEventListener(
            "click",
            toggleDarkMode
        );
    }


    /* -----------------------------------------
       SEARCH
    ----------------------------------------- */

    function searchArticles() {

        if (!searchInput) return;

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();

        let found = 0;

        articles.forEach(article => {

            const articleText =
                article.innerText.toLowerCase();

            const matches =
                searchTerm === "" ||
                articleText.includes(searchTerm);

            article.style.display =
                matches ? "" : "none";

            if (matches) {
                found++;
            }

        });

        showSearchMessage(
            searchTerm,
            found
        );
    }


    /* -----------------------------------------
       SEARCH MESSAGE
    ----------------------------------------- */

    function showSearchMessage(term, count) {

        let message =
            document.getElementById("searchMessage");

        if (!message) {

            message =
                document.createElement("p");

            message.id = "searchMessage";

            message.style.textAlign = "center";
            message.style.marginTop = "15px";
            message.style.fontWeight = "700";

            searchInput
                ?.parentElement
                ?.appendChild(message);
        }

        if (term === "") {

            message.textContent = "";

            return;
        }

        if (count === 0) {

            message.textContent =
                "❌ کوئی گائیڈ نہیں ملی۔";

        } else {

            message.textContent =
                `✅ ${count} گائیڈ${count > 1 ? "ز" : ""} ملی۔`;
        }
    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchArticles
        );

        searchInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    searchArticles();
                }

            }
        );
    }


    /* -----------------------------------------
       READ BUTTONS
    ----------------------------------------- */

    readButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const article =
                    button.closest(".article-card");

                if (!article) return;

                article.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                article.classList.add(
                    "article-highlight"
                );

                setTimeout(() => {

                    article.classList.remove(
                        "article-highlight"
                    );

                }, 1200);

            }
        );

    });


    /* -----------------------------------------
       CARD ANIMATION
    ----------------------------------------- */

    const cards = document.querySelectorAll(
        ".category-card, .article-card, .tool-card"
    );

    cards.forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {
                card.style.transform =
                    "translateY(-4px)";
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.style.transform = "";
            }
        );

    });


    /* -----------------------------------------
       NAVIGATION
    ----------------------------------------- */

    const navigationLinks =
        document.querySelectorAll(
            ".navigation a"
        );

    navigationLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navigationLinks.forEach(
                    item =>
                        item.classList.remove("active")
                );

                link.classList.add("active");

            }
        );

    });


    /* -----------------------------------------
       KEYBOARD SHORTCUT
       "/" = Search
    ----------------------------------------- */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "/" &&
                document.activeElement !== searchInput
            ) {

                event.preventDefault();

                searchInput?.focus();
            }

        }
    );


    /* -----------------------------------------
       INITIALIZE
    ----------------------------------------- */

    loadDarkMode();

});
