import React from 'react';
import ExerciseTable from '../components/ExerciseTable';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);

    const navigate = useNavigate();

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
        setExerciseToEdit(exercise);
        navigate('/edit');
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
            <h2> Exercises </h2>
            <ExerciseTable exercises={exercises} onEdit={onEdit} onDelete={onDelete} />
        </>
    )
}

export default HomePage;