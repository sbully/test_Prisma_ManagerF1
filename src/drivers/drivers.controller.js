import DriversService from "./drivers.service";
import {
  InternalServerError,
  InvalidPathParameterError,
  BodyMissingRequiredFieldError,
} from "../utils/errors";

const DriversController = {
  insert: async (req, res) => {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      return new BodyMissingRequiredFieldError().send(res);
    }
    try {
      res.status(201).json(await DriversService.insert({ ...req.body }));
    } catch (err) {
      return new InternalServerError(err.message).send(res);
    }
  },

  getAll: async (req, res) => {
    try {
      res.status(200).json(await DriversService.getAll());
    } catch (err) {
      return new InternalServerError(err.message).send(res);
    }
  },

  getById: async (req, res) => {
    if (!parseInt(req.params.id))
      return new InvalidPathParameterError().send(res);
    try {
      res
        .status(200)
        .json(await DriversService.getById(parseInt(req.params.id)));
    } catch (err) {
      return new InternalServerError(err.message).send(res);
    }
  },

  update: async (req, res) => {
    if (!parseInt(req.params.id))
      return new InvalidPathParameterError().send(res);
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName)
      return new BodyMissingRequiredFieldError().send(res);

    try {
      res
        .status(200)
        .json(
          await DriversService.update(parseInt(req.params.id), { ...req.body })
        );
    } catch (err) {
      return new InternalServerError(err.message).send(res);
    }
  },

  deleteById: async (req, res) => {
    if (!parseInt(req.params.id))
      return new InvalidPathParameterError().send(res);
    try {
      await DriversService.deleteById(parseInt(req.params.id));
      res.sendStatus(200);
    } catch (err) {
      return new InternalServerError(err.message).send(res);
    }
  },
};

export default DriversController;
