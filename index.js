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

// add item to order
function addItem(itemId, quantityChange) {
    const menuItem = menuArray.find(item => item.id.toString() === itemId)
    if(menuItem) {
        const existingItem = orderArray.find(item => item.id === menuItem.id)
        
        if(existingItem) {
            existingItem.quantity++
            existingItem.totalprice = existingItem.quantity * menuItem.price
        } else {
            const orderItem = {
                id: menuItem.id,
                name: menuItem.name,
                quantity: 1,
                totalprice: menuItem.price
            }
            orderArray.push(orderItem)
        }
        renderOrder()
    }
}

// remove item from order
function removeItem(itemId, quantityChange) {
    const menuItem = menuArray.find(item => item.id.toString() === itemId)
    if(menuItem) {
        const existingItem = orderArray.find(item => item.id === menuItem.id)
        
        if(existingItem.quantity > 0) {
            existingItem.quantity--
            existingItem.totalprice = existingItem.quantity * menuItem.price
        }
        orderArray = orderArray.filter(item => {
            return item.quantity > 0
        })
        renderOrder()
    }
}


// render order to screen
function renderOrder() {
    const hasItems = orderArray.length > 0
    orderSummary.style.visibility = hasItems ? "visible" : "hidden"

    const orderItems = orderArray.map(item => `
        <div class="order-item">
            <h3 class="order-item-title">${item.name}</h3>
            <p class="quantity">Quantity: ${item.quantity}</p>
            <button id="remove-btn" class="remove-btn" data-remove="${item.id}">remove</button>
            <p class="order-item-price">$ ${item.totalprice}</p>
        </div>
        `
    ).join("")

    const orderTotal = orderArray.reduce((total, item) => total + item.totalprice, 0)

    orderedItemsContainer.innerHTML = orderItems
    totalOrderPrice.textContent = `$ ${orderTotal}`
    
}

// render menu items to screen
function renderMenu() {
    const menuItems = menuArray.map(item => `
        <div class="menu-item">
            <p class="emoji">${item.emoji}</p>
            <div class="menu-item-info-container">
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-ingredients">${item.ingredients}</p>
                <p class="price">$${item.price}</p>
            </div>
            <button class="add-btn" data-add="${item.id}">+</button>
        </div>`
    ).join("")

    menu.innerHTML = menuItems
}

renderMenu()