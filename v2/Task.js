import  mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
});

export const Task = mongoose.model('Task', TaskSchema);
