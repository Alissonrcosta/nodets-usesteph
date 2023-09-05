import {Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/mysql';



export interface ProductInstance extends Model {
    id: number;
    name: string;
    category: string;
    amount: number;
    value: number;
    color: string;
    image: string;
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
        type: DataTypes.DECIMAL(10,2),
         get() {
            // Substitua pontos por vírgulas na leitura do valor
            const value = this.getDataValue("value");
            return value ? value.toString().replace(".", ",") : null;
        },
        set(value: string | number) {
            // Substitua vírgulas por pontos antes de salvar no banco de dados
            if (typeof value === "string") {
                this.setDataValue("value", parseFloat(value.replace(",", ".")));
            } else {
                this.setDataValue("value", value);
            }
        }
    },
    color: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'products',
    timestamps: false
});