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
    data?: Pago;
    isActive: boolean;
    close: (e: MouseEvent<HTMLButtonElement>) => void;
};

const PagarForm = function ({ data, isActive, close }: ComponentProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (inputs) =>
        data
            ? feathersClient
                  .service("pagos")
                  .patch(data.id, {
                      proveedor: inputs.proveedor,
                      monto: inputs.monto,
                      numero: inputs.numero,
                      observaciones: inputs.observaciones,
                      estado: inputs.estado,
                      pagoDate: inputs.pagoDate,
                      emisionDate: inputs.emisionDate,
                  })
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  })
            : feathersClient
                  .service("pagos")
                  .create({
                      proveedor: inputs.proveedor,
                      monto: inputs.monto,
                      numero: inputs.numero,
                      observaciones: inputs.observaciones,
                      estado: inputs.estado,
                      pagoDate: inputs.pagoDate,
                      emisionDate: inputs.emisionDate,
                  })
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  });

    useEffect(() => {
        reset();
    }, [isActive, data, reset]);

    return (
        <Form
            isActive={isActive}
            close={close}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Label title="Fecha de pago" error={errors.pagoDate?.message}>
                <input
                    type="date"
                    defaultValue={data?.pagoDate}
                    placeholder="-"
                    autoComplete="off"
                    {...register("pagoDate", {
                        required: "Ingrese la fecha de pago",
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
            <Label title="Proveedor" error={errors.proveedor?.message}>
                <input
                    type="text"
                    defaultValue={data?.proveedor}
                    placeholder="-"
                    autoComplete="off"
                    {...register("proveedor", {
                        required: "Ingrese el proveedor ",
                    })}
                />
            </Label>
            <Label title="Fecha de emision" error={errors.emisionDate?.message}>
                <input
                    type="date"
                    defaultValue={
                        data?.emisionDate ||
                        new Date().toISOString().substring(0, 10)
                    }
                    placeholder="-"
                    autoComplete="off"
                    {...register("emisionDate", {
                        required: "Ingrese la fecha de emision",
                    })}
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
            <Label title="Estado" error={errors.estado?.message}>
                <select {...register("estado")} defaultValue={data?.estado}>
                    <option value="A pagar">A pagar</option>
                    <option value="Pagado">Pagado</option>
                    <option value="Anulado">Anulado</option>
                    <option value="Recuperado">Recuperado</option>
                    <option value="Vencido">Vencido</option>
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

export default PagarForm;
