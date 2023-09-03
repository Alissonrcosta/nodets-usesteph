import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../database/mysql';

export interface ProductInstance extends Model {
    id: number;
    name: string;
    category: string;
    amount: number;
    value: number;
    color: string;
}

export const Product = sequelize.define<ProductInstance>("Product", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED
        
    },
    name: {
        type: DataTypes.STRING
        
    },
    category: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.INTEGER
    },
    value: {
        type: DataTypes.INTEGER
    },
    color: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'products',
    timestamps: false
});