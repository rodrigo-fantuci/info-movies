const urlApi = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e7063b0b3862abb221912557713e4474&language=pt-BR&region=BR'
const imgPath = 'https://image.tmdb.org/t/p/w1280'
const searchApi = 'https://api.themoviedb.org/3/search/movie?api_key=e7063b0b3862abb221912557713e4474&query="'

const input = document.getElementById('input')
const inputArea = document.querySelector('.input-area')
const movies = document.querySelector('.movies')
const navBtn = document.getElementById('hamburger')
const navUl = document.getElementById('nav-ul')

getMovies(urlApi)

window.addEventListener('click', () => {
  if (input === document.activeElement) {
    inputArea.classList.add('active')
  } else {
    inputArea.classList.remove('active')
  }
})

navBtn.addEventListener('click', () => navUl.classList.toggle('show'))

async function getMovies(url) {
  const response = await fetch(url)
  const data = await response.json()

  showMovies(data.results)
}

async function showMovies(data) {
  const movieCount = data.length
  const numberMovies = document.getElementById('movie-count')
  numberMovies.innerText = `(${movieCount})`


  data.forEach(movie => {
    const movieCard = document.createElement('div')
    movieCard.classList.add('movie-card')

    const { backdrop_path, overview, poster_path, release_date, title, vote_average } = movie

    const count = 40
    let titleMax;

    if (title.length > count) {
      titleMax = title.slice(0, count) + '...'
    }

    movieCard.innerHTML = `
      <div class="rating">
        <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M13.7299 3.51L15.4899 7.03C15.7299 7.52 16.3699 7.99 16.9099 8.08L20.0999 8.61C22.1399 8.95 22.6199 10.43 21.1499 11.89L18.6699 14.37C18.2499 14.79 18.0199 15.6 18.1499 16.18L18.8599 19.25C19.4199 21.68 18.1299 22.62 15.9799 21.35L12.9899 19.58C12.4499 19.26 11.5599 19.26 11.0099 19.58L8.01991 21.35C5.87991 22.62 4.57991 21.67 5.13991 19.25L5.84991 16.18C5.97991 15.6 5.74991 14.79 5.32991 14.37L2.84991 11.89C1.38991 10.43 1.85991 8.95 3.89991 8.61L7.08991 8.08C7.61991 7.99 8.25991 7.52 8.49991 7.03L10.2599 3.51C11.2199 1.6 12.7799 1.6 13.7299 3.51Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        ${vote_average}
      </div>
      <div class="image"><img src="${imgPath + poster_path}"></div>
      <h4>${title.length > count ? titleMax : title}</h4>
  `

    movies.appendChild(movieCard)
  })
}