
const level = require("level");
const nanoid = require("nanoid");

db = level(process.env.JAUS_DB_LOC || "./data")

module.exports = {
    async put(data) {
        const id = nanoid(10);
        try {
            console.log(`saving ${data} with ${id}`)
            db.put(id, data)
        } catch (err) {
            console.log(`error when save ${data} with ${id}`)
            throw err;
        }
        return id;
    },

    async get(id) {
        console.log(`Getting data with ${id}`)

        return await db.get(id);
    }
}