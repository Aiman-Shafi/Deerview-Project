// Get the modal
const modal = document.getElementById("myModal");
const modalContent = document.querySelector(".modal-content");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

const sitePlan = document.querySelector(".sitePlan");
const fetchData = () => {
  fetch("http://127.0.0.1:5500/deerJS/data.js")
    .then((res) => res.json())
    .then((data) => viewData(data));
};

const viewData = (data) => {
  data.map((user) => {
    sitePlan.addEventListener("click", (e) => {
      if (parseInt(e.target.id) == user.id) {
        console.log(user);
        // When the user clicks the units, open the modal
        modal.style.display = "block";
        modalContent.innerHTML = user.name + " " + user.email;
        // modalContent.style.top = "50%";
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

