import { ISearchQuery } from "@interface";
import { NextFunction, Request, Response } from "express";
import moment from "moment";

export const searchQuery = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            let search = '';
            if (req.query.search) search = req.query.search as string;
            let searchQuery: ISearchQuery = {
                user: req.user._id.toString(),
                $or: [
                    { name: { $regex: search as string, $options: 'i' } },
                    { model: { $regex: search as string, $options: 'i' } },
                    { price: { $regex: search as string, $options: 'i' } },
                    { color: { $regex: search, $options: 'i' } },
                ],
            }

            req.limit = 10;
            req.page = 0;
            if (req.query.limit) {
                req.limit = parseInt(req.query.limit as string);
            }
            if (req.query.page) {
                req.page = parseInt(req.query.page as string);
            }

            if (req.query.startDate && req.query.endDate) {
                searchQuery.createdAt = {
                    $gte: moment(req.query.startDate as string).toDate(),
                    $lte: moment(req.query.endDate as string).toDate(),
                }
            }

            if (req.query.color) {
                searchQuery.color = req.query.color as string;
            }

            if (req.query.model) {
                searchQuery.model = req.query.model as string;
            }
            if (req.query.sortvalue) {
                console.log(req.query.sortvalue)
                req.sort = parseInt(req.query.sortvalue as string);
            }

            if (req.query.sortKey) req.sortKey = req.query.sortKey as string;

            req.page = req.page * req.limit;
            req.searchQuery = searchQuery;
            next();
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
}