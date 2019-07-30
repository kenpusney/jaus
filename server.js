

const Koa = require('koa')
const { isUrl } = require("is-valid-url")
const serve = require("koa-static");
const cors = require("@koa/cors")
const bodyParser = require("koa-bodyparser");


const {badRequest, created, redirect, notFound} = require("./helper");

const db = require("./db");

const app = new Koa();

app.use(cors());
app.use(serve("./static"))
app.use(bodyParser());

app.use(async (context, next) => {
    await next();
    if (context.method === 'POST') {
        let { url } = { ...context.query, ...context.request.body }

        if (typeof url === "string" && isUrl(url)) {
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
