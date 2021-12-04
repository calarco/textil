// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from "sequelize";
import { Application } from "../declarations";
import { HookReturn } from "sequelize/types/lib/hooks";

export default function (app: Application): typeof Model {
    const sequelizeClient: Sequelize = app.get("sequelizeClient");
    const pagos = sequelizeClient.define(
        "pagos",
        {
            numero: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
            },
            proveedor: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
            },
            monto: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
            },
            estado: {
                type: DataTypes.ENUM(
                    "A pagar",
                    "Pagado",
                    "Anulado",
                    "Recuperado",
                    "Vencido"
                ),
                allowNull: false,
                defaultValue: "A pagar",
            },
            pagoDate: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
            },
            emisionDate: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
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
    (pagos as any).associate = function (models: any): void {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
    };

    return pagos;
}
