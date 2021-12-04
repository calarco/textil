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
    isActive: boolean;
    close: (e: MouseEvent<HTMLButtonElement>) => void;
};

const CobrarForm = function ({ isActive, close }: ComponentProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) =>
        feathersClient
            .service("cobros")
            .create({
                cliente: data.cliente,
                monto: data.monto,
                numero: data.numero,
                observaciones: data.observaciones,
                estado: data.estado,
                depositoDate: data.depositoDate,
                ingresoDate: data.ingresoDate,
                banco: data.banco,
                titular: data.titular,
                cuit: data.cuit,
            })
            .then(() => {})
            .catch((error: FeathersErrorJSON) => {
                console.error(error.message);
            });

    useEffect(() => {
        reset();
    }, [isActive, reset]);

    return (
        <Form
            isActive={isActive}
            onSubmit={handleSubmit(onSubmit)}
            close={close}
        >
            <Label title="Cliente" error={errors.proveedor?.message}>
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("proveedor", {
                        required: "Ingrese el proveedor ",
                    })}
                    defaultValue={""}
                />
            </Label>
            <Label title="Monto" error={errors.monto?.message}>
                <input
                    type="number"
                    defaultValue={""}
                    placeholder="-"
                    autoComplete="off"
                    {...register("monto", { required: "Ingrese el monto" })}
                />
            </Label>
            <Label
                title="Fecha de deposito"
                error={errors.depositoDate?.message}
            >
                <input
                    type="date"
                    placeholder="-"
                    autoComplete="off"
                    {...register("depositoDate", {
                        required: "Ingrese la fecha de pago",
                    })}
                />
            </Label>
            <Label title="Banco de emision" error={errors.banco?.message}>
                <input
                    type="text"
                    defaultValue={""}
                    placeholder="-"
                    autoComplete="off"
                    {...register("banco", { required: "Ingrese el monto" })}
                />
            </Label>
            <Label title="Numero de cheque" error={errors.numero?.message}>
                <input
                    type="text"
                    defaultValue={""}
                    placeholder="-"
                    autoComplete="off"
                    {...register("numero", {
                        required: "Ingrese el numero de cheque",
                    })}
                />
            </Label>
            <Label title="Fecha de ingreso" error={errors.ingresoDate?.message}>
                <input
                    type="date"
                    defaultValue={new Date().toISOString().substring(0, 10)}
                    placeholder="-"
                    autoComplete="off"
                    {...register("ingresoDate", {
                        required: "Ingrese la fecha",
                    })}
                />
            </Label>
            <Label title="Titular del cheque" error={errors.titular?.message}>
                <input
                    type="text"
                    defaultValue={""}
                    placeholder="-"
                    autoComplete="off"
                    {...register("titular", { required: "Ingrese el monto" })}
                />
            </Label>
            <Label title="CUIT" error={errors.cuit?.message}>
                <input
                    type="number"
                    defaultValue={""}
                    placeholder="-"
                    autoComplete="off"
                    {...register("monto", { required: "Ingrese el monto" })}
                />
            </Label>
            <Label title="Estado" error={errors.estado?.message}>
                <select {...register("estado")} defaultValue={"A pagar"}>
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
                    placeholder="-"
                    autoComplete="off"
                    {...register("observaciones")}
                    defaultValue={""}
                />
            </Label>
        </Form>
    );
};

export default CobrarForm;
