

const Koa = require('koa')
const { isUrl } = require("is-valid-url")

const {badRequest, created, redirect, notFound} = require("./helper");

const db = require("./db");

const app = new Koa();



app.use(async (context, next) => {

    await next();

    if (context.method === 'POST') {
        const { url } = context.query;

        if (isUrl(url)) {
            const result = await db.put(url);
            created(context, { "target": `/${result}` })
        } else {
            badRequest(context)
        }
    } else if (context.method === 'GET') {
        try {
            loc = await db.get(context.path.slice(1));
            redirect(context, loc)
        } catch (e) {
            notFound(context);
        }
    } else {
        badRequest(context);
    }
})

app.listen(process.env.JAUS_PORT || 8888)

