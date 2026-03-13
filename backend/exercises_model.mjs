/**
 * Jeremy Lammon
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect() {
    try {
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING,
            { dbName: EXERCISE_DB_NAME });
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch (err) {
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: Date, required: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);



const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });

    return exercise.save();
}

const getExercises = async () => {
    return Exercise.find({});
}

const getExerciseById = async (id) => {
    return Exercise.findById(id);
}

const updateExercise = async (_id, name, reps, weight, unit, date) => {
    let update = {};

    if (name) update.name = name;
    if (reps) update.reps = reps;
    if (weight) update.weight = weight;
    if (unit) update.unit = unit;
    if (date) update.date = date;

    const result = await Exercise.updateOne({ _id: _id }, update);
    if (result.matchedCount === 0) {
        return null;
    } else {
        return await getExerciseById(_id);
    }
}

const deleteExercise = async (id) => {
    const result = await Exercise.deleteOne({ _id: id });
    return result.deletedCount > 0;
}

export { connect, createExercise, getExercises, getExerciseById, updateExercise, deleteExercise };