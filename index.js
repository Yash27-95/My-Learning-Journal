import data from "/data.js"

// console.log(data)

const sec1 = document.getElementById("s1")
const grid = document.getElementById("grid")

document.addEventListener("click", function(e){
    handleEvent(e)
} )

document.addEventListener("keydown", function(e){
    handleEvent(e)
} )

function handleEvent(e){
    if(e.target.id) {
        renderPage(e.target.id)
        window.scrollTo({ top: 0, behavior: "smooth" });
    
    } else if(e.target.dataset.id){
        renderPage(e.target.dataset.id)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

}

function renderPage(id) {
    const matchingPost = data.find(post => post.id == id)
    const {date, heading, description, image, list} = matchingPost

    const listContent = list.map(content => {
        return `
            <h3>${content.list_heading}</h3>
            <p>${content.list_description}</p>
        `
    })
    
    sec1.innerHTML = `
        <div class="page">
            <span class="date">${date}</span>
            <h1>${heading}</h1>
            <p>${description}</p>
            <img 
                src="${image}" 
                alt="image representing the page ${heading}"
            />
            <div class="sub-content">
                ${listContent.join('')}
            </div>
        </div>
        <h4>Recent Posts</h4>
    `
}

function renderlist() {
    const listContent = data.map(item => {
        const {id, date, heading, description, image, title} = item 
        return `
            <div
                class="card ${title}"
                id=${id}
            >
                <img 
                    src=${image}
                    class="card-img"
                    alt="graphic implementation of ${heading}"
                />
                <span class="date">${date}</span>    
                <h2>${heading}</h2>
                <p>${description.slice(0, 80)}... <span class="visit" data-id=${id} tabindex="0">Read</span></p>
            </div>
        `
    })

    listContent.forEach(element => {
        grid.innerHTML += element
    })
}

function renderFeatured() {
    const featuredContent = data.map(item => {
        const {description, heading, id, image, date, isFeatured} = item

        let trimmedDescr = description.split(/[.!?]/)[0]

        if(isFeatured){
            return `
                <div 
                    class="featured" 
                    data-id=${id}
                    style="background-image: url(${image})"
                    tabindex="0"
                    >
                    <span class="date">${date}</span>
                    <h1 data-id=${id}>${heading}</h1>
                    <p>${trimmedDescr.trim()}.</p>
                    </div>
                    `
                }
            })[0]
    
    sec1.innerHTML = featuredContent
}

function render() {
    renderFeatured() 
    renderlist()   
}

render()
