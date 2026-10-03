const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        darkModeBtn.textContent = "☀️";
    } else {
        darkModeBtn.textContent = "🌙";
    }
});


function searchArticles() {

    const input = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const articles = document.querySelectorAll(".article-card");

    if (input === "") {
        articles.forEach(article => {
            article.style.display = "flex";
        });

        return;
    }

    articles.forEach(article => {

        const text = article.innerText.toLowerCase();

        if (text.includes(input)) {
            article.style.display = "flex";
        } else {
            article.style.display = "none";
        }

    });
}


document
    .getElementById("searchInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            searchArticles();
        }

    });
