import { menuArray } from "./data.js";
const menu = document.getElementById("menu-container")
const orderSummary = document.getElementById("order-summary")
const orderedItemsContainer = document.getElementById("ordered-items")
const totalOrderPrice = document.getElementById("total-price")
let orderArray = []

// listen for user clicks to menu items
document.addEventListener("click", (e) => {
    if(e.target.dataset.add) {
        addItem(e.target.dataset.add)
    } else if(e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    } 
})

// update new rendered order
function updateOrder() {
    renderOrder()
}

// add item to order
function addItem(itemId) {
    const itemObj = menuArray.filter(item => {
        return item.id.toString() === itemId
    })[0]
    itemObj.quantity++
    itemObj.totalprice = itemObj.price * itemObj.quantity
    if(!orderArray.includes(itemObj)) {
        orderArray.push(itemObj)
    }
    updateOrder()
}

// remove item from order
function removeItem(itemId) {
    const itemObj = menuArray.filter(item => {
        return item.id.toString() === itemId
    })[0]
    if(itemObj.quantity > 0) {
        itemObj.quantity--
    itemObj.totalprice = itemObj.price * itemObj.quantity
    }
    orderArray = orderArray.filter(item => {
        return item.quantity > 0
    })
    updateOrder()
}

// render order to screen
function renderOrder() {
    if(orderArray) {
        orderSummary.style.visibility = "visible"
        let orderItems = ""
        let orderTotal = 0
        orderArray.forEach(item => {
            orderItems += `
            <div class="order-item">
                <h3 class="order-item-title">${item.name}</h3>
                <p class="quantity">Quantity: ${item.quantity}</p>
                <button id="remove-btn" class="remove-btn" data-remove="${item.id}">remove</button>
                <p class="order-item-price">$ ${item.totalprice}</p>
            </div>
            `
            orderTotal += item.totalprice
        })
        orderedItemsContainer.innerHTML = orderItems
        totalOrderPrice.textContent = `$ ${orderTotal}`
    }
}

// render menu items to screen
function renderMenu() {
    return menuArray.forEach(item => {
        menu.innerHTML+=
            `<div class="menu-item">
                <p class="emoji">${item.emoji}</p>
                <div class="menu-item-info-container">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <p class="menu-item-ingredients">${item.ingredients}</p>
                    <p class="price">$${item.price}</p>
                </div>
                <button class="add-btn" data-add="${item.id}">+</button>
            </div>`
    })
}

renderMenu()