// /components/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';

import "../styles/SearchBar.css"

export default function SearchBar() {

    const router = useRouter();

    const [query, setQuery] = useState(''); // État pour stocker ce que l'utilisateur tape
    const [suggestions, setSuggestions] = useState([]); // État pour stocker les suggestions de l'API

    const [location, setLocation] = useState('');
    // État pour gérer le thème sélectionné
    const [theme, setTheme] = useState(''); // <-- Thème sélectionné
    const themes = ['Escape Game', 'Team Building', 'Murder Party', 'Jeu de Piste']; // <-- Liste des thèmes

    const [date, setDate] = useState('');
    const [results, setResults] = useState([]);
    const [nbPersonnes, setNbPersonnes] = useState('');





    // Fonction pour récupérer les suggestions d'adresse depuis l'API data.gouv.fr
    const fetchSuggestions = async (inputValue) => {
        if (inputValue.length > 2) { // On ne lance la requête que si l'utilisateur a tapé plus de 2 caractères
            try {
                // Appel à l'API data.gouv.fr avec la valeur tapée
                const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${inputValue}&type=municipality&autocomplete=1`);
                const data = await response.json(); // Conversion de la réponse en JSON
                setSuggestions(data.features); // Mise à jour des suggestions avec les résultats de l'API
            } catch (error) {
                console.error("Erreur lors de la récupération des suggestions :", error);
            }
        } else {
            setSuggestions([]); // Si la saisie est trop courte, réinitialiser les suggestions
        }
    };

    // Utiliser useEffect pour lancer la requête chaque fois que l'utilisateur tape quelque chose
    useEffect(() => {
        fetchSuggestions(query); // Appeler fetchSuggestions à chaque modification de la valeur de query
    }, [query]); // Déclencher l'effet lorsque `query` change

    // Fonction appelée lorsqu'une suggestion est sélectionnée
    const handleSelect = (suggestion) => {
        setQuery(suggestion.properties.label); // Met à jour le champ avec la suggestion sélectionnée
        setSuggestions([]); // Réinitialiser les suggestions après sélection
        console.log('Adresse sélectionnée :', suggestion.properties.label); // Affiche l'adresse sélectionnée dans la console
    };



    // Fonction pour gérer la soumission du formulaire
    const handleSearch = () => {
        // Construire l'URL de redirection avec les critères de recherche
        router.push({
            pathname: '/activity/searchResults',
            query: {
                location: searchLocation,
                theme: selectedTheme,
                participants: numberOfPeople,
                date: selectedDate
            }
        });
    };

    // Fonction pour gérer le changement dans le champ thème
    const handleThemeChange = (event) => {
        setTheme(event.target.value); // Met à jour le thème sélectionné
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Code de redirection ou de traitement après la recherche
    //     console.log('Adresse:', adresse);
    //     console.log('Thème:', theme); // Affiche le thème sélectionné
    //   };



    return (
        <div className="search-container">
            {/* Champ de saisie pour l'adresse */}
            <form onSubmit={handleSearch}>
                <div>
                    <input
                        type="text"
                        placeholder="Tapez une adresse..."
                        value={query} // Le champ de saisie affiche la valeur de `query`
                        onChange={(e) => setQuery(e.target.value)} // Mettre à jour l'état `query` lorsque l'utilisateur tape
                    />

                    {/* Affichage des suggestions sous le champ de saisie */}
                    {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.properties.id} // Clé unique pour chaque suggestion
                                    onClick={() => handleSelect(suggestion)} // Lorsque l'utilisateur clique, on sélectionne la suggestion
                                    className="suggestion-item"
                                >
                                    {suggestion.properties.label} {/* Affiche le libellé de la suggestion */}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Sélecteur de thème */}
                {/* Dropdown pour les thèmes */}
                <select value={theme} onChange={handleThemeChange}>
                    <option value="" disabled>
                        Sélectionnez un thème
                    </option>
                    {themes.map((t, index) => (
                        <option key={index} value={t}>
                            {t}
                        </option>
                    ))}
                </select>

                {/* Champ de recherche pour le nombre de personnes */}
                <input
                    type="number"
                    placeholder="Nombre de personnes"
                    value={nbPersonnes}
                    onChange={(e) => setNbPersonnes(e.target.value)}
                />

                {/* Sélecteur de date */}
                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    placeholderText="Sélectionnez une date"
                    dateFormat="dd/MM/yyyy"
                />

                <button type="submit">Rechercher</button>
            </form>


        </div>
    );
}
