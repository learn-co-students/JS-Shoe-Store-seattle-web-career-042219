// Code your solution here
const BASE_URL = 'http://localhost:3000/shoes'

document.addEventListener('DOMContentLoaded', () => {
	main();
});

function main() {
	loadShoes()
	loadShoe(1)
};

function loadShoes() {
	fetch(BASE_URL)
	.then(resp => resp.json())
	.then(json => {
		displayShoesList(json);
	})
}

function loadShoe(index) {
	fetch(`${BASE_URL}/${index}`)
	.then(resp => resp.json())
	.then(json => {
		displayMainShoe(json);
	})
}

function displayShoesList(shoes) {
	let shoesList = document.getElementById('shoe-list')
	for(let i = 0; i < shoes.length; i++) {
		let li = document.createElement('li')
		li.className = "list-group-item"
		li.textContent = shoes[i].name
		li.addEventListener('click', (ev) => {
			let shoe_index = shoes[i].id;
			loadShoe(shoe_index)
		})
		shoesList.appendChild(li)
	}
}

function displayMainShoe(shoe) {
	let shoeImage = document.getElementById('shoe-image')
	let	shoeName = document.getElementById('shoe-name')
	let	shoeDescription = document.getElementById('shoe-description')
	let	shoePrice = document.getElementById('shoe-price')
	let	shoeForm = document.getElementById('form-container')
	let	shoeReviews = document.getElementById('reviews-list')

	displayForm(shoe.id)
	shoeImage.src = shoe.image
	shoeName.textContent = shoe.name
	shoeDescription.textContent = shoe.description
	shoePrice.textContent = shoe.price
	displayReviews(shoe.reviews)
}

function displayForm(shoeId) {
	let formContainer = document.getElementById("form-container")
	while(formContainer.firstChild) {
		formContainer.removeChild(formContainer.firstChild);
	}

	let form = document.createElement('form')
	let div = document.createElement('div')
	let textArea = document.createElement('textarea')
	let input = document.createElement('input')

	form.id = "new-review"
	div.className = "form-group"
	textArea.className = "form-control"
	textArea.id = "review-content"
	textArea.rows = 3
	input.type = "submit"
	input.className = "btn btn-primary"

	form.addEventListener('submit', (ev) => {
		ev.preventDefault()
		let data = document.getElementById("review-content").value
		fetch(`${BASE_URL}/${shoeId}/reviews`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( {content: data} )
		})
		.then(resp => resp.json())
		.then(json => {
			displayReview(json)
		})
		.catch(err => console.log('Error:', err))
	})

	div.appendChild(textArea)
	div.appendChild(input)
	form.appendChild(div)
	formContainer.appendChild(form)
}

function displayReviews(reviews) {
	let reviewsList = document.getElementById('reviews-list')
	while(reviewsList.firstChild) {
		reviewsList.removeChild(reviewsList.firstChild);
	}

	for(i = 0; i < reviews.length; i++) {
		displayReview(reviews[i])
	}
}

function displayReview(review) {
	let reviewsList = document.getElementById('reviews-list')
	let li = document.createElement('li')

	li.className = "list-group-item"
	li.textContent = review.content
	reviewsList.appendChild(li)
}

