import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './medicine.module.css';
import { updateRatings, setSearchQuery } from './medicine.slice';

export const Medicine = () => {

    const medicines = useSelector(state => state.medicines);
    const ratings = useSelector(state => state.ratings);
    const searchQuery = useSelector(state => state.searchQuery);
    const dispatch = useDispatch();

    const handleStarClick = (id, star) => {
        dispatch(updateRatings({ id, rating: star }));
    };

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    const filteredMedicines = medicines.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return <>
        <div className={style.search}>
            <input
                type="text"
                placeholder='Search the medicine...'
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </div>
        <div className={style.tableContainer}>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Ratings</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredMedicines.map(m => (
                            <tr key={m.id}>
                                <td>{m.id}</td>
                                <td>
                                    <img src={m.photo} alt={m.name} className={style.medicinePhoto} />
                                </td>
                                <td>{m.name}</td>
                                <td>{m.type}</td>
                                <td>${m.price}</td>
                                <td>
                                    <div className={style.starRating}>
                                        {
                                            [1, 2, 3, 4, 5].map(star => (
                                                <span
                                                    key={star}
                                                    className={`${style.star} ${ratings[m.id] >= star ? style.filled : ''}`}
                                                    onClick={() => handleStarClick(m.id, star)}
                                                >
                                                    ★
                                                </span>
                                            ))
                                        }
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </>
};