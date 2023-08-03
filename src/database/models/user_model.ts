import { IUser } from "@interface";
import { UserModelName } from "@modelnames";
import { Model, Schema, model } from "mongoose";

export const userStructure = {
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    token: {
        type: String || null,
        default: null,
    },
    password: {
        type: String,
        required: true,
    }
};

const userSchema: Schema<IUser> = new Schema(userStructure, {
    timestamps: true,
});

export const UserModel: Model<IUser> = model<IUser>(UserModelName, userSchema);