import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "user",
        required: true
    }
});

export default mongoose.model("roles", roleSchema);