import { IVehicle, IVehicleSearchArgs } from "@interface";
import { createVehicleService, deleteVehicleService, loadVehicleService, updateVehicleService } from "@services";
import { Request, Response } from "express";
import { io } from "./../../server";

export const createVehicleLogic = async (req: Request, res: Response) => {
    try {
        let body: IVehicle = req.body;
        body.user = req.user._id;

        let vehicle: IVehicle = await createVehicleService(body);
        
        /// emit to all users that vehicle has been created
        io.to('test-room').emit('RESOURCE_UPDATE', {message: 'New has been created by '+req.user.username+` with details ${vehicle.name} | ${vehicle.model} | ${vehicle.color} | ${vehicle.price}`});
        
        res.status(201).send({ message: 'Vehicle created', vehicle });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        })
    }
}

export const getVehicleLogic = async (req: Request, res: Response) => {
    try {
        let query: IVehicleSearchArgs = {
            query: req.searchQuery,
            limit: req.limit,
            skip: req.page,
            sortKey: req.sortKey as any,
            sortValue: req.sort,
        }
        let data: { count: number, vehicle: IVehicle[] } = await loadVehicleService(query);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message,
        })
    }
}

export const deleteVehicleLogic = async (req: Request, res: Response) => {
    try {
        let { vid } = req.query;
        await deleteVehicleService(vid as string);
        /// emit to all users that vehicle has been deleted
        io.to('test-room').emit('RESOURCE_UPDATE', {message: 'Vehicle with id '+vid+' has been deleted by '+req.user.username});

        res.status(200).send({ message: 'Vehicle deleted' });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        })
    }
}

export const updateVehicleLogic = async (req: Request, res: Response) => {
    try {
        let { vid } = req.query;
        let body: IVehicle = req.body;
        let vehicle: IVehicle | any = await updateVehicleService({ _id: vid }, body);
        /// emit to all users that vehicle has been updated
        io.to('test-room').emit('RESOURCE_UPDATE', {message: 'Vehicle with id '+vid+' has been updated by '+req.user.username});
        res.status(200).send({
            message: 'vehicle updated',
            vehicle,
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
        })
    }
}