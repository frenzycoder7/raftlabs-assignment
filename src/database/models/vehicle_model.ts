import { IVehicle } from "@interface";
import { UserModelName } from "@modelnames";
import { Model, Schema, Types, model } from "mongoose";
export const vehicleStructure = {
    user: {
        type: Types.ObjectId,
        ref: UserModelName,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    maxSpeed: {
        type: String,
        rwquired: true,
    },
    model: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
};

export const VehicleSchema: Schema<IVehicle> = new Schema(vehicleStructure, {
    timestamps: true,
});

export const VehicleModel: Model<IVehicle> = model<IVehicle>('', VehicleSchema);