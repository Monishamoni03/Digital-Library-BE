import mongoose from "mongoose";

const schemaRole = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model("roles", schemaRole);