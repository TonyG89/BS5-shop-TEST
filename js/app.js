
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
const nPagination = document.querySelector('.pagination')
nPagination.addEventListener("click", pagination)

function pagination(e) {
  const paginations = nPagination.querySelectorAll('.page-item')
  const prev = nPagination.querySelector('.prev')
  const next = nPagination.querySelector('.next')
  const current = nPagination.querySelector('.active .page-link')

  let prevCurrent = false
  let nextCurrent = false

  if (e.target == prev && (+current.textContent - 1 == 1 || current.textContent == 1)) {
      prevCurrent = true
  }

  if (e.target == next && +current.textContent + 1 == paginations.length) {
      nextCurrent = true
  }

  if (e.target.textContent == 1 || prevCurrent) {
      prev.classList.add("disabled")
      next.classList.remove("disabled")

  } else if (e.target.textContent == paginations.length || nextCurrent) {
      next.classList.add("disabled")
      prev.classList.remove("disabled")
  } else {
      next.classList.remove("disabled")
      prev.classList.remove("disabled")
  }

  if (e.target == prev) {
      reset()
      paginations.forEach(i => {
          if (i.textContent == +current.textContent - 1) {
              i.classList.add("active")
          }
      })
  } else if (e.target == nPagination.firstElementChild) {
      reset()
      current.parentNode.classList.add('active')
      prev.classList.add("disabled")
  }

  else if (e.target == next) {
      reset()
      paginations.forEach(i => {
          if (i.textContent == +current.textContent + 1) {
              i.classList.add("active")
          }
      })
  } else if (e.target == nPagination.lastElementChild) {
      reset()
      current.parentNode.classList.add('active')
      next.classList.add("disabled")
  } else {
      reset()
      e.target.closest(".page-item").classList.add("active")
  }
  function reset() {
      paginations.forEach(i => {
          i.classList.remove("active")
      })
  }
}


// range slider

const setLabel = (lab, value) => {
  const label = document.querySelector(`#slider-${lab}-label`);
  label.text(value);
  const slider = document.querySelector(`#slider-div .${lab}-slider-handle`);
  const rect = slider[0].getBoundingClientRect();
  label.offset({
    top: rect.top - 30,
    left: rect.left
  });
}

const setLabels = (values) => {
  setLabel("min", values[0]);
  setLabel("max", values[1]);
}


document.querySelector('#ex2').slider().addEventListener('slide', function(e) {
  setLabels(e.value);
});

setLabels($('#ex2').attr("data-value").split(","));