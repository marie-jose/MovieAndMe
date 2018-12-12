// Store/Reducers/favoriteReducer.js

const initialState = { visitedFilm: [] }

function toggleVisited(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'TOGGLE_VISITED':
      const visitedFilmIndex = state.visitedFilm.findIndex(item => item.id === action.value.id)
      if (visitedFilmIndex !== -1) {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          visitedFilm: state.visitedFilm.filter( (item, index) => index !== visitedFilmIndex)
        }
      }
      else {
        // Le film n'est pas dans les films favoris, on l'ajoute à la liste
        nextState = {
          ...state,
          visitedFilm: [...state.visitedFilm, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleVisited
