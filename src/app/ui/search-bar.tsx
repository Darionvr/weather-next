'use client'

import { useActionState, useState } from "react";
import { Places } from "../lib/definitions";
import { getWeather, searchPlacesAction } from "../lib/actions";
import { SearchError } from "./search-error";
import { WeatherData } from "../lib/definitions";
import styles from '@/app/ui/styles/searchbar.module.css';

const initialState: { results: Places[]; error?: string } = { results: [] };

type SearchBarProps = {
    onPlaceSelected: (place: Places, data: WeatherData) => void;
};

const SearchBar = ({ onPlaceSelected }: SearchBarProps) => {

    const [showResults, setShowResults] = useState(true);
    const [formState, formAction] = useActionState(searchPlacesAction, initialState);
    console.log("Form state:", formState);

    const handleSelectPlace = async (place: Places) => {
    const data = await getWeather(place.latitude, place.longitude);
    onPlaceSelected(place, data); // enviamos al padre
    setShowResults(false);
  };

    return (
        <div>

            <form action={formAction} className={styles.form}>
                <input
                    type="text"
                    name="place"
                    placeholder='Ingresa un lugar'
                    defaultValue={formState.results[0]?.name ?? ''} />
                <SearchError error={formState.error ? [formState.error] : undefined} />
                <button onClick={ () => setShowResults(true)}> Search</button>

                {showResults && formState.results.length > 0 && (
                    <ul className={styles.results}>
                        {formState.results.map((place, index) => (
                            <li key={index} onClick={() => handleSelectPlace(place)} >
                                {place.name} {place.country && `(${place.country})`} {place.admin1 && `- ${place.admin1}`}
                            </li>
                        ))}
                    </ul>
                )}
                {formState.results.length === 0 && !formState.error && (
                    <p>No se encontraron lugares. Intenta con otro nombre.</p>
                )}


            </form>

        </div>
    )
}

export default SearchBar