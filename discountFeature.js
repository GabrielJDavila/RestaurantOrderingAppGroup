import { totalOrderPrice as totalOrderPriceEl, orderArray, renderOrder, orderTotal } from "./index.js"

// keeps track of the UNIQUE ordered items from the menu, doesn't take quantity of the items into account
let uniqueOrderedItems = []

document.addEventListener('click', function(e) {
    const targetItem = e.target.dataset.emoji

    // add the unique item the user wants to add to their order to uniqueOrderedItems only if it is has not been ordered yet
    if (e.target.dataset.add && !uniqueOrderedItems.includes(targetItem)) {
        uniqueOrderedItems.push(targetItem)
    }

    // when removing items from the order,
    if (e.target.dataset.remove) {
        // if the item is removed from the order COMPLETELY (i.e. its quantity = 0)
        if (!orderArray.find(orderedItem => orderedItem.emoji === targetItem)) {
            // remove it from uniqueOrderedItems
            uniqueOrderedItems = uniqueOrderedItems.filter(function(item) {
                return item !== targetItem
            })
        }
        // re-render the order to the DOM
        renderOrder()
    }

    applyDiscount()
})

function applyDiscount() {
    // if the size of uniqueOrderedItems > 1 and 🍺 (beer aka a drink) is in there, offer the user a 15% discount on the total price
    if (uniqueOrderedItems.length > 1 && uniqueOrderedItems.includes('🍺')) {
        totalOrderPriceEl.textContent = `$ ${ (orderTotal * 0.85).toFixed(2) }`
    }
}