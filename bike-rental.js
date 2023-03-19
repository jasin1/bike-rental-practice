console.log("here we go!!");

const step2Heading = document.querySelector(".new-selected-heading");
const priceOne = document.querySelector(".step-1-price-1");
const priceTwo = document.querySelector(".step-1-price-2");

const form = {
  currentStep: 1,
  steps: document.querySelectorAll(".tab"),
  // nextButtons: document.querySelectorAll('[id^="next"]'),
  prevButtons: document.querySelectorAll(".prev-button"),
  submitButton: document.getElementById("submit"),
};

const selectedBike = {
  type: "",
  priceOneDay: "",
  PriceExtra: "",
  imgURL: "",
};

const bikes = document.querySelectorAll(".main-bike-link");

bikes.forEach((bike) => {
  bike.addEventListener("click", (event) => {
    event.preventDefault();

    const bikeType = bike.getAttribute("data-bike-type");
    const bikePriceOneDay = bike.getAttribute("data-price-1-day");
    const bikePriceExtra = bike.getAttribute("data-price-extra");
    const bikeImgURL = bike.getAttribute("data-img-url");

    selectedBike.type = bikeType;
    selectedBike.priceOneDay = bikePriceOneDay;
    selectedBike.PriceExtra = bikePriceExtra;
    selectedBike.imgURL = bikeImgURL;

    // step2Heading.innerHTML = bikeType.;

    const currentStep = document.querySelector(".tab.active");
    const nextStep = document.querySelector(
      `.tab[data-step="${form.currentStep + 1}"]`,
    );

    currentStep.classList.remove("active");
    currentStep.classList.add("hidden");

    nextStep.classList.remove("hidden");
    nextStep.classList.add("active");

    form.currentStep++;

    console.log(selectedBike);
  });
});

const nextButton = document.getElementById("next");

nextButton.addEventListener("click", (event) => {
  event.preventDefault();

  const currentStep = document.querySelector(".tab.active");
  const nextStep = document.querySelector(
    `.tab[data-step="${form.currentStep + 1}"]`,
  );

  currentStep.classList.remove("active");
  currentStep.classList.add("hidden");

  nextStep.classList.remove("hidden");
  nextStep.classList.add("active");

  form.currentStep++;
});

form.prevButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const currentStep = document.querySelector(".tab.active");
    const nextStep = document.querySelector(
      `.tab[data-step="${form.currentStep - 1}"]`,
    );

    currentStep.classList.remove("active");
    currentStep.classList.add("hidden");

    nextStep.classList.remove("hidden");
    nextStep.classList.add("active");

    form.currentStep--;
  });
});
