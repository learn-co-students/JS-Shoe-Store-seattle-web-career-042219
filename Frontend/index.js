// Code your solution here

document.addEventListener("DOMContentLoaded", () => {
  main()
})

function main() {
  loadShoes();
  displayFirstShoe();
}

function loadShoes() {
  return fetch("http://localhost:3000/shoes")
  .then (resp => resp.json())
  .then (json => displayShoes(json))
}

function displayShoes(shoes) {
  shoes.forEach(displayShoe)
}


function displayShoe(shoe) {
  const shoeList = document.getElementById('shoe-list');
  const shoeLi = document.createElement('li');
  shoeLi.textContent = shoe.name;
  shoeLi.id = shoe.id;
  shoeLi.className = "list-group-item";
  shoeLi.addEventListener("click", loadMainShoe)
  shoeList.appendChild(shoeLi);
}

function loadMainShoe(ev) {
  ev.preventDefault();
  return fetch(`http://localhost:3000/shoes/${ev.target.attributes[0].value}`)
  .then(resp => resp.json())
  .then(json => displayMainShoe(json))
}

function displayFirstShoe() {
  return fetch(`http://localhost:3000/shoes/1`)
  .then(resp => resp.json())
  .then(json => displayMainShoe(json))
}

function displayMainShoe(json) {
  const mainImage = document.getElementById('shoe-image');
  mainImage.src = json.image
  const nameHeader = document.getElementById('shoe-name');
  nameHeader.textContent = json.name;
  const description = document.getElementById('shoe-description');
  description.textContent = json.description;
  const price = document.getElementById('shoe-price');
  price.textContent = "$" + json.price;
  clearReviews();
  displayReviews(json)
  renderReviewForm(json);
}

function displayReviews(json) {
  json.reviews.forEach(displayReview)
}

function clearReviews(){
  const reviewsList = document.getElementById('reviews-list');
  while (reviewsList.firstChild) {
    reviewsList.removeChild(reviewsList.firstChild);
}
}

function displayReview(review) {
  const reviewsList = document.getElementById('reviews-list');
  const reviewLi = document.createElement('li');
  reviewLi.className = 'list-group-item'
  reviewLi.textContent = review.content;
  reviewsList.appendChild(reviewLi);
}

function renderReviewForm(json) {
  const formContainer = document.getElementById('form-container');
  const reviewForm = document.createElement('form');
  reviewForm.id = 'new-review'
  reviewForm.setAttribute("data-shoe-id", json.id);
  formContainer.appendChild(reviewForm);
  const formDiv = document.createElement('div');
  formDiv.className = "form-group";
  reviewForm.appendChild(formDiv);
  const reviewText = document.createElement('textarea');
  reviewText.id = "review-content";
  reviewText.className = "form-control";
  reviewText.rows = 3;
  formDiv.appendChild(reviewText);
  const submitReview = document.createElement('input');
  submitReview.className = "btn btn-primary"
  submitReview.type = "submit"
  submitReview.setAttribute("data-shoe-id", json.id);
  reviewForm.addEventListener("submit", submitNewReview)
  formDiv.appendChild(submitReview);
}

function submitNewReview(ev) {
  ev.preventDefault();
  console.log(ev.target.attributes[1].value);
  return fetch(`http://localhost:3000/shoes/${ev.target.attributes[1].value}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({content: ev.target.elements[0].value})
  })
  .then(resp => resp.json())
  .then(json => displayReview(json))
}
