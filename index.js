import { menuArray } from "./data.js";
const menu = document.getElementById("menu-container")

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
                <button id="add-btn" class="add-btn">+</button>
            </div>`
    })
}

renderMenu()