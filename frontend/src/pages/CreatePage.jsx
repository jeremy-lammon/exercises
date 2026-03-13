import React from "react";

function CreatePage() {
    const [name, setName] = React.useState("");
    const [reps, setReps] = React.useState(1);
    const [weight, setWeight] = React.useState(1);
    const [unit, setUnit] = React.useState("");
    const [date, setDate] = React.useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newExercise)
        });
        if (response.status === 201) {
            console.log("Created new exercise:", newExercise);
        } else {
            alert(`Failed to create exercise. Status code: ${response.status}`);
        }
    };


    return (
        <>
            <h1> Create Exercise </h1>
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
                        <input type="text" name="unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
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

export default CreatePage;