function fetchComponent(url, attr = url) {
    fetch(`./html/${url}.html`)
        .then(res => res.text()
            .then(block => document.querySelector(attr).innerHTML = block))
}

function ready() {
    fetchComponent("header")
    fetchComponent("container-top", "#container-top")
    fetchComponent("aside")
    fetchComponent("main")
    fetchComponent("footer")
}
document.addEventListener("DOMContentLoaded", ready);

// const hCard = document.querySelector(".")
// const card = document.createElement('div.card')
