import { jest } from "@jest/globals";

import TeamsController from "./teams.controller";
import TeamsService from "./teams.service";

jest.mock("./teams.service");

describe("TeamsController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn(),
      sendStatus: jest.fn(),
    };
    res.status.mockReturnValue(res);
  });

  describe("getAll", () => {
    beforeEach(() => {
      TeamsService.getAll = jest.fn();
    });

    it("shoud return an Internal Server Error if TeamsService.getAll throws an error", async () => {
      req.query = {};
      TeamsService.getAll.mockImplementation(() => {
        throw new Error();
      });
      await TeamsController.getAll(req, res);
      expect(TeamsService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        status: "fail",
      });
    });

    it("shoud return a positive response and a JSON array containing all teams", async () => {
      req.query = {};
      const teamsArray = [
        {
          id: 1,
          name: "Alfa Romeo",
          country: "italie",
          createdAt: "2022-01-28T12:25:04.696Z",
          updatedAt: "2022-01-28T12:25:04.696Z",
        },
        {
          id: 2,
          name: "AlphaTauri",
          country: "Italie",
          createdAt: "2022-01-28T12:25:04.696Z",
          updatedAt: "2022-01-28T12:25:04.696Z",
        },
      ];
      TeamsService.getAll.mockReturnValue(teamsArray);
      await TeamsController.getAll(req, res);
      expect(TeamsService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(teamsArray);
    });
  });

  describe("getById", () => {
    beforeEach(() => {
      TeamsService.getById = jest.fn();
    });

    it("should return an Invalid id error if route parameter is missing", async () => {
      req = { params: {} };
      await TeamsController.getById(req, res);
      expect(TeamsService.getById).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid id",
        status: "fail",
      });
    });
    it("should return an Invalid id error if route parameter is invalid", async () => {
      req = { params: { id: "test" } };
      await TeamsController.getById(req, res);
      expect(TeamsService.getById).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid id",
        status: "fail",
      });
    });
    it("should return a Internal Server Error if the TeamsService.getById throw an error", async () => {
      req = { params: { id: 1 } };
      TeamsService.getById.mockImplementation(() => {
        throw new Error();
      });
      await TeamsController.getById(req, res);
      expect(TeamsService.getById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        status: "fail",
      });
    });
    it("should return a positive response and a JSON array containing the selected team", async () => {
      req = { params: { id: 1 } };
      const selectedTeam = {
        id: 1,
        name: "Alfa Romeo",
        country: "italie",
      };
      TeamsService.getById.mockReturnValue(selectedTeam);
      await TeamsController.getById(req, res);
      expect(TeamsService.getById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(selectedTeam);
    });
  });

  describe("insert", () => {
    beforeEach(() => {
      TeamsService.insert = jest.fn();
    });
    it("should return a Body Missing Required Field Error if body is missing a required field (country missing)", async () => {
      req.body = { name: "test" };
      await TeamsController.insert(req, res);
      expect(TeamsService.insert).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Body is missing a required field",
        status: "fail",
      });
    });
    it("should return a Body Missing Required Field Error if body is missing a required field (name missing)", async () => {
      req.body = { country: "test" };
      await TeamsController.insert(req, res);
      expect(TeamsService.insert).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Body is missing a required field",
        status: "fail",
      });
    });
    it("should return an Internal Server Error if the TeamsService.insert throw an error", async () => {
      req.body = { name: "test", country: "test" };
      TeamsService.insert.mockImplementation(() => {
        throw new Error();
      });
      await TeamsController.insert(req, res);
      expect(TeamsService.insert).toHaveBeenCalledWith({ ...req.body });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        status: "fail",
      });
    });
    it("should return a positive response and the team created", async () => {
      req.body = { name: "test", country: "test" };
      const createdTeam = {
        id: 22,
        name: "test",
        country: "test",
        createdAt: "2022-01-28T14:22:30.102Z",
        updatedAt: "2022-01-28T14:22:30.101Z",
      };
      TeamsService.insert.mockReturnValue(createdTeam);
      await TeamsController.insert(req, res);
      expect(TeamsService.insert).toHaveBeenCalledWith({ ...req.body });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdTeam);
    });
  });

  describe("update", () => {
    beforeEach(() => {
      TeamsService.update = jest.fn();
    });
    it("should return an Invalid id error if route parameter is missing", async () => {
      req = { params: {} };
      await TeamsController.update(req, res);
      expect(TeamsService.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid id",
        status: "fail",
      });
    });
    it("should return an Invalid id error if route parameter is invalid", async () => {
      req = { params: { id: "test" } };
      await TeamsController.update(req, res);
      expect(TeamsService.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid id",
        status: "fail",
      });
    });
    it("should return a Body Missing Required Field Error if body is missing a required field (country missing)", async () => {
      req = { params: { id: 1 } };
      req.body = { name: "test" };
      await TeamsController.update(req, res);
      expect(TeamsService.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Body is missing a required field",
        status: "fail",
      });
    });
    it("should return a Body Missing Required Field Error if body is missing a required field (name missing)", async () => {
      req = { params: { id: 1 } };
      req.body = { country: "test" };
      await TeamsController.update(req, res);
      expect(TeamsService.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Body is missing a required field",
        status: "fail",
      });
    });
    it("should return an Internal Server Error if the TeamsService.update throw an error", async () => {
      req = { params: { id: 1 } };
      req.body = { name: "test", country: "test" };
      TeamsService.update.mockImplementation(() => {
        throw new Error();
      });
      await TeamsController.update(req, res);
      expect(TeamsService.update).toHaveBeenCalledWith(req.params.id, {
        ...req.body,
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        status: "fail",
      });
    });
    it("should return a positive response and the updated team", async () => {
      req = { params: { id: 1 } };
      req.body = { name: "test", country: "test" };
      const createdTeam = {
        id: 1,
        name: "test",
        country: "test",
        createdAt: "2022-01-28T14:22:30.102Z",
        updatedAt: "2022-01-28T14:22:30.101Z",
      };
      TeamsService.update.mockReturnValue(createdTeam);
      await TeamsController.update(req, res);
      expect(TeamsService.update).toHaveBeenCalledWith(req.params.id, {
        ...req.body,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(createdTeam);
    });
  });

  describe("delete", () => {
    beforeEach(() => {
      TeamsService.deleteById = jest.fn();
    });

    it("should return an Invalid id error if route parameter is missing", async () => {
      req = { params: {} };
      await TeamsController.deleteById(req, res);
      expect(TeamsService.deleteById).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid id",
        status: "fail",
      });
    });
    it("should return an Invalid id error if route parameter is invalid", async () => {
      req = { params: { id: "test" } };
      await TeamsController.deleteById(req, res);
      expect(TeamsService.deleteById).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid id",
        status: "fail",
      });
    });
    it("should return an Internal Server Error if the TeamsService.deleteById throw an error", async () => {
      req = { params: { id: 1 } };
      TeamsService.deleteById.mockImplementation(() => {
        throw new Error();
      });
      await TeamsController.deleteById(req, res);
      expect(TeamsService.deleteById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        status: "fail",
      });
    });
    it("should return a positive response", async () => {
      req = { params: { id: 1 } };
      await TeamsController.deleteById(req, res);
      expect(TeamsService.deleteById).toHaveBeenCalledWith(req.params.id);
      expect(res.sendStatus).toHaveBeenCalledWith(200);
    });
  });
});
