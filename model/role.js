import mongoose from "mongoose";

const schemaRole = new mongoose.Schema({
    roles: {
        type: String,
        required: true
    }
});

export default mongoose.model("Role", schemaRole);