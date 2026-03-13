import React from "react";
import { useNavigate } from "react-router-dom";

function EditPage({ exerciseToEdit }) {
    const [name, setName] = React.useState(exerciseToEdit?.name || "");
    const [reps, setReps] = React.useState(exerciseToEdit?.reps || 1);
    const [weight, setWeight] = React.useState(exerciseToEdit?.weight || 1);
    const [unit, setUnit] = React.useState(exerciseToEdit?.unit || "");
    const [date, setDate] = React.useState(exerciseToEdit?.date || "");

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const editedExercise = { name, reps, weight, unit, date };
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedExercise)
        });
        if (response.status === 200) {
            alert("Successfully edited the exercise!");
        } else {
            alert(`Failed to edit exercise. Status code: ${response.status}`);
        }
        navigate('/');
    };


    return (
        <>
            <h2> Edit Exercise </h2>
            <form onSubmit={onSubmit}>
                <fieldset>
                    <legend> Exercise Details </legend>
                    <label>Exercise Name:
                        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <br />
                    <label>Reps:
                        <input type="number" name="reps" value={reps} onChange={(e) => setReps(Number(e.target.value))} />
                    </label>
                    <br />
                    <label>Weight:
                        <input type="number" name="weight" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
                    </label>
                    <br />
                    <label>Unit:
                        <select name="unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
                            <option value="">Select Unit</option>
                            <option value="lbs">lbs</option>
                            <option value="kgs">kgs</option>
                        </select>
                    </label>
                    <br />
                    <label>Date:
                        <input type="text" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </label>
                    <br />
                </fieldset>
                <button >Submit</button>
            </form>
        </>
    );
}

export default EditPage;