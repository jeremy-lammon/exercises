import React from 'react';
import ExerciseTable from '../components/ExerciseTable';
import { useState } from 'react';
import { useEffect } from 'react';

function HomePage() {
    const [exercises, setExercises] = useState([]);
    const fetchExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect(() => {
        fetchExercises();
    }, []);
    return (
        <>
            <h1> Exercises </h1>
            <ExerciseTable exercises={exercises} />
        </>
    )
}

export default HomePage;