import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// give the user of this rating session a unique user ID
const uuid = uuidv4()
const ratingModal = document.getElementById("rating-modal")

// when the user clicks on a star, turn that star and all the stars before it yellow
document.addEventListener('click', handleRatingClick)

function handleRatingClick(e) {
    // if user gives a rating
    if (e.target.dataset.rating) {
        // get all the stars
        const ratingStars = e.target.parentElement.children

        // in case user wants to change rating, clear previous rating
        for (const star of ratingStars) {
            star.classList.remove('rated')
        }
        // reset the timer on making the rating modal disappear, as a change in the rating is going to be made
        ratingModal.classList.remove('disappear')
        ratingModal.offsetWidth /* trigger reflow */

        // highlight only the stars that equate to the rating the user gave
        for (let i = 0; i < e.target.dataset.rating; i++) {
            ratingStars[i].classList.add('rated')
        }

        // make modal disappear after 5s after click
        ratingModal.classList.add('disappear')
    }
}

function getRatingHtml(userId) {
    const ratingHtml = `
        <div id="rating-${userId}" class="rating">
            <i class="fa-solid fa-star" data-rating="1"></i>
            <i class="fa-solid fa-star" data-rating="2"></i>
            <i class="fa-solid fa-star" data-rating="3"></i>
            <i class="fa-solid fa-star" data-rating="4"></i>
            <i class="fa-solid fa-star" data-rating="5"></i>
        </div>
    `
    return ratingHtml
}

function renderRatingModal(userId) {
    ratingModal.classList.remove("hide")
    // put the rating feature in a modal
    ratingModal.innerHTML += getRatingHtml(userId)
}

export { uuid, renderRatingModal }