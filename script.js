const accessKey = "vUlHz9HL9xIWRvi8aqqsdKTEFCLStF2laV9a_fnPvtE";

const searchBtn = document.querySelector(".searchBtn");
const inputBox = document.querySelector(".inputbox");
const displayContent = document.querySelector(".content");
const showButton = document.querySelector(".showMore");

let page = 1;
let currentKeyword = "";

async function searchImages() {
  const newKeyword = inputBox.value.trim();

  if (newKeyword !== "") {
    if (newKeyword !== currentKeyword) {
      currentKeyword = newKeyword;
      page = 1;
      displayContent.innerHTML = "";
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${currentKeyword}&client_id=${accessKey}&per_page=21`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    results.map((result) => {
      const image = document.createElement("img");
      image.src = result.urls.small;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.appendChild(image);
      displayContent.appendChild(imageLink);
    });

    showButton.style.display = "block";
  }
}
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputBox.value.trim() !== "") {
    e.preventDefault();
    searchImages();
  }
});

function showMore() {
  page++;
  searchImages();
}

searchBtn.addEventListener("click", () => {
  searchImages();
});
