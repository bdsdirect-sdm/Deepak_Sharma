import { DataTypes, Model } from "sequelize";

import sequelize from "../config/dbconnect";
import  AddressDetail  from "./addressModel";

class UserDetail extends Model {
    public firstName! : string;
    public lastName! : string;
    public email! : string;
    public profile_image! :  string;
    public appoinment_letter! :   string;
}

UserDetail.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,

        },
        firstName:{
            type: DataTypes.STRING,
            allowNull:false
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull:true
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        profile_image:{
            type:DataTypes.STRING,
            allowNull:true
        },
        appointment_letter:{
            type:DataTypes.STRING,
            allowNull:true
        }
    },
    {
        sequelize,
        tableName:"userdetails"
    }
)

UserDetail.hasOne(AddressDetail,{
    sourceKey:"id",
    foreignKey:"userId",
    as:"address"
})
AddressDetail.belongsTo(UserDetail,{
    targetKey:"id",
    foreignKey:"userId",
    as:"user"
})

export default UserDetail;