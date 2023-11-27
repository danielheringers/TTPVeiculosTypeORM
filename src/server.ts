import app from "./app";
import AppDataSource from "./data-source";

(async () => {

    await AppDataSource.initialize()
    .catch((error) => {
        console.error("Error during Data Source initialization", error)
    })
    
    app.listen(process.env.PORT, () => {
        console.log("Servidor executando")
    })    
})()