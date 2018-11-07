function addToCart(item, count) {
    console.log(item);
    console.log(item.id);
    console.log(count);
    setCartItemCount(item.id, getCartItemCount(item.id) + parseInt(count));
}

function setCartItemCount(itemId, count) {
	var item = getItemData(itemId, products);
	if (item) {
		if (count > 0) {
            var existingItem = cart.filter(e => e.id === itemId);
            if (existingItem.length != 0) {
                /* product exists, set count */
                existingItem[0].count = count;
            } else {
                var newItem = {
                    id: itemId,
                    count: count
                };
                cart.push(newItem);
            }
            storeCart();
		} else {
            var existingItem = cart.filter(e => e.id === itemId);
            if (existingItem.length != 0) {
                /* remove item if it exists */
                cart.splice(cart.indexOf(existingItem), 1);
            }
        }
        updateCartCounter();
	}
}