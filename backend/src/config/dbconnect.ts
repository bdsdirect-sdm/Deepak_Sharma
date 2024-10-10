import  {Sequelize} from "sequelize"
import dotenv from "dotenv"

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_NAME as string, process.env.DB_USERNAME as string,process.env.DATABASE_PASSWORD as string,{
    host : "localhost",
    dialect: "mysql"
} )

export default sequelize;