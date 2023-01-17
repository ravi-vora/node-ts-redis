import mongoose, { Schema } from 'mongoose';

const dummySchema = new Schema({}, {strict: true})

export const Dummy = mongoose.model('dummy', dummySchema);