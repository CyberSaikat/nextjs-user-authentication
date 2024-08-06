import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        required: [true, 'Name is required'],
        minLength: [3, 'Name must be at least 3 characters'],
        type: Schema.Types.String
    },
    email: {
        required: [true, 'Email is required'],
        unique: true,
        minLength: [3, 'Email must be at least 3 characters'],
        type: Schema.Types.String,
        trim: true,
        lowercase: true,
        validate: {
            validator: (email: string) => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
            },
            message: (props) => `${props.value} is not a valid email`
        }
    },

    password: {
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters'],
        type: Schema.Types.String
    },

    avatar: {
        type: Schema.Types.String,
        required: false
    },

    role: {
        required: false,
        type: Schema.Types.String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    }

});

export default mongoose.models.User || mongoose.model("User", userSchema);