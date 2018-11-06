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

var categoryArrayInDemand = [];

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


displayFilter();

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
		inputField.min = 1;
		inputField.value = 1;
		inputField.placeholder = 1;

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

			addToCart(product, input.value);

			//Reset input-value
			input.value = 1;
			input.placeholder = 1;
		}
		else {
			console.log("no value");
		}
	}
}

displayProducts(products);