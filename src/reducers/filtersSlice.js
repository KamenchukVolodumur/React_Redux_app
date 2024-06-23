import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit"
import { useHttp } from '../hooks/http.hook';
const filtersAdapter = createEntityAdapter();
const initialState = filtersAdapter.getInitialState({
    activeFilter:'all',
    filtersLoadingStatus:'idle'
});
export const fetchFilters = createAsyncThunk(
    'heroes/fetchFilters',
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/filters");
    }
);
const filtersSlice = createSlice({
    name:'filters',
    initialState,
    reducers:{
        changeActiveFilter: (state, action)=>{
            state.activeFilter=action.payload
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase (fetchFilters.pending, state=> {state.filtersLoadingStatus="loading"})
            .addCase (fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                filtersAdapter.setAll(state, action.payload)
            })
            .addCase (fetchFilters.rejected, state => {
                state.filtersLoadingStatus = 'error';
            })
            .addDefaultCase(() => { })
    }
})
// const filters = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FILTERS_FETCHING':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'loading'
//             }
//         case 'FILTERS_FETCHED':
//             return {
//                 ...state,
//                 filters: action.filters,
//                 filtersLoadingStatus: 'idle'
//             }
//         case 'FILTERS_FETCHING_ERROR':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'error'
//             }
//         case 'CHANGE_ACTIVE_FILTER':
//             return{
//                 ...state,
//                 activeFilter:action.target
//             }
//         default: return state
//     }
// }

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)
const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    changeActiveFilter
} = actions;