// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const sequelize = context.app.get("sequelizeClient");
        if (context.params.query?.$total === true) {
            context.params.sequelize = {
                attributes: [
                    [sequelize.fn("sum", sequelize.col("monto")), "total"],
                ],
                raw: true,
            };
            delete context.params.query.$total;
        }

        return context;
    };
};
