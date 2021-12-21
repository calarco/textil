import { Application } from "../declarations";
import users from "./users/users.service";
import pagos from "./pagos/pagos.service";
import cobros from "./cobros/cobros.service";
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(users);
    app.configure(pagos);
    app.configure(cobros);
}
