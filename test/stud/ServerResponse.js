import { ServerResponse } from "http";

export default class ServerResponseStub extends ServerResponse {
  constructor() {
    super({});
    this.statusCode = 500;
  }

  status(code) {
    this.statusCode = code;
    return this;
  }
  json(response) {
    return ({ code: this.statusCode, response });
  }
}