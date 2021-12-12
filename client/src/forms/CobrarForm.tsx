import { MouseEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import feathersClient from "feathersClient";
import styled from "styled-components";

import FormComponent from "components/Form";
import Label from "components/Label";
import CurrencyInput from "components/CurrencyInput";

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
                      depositoDate: inputs.depositoDate,
                      monto: inputs.monto,
                      cliente: inputs.cliente,
                      ingresoDate: inputs.ingresoDate,
                      banco: inputs.banco,
                      numero: inputs.numero,
                      titular: inputs.titular,
                      cuit: inputs.cuit,
                      observaciones: inputs.observaciones,
                      estado: inputs.estado,
                  })
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  })
            : feathersClient
                  .service("cobros")
                  .create({
                      depositoDate: inputs.depositoDate,
                      monto: inputs.monto,
                      cliente: inputs.cliente,
                      ingresoDate: inputs.ingresoDate,
                      numero: inputs.numero,
                      banco: inputs.banco,
                      titular: inputs.titular,
                      cuit: inputs.cuit,
                      observaciones: inputs.observaciones,
                      estado: inputs.estado,
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
                        required: "Ingrese la fecha de deposito",
                    })}
                />
            </Label>
            <Label title="Monto" error={errors.monto?.message}>
                <CurrencyInput
                    type="text"
                    inputMode="numeric"
                    defaultValue={data?.monto}
                    placeholder="-"
                    autoComplete="off"
                    {...register("monto", { required: "Ingrese el monto" })}
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
                        required: "Ingrese la fecha de ingreso",
                    })}
                />
            </Label>
            <Label title="Banco de emision" error={errors.banco?.message}>
                <input
                    type="text"
                    defaultValue={data?.banco}
                    placeholder="-"
                    autoComplete="off"
                    {...register("banco", { required: "Ingrese el banco" })}
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
                    {...register("titular", { required: "Ingrese el titular" })}
                />
            </Label>
            <Label title="CUIT" error={errors.cuit?.message}>
                <input
                    type="text"
                    defaultValue={data?.cuit}
                    placeholder="-"
                    autoComplete="off"
                    {...register("cuit", { required: "Ingrese el CUIT" })}
                />
            </Label>
            <Label title="Estado">
                <select {...register("estado")} defaultValue={data?.estado}>
                    <option value="A depositar">A depositar</option>
                    <option value="Depositado">Depositado</option>
                    <option value="Anulado">Anulado</option>
                    <option value="Posdatado">Posdatado</option>
                    <option value="Endosado">Endosado</option>
                    <option value="Devuelto">Devuelto</option>
                    <option value="Falla tecnica">Falla tecnica</option>
                    <option value="Rechazado">Rechazado</option>
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
