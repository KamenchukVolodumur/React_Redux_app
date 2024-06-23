
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом
import Spinner from '../spinner/Spinner';
import { useHttp } from '../../hooks/http.hook';
import { useCallback, useEffect } from "react";
import {changeActiveFilter} from "../../reducers/filtersSlice";
import {fetchFilters, selectAll } from "../../reducers/filtersSlice"
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';
const HeroesFilters = () => {

    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchFilters())
    }, [])
    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderFilters = (arr) => {
        let items = arr.map(({ name, className, label}) => {
            if (activeFilter==name) {
                 return(<button onClick={(e) => dispatch(changeActiveFilter(e.target.id))} key={name} id={name} className={className + " btn active"}>{label}</button>)
                } else{
                    return(<button onClick={(e) => dispatch(changeActiveFilter(e.target.id))} key={name} id={name} className={className + " btn"}>{label}</button>)
                }
        })
        return(items)
    }
    const items = renderFilters(filters)
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {items}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;