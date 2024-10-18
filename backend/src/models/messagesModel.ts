import { DataTypes, Model } from "sequelize";

import sequelize from "../config/dbconnect";

class Messages extends Model {
    public id!: number;
    public roomid! : string;
    public senderid! : string;
    public message! : string;
    public createdAt!:string;
}

Messages.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unique:true
    },
    roomid:{
        type:DataTypes.STRING(255),
        allowNull:false,
    },
    senderid:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    message:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    createdAt:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize,
    tableName:"messages",
})

export default  Messages;

