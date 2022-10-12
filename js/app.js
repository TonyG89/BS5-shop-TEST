
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
  rangeSlider()
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
    <div class="card p-4">
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

const rangeSlider = () => {
  const fromSlider = document.querySelector('#fromSlider');
  const toSlider = document.querySelector('#toSlider');
  const fromInput = document.querySelector('#fromInput');
  const toInput = document.querySelector('#toInput');

  if (toInput == null) {
    let time = 0
    time += 100
    setTimeout(rangeSlider, time)
  }

  function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C4C7C7', '#8E9192', controlSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromSlider.value = from;
    }
  }

  function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C4C7C7', '#8E9192', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
    }
  }

  function controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C4C7C7', '#8E9192', toSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromInput.value = from;
    }
  }

  function controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, '#C4C7C7', '#8E9192', toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
      toSlider.value = from;
    }
  }

  function getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max - to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
      ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
      ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
  }

  function setToggleAccessible(currentTarget) {
    const toSlider = document.querySelector('#toSlider');
    if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = 2;
    } else {
      toSlider.style.zIndex = 0;
    }
  }


  fillSlider(fromSlider, toSlider, '#C4C7C7', '#8E9192', toSlider);
  setToggleAccessible(toSlider);

  fromSlider.addEventListener("input", () => controlFromSlider(fromSlider, toSlider, fromInput))
  toSlider.addEventListener("input", () => controlToSlider(fromSlider, toSlider, toInput))
  fromInput.addEventListener("input", () => controlFromInput(fromSlider, fromInput, toInput, toSlider))
  toInput.addEventListener("input", () => controlToInput(toSlider, fromInput, toInput, toSlider))
}

