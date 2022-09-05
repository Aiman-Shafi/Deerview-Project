// Get the floor container
const floorContainer = document.querySelector(".floorplan__container");
const floorModalDetails = document.querySelector(".floorplan__modal-details");

// Get the modal
const modal = document.getElementById("floorplan__modal");

// Get the <span> element that closes the modal
const span = document.querySelector(".floorplan__modal-close");

const select = document.getElementById("select__bedrooms");

// fetch floor data
fetch("js/floorData.json")
  .then((res) => res.json())
  .then((data) => {
    // displayFloorData(data);
    displayFloorDetails(data);
    filterData(data);
  });

const filterData = (data) => {
  displayFloorData(data);
  select.addEventListener("change", () => {
    floorContainer.innerHTML = "";
    let filter = data.filter((element) => {
      return element.bedrooms == select.value;
    });
    console.log(typeof filter, filter);
    if (filter.length === 0) {
      displayFloorData(data);
    } else {
      displayFloorData(filter);
    }
  });
};

const displayFloorData = (data) => {
  let animation = 1000;
  data.map((unit) => {
    animation += 100;
    floorContainer.innerHTML += `
        <div class="floorplan__box" id=${unit.id}  data-aos="fade-up"
        data-aos-duration="${animation}">
            <div class="floorplan__box-content">
                <h2>UNIT ${unit.unit}</h2>
                <p><i class='bx bx-home'></i> <span>${unit.sqft} Sqft</span></p>
                <p><i class='bx bx-bed'></i> <span>${unit.bedrooms} Bedrooms</span></p>
                <p><i class='bx bx-bath' ></i> <span>${unit.bathrooms} Bathrooms</span></p>
                <p><i class='bx bx-home-heart' ></i> <span>${unit.powderRoom} Powder Rooms</span></p>
            </div>
            <img src=${unit.img} alt="">
        </div>
    `;
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

const displayFloorDetails = (data) => {
  //   console.log(data, floorContainer);
  floorContainer.addEventListener("click", (e) => {
    data.map((unit) => {
      // console.log(unit, e.target.id);
      if (e.target.id == unit.id) {
        console.log(unit.id);
        modal.style.display = "block";
        floorModalDetails.innerHTML = `
            <img src=${unit.img} />
            <div class="floorplan__modal-contents">
                <h2>UNIT ${unit.unit}</h2>
                <p><i class='bx bx-home'></i> <span>${unit.sqft} Sqft</span></p>
                <p><i class='bx bx-bed'></i> <span>${unit.bedrooms} Bedrooms</span></p>
                <p><i class='bx bx-bath' ></i> <span>${unit.bathrooms} Bathrooms</span></p>
                <p><i class='bx bx-home-heart' ></i> <span>${unit.powderRoom} Powder Rooms</span></p>
            </div>
        `;
      }
    });
  });
};
