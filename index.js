import data from "/data.js"

// console.log(data)
const main = document.getElementById("main")
const sec1 = document.getElementById("s1")
const grid = document.getElementById("grid")
const about = document.getElementById("about")

about.addEventListener("click", function(){
    main.innerHTML = `
        <div class="about-me">
            <div class="img-intro">
                <img class="my-photo" src="/images/my_photo.jpg" alt="Yashwanth posing stylishly"/>
                <p>
                    Hi! I'm <span class="my-name">Yashwanth Kesthur Shankar</span>, an 
                    <strong>aspiring Frontend Developer</strong> passionate about crafting 
                    <strong>beautiful, functional, and user-friendly web experiences</strong>.  
                    I specialize in <strong>HTML, CSS, JavaScript</strong>, and modern frameworks 
                    like <strong>React</strong>, bringing <strong>creative designs to life</strong> 
                    with <strong>smooth animations</strong> and <strong>seamless interactivity</strong>.
                </p>            
            </div>
            <p>
                My journey into <strong>frontend development</strong> started with a <strong>deep curiosity</strong>  
                about how websites work and a love for <strong>clean, intuitive design</strong>.  
                Now, I continuously <strong>sharpen my skills</strong>, exploring <strong>new technologies</strong>  
                and <strong>best practices</strong> to create <strong>responsive, high-performance websites</strong>.
            </p>
            <p>
                When I'm not coding, you'll find me <strong>exploring UI/UX trends</strong>, 
                <strong>building side projects</strong>, or <strong>learning about web accessibility</strong> 
                to make the internet more inclusive for everyone. I'm excited about <strong>growing in the field</strong> 
                and <strong>collaborating on projects</strong> that push the boundaries of web development.
            </p>
        </div>
    `
})

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
