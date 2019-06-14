document.addEventListener("DOMContentLoaded", () => {
    getCall();
    getCall;
});

const getURL = "http://localhost:3000/shoes";

function getCall() {
    fetch(getURL)
        .then(res => res.json())
        .then(shoes => displayShoes(shoes))
        .catch(err => console.log(err));
}

function displayShoes(shoes) {
    let shoeId = shoes[0].id;
    console.log("shoes=", shoes);
    shoes.forEach(shoe => displayShoe(shoe));
    getByIDCall(shoeId);
}

function displayShoe(shoe) {
    let ul = document.getElementById("shoe-list");
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = shoe.name;
    li.addEventListener("click", e => {
        e.preventDefault();
        displayShoeSidebar(shoe);
    });
    ul.appendChild(li);
}

function getByIDCall(shoeId) {
    console.log("getByIDCall fires");
    console.log(shoeId);
    fetch("http://localhost:3000/shoes" + "/" + shoeId).then(res =>
        res.json().then(shoe => displayShoeSidebar(shoe))
    );
}

function displayShoeSidebar(shoe) {
    console.log("displayShoeSidebar fires");
    console.log("shoe=", shoe);
    let img = document.getElementById("shoe-image");
    img.src = shoe.image;

    let shoeName = document.getElementById("shoe-name");
    shoeName.textContent = shoe.name;

    let shoeDescription = document.getElementById("shoe-description");
    shoeDescription.textContent = shoe.description;

    let shoePrice = document.getElementById("shoe-price");
    shoePrice.textContent = shoe.price;

    let div = document.getElementById("form-container");
    div.innerHTML = "";

    let form = document.createElement("form");
    form.id = "new-review";

    let div2 = document.createElement("div");
    div2.className = "form-group";

    let text = document.createElement("textarea");
    text.className = "form-control";
    text.id = "review-content";
    text.setAttribute("rows", "3");

    form.addEventListener("submit", e => {
        e.preventDefault();
        postCall(shoe, text);
    });

    let input = document.createElement("input");
    input.setAttribute("type", "submit");
    input.className = "btn btn-primary";

    div.appendChild(form);
    form.appendChild(div2);
    div2.appendChild(text);
    div2.appendChild(input);

    let ul2 = document.getElementById("reviews-list");
    ul2.innerText = "";
    shoe.reviews.forEach(review => {
        let li2 = document.createElement("li");
        li2.className = "list-group-item";
        li2.textContent = review.content;
        ul2.appendChild(li2);
    });
}

function postCall(shoe, text) {
    let shoeId = shoe.id;
    let textContent = text.value;
    let ul2 = document.getElementById("reviews-list");
    //   ul2.innerText = "";

    let li2 = document.createElement("li");
    li2.className = "list-group-item";
    li2.textContent = textContent;
    ul2.appendChild(li2);

    fetch(getURL + "/" + shoeId + "/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({ content: textContent })
    })
        .then(res => res.json())
        // .then(getByIDCall(shoeId))
        .then(res => console.log(res))
        .catch(err => console.log(err));
}