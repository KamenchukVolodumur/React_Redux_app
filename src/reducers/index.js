const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'Delate':
            console.log(state)
            let heroes = state.heroes.filter((hero) => hero.id !== action.id)
            return {
                ...state,
                heroes: heroes
            }
        case 'Add':
            console.log(action.hero)

            return {
                ...state,
                heroes: action.hero
                
            }
        default: return state
    }
}

export default reducer;