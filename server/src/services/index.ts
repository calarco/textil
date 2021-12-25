import { Application } from "../declarations";
import users from "./users/users.service";
import pagos from "./pagos/pagos.service";
import cobros from "./cobros/cobros.service";
import proveedores from './proveedores/proveedores.service';
import clientes from './clientes/clientes.service';
import bancos from './bancos/bancos.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(users);
    app.configure(pagos);
    app.configure(cobros);
    app.configure(proveedores);
    app.configure(clientes);
    app.configure(bancos);
}
