//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;

function setup() {
  fetchEpisodes();
}

function fetchEpisodes() {
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((res) => res.json())
    .then((episodes) => {
      renderEpisodes(episodes);
    })
    .catch((err) => console.error(err));
}

function renderEpisodes(episodes) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = "";

  const count = document.createElement("p");
  count.textContent = `Got ${episodes.length} episode(s)`;
  count.className = "episode-count";
  rootElem.appendChild(count);

  const cardsContainer = document.createElement("div");
  cardsContainer.className = "episodes-container";
  rootElem.appendChild(cardsContainer);

  episodes.forEach((episode) => {
    const episodeElem = document.createElement("section");
    episodeElem.className = "episode-card";
    episodeElem.setAttribute("tabindex", "0");

    const code = `S${String(episode.season).padStart(2, "0")}E${String(episode.number).padStart(2, "0")}`;
    const title = document.createElement("h3");
    title.textContent = `${episode.name} - ${code}`;
    episodeElem.appendChild(title);

    if (episode.image && episode.image.medium) {
      const img = document.createElement("img");
      img.src = episode.image.medium;
      img.alt = `${episode.name} thumbnail`;
      episodeElem.appendChild(img);
    }

    const summary = document.createElement("p");
    summary.textContent = episode.summary
      ? episode.summary.replace(/<[^>]+>/g, "")
      : "No summary available";
    episodeElem.appendChild(summary);

    const link = document.createElement("a");
    link.href = episode.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = `Click here for "${episode.name}" episode source`;
    episodeElem.appendChild(link);

    cardsContainer.appendChild(episodeElem);
  });

  const attribution = document.createElement("p");
  attribution.innerHTML =
    'Data provided by <a href="https://www.tvmaze.com/" target="_blank" rel="noopener">TVMaze.com</a>';
  rootElem.appendChild(attribution);
}

window.onload = setup;
