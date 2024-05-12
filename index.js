const ratingForm = document.getElementById("rating-form");
const nameInput = document.getElementById("name-input");
const ratingSelect = document.getElementById("rating-select");
const userListDiv = document.getElementById("user-list");
let users = JSON.parse(localStorage.getItem("users")) || [];
let editingIndex = null;
let oneStar = document.getElementById("1star");
let twoStar = document.getElementById("2star");
let threeStar = document.getElementById("3star");
let fourStar = document.getElementById("4star");
let fiveStar = document.getElementById("5star");

function addUser(name, rating) {
  users.push({ name, rating });
  localStorage.setItem("users", JSON.stringify(users));
  renderUserList();
}

function editUser(index) {
  editingIndex = index;
  nameInput.value = users[index].name;
  ratingSelect.value = users[index].rating;
  document.getElementById("submit").textContent = "Edit";
  console.log(editingIndex);
}

function deleteUser(index) {
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  renderUserList();
}

function renderUserList() {
  oneStar.innerHTML = users.filter((item) => item.rating == 1)?.length || 0;
  twoStar.innerHTML = users.filter((item) => item.rating == 2)?.length || 0;
  threeStar.innerHTML = users.filter((item) => item.rating == 3)?.length || 0;
  fourStar.innerHTML = users.filter((item) => item.rating == 4)?.length || 0;
  fiveStar.innerHTML = users.filter((item) => item.rating == 5)?.length || 0;

  userListDiv.innerHTML = "";
  users.forEach((user, index) => {
    const userElement = document.createElement("div");
    userElement.style.padding = "8px";
    userElement.style.display = "flex";
    userElement.style.flexDirection = "row";
    userElement.style.gap = "10px";

    const nameElement = document.createElement("span");
    nameElement.textContent = user.name;
    const ratingElement = document.createElement("span");
    ratingElement.textContent = "*".repeat(user.rating);
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editUser(index));
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteUser(index));
    userElement.appendChild(nameElement);
    userElement.appendChild(document.createTextNode(" - "));
    userElement.appendChild(ratingElement);
    userElement.appendChild(editButton);
    userElement.appendChild(deleteButton);
    userListDiv.appendChild(userElement);
  });
}

ratingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const rating = parseInt(ratingSelect.value);
  if (name !== "" && rating > 0) {
    if (editingIndex !== null) {
      users[editingIndex] = { name, rating };
      localStorage.setItem("users", JSON.stringify(users));
      editingIndex = null;
      document.getElementById("submit").textContent = "Submit";
      renderUserList();
    } else {
      addUser(name, rating);
    }
    nameInput.value = "";
    ratingSelect.value = "";
  }
});

renderUserList();
