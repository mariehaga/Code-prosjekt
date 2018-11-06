const products = [
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

const dialogTemplateHtml = '' +
    '<div class="dialog-backdrop">' +
        '<div class="dialog">' +
            '<div class="dialog-header"><h4 class="dialog-title"></h4><button class="close-dialog-btn">x</button></div>' +
            '<div class="dialog-content">' +
                '<p>test</p>' +
            '</div>' +
            '<div class="dialog-footer"></div>' +
        '</div>' +
    '</div>';

var cart = [];

function getCookie(key) {
	// helper: gets cookie with input key
	var value = "; " + document.cookie;
	var parts = value.split("; " + key + "=");
	if (parts.length == 2) {
		return parts.pop().split(";").shift();;
	}
}

function loadCart() {
	// loads cart from stored cookie
	var cartString = atob(getCookie("cart"));
	console.log("Cart cookie: " + cartString);
	if (cartString) {
		cart = JSON.parse(cartString);
	}
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

function renderCart() {
	// renders cart from cart variable
	const cart_container = document.querySelector(".cart");
	cart_container.innerHTML = "<p>Your cart is empty.</p>";
	if (cart.length > 0) {
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
}

function showCartDialog() {
	showDialog("Cart", '<div class="cart"></div>', "", renderCart);
}

function hideDialog() {
	document.querySelector("body").classList.remove("dialog-visible");
}

function showDialog(title, contentHtml, footerHtml, onRenderCallback) {
	var body = document.querySelector("body");
	
	if (!document.querySelector(".dialog")) {
        var dialogContainer = document.createElement("div");
		dialogContainer.className = "dialog-backdrop";
		dialogContainer.innerHTML = dialogTemplateHtml;
		body.appendChild(dialogContainer);   
	}
	
	var dialog = document.querySelector(".dialog");
	var dialogContainer = document.querySelector(".dialog-backdrop");
	
	var outputTitle = 'Dialog';
	var outputContentHtml = '<p>No content specified</p>';
	var outputFooterHtml = '<button class="close-dialog-btn">Close</button>';
	
	if (title && title.length > 0) {
		outputTitle = title;
	}
	
	if (contentHtml && contentHtml.length > 0) {
		outputContentHtml = contentHtml;
	}
	
	if (footerHtml && title.length > 0) {
		outputFooterHtml = footerHtml;
	}
	
	dialog.querySelector(".dialog-title").innerHTML = outputTitle;
	dialog.querySelector(".dialog-content").innerHTML = outputContentHtml;
	dialog.querySelector(".dialog-footer").innerHTML = outputFooterHtml;
	
	var closeButtons = dialog.getElementsByClassName("close-dialog-btn");
	
	for (var i = 0; i < closeButtons.length; i++) {
		 closeButtons[i].addEventListener('click', hideDialog);
	}
	
	dialogContainer.addEventListener('click', hideDialog);
	dialog.addEventListener('click', function(e){e.stopPropagation();});
	
	if (onRenderCallback) {
		onRenderCallback();
	}
	
	body.classList.add("dialog-visible");
}

loadCart();

var openCartButtons = document.getElementsByClassName("show-cart-btn");
	
for (var i = 0; i < openCartButtons.length; i++) {
    openCartButtons[i].addEventListener('click', showCartDialog);
}
