import { createSlice } from "@reduxjs/toolkit";

const medicineSlice = createSlice({
    name: 'medicines',
    initialState: {
        medicines: [
            { "id": 1, "name": "Paracetamol", "type": "Analgesic", "price": 5.99, photo: 'https://assets.sainsburys-groceries.co.uk/gol/8075006/1/640x640.jpg' },
            { "id": 2, "name": "Amoxicillin", "type": "Antibiotic", "price": 8.49, photo: 'https://5.imimg.com/data5/SELLER/Default/2023/8/332350358/SI/JT/VF/98283251/amoxicillin-drugs3.jpg' },
            { "id": 3, "name": "Loratadine", "type": "Antihistamine", "price": 7.25, photo: 'https://firstaidsuppliesonline.com/wp-content/uploads/2017/12/p-15349-214470_loratadineAllergyTabs_30box-e1722026035520.jpg' },
            { "id": 4, "name": "Ibuprofen", "type": "Anti-inflammatory", "price": 6.30, photo: 'https://www.pillsorted.com/wp-content/uploads/2023/06/IBUPROFEN20200mg2024.png' },
            { "id": 5, "name": "Metformin", "type": "Antidiabetic", "price": 12.99, photo: 'https://images.ctfassets.net/4w8qvp17lo47/6vXaH4Y5Gw6AMEmASwGkc6/e6ff962a82811e4d160cc2d5c0d8b3cb/metformin-antidiabetic-tablets-science-photo-library.jpg' }
        ],
        ratings: {},
        searchQuery: '',
    },
    reducers: {
        updateRatings: (state, action) => {
            const { id, rating } = action.payload;
            state.ratings[id] = rating;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    },
});

export const medicineReducer = medicineSlice.reducer;
export const { updateRatings, setSearchQuery } = medicineSlice.actions;