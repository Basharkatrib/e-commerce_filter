import { Fragment, useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import './Categories.css';
import Checkbox from '../Checkbox/Checkbox';


export default function Categories() {
    const [categories, setCategories] = useState([]);
    const { data, loading, error } = useFetch("/categories?populate=*");

    useEffect(() => {
        data && setCategories(data);
        console.log(categories);
    }, [data]);


    return (
        <div className="categorie_togler">
            {loading ? "Loading" : categories.map(categories => (
                <Fragment key={categories.id}>
                    <div className="togle">
                        <Checkbox category={categories} />

                    </div>
                </Fragment>


            ))}

        </div>

    );
}