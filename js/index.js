// Get the modal
const modal = document.getElementById("siteplan__modal");
const modalContent = document.querySelector(".siteplan__modal-content");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("siteplan__modal-close")[0];

//targeting the site plan svg
const sitePlan = document.querySelector(".siteplan__svg");

// fetching site plan data from data.js
const fetchData = () => {
  fetch("http://127.0.0.1:5500/Deerview-Project/js/data.js")
    .then((res) => res.json())
    .then((data) => viewData(data));
};

// view data of the site plan in modal
const viewData = (data) => {
  data.map((user) => {
    sitePlan.addEventListener("click", (e) => {
      if (parseInt(e.target.id) == user.id) {
        console.log(user);
        // When the user clicks the units, open the modal
        modal.style.display = "block";
        modalContent.innerHTML = user.name + " " + user.email;
      }
    });
  });
};

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", () => {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

fetchData();

var scale = 1,
  panning = false,
  pointX = 0,
  pointY = 0,
  start = { x: 0, y: 0 },
  zoom = document.querySelector(".siteplan__container");
function setTransform() {
  zoom.style.transform =
    "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
  console.log(
    (zoom.style.transform =
      "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")")
  );
}
zoom.onmousedown = function (e) {
  e.preventDefault();
  start = { x: e.clientX - pointX, y: e.clientY - pointY };
  panning = true;
};
zoom.onmouseup = function (e) {
  panning = false;
};
zoom.onmousemove = function (e) {
  e.preventDefault();
  if (!panning) {
    return;
  }
  pointX = e.clientX - start.x;
  pointY = e.clientY - start.y;
  setTransform();
};
zoom.onwheel = function (e) {
  e.preventDefault();
  var xs = (e.clientX - pointX) / scale,
    ys = (e.clientY - pointY) / scale,
    delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
  delta > 0 ? (scale *= 1.2) : (scale /= 1.2);
  pointX = e.clientX - xs * scale;
  pointY = e.clientY - ys * scale;
  setTransform();
};
