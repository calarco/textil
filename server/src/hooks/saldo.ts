// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const sequelize = context.app.get("sequelizeClient");
        if (context.params.query?.$saldo === true) {
            context.params.sequelize = {
                attributes: [
                    [sequelize.fn("sum", sequelize.col("debe")), "debe"],
                    [sequelize.fn("sum", sequelize.col("haber")), "haber"],
                ],
                raw: true,
            };
            delete context.params.query.$saldo;
        }

        return context;
    };
};
