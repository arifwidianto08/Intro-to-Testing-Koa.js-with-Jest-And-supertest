const { app, greetings } = require("../src/server");
const request = require("supertest");

describe("greetings", () => {
	test("Should works properly", async () => {
		const ctx = {};

		await greetings(ctx, () => {});

		expect(ctx.body).toBe("Hi, Arif Widianto!");
	});
});

describe("GET /users", () => {
	test("should return with a status code of 200", async () => {
		const response = await request(app.callback()).get("/users");

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
			const response = await request(app.callback()).post("/users").send(body);
			expect(response.status).toBe(422);
		}
	});

	test("should return with given firstName and lastName also with a status code of 200", async () => {
		const response = await request(app.callback()).post("/users").send({
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
	});
});
