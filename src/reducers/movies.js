// Movies Reducer

const moviesReducerDefaultState = [];

export default (state = moviesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_MOVIE_LOCAL':
      return [
        ...state,
        action.movie
      ];
    case 'REMOVE_MOVIE_LOCAL':
      return state.filter(({ id }) => id !== action.id);
    case 'ADD_MOVIE_GLOBAL':
      return [
        ...state,
        action.movie
      ];
    case 'REMOVE_MOVIE_GLOBAL':
      return state.filter(({ id }) => id !== action.id);
    case 'ADD_MOVIE_TO_FAVOURITE':
        return [
            ...state,
            action.movie
        ];
    case 'REMOVE_MOVIE_FROM_FAVOURITE':
        return [
            ...state,
            action.movie
        ];
    case 'EDIT_MOVIE':
      return state.map((movie) => {
        if (movie.id === action.id) {
          return {
            ...movie,
            ...action.updates
          };
        } else {
          return movie;
        };
      });
    case 'SET_MOVIES_LOCAL':
      return action.movies;
    default:
      return state;
  }
};
