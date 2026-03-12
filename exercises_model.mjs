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
    reps: { type: int, required: true },
    weight: { type: int, required: true },
    unit: { type: String, required: true },
    date: { type: Date, required: true }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);


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

const createExercise = async (name, reps, weight, unit, date) => {

    if (typeof name !== 'string' || typeof unit !== 'string' || typeof reps !== 'number' || typeof weight !== 'number' || typeof date !== 'string') {
        throw Error("Invalid data types for creating an exercise.");
    }

    if (!isDateValid(date)) {
        throw Error("Invalid date format. Please use MM-DD-YY.");
    }

    if (name.length < 1 || (unit !== 'lbs' && unit !== 'kgs') || reps < 1 || weight < 1) {
        throw Error("Invalid values for creating an exercise.");
    }

    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });

    return exercise.save();
}

const getExercises = async () => {
    return Exercise.find({});
}

const findExercises = async (filter) => {
    const query = Exercise.find(filter);
    return query;
}

const updateExercise = async (_id, name, reps, weight, unit, date) => {
    let update = {};
    if (name) {
        if (typeof name !== 'string' || name.length < 1) {
            throw Error("Invalid name for updating an exercise.");
        }
        update.name = name;
    }
    if (reps) {
        if (typeof reps !== 'number' || reps < 1) {
            throw Error("Invalid reps for updating an exercise.");
        }
        update.reps = reps;
    }
    if (weight) {
        if (typeof weight !== 'number' || weight < 1) {
            throw Error("Invalid weight for updating an exercise.");
        }
        update.weight = weight;
    }
    if (unit) {
        if (typeof unit !== 'string' || (unit !== 'lbs' && unit !== 'kgs')) {
            throw Error("Invalid unit for updating an exercise.");
        }
        update.unit = unit;
    }
    if (date) {
        if (typeof date !== 'string' || !isDateValid(date)) {
            throw Error("Invalid date for updating an exercise.");
        }
        update.date = date;
    }

    const result = await Exercise.updateOne({ _id: _id }, update);
    if (result.matchedCount === 0) {
        throw Error(`No exercise found with _id: ${_id}`);
    } else {
        return await findExercises({ _id: _id });
    }
}

export { connect, createExercise, getExercises, findExercises, updateExercise };