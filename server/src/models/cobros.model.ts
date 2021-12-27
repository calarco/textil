// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from "sequelize";
import { Application } from "../declarations";
import { HookReturn } from "sequelize/types/lib/hooks";

export default function (app: Application): typeof Model {
    const sequelizeClient: Sequelize = app.get("sequelizeClient");
    const cobros = sequelizeClient.define(
        "cobros",
        {
            depositoDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            monto: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            ingresoDate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            numero: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
            },
            titular: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
            },
            cuit: {
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
                    "A depositar",
                    "Depositado",
                    "Anulado",
                    "Posdatado",
                    "Endosado",
                    "Devuelto",
                    "Falla tecnica",
                    "Rechazado"
                ),
                allowNull: false,
                defaultValue: "A depositar",
            },
            salidaDate: {
                type: DataTypes.DATEONLY,
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
    (cobros as any).associate = function (models: any): void {
        // Define associations here
        // See http://docs.sequelizejs.com/en/latest/docs/associations/
        cobros.belongsTo(models.clientes);
        cobros.belongsTo(models.bancos);
        cobros.belongsTo(models.proveedores);
    };

    return cobros;
}
