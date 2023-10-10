import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// give this user a unique user ID
const uuid = uuidv4()

// put the rating feature in a modal
// give the user of this rating session a unique user ID
// when the user clicks on a star, turn that star and all the stars before it yellow
    // re-render modal
    // make modal disappear after 1.5s

document.addEventListener('click', function(e) {
    console.log(e)

    const ratingStars = e.target.parentElement.children

    // if user gives a rating
    if (e.target.dataset.rating) {
        // highlight only the stars that equate to that rating
        for (let i = 0; i < e.target.dataset.rating; i++) {
            ratingStars[i].classList.add('rating')
        }
    }
})

function getRating(userId) {
    const ratingHtml = `
        <div id="rating-modal-${userId}" class="modal rating-modal">
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
    const ratingModal = document.getElementById("rating")
    
    ratingModal.classList.remove("hide")
    ratingModal.innerHTML = getRating(userId)
}

export { uuid, renderRatingModal }