const inputform = document.getElementById("form");
const list = document.getElementById("user-list");
window.addEventListener("load", fetchAndDisplayResponses);

function submit(e) {
  const btn = document.getElementById("submit").value;
  if (btn === "submit") {
    handleFormSubmit(e);
  } else {
    handleEditResponse(user);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  let username = document.getElementById("name");
  let rating = document.getElementById("rating");
  const user = {
    name: username.value,
    rating: rating.value,
  };

  axios
    .post(
      "https://crudcrud.com/api/0f420b3b137e45a8ae90fefb7d83a056/rating",
      user
    )
    .then((result) => {
      console.log(result);
      fetchAndDisplayResponses(); // Update the list without reloading the page
    })
    .catch((error) => {
      console.log(error);
    });
}

inputform.addEventListener("submit", handleFormSubmit);

function showUser(user) {
  const listItem = document.createElement("li");
  listItem.textContent = `${user.name}: ${user.rating}`;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => handleEditResponse(user));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => handleDeleteResponse(user._id)); // Pass user ID to delete function

  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  list.appendChild(listItem);
}

function fetchAndDisplayResponses() {
  list.innerHTML = "";
  axios
    .get("https://crudcrud.com/api/0f420b3b137e45a8ae90fefb7d83a056/rating")
    .then((response) => {
      response.data.forEach((user) => {
        showUser(user);
      });
    })
    .catch((error) => {
      console.error("Error fetching responses:", error);
    });
}

function handleEditResponse(user) {
  document.getElementById("name").value = user.name;
  document.getElementById("rating").value = user.rating;
  document.getElementById("submit").value = "saveEdit";

  const Editeduser = {
    name: document.getElementById("name").value,
    rating: document.getElementById("rating").value,
  };

  axios
    .put(
      `https://crudcrud.com/api/0f420b3b137e45a8ae90fefb7d83a056/${user._id}`,
      Editeduser
    )
    .then((result) => {
      console.log("Response updated:", result);
      document.getElementById("submit").value = "submit";
      fetchAndDisplayResponses();
    })
    .catch((error) => {
      console.error("Error updating response:", error);
    });
}

function handleDeleteResponse(id) {
  axios
    .delete(`https://crudcrud.com/api/0f420b3b137e45a8ae90fefb7d83a056/${id}`)
    .then((result) => {
      console.log("Response deleted:", result);
      fetchAndDisplayResponses();
    })
    .catch((error) => {
      console.error("Error deleting response:", error);
    });
}
