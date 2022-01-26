import TeamsService from "./teams.service";
import {
  InternalServerError,
  InvalidPathParameterError,
  BodyMissingRequiredFieldError,
} from "../utils/errors";

const TeamsController = {
  insert: async (req, res) => {
    const { name, country } = req.body;
    if (!name || !country) {
      return new BodyMissingRequiredFieldError().send(res);
    }
    try {
      res.status(201).json(await TeamsService.insert({ ...req.body }));
    } catch (err) {
      return new InternalServerError(err.message).send(res);
    }
  },

  getAll: async (req, res) => {
    try {
      res.status(200).json(await TeamsService.getAll());
    } catch (err) {
      return new InternalServerError(err.message).send(res);
    }
  },

  getById: async (req, res) => {
    if (!parseInt(req.params.id))
      return new InvalidPathParameterError().send(res);
    try {
      res.status(200).json(await TeamsService.getById(parseInt(req.params.id)));
    } catch (err) {
      return new InternalServerError(err.message).send(res);
    }
  },

  update: async (req, res) => {
    if (!parseInt(req.params.id))
      return new InvalidPathParameterError().send(res);
    const { name, country } = req.body;
    if (!name || !country) return new BodyMissingRequiredFieldError().send(res);

    try {
      res
        .status(200)
        .json(
          await TeamsService.update(parseInt(req.params.id), { ...req.body })
        );
    } catch (err) {
      return new InternalServerError(err.message).send(res);
    }
  },

  deleteById: async (req, res) => {
    if (!parseInt(req.params.id))
      return new InvalidPathParameterError().send(res);
    try {
      await TeamsService.deleteById(parseInt(req.params.id));
      res.sendStatus(200);
    } catch (err) {
      return new InternalServerError(err.message).send(res);
    }
  },
};

export default TeamsController;
