import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String },
    passwordHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
export default model('User', UserSchema);
//# sourceMappingURL=User.js.map