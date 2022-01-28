import { jest } from "@jest/globals";

import DriversController from "./drivers.controller";
import DriversService from "./drivers.service";

jest.mock("./drivers.service");

describe("DriversController", () => {
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
      DriversService.getAll = jest.fn();
    });

    it("shoud return an Internal Server Error if DriversService.getAll throws an error", async () => {
      req.query = {};
      DriversService.getAll.mockImplementation(() => {
        throw new Error();
      });
      await DriversController.getAll(req, res);
      expect(DriversService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        status: "fail",
      });
    });

    it("shoud return a positive response and a JSON array containing all drivers", async () => {
      req.query = {};
      const driversArray = [
        {
          id: 1,
          firstName: "Kimi",
          lastName: "Raikkonen",
          carNumber: 7,
          teamId: 1,
          createdAt: "2022-01-28T12:25:04.702Z",
          updatedAt: "2022-01-28T12:25:04.702Z",
        },
        {
          id: 2,
          firstName: "Antonio",
          lastName: "Giovinazzi",
          carNumber: 99,
          teamId: 1,
          createdAt: "2022-01-28T12:25:04.702Z",
          updatedAt: "2022-01-28T12:25:04.702Z",
        },
      ];
      DriversService.getAll.mockReturnValue(driversArray);
      await DriversController.getAll(req, res);
      expect(DriversService.getAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(driversArray);
    });
  });

  describe("getById", () => {
    beforeEach(() => {
      DriversService.getById = jest.fn();
    });

    it("should return an Invalid id error if route parameter is missing", async () => {
      req = { params: {} };
      await DriversController.getById(req, res);
      expect(DriversService.getById).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid id",
        status: "fail",
      });
    });
    it("should return an Invalid id error if route parameter is invalid", async () => {
      req = { params: { id: "test" } };
      await DriversController.getById(req, res);
      expect(DriversService.getById).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid id",
        status: "fail",
      });
    });
    it("should return a Internal Server Error if the DriversService.getById throw an error", async () => {
      req = { params: { id: 1 } };
      DriversService.getById.mockImplementation(() => {
        throw new Error();
      });
      await DriversController.getById(req, res);
      expect(DriversService.getById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        status: "fail",
      });
    });
    it("should return a positive response and a JSON array containing the selected driver", async () => {
      req = { params: { id: 1 } };
      const selectedDriver = {
        id: 1,
        firstName: "Kimi",
        lastName: "Raikkonen",
        carNumber: 7,
        teamId: 1,
        createdAt: "2022-01-28T12:25:04.702Z",
        updatedAt: "2022-01-28T12:25:04.702Z",
      };
      DriversService.getById.mockReturnValue(selectedDriver);
      await DriversController.getById(req, res);
      expect(DriversService.getById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(selectedDriver);
    });
  });

  describe("insert", () => {
    beforeEach(() => {
      DriversService.insert = jest.fn();
    });
    it("should return a Body Missing Required Field Error if body is missing a required field (firstName missing)", async () => {
      req.body = { lastName: "test" };
      await DriversController.insert(req, res);
      expect(DriversService.insert).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Body is missing a required field",
        status: "fail",
      });
    });
    it("should return a Body Missing Required Field Error if body is missing a required field (lastName missing)", async () => {
      req.body = { firstName: "test" };
      await DriversController.insert(req, res);
      expect(DriversService.insert).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Body is missing a required field",
        status: "fail",
      });
    });
    it("should return an Internal Server Error if the DriversService.insert throw an error", async () => {
      req.body = { firstName: "test", lastName: "test" };
      DriversService.insert.mockImplementation(() => {
        throw new Error();
      });
      await DriversController.insert(req, res);
      expect(DriversService.insert).toHaveBeenCalledWith({ ...req.body });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        status: "fail",
      });
    });
    it("should return a positive response and the driver created", async () => {
      req.body = { firstName: "test", lastName: "test" };
      const createdDriver = {
        id: 22,
        firstName: "Test",
        lastName: "Test",
        carNumber: null,
        teamId: null,
        createdAt: "2022-01-28T14:22:30.102Z",
        updatedAt: "2022-01-28T14:22:30.101Z",
      };
      DriversService.insert.mockReturnValue(createdDriver);
      await DriversController.insert(req, res);
      expect(DriversService.insert).toHaveBeenCalledWith({ ...req.body });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdDriver);
    });
  });

  describe("update", () => {
    beforeEach(() => {
      DriversService.update = jest.fn();
    });
    it("should return an Invalid id error if route parameter is missing", async () => {
      req = { params: {} };
      await DriversController.update(req, res);
      expect(DriversService.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid id",
        status: "fail",
      });
    });
    it("should return an Invalid id error if route parameter is invalid", async () => {
      req = { params: { id: "test" } };
      await DriversController.update(req, res);
      expect(DriversService.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid id",
        status: "fail",
      });
    });
    it("should return a Body Missing Required Field Error if body is missing a required field (firstName missing)", async () => {
      req = { params: { id: 1 } };
      req.body = { lastName: "test" };
      await DriversController.update(req, res);
      expect(DriversService.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Body is missing a required field",
        status: "fail",
      });
    });
    it("should return a Body Missing Required Field Error if body is missing a required field (lastName missing)", async () => {
      req = { params: { id: 1 } };
      req.body = { firstName: "test" };
      await DriversController.update(req, res);
      expect(DriversService.update).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Body is missing a required field",
        status: "fail",
      });
    });
    it("should return an Internal Server Error if the DriversService.update throw an error", async () => {
      req = { params: { id: 1 } };
      req.body = { firstName: "test", lastName: "test" };
      DriversService.update.mockImplementation(() => {
        throw new Error();
      });
      await DriversController.update(req, res);
      expect(DriversService.update).toHaveBeenCalledWith(req.params.id, {
        ...req.body,
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        status: "fail",
      });
    });
    it("should return a positive response and the updated driver", async () => {
      req = { params: { id: 1 } };
      req.body = { firstName: "test", lastName: "test" };
      const createdDriver = {
        id: 1,
        firstName: "Test",
        lastName: "Test",
        carNumber: null,
        teamId: null,
        createdAt: "2022-01-28T14:22:30.102Z",
        updatedAt: "2022-01-28T14:22:30.101Z",
      };
      DriversService.update.mockReturnValue(createdDriver);
      await DriversController.update(req, res);
      expect(DriversService.update).toHaveBeenCalledWith(req.params.id, {
        ...req.body,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(createdDriver);
    });
  });

  describe("delete", () => {
    beforeEach(() => {
      DriversService.deleteById = jest.fn();
    });

    it("should return an Invalid id error if route parameter is missing", async () => {
      req = { params: {} };
      await DriversController.deleteById(req, res);
      expect(DriversService.deleteById).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid id",
        status: "fail",
      });
    });
    it("should return an Invalid id error if route parameter is invalid", async () => {
      req = { params: { id: "test" } };
      await DriversController.deleteById(req, res);
      expect(DriversService.deleteById).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid id",
        status: "fail",
      });
    });
    it("should return an Internal Server Error if the DriversService.deleteById throw an error", async () => {
      req = { params: { id: 1 } };
      DriversService.deleteById.mockImplementation(() => {
        throw new Error();
      });
      await DriversController.deleteById(req, res);
      expect(DriversService.deleteById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        status: "fail",
      });
    });
    it("should return a positive response", async () => {
      req = { params: { id: 1 } };
      await DriversController.deleteById(req, res);
      expect(DriversService.deleteById).toHaveBeenCalledWith(req.params.id);
      expect(res.sendStatus).toHaveBeenCalledWith(200);
    });
  });
});
