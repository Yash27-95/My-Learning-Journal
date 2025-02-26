import data from "/data.js"

// console.log(data)

const sec1 = document.getElementById("s1")
const grid = document.getElementById("grid")

// document.addEventListener("click", function(e){   
//     if(e.target.dataset.featured === "ai" || e.target.id === "ai"){
//         renderAi()
//     }
// } )

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
                <p>${description.slice(0, 80)}... <span class="visit">Read</span></p>
            </div>
        `
    })

    listContent.forEach(element => {
        grid.innerHTML += element
    })
    // console.log(listContent)
}

function renderFeatured() {
    const featuredContent = data.map(item => {
        const {description, heading, id, image, date, isFeatured} = item

        let trimmedDescr = description.split(/[.!?]/)[0]

        if(isFeatured){
            return `
                <div 
                    class="featured" 
                    data-featured=${id}
                    style="background-image: url(${image})"
                    >
                    <span class="date">${date}</span>
                    <h1>${heading}</h1>
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
