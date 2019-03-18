
module.exports = {
    badRequest: (ctx) => {
        ctx.status = 400
        ctx.body = { "error": "invalid" }
    },

    created: (ctx, data) => {
        ctx.status = 201
        ctx.body = data
    },

    redirect: (ctx, loc) => {
        ctx.status = 301
        ctx.redirect(loc)
    },

    notFound: (ctx) => {
        ctx.status = 404
    }
}