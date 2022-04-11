// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from "sequelize";
import { Application } from "../declarations";
import { HookReturn } from "sequelize/types/lib/hooks";

export default function (app: Application): typeof Model {
    const sequelizeClient: Sequelize = app.get("sequelizeClient");
    const precios = sequelizeClient.define(
        "precios",
        {
            articulo: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            peso: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            costo: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true,
            },
            costos: {
                type: DataTypes.JSON,
                allowNull: true,
            },
        },
        {
            hooks: {
                beforeCount(options: any): HookReturn {
                    options.raw = true;
                },
            },
        }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (precios as any).associate = function (models: any): void {
        // Define associations here
        // See https://sequelize.org/master/manual/assocs.html
        precios.belongsTo(models.aumentos);
    };

    return precios;
}
