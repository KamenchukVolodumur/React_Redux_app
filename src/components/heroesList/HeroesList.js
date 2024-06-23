import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterAndHeroesSelector } from '../../reducers/heroesSlice';
import { fetchHeroes } from '../../reducers/heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {activeFilter, heroes}=useSelector(filterAndHeroesSelector)
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHeroes());
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        arr = arr.map(({id, element, ...props}) => {
            if (activeFilter=="all"){
                return <HeroesListItem key={id} id={id} element={element} {...props}/>
            }else if (activeFilter==element){
                return <HeroesListItem key={id} id={id} element={element }{...props}/>
            }
        })
        return arr
    }
    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;