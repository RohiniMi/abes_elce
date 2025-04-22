import express from "express";
import rw from "./rw.js";
const app = express();

//get method
app.get("/", async (req, res) => {
    try {
        const data = await rw.readFile();
        res.status(data.status).json({ "data": JSON.parse(data.data), "message": data.message });
    } catch (error) {
        res.status(500).json({ "Error": error });
    }
});
app.use(express.json()); //inbulit express middleware
app.post("/", async(req, res) => {
    try {
        const data = req.body;
        console.log(data);
        if(data) await rw.writeFile(data);
        
        res.status(201).json({ "data": data });
    } catch (error) {
        res.status(500).json({ "Error": error });
    }
})
const PORT = 8800;
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));