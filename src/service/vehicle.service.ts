import { IVehicle, IVehicleSearchArgs } from "@interface";
import { VehicleModel } from "@models";

export const createVehicleService = async (vehicle: IVehicle) => {
    let data: IVehicle = await VehicleModel.create(vehicle);
    return data;
}

export const loadVehicleService = async (data: IVehicleSearchArgs) => {
    let sort: any = {}
    if (data.sortKey == null || data.sortKey == undefined) {
        sort['createdAt'] = data.sortValue ?? 1;
    } else {
        sort[`${data.sortKey}`] = data.sortValue ?? 1;
    }
    console.log(sort);
    let vehicle: IVehicle[] = await VehicleModel.find(data.query).sort(sort).limit(data.limit).skip(data.skip);
    let count: number = await VehicleModel.count(data.query);
    return { count, vehicle };
}

export const deleteVehicleService = async (vId: string) => {
    await VehicleModel.findByIdAndRemove(vId);
    return;
}

export const updateVehicleService = async (query: any, data: any) => {
    let vehicle: IVehicle | any = await VehicleModel.findOneAndUpdate(query, data, { new: true });
    return vehicle;
}