
export default function pagination(e) {
    const nPagination = document.querySelector('.pagination')
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