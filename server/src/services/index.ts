import { Application } from "../declarations";
import users from "./users/users.service";
import pagos from "./pagos/pagos.service";
import cobros from "./cobros/cobros.service";
import proveedores from './proveedores/proveedores.service';
import clientes from './clientes/clientes.service';
import bancos from './bancos/bancos.service';
import destinatarios from './destinatarios/destinatarios.service';
import libradores from './libradores/libradores.service';
import compras from './compras/compras.service';
import ventas from './ventas/ventas.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
    app.configure(users);
    app.configure(pagos);
    app.configure(cobros);
    app.configure(proveedores);
    app.configure(clientes);
    app.configure(bancos);
    app.configure(destinatarios);
    app.configure(libradores);
    app.configure(compras);
    app.configure(ventas);
}
