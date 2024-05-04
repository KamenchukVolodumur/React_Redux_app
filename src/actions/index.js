export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const delate = (id) =>{
    return{
        type: 'Delate',
        id:id
    }
}

export const add = (hero) =>{
    return{
        type:'Add',
        hero:hero
    }
}