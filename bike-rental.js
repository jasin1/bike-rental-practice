console.log("here we go!!");

const bikes = document.querySelectorAll(".main-bike-link");

bikes.forEach((bike) => {
  bike.addEventListener("click", (event) => {
    event.preventDefault();

    const bikeType = bike.getAttribute("data-bike-type");

    console.log(`selected bike type: ${bikeType}`);
  });
});
