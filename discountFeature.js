import { totalOrderPrice as totalOrderPriceEl, orderArray, renderOrder } from "./index.js"

// keeps track of the UNIQUE ordered items from the menu, doesn't take quantity of the items into account
let uniqueOrderedItems = []

document.addEventListener('click', function(e) {
    const targetItem = e.target.dataset.emoji

    // add the food the user wants to add to their order to uniqueOrderedItems only if it is not in the array yet
    if (e.target.dataset.add && !uniqueOrderedItems.includes(targetItem)) {
        uniqueOrderedItems.push(targetItem)
        applyDiscount()
    }

    // if the item is removed from the order COMPLETELY (i.e. its quantity = 0)
    if (e.target.dataset.remove && !orderArray.includes(targetItem)) {
        // remove it from uniqueOrderedItems
        uniqueOrderedItems = uniqueOrderedItems.filter(function(item) {
            return item !== targetItem
        })
        applyDiscount()
    }
})

function applyDiscount() {
    // if the size of uniqueOrderedItems > 1 and 🍺 (beer aka a drink) is in there, offer the user a 15% discount on the total price
    if (uniqueOrderedItems.length > 1 && uniqueOrderedItems.includes('🍺')) {
        const previousTotal = Number(totalOrderPriceEl.textContent.replace(/[^0-9.-]+/g,"")); // removed the "$" from the total
        totalOrderPriceEl.textContent = `$ ${ (previousTotal * 0.85).toFixed(2) }`
    } 
    // Else, restore original price
    else {
        renderOrder()
    }
}