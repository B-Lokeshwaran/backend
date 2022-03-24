const { MongoClient } = require("mongodb");

module.exports = {
  db: null,
  async connect() {
    try {
      let con = await MongoClient.connect(process.env.MONGODB_URL);
      this.db = con.db("Catalog");
      console.log("---MongoDB Connected---");
    } catch (err) {
      console.log(err);
    }
  },
};
