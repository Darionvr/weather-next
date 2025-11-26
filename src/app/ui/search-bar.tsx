'use client'

import { startTransition, Suspense, useActionState, useState } from "react";
import { Places } from "../lib/definitions";
import { getWeather, searchPlacesAction } from "../lib/actions";
import { SearchError } from "./search-error";
import { WeatherData } from "../lib/definitions";
import styles from '@/app/ui/styles/searchbar.module.css';
import { useDebouncedCallback } from "use-debounce";
import SkeletonDropdown from "./skeleton";
import ResultsList from "./result-list";

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

    const handleSearch = useDebouncedCallback((term: string) => {
        setShowResults(true);
        const formData = new FormData();
        formData.append('place', term);

        startTransition(() => {
            formAction(formData);
        });
    }, 300);


    return (
        <div>

            <form action={formAction} className={styles.form}>
                <input
                    type="text"
                    name="place"
                    placeholder='Ingresa un lugar'
                    defaultValue={formState.results[0]?.name ?? ''}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }} />

                {showResults && (
                    <Suspense fallback={<SkeletonDropdown />}>
                        {formState.results.length > 0 ? (
                            <ResultsList results={formState.results} onSelect={handleSelectPlace} />
                        ) : (
                            !formState.error && <p>No se encontraron lugares. Intenta con otro nombre.</p>
                        )}
                    </Suspense>
                )}

                <button onClick={() => setShowResults(true)}> Search</button>
                <SearchError error={formState.error ? [formState.error] : undefined} />


            </form>

        </div>
    )
}

export default SearchBar