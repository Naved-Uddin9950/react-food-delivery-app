import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const Search = ({ placeholder }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const searchProducts = async (queryText) => {
        try {
            const productsRef = collection(db, 'products');
            const querySnapshot = await getDocs(productsRef);
            const results = querySnapshot.docs
                .map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                .filter(product =>
                    product.name.toLowerCase().includes(queryText.toLowerCase())
                );

            return results;
        } catch (error) {
            console.error("Error searching products: ", error);
            return [];
        }
    };

    const handleSearch = async (event) => {
        const queryText = event.target.value;
        setSearchQuery(queryText);
        if (queryText.trim()) {
            const results = await searchProducts(queryText);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        setSearchResults([]);
        setSearchQuery('');
    };

    const { t } = useTranslation();

    return (
        <div className="relative">
            <label htmlFor="search" className="absolute top-1 left-1">
                <i className="fa-solid fa-magnifying-glass text-black"></i>
            </label>
            <input
                type="search"
                name="q"
                id="search"
                autoComplete="off"
                className="border rounded-xl shadow py-1 pl-6 w-full md:w-40 dark:text-black"
                placeholder={t('Header.search_placeholder')}
                value={searchQuery}
                onChange={handleSearch}
            />
            {searchResults.length > 0 && (
                <ul className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg w-full z-10">
                    {searchResults.map(product => (
                        <li key={product.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <button
                                onClick={() => handleProductClick(product.id)}
                                className="w-full text-left px-4 py-2"
                            >
                                {product.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
