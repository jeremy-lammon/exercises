import React from 'react';
import ExerciseTable from '../components/ExerciseTable';
import { useState } from 'react';
import { useEffect } from 'react';

function HomePage() {
    const [exercises, setExercises] = useState([]);
    const fetchExercises = async () => {
        const response = await fetch('/exercises');
        console.log("URL:", response.url);
        const data = await response.json();
        setExercises(data);
    }
    useEffect(() => {
        fetchExercises();
    }, []);

    const onEdit = (exercise) => {
        console.log("Edit exercise:", exercise);
    }
    const onDelete = async (id) => {
        const response = await fetch(`/exercises/${id}`, { method: "DELETE" });
        if (response.status === 204) {
            console.log("Deleted exercise with id:", id);
            await fetchExercises();
        } else {
            console.error("Failed to delete exercise with id:", id, "Status code:", response.status);
        }
    }

    return (
        <>
            <h1> Exercises </h1>
            <ExerciseTable exercises={exercises} onEdit={onEdit} onDelete={onDelete} />
        </>
    )
}

export default HomePage;