/* 
	images are licensed under creative commons.
	names are (mostly) randomly generated. 
*/

const products = [
	{
		id: 1,
		name: "Spearmint Crystal",
		price: 120,
		img: "green-drink.jpg",
		category: "Smoothie"
	},
	{
		id: 2,
		name: "River Wave",
		price: 107,
		img: "yellow-drink.jpg",
		category: "Smoothie"
	},
	{
		id: 3,
		name: "Arctic Walk",
		price: 39,
		img: "strawberry-banana.jpg",
		category: "Smoothie"
	},
	{
		id: 4,
		name: "Gentle Blizzard",
		price: 49,
		img: "orange-drink.jpg",
		category: "Smoothie"
	},
	{
		id: 5,
		name: "Our Bread",
		price: 60,
		img: "rye-bread.jpg",
		category: "Bread"
	},
	{
		id: 6,
		name: "Wet Sour",
		price: 40,
		img: "bread-rolls-2.jpg",
		category: "Bread"
	},
	{
		id: 7,
		name: "Rough Touch",
		price: 471,
		img: "bread-rolls.jpg",
		category: "Bread"
	}
];

const dialogTemplateHtml = '' +
    '<div class="dialog">' +
        '<div class="dialog-header"><h4 class="dialog-title"></h4><button class="close-dialog-btn">x</button></div>' +
        '<div class="dialog-content">' +
            '<p>test</p>' +
        '</div>' +
        '<div class="dialog-footer"></div>' +
    '</div>';

var cart = [];

function storeCart() {
	/* stores cart to cookie */
	var cartString = JSON.stringify(cart);
	console.log(cartString);
	document.cookie = "cart="+btoa(cartString)+";";
}

function getCookie(key) {
	/* 
		helper: gets cookie with input key
		source: https://stackoverflow.com/questions/10730362/get-cookie-by-name 
	*/
	var value = "; " + document.cookie;
	var parts = value.split("; " + key + "=");
	if (parts.length == 2) {
		return parts.pop().split(";").shift();;
	}
}

function loadCart() {
	/* loads cart from stored cookie */
	var cartCookie = getCookie("cart");
	if (cartCookie) {
		var cartString = atob(getCookie("cart"));
		console.log("Cart cookie: " + cartString);
		if (cartString) {
			cart = JSON.parse(cartString);
		}
	}
}

function getTotalItemsInCart() {
	/* returns the total amount of items in the cart. */
    var itemCount = 0;
    for (var i = 0; i < cart.length; i++) {
        itemCount += cart[i].count;
    }
    return itemCount;
}

function updateCartCounter() {
    var cartCounters = document.getElementsByClassName("cart-counter");
    for (var i = 0; i < cartCounters.length; i++) {
        cartCounters[i].innerText = getTotalItemsInCart();
    }
}

function emptyCart() {
	/* clears the cart variable and updates the cart if it is open. */
	cart = [];
	if (document.querySelector(".dialog-visible .cart")) {
		renderCart();
	}
    storeCart();
    updateCartCounter();
}

function renderCheckoutToString() {
	return "";
}

function showCheckoutSuccessDialog() {
	return "";
}

function showCheckoutDialog() {
    showDialog("Checkout", '<p>Checkout?</p>');
}

function getCartItemCount(itemId) {
	/* gets the amount we have of an item, if we have it in the cart. */
	var item = getItemData(itemId, cart);
	if (item) {
		return item.count;
	}
	return 0;
}

function getItemData(itemId, target) {
	/* gets the data associated with a product stored in our products list */
	var item = target.filter(e => e.id === itemId);
	if (item.length > 0) {
		return item[0];
	}
	return false;
}

function renderCart() {
	/* renders cart from cart variable */
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
    
    var dialog = document.querySelector(".dialog");

    var checkoutButtons = dialog.getElementsByClassName("checkout-btn");
    var emptyCartButtons = dialog.getElementsByClassName("empty-cart-btn");

    for (var i = 0; i < checkoutButtons.length; i++) {
        checkoutButtons[i].removeEventListener('click', showCheckoutDialog);
        checkoutButtons[i].addEventListener('click', showCheckoutDialog);
    }

    for (var i = 0; i < emptyCartButtons.length; i++) {
        emptyCartButtons[i].removeEventListener('click', showEmptyCartDialog);
        emptyCartButtons[i].addEventListener('click', showEmptyCartDialog);
    }
}

function showEmptyCartDialog() {
	/* ask the user to confirm that they want to empty their cart */
	showDialog("Confirm", '<p>Are you sure you wish to empty your cart?</p>', '<button onclick="emptyCart();hideDialog();">Yes, empty my cart</button> <button class="close-dialog-btn">Cancel</button>');
}

function showCartDialog() {
    showDialog("Cart", '<div class="cart"></div>', '<button class="checkout-btn">Checkout</button> <button class="empty-cart-btn">Empty cart</button> <button class="close-dialog-btn">Close</button>', renderCart);
}

function hideDialog() {
	document.querySelector("body").classList.remove("dialog-visible");
}

function showDialog(title, contentHtml, footerHtml, onRenderCallback) {
	/* 
		shows a dialog window.
		title: shows up in the title of the dialog.
		contentHtml: any html, shows up in the dialog body.
		footerHtml: any html, shows up in the footer. contains a close button by default.
		onRenderCallback: function, runs after the dialog is finished rendering. useful for adding buttons.
	*/

    var body = document.querySelector("body");

    if (!document.querySelector(".dialog-backdrop")) {
        var dialogContainer = document.createElement("div");
		dialogContainer.className = "dialog-backdrop";
		dialogContainer.innerHTML = dialogTemplateHtml;
		body.appendChild(dialogContainer);   
	}
	
	var dialog = document.querySelector(".dialog");
    
    if (body.classList.contains("dialog-visible") && !dialog.classList.contains("dialog-hidden")) {
        /* hide current dialog, open new one after a timeout */
        dialog.classList.add("dialog-hidden");
        setTimeout(function(){ showDialog(title, contentHtml, footerHtml, onRenderCallback); }, 500);
        return;
    }
	
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
    dialog.classList.remove("dialog-hidden");
}

function renderFileToContainer(url, containerSelector, callback) {
	/*
		gets the contents of the .html file at the specified url,
		and puts it in the container specified by the CSS selector
		containerSelector. the callback function is run after that
		is done. an usage example is at the bottom of this file.
	*/

	fetch("./"+url).then(function (response) {
		return response.text();
	}).then(function (html) {
		document.querySelector(containerSelector).innerHTML = html;
		if (callback) {
			callback();
		}
	});
}

function renderFinishedCallback() {
	/* code that we want to run after the header/footer has finished loading goes here */

	/* bind cart button onclick to open cart, add cart item counters */
	var openCartButtons = document.getElementsByClassName("show-cart-btn");
	
	for (var i = 0; i < openCartButtons.length; i++) {
		openCartButtons[i].addEventListener('click', showCartDialog);

		/* check whether button already has a cart item counter, add one if not */
		if (!openCartButtons[i].querySelector(".cart-counter")) {
			var cartCounter = document.createElement("span");
			cartCounter.innerText = getTotalItemsInCart();
			cartCounter.classList.add("cart-counter");
			openCartButtons[i].appendChild(cartCounter);
		}
	}	
}

loadCart();

renderFileToContainer("shared-html/header.html", "header", renderFinishedCallback);

renderFileToContainer("shared-html/footer.html", "footer", renderFinishedCallback);