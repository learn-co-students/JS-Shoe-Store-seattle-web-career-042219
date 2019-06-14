document.addEventListener("DOMContentLoaded", () => {
  getCall();
});

const getURL = "http://localhost:3000/shoes";

function getCall() {
  fetch(getURL)
    .then(res => res.json())
    .then(shoes => displayShoes(shoes))
    .catch(err => console.log(err));
}

function displayShoes(shoes) {
  let firstShoeId = shoes[0].id;
  shoes.forEach(shoe => displayShoe(shoe));
  getByIdCall(firstShoeId);
}

function displayShoe(shoe) {
  let ul = document.getElementById("shoe-list");

  let li = document.createElement("li");
  li.innerText = shoe.id;
  li.classList.add("list-group-item");
  li.textContent = shoe.name;
  li.addEventListener("click", e => {
    e.preventDefault();
    displayShoeSidebar(shoe);
  });
  ul.appendChild(li);
}

function getByIdCall(firstShoeId) {
  fetch(getURL + "/" + firstShoeId)
    .then(res => res.json())
    .then(shoe => displayShoeSidebar(shoe))
    .catch(err => console.log(err));
}

function displayShoeSidebar(shoe) {
  let img = document.getElementById("shoe-image");
  img.src = shoe.image;
  img.id = "shoe-image";

  let shoeName = document.getElementById("shoe-name");
  shoeName.innerText = shoe.name;
  shoeName.id = "shoe-name";

  let shoeDescription = document.getElementById("shoe-description");
  shoeDescription.innerText = shoe.description;
  shoeDescription.id = "shoe-description";

  let shoePrice = document.getElementById("shoe-price");
  shoePrice.innerText = shoe.price;
  shoePrice.id = "shoe-price";
  shoePrice.className = "text-muted";

  let div = document.getElementById("form-container");
  div.innerHTML = "";

  let form = document.createElement("form");
  form.id = "new-review";

  let div2 = document.createElement("div");
  div2.className = "form-group";

  let textarea = document.createElement("textarea");
  textarea.className = "form-control";
  textarea.id = "review-content";
  textarea.rows = "3";

  let input = document.createElement("input");
  input.setAttribute("type", "submit");
  input.className = "btn btn-primary";

  div.appendChild(form);
  form.appendChild(div2);
  div2.appendChild(input);
  div2.appendChild(textarea);

  let ul2 = document.getElementById("reviews-list");
  ul2.innerText = "";
  shoe.reviews.forEach(review => {
    let li2 = document.createElement("li");
    li2.className = "list-group-item";
    li2.textContent = review.content;
    ul2.appendChild(li2);
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    postCall(shoe, textarea);
  });
}

function postCall(shoe, text) {
  console.log("postcall fires");
  let textContent = text.comments;

  let ul2 = document.getElementById("reviews-list");
  let li2 = document.createElement("li");
  li2.className = "list-group-item";
  li2.textContent = textContent;
  ul2.appendChild(li2);

  fetch(`${getURL}/${shoe.id}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ content: textContent })
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
