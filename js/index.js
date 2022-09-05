// Get the modal
const modal = document.getElementById("siteplan__modal");
const modalContent = document.querySelector(".siteplan__modal-content");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("siteplan__modal-close")[0];

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
  fetch("js/data.json")
    .then((res) => res.json())
    .then((data) => viewData(data));
};

// view data of the site plan in modal
const viewData = (data) => {
  data.map((user) => {
    // console.log(user.name, user.id, user.gender);
    sitePlan.addEventListener("click", (e) => {
      // console.log(e.target.id);
      if (e.target.id == user.id) {
        console.log(user.id);
        e.target.id.classlist.add("rect__block");
        // When the user clicks the units, open the modal
        modal.style.display = "block";
        modalContent.innerHTML = user.name + " " + user.email + user.id;
      }
    });
  });
};

const modalEvents = () => {
  // When the user clicks on <span> (x), close the modal
  span.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.onclick = function (event) {
    // When the user clicks anywhere outside of the modal, close it
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
