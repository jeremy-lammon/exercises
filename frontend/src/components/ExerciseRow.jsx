import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
function ExerciseRow({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td><button onClick={() => onEdit(exercise)}><MdEdit /></button></td>
            <td><button onClick={() => onDelete(exercise._id)}><MdDelete /></button></td>
        </tr>
    );
}

export default ExerciseRow;