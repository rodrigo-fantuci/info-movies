const body = document.querySelector('body')
const main = document.getElementById('main-page')
const movies = document.querySelector('.movies')
const navBtn = document.getElementById('hamburger')
const navUl = document.getElementById('nav-ul')
const input = document.getElementById('input')
const movieList = []

getData()
highlightInput()

input.addEventListener('keydown', (e) => searchMovie(e.target.value))

navBtn.addEventListener('click', () => navUl.classList.toggle('show'))

async function getData() {
  const url = 'https://api.themoviedb.org/3/discover/movie?api_key=e7063b0b3862abb221912557713e4474&language=pt-BR&sort_by=popularity.desc&include_adult=true&include_video=true&page=1'
  const res = await fetch(url)
  const data = await res.json()
  createMovieCard(data.results)
}

async function createMovieCard(data) {
  const titleCount = 40
  const imgPath = 'https://image.tmdb.org/t/p/w1280'

  data.forEach((movie, idx) => {
    const movieCard = document.createElement('div')
    movieCard.classList.add('movie-card')

    const { poster_path, title, vote_average } = movie

    movieCard.innerHTML = `
      <div class="rating">
        <img src="assets/svg/star.svg">
        ${vote_average}
      </div>
      <div class="image"><img src="${imgPath + poster_path}"></div>
      <h4>${title.length > titleCount ? title.slice(0, titleCount) + '...' : title}</h4>
    `

    movieCard.addEventListener('click', () => {
      createInfoPage(idx)
    })

    movies.appendChild(movieCard)
    movieList.push(movieCard)
  })
}

function createInfoPage(index) {
  localStorage.clear()
  localStorage.setItem('index', JSON.stringify(index))
  open('movie.html', '_self')
}

function highlightInput() {
  const input = document.getElementById('input')
  const inputArea = document.querySelector('.input-area')

  window.addEventListener('click', () => {
    if (input === document.activeElement) {
      inputArea.classList.add('active')
    } else {
      inputArea.classList.remove('active')
    }
})
}

function searchMovie(searchTerm) {
  movieList.forEach(movie => {
    if (movie.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      movie.classList.remove('hide')
    } else {
      movie.classList.add('hide')
    }

    if (!searchTerm) {
      movie.classList.remove('hide')
    }
  })
}