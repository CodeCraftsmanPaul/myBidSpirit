const firstNameInput = document.querySelector(".login__input--user");
const btnLogin = document.querySelector(".login__btn");
const main = document.querySelector("main");
const welcomeMessage = document.querySelector(".welcome");
const countsVistor = document.querySelector(".count__container");
const offCanvasNav = document.querySelector(".side__nav");
const removeText = document.querySelector(".text-remove");
// const homeLink = document.querySelector(".home-link");

const acctName = sessionStorage.getItem("acctName");

// VISITOR COUNT
const countElement = document.getElementById("count");
let visitorCount = 0;
// Update the visitor count
function updateVisitorCount() {
  visitorCount++;
  countElement.textContent = visitorCount;

  localStorage.setItem("visitorCount", visitorCount.toString());
}
// Call updateVisitorCount() when a new visitor arrives (e.g., when the page loads)
updateVisitorCount();

const login = function (firstName) {
  welcomeMessage.textContent = `Welcome to BidSpirit ${firstName}`;
  welcomeMessage.style.display = "block";
  main.style.opacity = 1;
  firstNameInput.style.display = "none"; // Hide the input field
  removeText.style.display = "none";
  btnLogin.style.display = "none";
  countsVistor.style.display = "block";
  offCanvasNav.style.display = "block";
};

acctName && login(acctName);

const collectDetailsnLogin = function (e) {
  e.preventDefault();
  const inputName = firstNameInput.value.trim();
  if (inputName) {
    const firstName = inputName.charAt(0).toUpperCase() + inputName.slice(1);
    login(firstName);
    sessionStorage.setItem("acctName", firstName);
  }
};
// LOGIN
btnLogin?.addEventListener("click", collectDetailsnLogin);

// Alternatively, you can also listen for the Enter key press:
firstNameInput?.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    collectDetailsnLogin();
  }
});

//  for product category
document.querySelectorAll(".image-container-art").forEach((container) => {
  const image = container.querySelector("img");
  const overlay = container.querySelector(".overlay-art");

  container.addEventListener("mouseenter", () => {
    overlay.style.width = "100%";
  });

  container.addEventListener("mouseleave", () => {
    overlay.style.width = "0";
  });
});

// SPONSORED SECTION
document.querySelectorAll(".image-container").forEach((container) => {
  const image = container.querySelector("img");
  const overlay = container.querySelector(".overlay");

  container.addEventListener("mouseenter", () => {
    overlay.style.height = `${image.clientHeight}px`;
  });

  container.addEventListener("mouseleave", () => {
    overlay.style.height = "0";
  });
});

// scroll ticker
function updateTicker() {
  const tickerContent = document.getElementById("ticker-content");
  console.log(tickerContent);
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Use a reverse geocoding service to get a user-friendly location
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          const userFriendlyLocation = data.display_name;
          tickerContent.textContent = `Current Date/Time: ${formattedDate} | Location: ${userFriendlyLocation}`;
        })
        .catch((error) => {
          tickerContent.textContent = `Current Date/Time: ${formattedDate} | Location not available`;
        });
    });
  } else {
    tickerContent.textContent = `Current Date/Time: ${formattedDate} | Geolocation not supported`;
  }
}

// Update the ticker content with the current date, time, and location
updateTicker();
