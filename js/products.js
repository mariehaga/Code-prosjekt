var products = [
	{
		id: 1,
		name: "A thing",
		price: 900,
		img: "strawberry-banana.jpg",
		category: "smouthie"
	},
	{
		id: 2,
		name: "Another thing",
		price: 900,
		img: "strawberry-banana.jpg",
		category: "smouthie"
	},
	{
		id: 3,
		name: "A thing",
		price: 900,
		img: "strawberry-banana.jpg",
		category: "smouthie"
	},
	{
		id: 4,
		name: "Another thing IIIIIIASSIIIIdsasdad",
		price: 900,
		img: "strawberry-banana.jpg",
		category: "smouthie"
	},
	{
		id: 5,
		name: "A thing",
		price: 900,
		img: "strawberry-banana.jpg",
		category: "bread"
	}
];

var productsInDemand = [];

var productsDiv = document.getElementById("productsDiv");

var filterList = document.getElementById("filterList");
filterArray = [];

for (var i = 0; i < products.length; i++) {
	console.log(products[i].category);
	if (filterArray.indexOf(products[i].category) > -1) {
		console.log("already exists");
	}
	else {
		filterArray.push(products[i].category);
	}
}

console.log(filterArray);

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

displayFilter = function () {
	for (var i = 0; i < filterArray.length; i++) {
		var li = document.createElement("li");
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox",
		checkbox.id = filterArray[i];
		checkbox.value = filterArray[i];
		var textField = document.createElement("label");
		textField.innerHTML = capitalizeFirstLetter(filterArray[i]);
		textField.htmlFor = filterArray[i];
		li.appendChild(checkbox);
		li.appendChild(textField);

		filterList.appendChild(li);

		bindCheckbox(checkbox, filterArray[i])
	}
}

var categoryArrayInDemand = []

bindCheckbox = function (checkbox, category) {
	checkbox.onchange = function () {
		productsInDemand = [];
		var index = categoryArrayInDemand.indexOf(category);
		console.log(index);
		if (checkbox.checked == true) {
			if (categoryArrayInDemand.indexOf(category)<0) {
				categoryArrayInDemand.push(category);
			}
			else {
				console.log("already exists");
			}

		}
		else {
			categoryArrayInDemand.splice(categoryArrayInDemand.indexOf(category), 1);
		}
		console.log(categoryArrayInDemand);

		for (var i = 0; i < categoryArrayInDemand.length; i++) {
			for (var j = 0; j < products.length; j++) {
				if (products[j].category == categoryArrayInDemand[i]) {
					console.log(products[j]);
					productsInDemand.push(products[j]);
				}
			}
		}

		if (productsInDemand.length == 0) {
			displayProducts(products);
		}
		else  {
			displayProducts(productsInDemand);
		}
	}
}


displayFilter()

displayProducts = function (products) {

	productsDiv.innerHTML = "";

	for (var i = 0; i < products.length; i++) {

		var containerElement = document.createElement("div");
		containerElement.className = "containerElement";

		var element = document.createElement("div");
		element.className = "element";

		var textElements = document.createElement("div");
		textElements.className = "textElements";

		var picture = document.createElement("img");
		picture.src = "img/" + products[i].img;
		picture.alt = "Picture of " + products[i];

		element.appendChild(picture);


		var textField = document.createElement("span");
		textField.className = "textField";
		textField.innerHTML = products[i].name + ", " + products[i].price + " NOK: " ;

		var inputField = document.createElement("input");
		inputField.className = "inputField";
		inputField.type = "number";
		inputField.min = 0;
		inputField.placeholder = 0;

		textElements.appendChild(textField);
		textElements.appendChild(inputField);

		element.appendChild(textElements);

		var button = document.createElement("button");
		button.innerHTML = "Add to cart";

		textElements.appendChild(button);

		containerElement.appendChild(element)
		productsDiv.appendChild(containerElement);
		bindAddToCart(button, products[i], inputField)
	}
}


bindAddToCart = function (button, product, input) {
	button.onclick = function () {

		if (input.value > 0) {
			console.log(input.value);

			//Reset input-value
			input.value = "";
			input.placeholder = 0;

			//Audun, her skal det legges inn i handlekurven
		}
		else {
			console.log("no value")
		}
	}
}

displayProducts(products);

var cart = [];

/*
function loadCart() {
	// loads cart from stored cookie
	var cartString = getCookie("cart");
	console.log("Cart cookie: " + cartString);
	if (cartString) {
		cart = JSON.parse(cartString);
	}
	renderCart();
}

function getCookie(key) {
	// helper: gets cookie with input key
	var value = "; " + document.cookie;
	var parts = value.split("; " + key + "=");
	if (parts.length == 2) {
		return parts.pop().split(";").shift();;
	}
}

function renderCart() {
	// renders cart from cart variable
	const cart_container = document.querySelector(".cart");
	const list = document.createElement("ul");
	cart_container.innerHTML = "";
	cart_container.appendChild(list);
	for (i = 0; i < cart.length; i++) {
		const li = document.createElement("li");
		const itemData = getItemData(cart[i].id, products);
		li.innerText = itemData.name + " (" + cart[i].count + ")";
		list.appendChild(li);
	}
}

function storeCart() {
	// stores cart to cookie
	var cartString = JSON.stringify(cart);
	console.log(cartString);
	document.cookie = "cart="+btoa(cartString)+";";
}

function addToCart() {
	// adds clicked item to cart
	var item = this;
	var itemId = parseInt(item.dataset.productId);
	var existingItem = cart.filter(e => e.id === itemId);
	if (existingItem.length != 0) {
		//product exists, increment count
		existingItem[0].count++;
	} else {
		var newItem = {
			id: itemId,
			count: 1
		};
		cart.push(newItem);
	}
	storeCart();
	renderCart();
}

function setCartItemCount(itemId) {
	var item = getItemData(itemId, cart);
	if (item) {
		if (count < 1) {
			
		}
	}
	renderCart();
}

function getCartItemCount(itemId) {
	var item = getItemData(itemId, cart);
	if (item) {
		return item.count;
	}
	return 0;
}

function getItemData(itemId, target) {
	var item = target.filter(e => e.id === itemId);
	if (item.length > 0) {
		return item[0];
	}
	return false;
}

var cartButtons = document.getElementsByClassName("add-to-cart");
for(var i = 0; i < cartButtons.length; i++)
{
   cartButtons[i].onclick = addToCart;
}

loadCart();
*/