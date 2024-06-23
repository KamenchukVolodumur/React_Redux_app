import { createSlice, createAsyncThunk, createEntityAdapter, createSelector,} from "@reduxjs/toolkit";
import { useHttp } from '../hooks/http.hook';
const heroesAdapter = createEntityAdapter ();
const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus:'idle'
})

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/heroes");
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroCreated: (state, action) => {
            heroesAdapter.addOne(state, action.payload);
        },
        heroDeleted: (state, action) => {
            heroesAdapter.removeOne(state, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => { state.heroesLoadingStatus = 'loading' })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload)
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => { })
    }
});

const { actions, reducer } = heroesSlice;
const {selectAll} = heroesAdapter.getSelectors(state=> state.heroes)

export const filterAndHeroesSelector = createSelector(
    (state)=> state.filters.activeFilter,
    selectAll,
    (activeFilter, heroes)=>{
        return({activeFilter, heroes})
        }
)
export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;