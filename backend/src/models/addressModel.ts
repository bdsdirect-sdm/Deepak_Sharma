import sequelize from "../config/dbconnect";
import { DataType, DataTypes, Model } from "sequelize";
import UserDetail from "./userDetail";

 class AddressDetail extends Model{
    public companyAddress!:string;
    public companyCity!:string;
    public companyState!:string;
    public companyZip!:string;
    public homeAddress!:string;
    public homeCity!:string;
    public homeState!:string;
    public homeZip!:string;
    public userId!:number;

}

AddressDetail.init({
        id: {
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        userId:{
             type:DataTypes.INTEGER,
             allowNull:false,
        },
        companyAddress:{
            type:DataTypes.STRING,
            allowNull:false,

        },
        companyCity:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        companyState:{
            type:DataTypes.STRING,
            allowNull:false
        },
        companyZip:{
            type:DataTypes.STRING,
            allowNull:false
        },
        homeAddress:{
            type:DataTypes.STRING,
            allowNull:false
        },
        homeCity:{
            type:DataTypes.STRING,
            allowNull:false
        },
        homeState:{
            type:DataTypes.STRING,
            allowNull:false
        },
        homeZip:{
            type:DataTypes.STRING,
            allowNull:false
        },


},{
    sequelize,
    tableName:"addressDetails",
    timestamps:true
});




export default  AddressDetail;  