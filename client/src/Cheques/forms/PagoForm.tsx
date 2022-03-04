import { MouseEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import feathersClient from "feathersClient";

import { useCheques } from "../hooks/chequesContext";
import { Form } from "components/Form";
import { Label } from "components/Label";
import { CurrencyInput } from "components/CurrencyInput";
import { Select } from "components/Select";

type ComponentProps = {
    pago?: Pago;
    isActive?: boolean;
    close?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const PagoForm = function ({ pago, isActive, close }: ComponentProps) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            destinatario: "",
            pagoDate: pago?.pagoDate,
            monto: pago?.monto ? pago.monto.toString().replace(/\./g, ",") : "",
            destinatarioId: pago?.destinatarioId || 0,
            emisionDate:
                pago?.emisionDate || new Date().toISOString().substring(0, 10),
            numero: pago?.numero || "",
            observaciones: pago?.observaciones || "",
            estado: pago?.estado || "A pagar",
        },
    });
    const { destinatarios } = useCheques();

    const onSubmit: SubmitHandler<Inputs> = (inputs) => {
        const payload = {
            pagoDate: inputs.pagoDate,
            monto: inputs.monto.replace(/\./g, "").replace(/,/g, "."),
            destinatarioId: inputs.destinatarioId,
            emisionDate: inputs.emisionDate,
            numero: inputs.numero,
            observaciones: inputs.observaciones,
            estado: inputs.estado,
        };
        pago
            ? feathersClient
                  .service("pagos")
                  .patch(pago.id, payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  })
            : feathersClient
                  .service("pagos")
                  .create(payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  });
    };

    useEffect(() => {
        reset();
    }, [isActive, pago, reset]);

    return (
        <Form
            isActive={isActive}
            close={close}
            onSubmit={handleSubmit(onSubmit)}
            length={7}
        >
            <Label title="Estado" length={2}>
                <select {...register("estado")}>
                    <option value="A pagar">A pagar</option>
                    <option value="Pagado">Pagado</option>
                    <option value="Anulado">Anulado</option>
                    <option value="Recuperado">Recuperado</option>
                    <option value="Vencido">Vencido</option>
                </select>
            </Label>
            <Select
                nameId="destinatarioId"
                name="destinatario"
                nameService="destinatarios"
                list={destinatarios}
                register={register}
                watch={watch}
                setValue={setValue}
                error={errors.destinatarioId?.message}
                length={3}
            />
            <Label title="Monto" error={errors.monto?.message} length={2}>
                $<CurrencyInput name="monto" control={control} required />
            </Label>
            <Label
                title="Fecha de pago"
                error={errors.pagoDate?.message}
                length={2}
            >
                <input
                    type="date"
                    placeholder="-"
                    autoComplete="off"
                    {...register("pagoDate", {
                        required: "Ingrese la fecha de pago",
                    })}
                />
            </Label>
            <Label
                title="Numero de cheque"
                error={errors.numero?.message}
                length={3}
            >
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("numero", {
                        required: "Ingrese el numero de cheque",
                    })}
                />
            </Label>
            <Label
                title="Fecha de emision"
                error={errors.emisionDate?.message}
                length={2}
            >
                <input
                    type="date"
                    placeholder="-"
                    autoComplete="off"
                    {...register("emisionDate", {
                        required: "Ingrese la fecha de emision",
                    })}
                />
            </Label>
            <Label title="Observaciones" length={7}>
                <input
                    type="text"
                    placeholder="-"
                    autoComplete="off"
                    {...register("observaciones")}
                />
            </Label>
        </Form>
    );
};

export default PagoForm;
