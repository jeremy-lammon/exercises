import React from "react";

function ExerciseRow({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><button onClick={() => onEdit(exercise)}>Edit</button></td>
            <td><button onClick={() => onDelete(exercise._id)}>Delete</button></td>
        </tr>
    );
}

export default ExerciseRow;