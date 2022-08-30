// Get the modal
const modal = document.getElementById("siteplan__modal");
const modalContent = document.querySelector(".siteplan__modal-content");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("siteplan__modal-close")[0];

//targeting the site plan svg
const sitePlan = document.querySelector(".siteplan__svg");

// fetching site plan data from data.js
const fetchData = () => {
  fetch("http://127.0.0.1:5500/Deerview-Project/data.js")
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
