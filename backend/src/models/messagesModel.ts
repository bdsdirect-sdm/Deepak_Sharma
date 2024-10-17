import { DataTypes, Model } from "sequelize";

import sequelize from "../config/dbconnect";

class Messages extends Model {
    public roomid! : string;
    public senderid! : string;
    public message! : string;
    public receverid!:string;
    public createAt!:string;
}

Messages.init({
    roomid:{
        type:DataTypes.STRING(255),
        allowNull:false,
        primaryKey:true
    },
    senderid:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    message:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    receverid:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    createAt:{
        type:DataTypes.STRING,
        defaultValue: Date.now().toString()
    }
},{
    sequelize,
    tableName:"messages",
})

export default  Messages;
