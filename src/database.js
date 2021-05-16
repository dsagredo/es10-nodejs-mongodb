import mongoCliente, {MongoClient} from "mongodb";

const connectDB = async () => {
    try {
        const client = await MongoClient.connect("mongodb://localhost:27017", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db("node-restapi");
        console.log("Está conectado de la BD...");
        return db;
    } catch (e) {
        console.log(e);
    }
};

export default connectDB;
