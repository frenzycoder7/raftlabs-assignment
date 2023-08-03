import { createVehicleLogic, deleteVehicleLogic, getVehicleLogic, updateVehicleLogic } from "@logic";
import { authenticateUser, checknotrequiredbody, checkrequiredbody, checkrequiredheaders, checkrequiredquery, filterRequiredKeys, searchQuery } from "@middlewares";
import { vehicleStructure } from "@models";
import { IRouter, Router } from "express";

export const vehicle_routes: IRouter = Router();

vehicle_routes.post(
    '/',
    checkrequiredheaders(['authorization']),
    checkrequiredbody(filterRequiredKeys(vehicleStructure)),
    authenticateUser(false),
    createVehicleLogic,
);

vehicle_routes.get(
    '/',
    checkrequiredheaders(['authorization']),
    checkrequiredquery(['limit', 'page']),
    authenticateUser(false),
    searchQuery(),
    getVehicleLogic,
);

vehicle_routes.delete(
    '/',
    checkrequiredheaders(['authorization']),
    checkrequiredquery(['vid']),
    authenticateUser(false),
    deleteVehicleLogic,
);

vehicle_routes.patch(
    '/',
    checkrequiredquery(['vid']),
    checkrequiredheaders(['authorization']),
    checknotrequiredbody(['createdAt', '_id',]),
    authenticateUser(false),
    updateVehicleLogic,
)