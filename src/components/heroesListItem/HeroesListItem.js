import img from "../../assets/hero.png"
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from "react";
import {  heroDeleted } from '../../reducers/heroesSlice';
import {useHttp} from '../../hooks/http.hook';
const HeroesListItem = ({name, description, element, id}) => {
    const {heroes}= useSelector(state=>state.heroes)
    const dispatch = useDispatch();
    let elementClassName;
    const {request} = useHttp();
    console.log(element, id)
    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }
    const onDelete = useCallback((id) => {
        // Удаление персонажа по его id
        console.log(id)
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, []);
    return (
        <li 
            className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
            <img src={img} 
                 className="img-fluid w-25 d-inline" 
                 alt="unknown hero" 
                 style={{'objectFit': 'cover'}}/>
            <div className="card-body">
                
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button onClick={()=>onDelete(id)} type="button" className="btn-close btn-close" aria-label="Close"></button>
            </span>
        </li>
    )
}

export default HeroesListItem;