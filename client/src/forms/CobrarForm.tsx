import { MouseEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import feathersClient from "feathersClient";
import styled from "styled-components";

import FormComponent from "components/Form";
import Label from "components/Label";

const Form = styled(FormComponent)`
    grid-template-columns: 1fr 1fr 1fr [end];
`;

type ComponentProps = {
    data?: Cobro;
    isActive: boolean;
    close: (e: MouseEvent<HTMLButtonElement>) => void;
};

const CobrarForm = function ({ data, isActive, close }: ComponentProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (inputs) =>
        data
            ? feathersClient
                  .service("cobros")
                  .patch(data.id, {
                      cliente: inputs.cliente,
                      monto: inputs.monto,
                      numero: inputs.numero,
                      observaciones: inputs.observaciones,
                      estado: inputs.estado,
                      depositoDate: inputs.depositoDate,
                      ingresoDate: inputs.ingresoDate,
                      banco: inputs.banco,
                      titular: inputs.titular,
                      cuit: inputs.cuit,
                  })
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  })
            : feathersClient
                  .service("cobros")
                  .create({
                      cliente: inputs.cliente,
                      monto: inputs.monto,
                      numero: inputs.numero,
                      observaciones: inputs.observaciones,
                      estado: inputs.estado,
                      depositoDate: inputs.depositoDate,
                      ingresoDate: inputs.ingresoDate,
                      banco: inputs.banco,
                      titular: inputs.titular,
                      cuit: inputs.cuit,
                  })
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  });

    useEffect(() => {
        reset();
    }, [data, isActive, reset]);

    return (
        <Form
            isActive={isActive}
            onSubmit={handleSubmit(onSubmit)}
            close={close}
        >
            <Label
                title="Fecha de deposito"
                error={errors.depositoDate?.message}
            >
                <input
                    type="date"
                    defaultValue={data?.depositoDate}
                    autoComplete="off"
                    {...register("depositoDate", {
                        required: "Ingrese la fecha de pago",
                    })}
                />
            </Label>
            <Label title="Cliente" error={errors.cliente?.message}>
                <input
                    type="text"
                    defaultValue={data?.cliente}
                    placeholder="-"
                    autoComplete="off"
                    {...register("cliente", {
                        required: "Ingrese el cliente ",
                    })}
                />
            </Label>
            <Label title="Monto" error={errors.monto?.message}>
                <input
                    type="text"
                    defaultValue={data?.monto}
                    placeholder="-"
                    autoComplete="off"
                    {...register("monto", { required: "Ingrese el monto" })}
                />
            </Label>
            <Label title="Fecha de ingreso" error={errors.ingresoDate?.message}>
                <input
                    type="date"
                    defaultValue={
                        data?.ingresoDate ||
                        new Date().toISOString().substring(0, 10)
                    }
                    placeholder="-"
                    autoComplete="off"
                    {...register("ingresoDate", {
                        required: "Ingrese la fecha",
                    })}
                />
            </Label>
            <Label title="Banco de emision" error={errors.banco?.message}>
                <input
                    type="text"
                    defaultValue={data?.banco}
                    placeholder="-"
                    autoComplete="off"
                    {...register("banco", { required: "Ingrese el monto" })}
                />
            </Label>
            <Label title="Numero de cheque" error={errors.numero?.message}>
                <input
                    type="text"
                    defaultValue={data?.numero}
                    placeholder="-"
                    autoComplete="off"
                    {...register("numero", {
                        required: "Ingrese el numero de cheque",
                    })}
                />
            </Label>
            <Label title="Titular del cheque" error={errors.titular?.message}>
                <input
                    type="text"
                    defaultValue={data?.titular}
                    placeholder="-"
                    autoComplete="off"
                    {...register("titular", { required: "Ingrese el monto" })}
                />
            </Label>
            <Label title="CUIT" error={errors.cuit?.message}>
                <input
                    type="number"
                    defaultValue={data?.cuit}
                    placeholder="-"
                    autoComplete="off"
                    {...register("monto", { required: "Ingrese el monto" })}
                />
            </Label>
            <Label title="Estado" error={errors.estado?.message}>
                <select {...register("estado")} defaultValue={data?.estado}>
                    <option value="A pagar">A depositar</option>
                    <option value="Pagado">Depositado</option>
                    <option value="Anulado">Anulado</option>
                    <option value="Recuperado">Posdatado</option>
                    <option value="Vencido">Endosado</option>
                    <option value="Recuperado">Devuelto</option>
                    <option value="Recuperado">Falla tecnica</option>
                    <option value="Vencido">Rechazado</option>
                </select>
            </Label>
            <Label title="Observaciones" length={3}>
                <input
                    type="text"
                    defaultValue={data?.observaciones}
                    placeholder="-"
                    autoComplete="off"
                    {...register("observaciones")}
                />
            </Label>
        </Form>
    );
};

export default CobrarForm;
