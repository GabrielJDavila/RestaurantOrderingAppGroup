// initializing certain variables for easier access
import { menuArray } from "./data.js";
import { uuid, renderRatingModal } from "./ratingFeature.js";

const menu = document.getElementById("menu-container")
const orderSummary = document.getElementById("order-summary")
const orderedItemsContainer = document.getElementById("ordered-items")
const totalOrderPrice = document.getElementById("total-price")
const paymentModal = document.getElementById("payment-modal")
const paymentForm = document.getElementById("payment-form")
const messageContainer = document.getElementById("message-container")
const inputName = document.getElementById("name")
// orderArray is going to store elements from menuArray. We use this
// so we can iterate over array and manipulate data without tampering with
// menuArray data directly
let orderArray = []
let orderTotal = 0

// listen for user clicks to menu items
document.addEventListener("click", (e) => {
    // if user clicks the add/remove button, passes the corresponding dataset to
    // the function that is called for the add/remove
    // if user clicks complete order, paymentModal is revealed
    if(e.target.dataset.add) {
        addItem(e.target.dataset.add)
    } else if(e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    } else if(e.target.dataset.complete) {
        paymentModal.classList.remove("hide")
    }
})

// once user confirms payment and orders, preventDefault() is used to
// stop the page from reloading. Then 2 functions hideElements() and renderMessage()
// are called. The tasks within each function could all be called within the event
// listener, as the scope is small, but for best practices created their own functions.
paymentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    hideElements()
    renderRatingModal()
    renderMessage()
})

// hides the paymentModal and orderSummary sections after payment is taken
function hideElements() {
    paymentModal.classList.add("hide")
    orderSummary.classList.add("hide")
}

// displays the message with the name the user entered with template literals
function renderMessage() {
    messageContainer.classList.remove("hide")
    messageContainer.innerHTML = `<p class="message-text">Thanks ${inputName.value}! Your order is on its way!</p>`
}

// function to add item to order
function addItem(itemId) {
    // using the find() method, menuItem is the returned item that first
    // matches the itemId in the menuArray to check that the item even exists
    const menuItem = menuArray.find(item => item.id.toString() === itemId)
    if(menuItem) {
        // existingItem is used to make sure that item exists in the orderArray
        const existingItem = orderArray.find(item => item.id === menuItem.id)
        
        // if the item does exist in orderArray, add the quantity of the item by 1.
        // then take then current quantity * the price of each item to get
        // total price
        if(existingItem) {
            existingItem.quantity++
            existingItem.totalprice = existingItem.quantity * menuItem.price
        } else {
            // if item is not in orderArray, create a new object in array with
            // the properties below, and push it to the array.
            const orderItem = {
                ...menuItem,
                quantity: 1,
                totalprice: menuItem.price,
            }
            orderArray.push(orderItem)
        }
        // call renderOrder to update DOM
        renderOrder()
    }
}

// function to remove item from order
function removeItem(itemId) {
    // using the find() method, menuItem is the returned item that first
    // matches the itemId in the menuArray to check that the item even exists
    const menuItem = menuArray.find(item => item.id.toString() === itemId)
    if(menuItem) {
        // existingItem is used to make sure that item exists in the orderArray
        const existingItem = orderArray.find(item => item.id === menuItem.id)
        
        // if the quantity selected item is more than 0, decrement by 1
        // then take then current quantity * the price of each item to get
        // total price
        if(existingItem.quantity > 0) {
            existingItem.quantity--
            existingItem.totalprice = existingItem.quantity * menuItem.price
        }
        // creating a new array filtering out items whose quantity drops to 0
        orderArray = orderArray.filter(item => {
            return item.quantity > 0
        })
        // calling renderOrder to update the DOM
        renderOrder()
    }
}


// function render order to screen
function renderOrder() {
    // This checks to see if orderArray is even valid. If there are no orders,
    // the orderSummary section stays hidden. If hasItems is true, we use a
    // conditional (ternary) operator to set the visibility of orderSummary.
    const hasItems = orderArray.length > 0
    orderSummary.style.visibility = hasItems ? "visible" : "hidden"

    // orderItems is the result of calling map() on menuArray.
    // Creates a new array of strings that are joined together by join().
    const orderItems = orderArray.map(item => `
        <div class="order-item">
            <h3 class="order-item-title">${item.name}</h3>
            <p class="quantity">Quantity: ${item.quantity}</p>
            <button id="remove-btn" class="remove-btn" data-remove="${item.id}" data-emoji="${item.emoji}">remove</button>
            <p class="order-item-price">$ ${item.totalprice}</p>
        </div>
        `
    ).join("")

    // orderTotal uses the reduce() method to calculate the total price of the order.
    orderTotal = orderArray.reduce((total, item) => total + item.totalprice, 0)

    // We set orderItems to the innerHTML of the orderedItemsContainer;
    // And set orderTotal to the textContent of totalOrderPrice
    orderedItemsContainer.innerHTML = orderItems
    totalOrderPrice.textContent = `$ ${orderTotal}`
    
}

// function to render menu items to screen
function renderMenu() {
    // menuItems is the result of calling map() on menuArray.
    // Creates a new array of strings for each item that returned by map()
    // and are joined together by join("").
    const menuItems = menuArray.map(item => `
        <div class="menu-item">
            <p class="emoji">${item.emoji}</p>
            <div class="menu-item-info-container">
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-ingredients">${item.ingredients}</p>
                <p class="price">$${item.price}</p>
            </div>
            <button class="add-btn" data-add="${item.id}" data-emoji="${item.emoji}">+</button>
        </div>`
    ).join("")

    // setting the innerHTML of the menu element to the contents of menuItems
    menu.innerHTML = menuItems
}

renderMenu()

export { totalOrderPrice, orderArray, renderOrder, orderTotal }