const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

posts.forEach(function (object, index) {
    // select the row element in the html page
    let rowElement = document.querySelector(".row");
    // convert data from US to EU format
    let temp = object.created.split("-");
    let dataEu = `${temp[2]}-${temp[1]}-${temp[0]}`
    // add element on page
    rowElement.innerHTML += `<div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        <img class="profile-pic" src="${object.author.image}" alt="${object.author.name}">                    
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${object.author.name}</div>
                        <div class="post-meta__time">${dataEu}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${object.content}</div>
            <div class="post__image">
                <img src="${object.media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button js-like-button" href="#" data-postid="${object.id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${object.id}" class="js-likes-counter">${object.likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>`
    // remove the null img and replace it with full name initials
    const postMeta = document.querySelectorAll(".post-meta__icon");
    if (object.author.image == null) {
        // with this string i split the string in two elements, use map to cicle all and get only the first letter of the two elements, than join it into string
        let initials = object.author.name.split(" ").map((n) => n[0]).join("");
        // remove and add div element that will replace null imgs. Add css that are already on css file
        postMeta[index].removeChild;
        postMeta[index].innerHTML = `<div class="profile-pic-default"><span class="profile-pic">${initials}</span></div>`
    }
});
// create empty array for the id counts
const arrayID = [];
// select all like buttons and counters
const likeBtnElement = document.querySelectorAll(".like-button");
const likeCount = document.querySelectorAll(".js-likes-counter");

// for all like btns add an event listenere that will checks if likes btn are already press.
likeBtnElement.forEach((like, index) => {
    like.addEventListener("click", (e) => {

        // create this variable for the boolean conditions
        const isLiked = like.classList.contains("like-button--liked");
        // prevent a link to scroll up the page 
        e.preventDefault();
        // this will get the datasets that already in the html page
        const postID = like.dataset.postid;
        // create an index to match the index of the array
        const indexOf = arrayID.indexOf(postID);

        // if btn is already press, decrement counter and remove class 
        if (isLiked) {
            likeCount[index].innerHTML--;
            like.classList.remove("like-button--liked");
            // also if arrayID includes postID variable value, remove from the array the indexof postID
            if (arrayID.includes(postID)) {
                arrayID.splice(indexOf, 1);
            }
        }
        // otherwise, increment counter and add class, also push id of the liked post in the arrayID
        else {
            likeCount[index].innerHTML++;
            like.classList.add("like-button--liked");
            arrayID.push(postID);
        }
    })
})
