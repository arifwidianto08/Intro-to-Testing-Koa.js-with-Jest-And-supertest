const Koa = require("koa");
const koaBody = require("koa-body");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();

app.use(koaBody());

async function greetings(ctx, next) {
	ctx.body = "Hi, ";

	next();

	ctx.body += "Arif Widianto!";
}

router.get("/users", async (ctx) => {
	const users = [
		{
			firstName: "Arif",
			lastName: "Widianto",
		},
		{
			firstName: "Spongebob",
			lastName: "Squarepants",
		},
	];

	ctx.body = users;
	ctx.status = 200;
});

router.post("/users", async (ctx) => {
	const { firstName, lastName } = ctx.request.body;

	if (!firstName || !lastName) {
		ctx.throw(422, "Validation Error!");
	}

	ctx.body = {
		firstName: firstName,
		lastName: lastName,
	};
	ctx.status = 200;
});

app.use(router.routes()).use(router.allowedMethods());
app.use(greetings);

const PORT = 5000;

const server = app.listen(PORT, () => {
	console.log(`Server connected on http://localhost:${PORT}`);
});

module.exports = {
	app,
	greetings,
	server,
};
