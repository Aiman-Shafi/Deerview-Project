const siteplanModalDetails = document.querySelector(".siteplan__modal-details");

// Get the modal
const modal = document.getElementById("siteplan__modal");

// Get the <span> element that closes the modal
const span = document.querySelector(".siteplan__modal-close");

//targeting the site plan svg
const sitePlan = document.querySelector(".siteplan__svg");

//get the svg for panzoom
const elem = document.getElementById("panzoom");
//get zoom in button
const zoomInButton = document.getElementById("zoom__in");
//get zoom out button
const zoomOutButton = document.getElementById("zoom__out");
//get reset button
const resetButton = document.getElementById("reset");

// fetching site plan data from data.js
const fetchData = () => {
  fetch("js/siteplan.json")
    .then((res) => res.json())
    .then((data) => viewData(data));
};

// view data of the site plan in modal
const viewData = (data) => {
  data.map((unit) => {
    // console.log(unit.name, unit.id, unit.gender);
    sitePlan.addEventListener("click", (e) => {
      // console.log(e.target.id);
      if (e.target.id == unit.CityAddress) {
        console.log(unit.CityAddress);
        // When the unit clicks the units, open the modal
        modal.style.display = "block";
        siteplanModalDetails.innerHTML = `
                <div class="swiper__js">
                <div
                style="
                  --swiper-navigation-color: var(--primary__color);
                "
                class="swiper mySwiper2"
              >
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <img src=${unit.Img_floorplan}>
                  </div>
                  <div class="swiper-slide">
                    <img src=${unit.Img_blockplan} />
                  </div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
              </div>
              <div thumbsSlider="" class="swiper mySwiper">
                <div class="swiper-wrapper">
                  <div class="swiper-slide thumbnail__slide">
                    <img src=${unit.Img_floorplan}>
                  </div>
                  <div class="swiper-slide thumbnail__slide">
                    <img src=${unit.Img_blockplan} />
                  </div>
                </div>
              </div>
      
                </div>
                <div class="siteplan__modal-contents">
                    <h2>${unit.Unit}</h2>
                    <p><i class='bx bx-home'></i> <span>${unit.sqft} Sqft</span></p>
                    <p><i class='bx bx-bed'></i> <span>${unit.Bedrooms} Bedrooms</span></p>
                    <p><i class='bx bx-bath' ></i> <span>${unit.Bathroom} Bathrooms</span></p>
                    <p><i class='bx bx-home-heart' ></i> <span>${unit.Powder_Room} Powder Rooms</span></p>
                    <p><i class='bx bx-building'></i></i> <span>${unit.pow}</span></p>
                </div>
        `;
      }

      // swiper js
      var swiper = new Swiper(".mySwiper", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      });
      var swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        thumbs: {
          swiper: swiper,
        },
      });
    });
  });
  modalEvents();
};

const modalEvents = () => {
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

modalEvents();
fetchData();

// Working with Zoom Features

const panzoom = Panzoom(elem);
const parent = elem.parentElement;

//enabling events
parent.addEventListener("wheel", panzoom.zoomWithWheel);
zoomInButton.addEventListener("click", panzoom.zoomIn);
zoomOutButton.addEventListener("click", panzoom.zoomOut);
resetButton.addEventListener("click", panzoom.reset);
