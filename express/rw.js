import fs from "fs/promises";
const readFile = async()=>{
    let message = "";
    let status = 500;
    let data = [];
    try {
        const fileData = await fs.readFile("./data.json","utf-8");
        message = "File has been read successfully.(async)";
        status = 200;
        data = data;    
    } catch (error) {
       message = "Read error";
       status = 500;
       data = error;    
    }
    return {data,status,message}
}
const writeFile = async (data) => {
    try {
        let dataToSave = [];
        const fileData = await readFile();//read
        
        
        await fs.writeFile("./data.json", JSON.stringify(data));
        console.log("File has been written successfully.(async)");
    } catch (error) {
        console.log("unable to write file.(async)",error);       
    }
}
export default {readFile,writeFile};