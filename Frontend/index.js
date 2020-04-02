// Code your solution here
document.addEventListener('DOMContentLoaded', () => {
  getShoes()
})

const URL = 'http://localhost:3000/shoes'

function getShoes() {
  fetch(URL)
    .then(res => res.json())
    .then(shoes => displayShoes(shoes))
    .catch(err => console.log(err));
}

function displayShoes(shoes) {
  console.log('firing');
  let shoeId = shoes[0].id;
  shoes.forEach((shoe) => displayShoe(shoe));
  getShoeById(shoeId);
}

function displayShoe(shoe) {
  // console.log(shoe);
  let ul = document.getElementById('shoe-list');
  let li = document.createElement('li');
  li.className = 'list-group-item';
  li.textContent = shoe.name;

  li.addEventListener('click', (e) => {
    e.preventDefault();
    displayShoeSidebar(shoe)
  })
  ul.appendChild(li);
}

function getShoeById(shoeId) {
  fetch(URL + '/' + shoeId)
    .then(res => res.json())
    .then(shoe => displayShoeSidebar(shoe))
    .catch(err => console.log(err))
}

function displayShoeSidebar(shoe) {
  let img = document.getElementById('shoe-image');
  img.src = shoe.image;

  let name = document.getElementById('shoe-name');
  name.textContent = shoe.name;

  let description = document.getElementById('shoe-description');
  description.textContent = shoe.description;

  let price = document.getElementById('shoe-price');
  price.textContent = shoe.price;

  let div = document.getElementById('form-container');
  div.innerHTML = '';

  let form = document.createElement('form');
  form.id = 'new-review';

  let div2 = document.createElement('div');
  div2.className ='form-group';

  let textarea = document.createElement('textarea');
  textarea.className = 'form-control';
  textarea.id = 'review-content';
  textarea.rows = '3';

  let input = document.createElement('input');
  input.className = 'btn btn-primary';
  input.setAttribute('type', 'submit');

  div.appendChild(form);
  form.appendChild(div2);
  div2.appendChild(textarea);
  div2.appendChild(input);

  let ul2 = document.getElementById('reviews-list');
  ul2.innerText = ''
  shoe.reviews.forEach(review => {
    let li2 = document.createElement('li')
    li2.className = 'list-group-item'
    li2.textContent = review.content
    ul2.appendChild(li2)
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    postReview(shoe, textarea)
  })
}

function postReview(shoe, text) {
  console.log('posted!')
  let shoeId = shoe.id
  let textcontent = text.value

  let ul2 = document.getElementById('reviews-list');
  let li2 = document.createElement('li');
  li2.className = 'list-group-item';
  li2.textContent = textcontent;
  ul2.appendChild(li2);

  let config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({content: textcontent})
  }

  fetch(URL + '/' + shoeId + '/reviews', config)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
}
