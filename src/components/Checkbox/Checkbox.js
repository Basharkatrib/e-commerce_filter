import React, { useContext, useState } from 'react';
import './Checkbox.css';
import StoreContext from '../../hooks/storeContext';
import qs from 'qs';

export default function Checkbox({ category }) {
    const [isChecked, setIsChecked] = useState(false);
    const { filter, setFilter } = useContext(StoreContext);

    const handleChange = () => {
        setIsChecked(!isChecked);

        
        const selectedCategories = isChecked 
            ? filter.selectedCategories.filter(id => id !== category.id)
            : [...filter.selectedCategories, category.id];

        const query = qs.stringify({
            filters: {
                categories: {
                    id: {
                        $in: selectedCategories
                    }
                }
            },
            populate: '*', 
        }, { encode: false }); 

    
        setFilter({
            ...filter,
            selectedCategories,
            query: `/products?${query}`
        });
    };

    return (
        <div className="all">
            <label className="switch">
                <input type="checkbox" checked={isChecked} onChange={handleChange} />
                <span className="slider round"></span>
            </label>
            <p>{category.attributes.title}</p>
        </div>
    );
}
