/**
 * Jeremy Lammon
 */
import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});


/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

app.post('/exercises', asyncHandler(async (req, res) => {
    const { name, reps, weight, unit, date } = req.body;
    if (typeof name !== 'string' || typeof unit !== 'string' || typeof reps !== 'number' || typeof weight !== 'number' || typeof date !== 'string' || !isDateValid(date) || name.length < 1 || (unit !== 'lbs' && unit !== 'kgs') || reps < 1 || weight < 1) {
        res.status(400).json({ Error: "Invalid request" });
        return;
    }
    const exercise = await exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date);
    res.status(201).json(exercise);
}));

app.get('/exercises', asyncHandler(async (req, res) => {
    const allExercises = await exercises.getExercises();
    res.status(200).json(allExercises);
}))

app.get('/exercises/:id', asyncHandler(async (req, res) => {
    const exercise = await exercises.getExerciseById(req.params.id);
    if (exercise) {
        res.status(200).json(exercise);
    } else {
        res.status(404).json({ Error: "Not found" });
    }
}))

app.put('/exercises/:id', asyncHandler(async (req, res) => {
    const { name, reps, weight, unit, date } = req.body;
    if (name) {
        if (typeof name !== 'string' || name.length < 1) {
            res.status(400).json({ Error: "Invalid request" });
            return;
        }
    }
    if (reps) {
        if (typeof reps !== 'number' || reps < 1) {
            res.status(400).json({ Error: "Invalid request" });
            return;
        }
    }
    if (weight) {
        if (typeof weight !== 'number' || weight < 1) {
            res.status(400).json({ Error: "Invalid request" });
            return;
        }
    }
    if (unit) {
        if (typeof unit !== 'string' || (unit !== 'lbs' && unit !== 'kgs')) {
            res.status(400).json({ Error: "Invalid request" });
            return;
        }
    }
    if (date) {
        if (typeof date !== 'string' || !isDateValid(date)) {
            res.status(400).json({ Error: "Invalid request" });
            return;
        }
    }
    const exercise = await exercises.updateExercise(req.params.id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date);
    if (exercise === null) {
        res.status(404).json({ Error: "Not found" });
        return;
    }
    res.status(200).json(exercise);
}))

app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    const result = await exercises.deleteExercise(req.params.id);
    if (result.deletedCount === 0) {
        res.status(404).json({ Error: "Not found" });
    } else {
        res.status(204).send();
    }
}))