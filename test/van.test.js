const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server"); // your Express app
const should = chai.should();

chai.use(chaiHttp);