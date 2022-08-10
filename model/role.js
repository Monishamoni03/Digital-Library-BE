import mongoose from "mongoose";

const schemaRole = new mongoose.Schema({
    name: {
        type: String,
        default: "user",
        required: true
    }
});

export default mongoose.model("roles", schemaRole);