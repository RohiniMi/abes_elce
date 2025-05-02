import express from "express";
import rw from "./rw.js";
const app = express();
//get method
app.get("/user", async (req, res) => {
    try {
        const data = await rw.readFile();
        res.status(data.status).json({ "data": JSON.parse(data.data), "message": data.message });
    } catch (error) {
        res.status(500).json({ "Error": error });
    }
});
app.use(express.json()); //inbulit express middleware
app.post("/user", async (req, res) => {
    try {
        const data = req.body;
        if (data) await rw.writeFile(data);
        res.status(201).json({ "data": data });
    } catch (error) {
        res.status(500).json({ "Error": error });
    }
})
app.put("/user/:email", async (req, res) => {
    const userToFind = req.params.email;
    try {
        const data = await rw.updateFile(req.body, userToFind);
        res.status(data.status).json({ "message": data.message });
    } catch (error) {
        res.status(500).json({ "Error": error });
    }
})
app.delete("/user/:email", async (req, res) => {
    const userToDelete = req.params.email;
    try {
        const data = await rw.deleteUser(userToDelete);
        console.log(data);
        res.status(data.status).json({ "message": data.message });
    } catch (error) {
        res.status(500).json({ "Error": error });
    }

})
const PORT = 8800;
app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));