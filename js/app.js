function fetchComponent(url, attr = url) {
  fetch(`./html/${url}.html`)
    .then(res => res.text()
      .then(block => document.querySelector(attr).innerHTML = block))
}

document.addEventListener("DOMContentLoaded", ready);

function ready() {
  fetchComponent("header")
  fetchComponent("container-top", "#container-top")
  fetchComponent("aside")
  fetchComponent("footer")
  getCards()
}

function getCards() {
  fetch("./catalogs.json").then(res => res.json()).then(card => {
    const nMain = document.querySelector('main')
    const nPagination = document.querySelector('#pagination')
    const divCard = document.createElement('div')

    divCard.id = "cards"
    divCard.classList.add('row', "pe-0")

    card.forEach(item => {
      const { title, imgNum, brand, organic, top, oldPrice, newPrice, geo, userAvatar, userName } = item
      let innerOrganic = `<span class="badge badge-organic">organic</span>`
      let innerTop = `<span class="badge badge-top float-start">ТОП</span>`

      organic ? innerOrganic : innerOrganic = ''
      top ? innerTop : innerTop = ''

      nMain.insertBefore(divCard, nPagination).innerHTML += `
    <div class="col-4 py-3">
    <div class="card p-1">
      <div class="top pb-3">
        ${innerOrganic}
        <i class="bi bi-heart d-flex justify-content-end"></i>
        <img class="card-img-top" src="./img/goods(${imgNum}).png"
          alt="${title}">
          ${innerTop}
      </div>
      <div class="card-body d-flex flex-column justify-content-end">
        <div class="row">
          <div class="card-brand">${brand}</div>
          <h4 class="card-title">${title}</h4>
        </div>
        <div class="row mt-3">
          <div class="col">
            <div class="text-decoration-line-through text-muted fs-5">${oldPrice}</div>
            <div class="card-price">${newPrice} </div>
          </div>
          <div class="col-8 d-flex flex-column justify-content-end align-items-end">
            <div class="fs-5"><i class="bi bi-geo-alt-fill"></i>${geo}</div>
            <div class="card-user"><img src="./img/users/avatar-${userAvatar}.png" class="" alt="user">${userName}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    `
    })
  })
}

// pagination
const nPagination = document.querySelector('.pagination')
nPagination.addEventListener("click", pagination)

function pagination(e) {
  const paginations = nPagination.querySelectorAll('li')
  const prev = nPagination.querySelector('.prev')
  const next = nPagination.querySelector('.next')

  console.log(prev);
  console.log(e.target.textContent);

  if (e.target == prev) {

      const last = nPagination.querySelector('.active .page-link')
      console.log(last.textContent);
      // last.textContent - 1
      reset()
      paginations.forEach(i => {
        if (i.textContent == last.textContent - 1) {
          i.classList.add("active")
        }
      })

  } else if (e.target == next) {
    alert('next')
    reset()

  } else {
    reset()
    e.target.closest(".page-item").classList.add("active")
  }

  function reset() {

    paginations.forEach(i => {
      i.classList.remove("active")
    })
  }

  //   function prev(){

  //   console.log()
  // }
}