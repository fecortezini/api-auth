import { Model, DataTypes } from "sequelize";
import sequelize from "../data/database";

class User extends Model {
    id: number;
    user: string;
    pass: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'user',
    timestamps: false
})

export default User;
