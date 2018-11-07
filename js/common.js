const products = [
	{
		id: 1,
		name: "A thing",
		price: 900,
		img: "strawberry-banana.jpg",
		category: "Smoothie"
	},
	{
		id: 2,
		name: "Another thing",
		price: 900,
		img: "strawberry-banana.jpg",
		category: "Smoothie"
	},
	{
		id: 3,
		name: "A thing",
		price: 900,
		img: "strawberry-banana.jpg",
		category: "Smoothie"
	},
	{
		id: 4,
		name: "Another thing IIIIIIASSIIIIdsasdad",
		price: 900,
		img: "strawberry-banana.jpg",
		category: "Smoothie"
	},
	{
		id: 5,
		name: "A thing",
		price: 900,
		img: "nice-bread.png",
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
	// stores cart to cookie
	var cartString = JSON.stringify(cart);
	console.log(cartString);
	document.cookie = "cart="+btoa(cartString)+";";
}

function getCookie(key) {
    // helper: gets cookie with input key
    // source: https://stackoverflow.com/questions/10730362/get-cookie-by-name
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

function getTotalItemsInCart() {
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
    cart = [];
    renderCart();
    storeCart();
    updateCartCounter();
}

function openCheckout() {
    showDialog("Checkout", '<p>Checkout?</p>');
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
    
    var dialog = document.querySelector(".dialog");

    var checkoutButtons = dialog.getElementsByClassName("checkout-btn");
    var emptyCartButtons = dialog.getElementsByClassName("empty-cart-btn");

    for (var i = 0; i < checkoutButtons.length; i++) {
        checkoutButtons[i].removeEventListener('click', openCheckout);
        checkoutButtons[i].addEventListener('click', openCheckout);
    }

    for (var i = 0; i < emptyCartButtons.length; i++) {
        checkoutButtons[i].removeEventListener('click', emptyCart);
        emptyCartButtons[i].addEventListener('click', emptyCart);
    }
}

function showCartDialog() {
    showDialog("Cart", '<div class="cart"></div>', '<button class="checkout-btn">Checkout</button><button class="empty-cart-btn">Empty cart</button><button class="close-dialog-btn">Close</button>', renderCart);
}

function hideDialog() {
	document.querySelector("body").classList.remove("dialog-visible");
}

function showDialog(title, contentHtml, footerHtml, onRenderCallback) {
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

loadCart();

var openCartButtons = document.getElementsByClassName("show-cart-btn");
	
for (var i = 0; i < openCartButtons.length; i++) {
    openCartButtons[i].addEventListener('click', showCartDialog);
    var cartCounter = document.createElement("span");
    cartCounter.innerText = getTotalItemsInCart();
    cartCounter.classList.add("cart-counter");
    openCartButtons[i].appendChild(cartCounter);
}
