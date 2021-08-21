const { app, greetings, server } = require("../src/server");
const request = require("supertest");

afterAll((done) => {
	// Close server app connection
	server.close();
	done();
});

describe("greetings", () => {
	test("Should works properly", async () => {
		const ctx = {};

		await greetings(ctx, () => {});

		expect(ctx.body).toBe("Hi, Arif Widianto!");

		return {};
	});
});

describe("GET /users", () => {
	test("should return with a status code of 200", async () => {
		const response = await request(server).get("/users");

		// Should return with status code of 200
		expect(response.status).toBe(200);

		// Should return a application/jsn response-type
		expect(response.type).toEqual("application/json");

		expect(response.body.length).toEqual(2);

		// Should match expected response
		expect(response.body).toEqual(
			expect.arrayContaining([
				{
					firstName: "Arif",
					lastName: "Widianto",
				},
				{
					firstName: "Spongebob",
					lastName: "Squarepants",
				},
			]),
		);

		return;
	});
});

describe("POST /users", () => {
	test("should return with a status code of 422", async () => {
		const bodyData = [
			{
				firstName: "Arif",
			},
			{
				lastName: "Widianto",
			},
			{},
		];

		for (const body of bodyData) {
			const response = await request(server).post("/users").send(body);
			expect(response.status).toBe(422);
		}

		return;
	});

	test("should return with given firstName and lastName also with a status code of 200", async () => {
		const response = await request(server).post("/users").send({
			firstName: "Arif",
			lastName: "Widianto",
		});

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				firstName: "Arif",
				lastName: "Widianto",
			}),
		);

		return;
	});
});
