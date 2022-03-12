import { MouseEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import feathersClient from "feathersClient";

import { Form } from "components/Form";
import { Label } from "components/Label";
import { CurrencyInput } from "components/CurrencyInput";

type ComponentProps = {
    clienteId: number;
    venta?: Venta;
    isActive?: boolean;
    close?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const VentaForm = function ({
    clienteId,
    venta,
    isActive,
    close,
}: ComponentProps) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<VentaInputs>({
        defaultValues: {
            fecha: venta?.fecha || new Date().toISOString().substring(0, 10),
            debe: venta?.debe ? venta.debe.toString().replace(/\./g, ",") : "",
            haber: venta?.haber
                ? venta.haber.toString().replace(/\./g, ",")
                : "",
            comprobante: venta?.comprobante || "",
            clienteId: venta?.clienteId || clienteId,
        },
    });

    const onSubmit: SubmitHandler<VentaInputs> = (inputs) => {
        const payload = {
            fecha: inputs.fecha,
            debe: inputs.debe?.replace(/\./g, "").replace(/,/g, ".") || 0,
            haber: inputs.haber?.replace(/\./g, "").replace(/,/g, ".") || 0,
            comprobante: inputs.comprobante,
            clienteId: inputs.clienteId,
        };
        venta
            ? feathersClient
                  .service("ventas")
                  .patch(venta.id, payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  })
            : feathersClient
                  .service("ventas")
                  .create(payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  });
    };

    useEffect(() => {
        reset();
    }, [isActive, venta, reset]);

    return (
        <Form
            isActive={isActive}
            close={close}
            onSubmit={handleSubmit(onSubmit)}
            length={2}
        >
            <Label title="Fecha" error={errors.fecha?.message} length={1}>
                <input
                    type="date"
                    placeholder="-"
                    autoComplete="off"
                    {...register("fecha", {
                        required: "Ingrese la fecha",
                    })}
                />
            </Label>
            <Label title="Comprobante" length={1}>
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("comprobante")}
                />
            </Label>
            <Label title="Debe" error={errors.debe?.message} length={1}>
                <CurrencyInput name="debe" control={control} />
            </Label>
            <Label title="Haber" error={errors.haber?.message} length={1}>
                <CurrencyInput name="haber" control={control} />
            </Label>
        </Form>
    );
};

export default VentaForm;
