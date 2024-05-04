
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { heroesFetching, heroesFetched, heroesFetchingError, delate, add } from '../../actions';
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();
    const updateHeroes = (values) => {
        const hero = {
            id: uuidv4(),
            name: values.name,
            description: values.text,
            element: values.element
        }
        request(`http://localhost:3001/heroes`, "POST", JSON.stringify(hero))
            .then(dispatch(add(hero)))
            .catch(err => console.log(err));
    }
    
    return (
        <Formik
            initialValues={{
                name: "",
                text: "",
                element: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("This field is reqiured"),
                text: Yup.string().required("This field is reqiured"),
            })}
            onSubmit={values => updateHeroes(values)}
        >

            <Form className="border p-4 shadow-lg rounded" >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Как меня зовут?" />
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        name="text"
                        className="form-control"
                        id="text"
                        placeholder="Что я умею?" />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field
                        className="form-select"
                        id="element"
                        name="element"
                        as="select">
                        <option >Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option>
                    </Field>
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik >
    )
}

export default HeroesAddForm;