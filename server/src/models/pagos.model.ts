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
            pagoDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            monto: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            emisionDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            numero: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
            },
            observaciones: {
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
        pagos.belongsTo(models.destinatarios);
    };

    return pagos;
}
