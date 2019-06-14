// Code your solution here
const SHOES_URL = "http://localhost:3000/shoes"

document.addEventListener('DOMContentLoaded', () => {

function main() {
  fetchShoes()
  fetchMain()
}

main()

function fetchShoes() {
  fetch(SHOES_URL)
  .then (resp => resp.json())
  .then (json => {
    displayShoes(json)
  })
}

function fetchMain(id=1) {
  fetch(SHOES_URL + '/' + id)
  .then (resp => resp.json())
  .then (json => cardShoe(json))

}

function fetchReview(content, shoe_id, ul, li) {
  let payload = {content: content}
  let config = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  }


  fetch(SHOES_URL + `/${shoe_id}/reviews`, config)
  .then(resp => resp.json())
  .then(json => {
    li.textContent = json.content
    ul.appendChild(li)
    })
}

function displayShoe(shoe) {
  let ul = document.getElementById('shoe-list')
  let li = document.createElement('li')

  li.setAttribute('shoe-id', shoe.id)
  li.className = "list-group-item"
  li.textContent = shoe.name
  li.addEventListener('click', () => {
    fetchMain(shoe.id)
  })

  ul.appendChild(li)
}

function displayShoes(json) {
  json.forEach((shoe) => {
    displayShoe(shoe)
  })
}

function cardShoe(shoe) {
  if (document.getElementById('new-review')) {
    document.getElementById('new-review').remove()
  }

  document.getElementById('reviews-list').innerHTML = ""


  let ul = document.getElementById('shoe-list')

  let img = document.getElementById('shoe-image')
  img.src = shoe.image

  let h4 = document.getElementById('shoe-name')
  h4.textContent = shoe.name

  let p1 = document.getElementById('shoe-description')
  p1.textContent = shoe.description

  let p2 = document.getElementById('shoe-price')
  p2.textContent = `$${shoe.price}`

  let ulReview = document.getElementById('reviews-list')
  shoe.reviews.forEach((review) => {
    let li = document.createElement('li')
    li.className = 'list-group-item'

    li.textContent = review.content

    ulReview.appendChild(li)
  })

  let div = document.getElementById('form-container')
  let form = document.createElement("form")
  div.appendChild(form)

  form.id = "new-review"
  let div2 = document.createElement('div')
  div2.className = "form-group"
  form.appendChild(div2)

  let textArea = document.createElement('textarea')
  textArea.className = 'form-control'
  textArea.id = 'review-content'
  textArea.rows = "3"
  textArea.name = "content"
  div2.appendChild(textArea)

  let submit = document.createElement('button')
  submit.type = 'submit'
  submit.className = "btn btn-primary"
  submit.textContent = 'Submit'
  div2.appendChild(submit)


  form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    let content = ev.target.elements["content"].value
    let li2 = document.createElement("li")
    li2.className = "list-group-item"
    fetchReview(content, shoe.id, ulReview, li2)




  })



}




















})
