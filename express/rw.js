import { log } from "console";
import fs from "fs/promises";
const readFile = async () => {
    let message = "";
    let status = 500;
    let data = [];
    try {
        const fileData = await fs.readFile("./data.json", "utf-8");
        message = "File has been read successfully.(async)";
        status = 200;
        data = fileData;
    } catch (error) {
        message = "Read error";
        status = 500;
        data = error;
    }
    return { data, status, message }
}
const writeFile = async (data) => {
    try {
        let dataToSave = [];
        const fileData = await readFile();//read  
        console.log(fileData.data);

        if (fileData) dataToSave = JSON.parse(fileData.data);  //if file not empty
        if (!Array.isArray(dataToSave)) dataToSave = [dataToSave];
        dataToSave.push(data);

        await fs.writeFile("./data.json", JSON.stringify(dataToSave, null, 2));
        console.log("File has been written successfully.(async)");
    } catch (error) {
        console.log("unable to write file.(async)", error);
    }
}
const updateFile = async (data, email) => {
    let status = 500;
    let message = "Updation Error";
    try {
        let dataToSave = [];
        const fileData = await readFile();//read  
        if (fileData) dataToSave = JSON.parse(fileData.data);
        const userToUpdate = dataToSave.find((d) => d.email === email);
        if (userToUpdate) {
            userToUpdate.password = data.password;
        } else {
            status = 500;
            message = "User doesn't exist."
        }
        await fs.writeFile("./data.json", JSON.stringify(dataToSave, null, 2));
        status = 200;
        message = "User updated successfully."

    } catch (error) {
        status = 500;
        message = "Updation Error."
    }
    return { status, message };
}
const deleteUser = async (email) => {
    let status = 500;
    let message = "Deletion Error";
    try {
        let dataToSave = [];
        const fileData = await readFile();//read  
        if (fileData) dataToSave = JSON.parse(fileData.data);
        dataToSave = dataToSave.filter((d) => d.email !== email);
        console.log(dataToSave);
        await fs.writeFile("./data.json", JSON.stringify(dataToSave, null, 2));
        status = 200;
        message = "deleted successfully."
    } catch (error) {
          message = error.message;
    }
    return {status,message};
}
export default { readFile, writeFile, updateFile, deleteUser };