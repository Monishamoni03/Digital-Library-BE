import packages from 'mongoose';
const { Schema, model } = packages;
const schema = Schema;

const roleSchema = new schema({
    roleType: {
        type: String,
        required: true,
    }
})

export default model("role", roleSchema);