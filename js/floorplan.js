// Get the modal
var modal = document.getElementById("floorplan__modal");

// Get the <span> element that closes the modal
var span = document.querySelector(".floorplan__modal-close");

// When the user clicks the button, open the modal
// btn.onclick = function () {
//   modal.style.display = "block";
// };

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

const floorContainer = document.querySelector(".floorplan__container");
const floorModalDetails = document.querySelector(".floorplan__modal-details");

fetch("js/floorData.json")
  .then((res) => res.json())
  .then((data) => {
    displayFloorData(data);
    displayFloorDetails(data);
  });

const fetchData = (data) => {
  return data;
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
};

const displayFloorDetails = (data) => {
  //   console.log(data, floorContainer);
  floorContainer.addEventListener("click", (e) => {
    data.map((unit) => {
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
