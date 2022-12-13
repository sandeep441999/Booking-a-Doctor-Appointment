const request = require("supertest");
const { response } = require("../app");

const app = require("../app");

describe("api test suite", () => {
  test("GET /", (done) => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      // .expect(res.body.todo.length).toEqual(3)
      .end((err, res) => {
        if (err) return done(err);

        return done();
      });
  });

  test("GET / fetching and checking whether I can fetch the data ", () => {
    request(app)
      .get("/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        expect(data).toBeDefined();
      });
    //const data = response.JSON();
    //console.log(data);
  });

  test("GET / fetching the data and checking a user name exist or not", async () => {
    request(app)
      .get("/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        expect(data).toBeDefined();
        expect(data[0].firstName).toEqual("Sandeep");
      });
  });

  test("POST /signup trying to create a doctor account and need to get 200 status code on successfull account creation", () => {
    const data = {
      email: "sandeep1@gmail.com",
      password: "sandeep1",
      firstName: "Sandeep1",
      lastName: "Pabbu1",
      qualification: "Physician",
      speciality: "Dermotology",
      experience: 5
    };
    const payload = JSON.stringify(data);
    request(app)
      .post("/signup")
      .send(payload)
      .set("Content-Type", "application/json")
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  test("POST /login trying to login and need to get 200 status code", () => {
    const data = {
      email: "sandeep1@gmail.com",
      password: "sandeep1",
    };
    const payload = JSON.stringify(data);
    request(app)
      .post("/login")
      .send(payload)
      .set("Content-Type", "application/json")
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  test("POST / fetching the doctor Appointments by sending the user id", async () => {

    const data = {
        doctorId: '638562c7ffb04c1cb1faf829'
    }
    const payload = JSON.stringify(data);
    request(app)
      .post("/")
      .send(payload)
      .set("Content-Type", "application/json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        expect(data).toBeDefined();
        //expect(data[0].firstName).toEqual("Sandeep");
      });
  });

});
