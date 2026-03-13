import React from 'react';
import ExerciseRow from './ExerciseRow';

function ExerciseTable({ exercises, onEdit, onDelete }) {

    return (
        <table className="exercise-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise) => (
                    <ExerciseRow key={exercise._id} exercise={exercise} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </tbody>
        </table>
    );
}

export default ExerciseTable;