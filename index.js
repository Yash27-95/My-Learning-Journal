import data from "/data.js"

// console.log(data)
const main = document.getElementById("main")
const home = document.getElementById("home")
const sec1 = document.getElementById("s1")
const grid = document.getElementById("grid")
const about = document.getElementById("about")
const view = document.getElementById("view")

view.addEventListener("click", function(){

    const cards = listCardsArray(); 

    if(view.innerText === "View More"){
        grid.innerHTML = "";
        cards.forEach(element => {
            grid.innerHTML += element
        })
        view.innerText = "View Less"
        window.scrollTo({ top: grid.scrollHeight, behavior: "smooth" });
    } else if (view.innerText === "View Less"){
        grid.innerHTML = "";
        cards.slice(0, 6).forEach(element => {
            grid.innerHTML += element
        })
        view.innerText = "View More"
        window.scrollTo({ top: grid.scrollHeight, behavior: "smooth" });
    }
})

home.addEventListener("click", function() {
    window.location.href = "/"; // Redirects to the home page
});

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
            <p>🚀 Let's build something amazing together!</p>
            <ul>
                <li><a href="https://www.linkedin.com/in/yashwanth-kesthur-shankar-91641b1a7/" target="_blank"><i class="fa-brands fa-linkedin"></i> LinkedIn</a></li>
                <li><a href="https://discord.com/users/yashwanth9278" target="_blank"><i class="fa-brands fa-discord"></i> Discord</a></li>
                <li><a href="https://www.instagram.com/yashwanth-shankar" target="_blank"><i class="fa-brands fa-instagram"></i> Instagram</a></li>
                <li><a href="https://github.com/Yash27-95" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a></li>
            </ul>
        </div>
    `
})

document.addEventListener("click", function(e){
    if(e.target.id) {
        renderPage(e.target.id)
        // window.scrollTo({ top: 0, behavior: "smooth" });
    
    } else if(e.target.dataset.id){
        renderPage(e.target.dataset.id)
        // window.scrollTo({ top: 0, behavior: "smooth" });
    }
} )

function renderPage(id) {
    const matchingPost = data.find(post => post.id == id)

    if (!matchingPost) {
        console.error("No matching post found for ID:", id);
        // sec1.innerHTML = "<p>Post not found.</p>";
        return;
    }

    const { date, heading, description, image, list } = matchingPost

    const listContent = list.map(content => {
        return `
            <h3>${content.list_heading}</h3>
            <p>${content.list_description}</p>
        `
    }).join('')
    
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
                ${listContent}
            </div>
        </div>
        <h4>Recent Posts</h4>
    `
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// function handleView(){
//     renderlist()
// }

function listCardsArray(){
    return data.map(item => {
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
}

function renderlist() {
    const listContent = listCardsArray()

    listContent.slice(0, 6).forEach(element => {
        grid.innerHTML += element
    })

    view.innerText = "View More"
 
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
                    <button class="cta-btn" id=${id}>Read Article</button>
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
