import { MouseEvent, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import feathersClient from "feathersClient";
import styled from "styled-components";

import { useCheques } from "hooks/chequesContext";
import FormComponent from "components/Form";
import Label from "components/Label";
import CurrencyInput from "components/CurrencyInput";
import Select from "components/Select";

const Form = styled(FormComponent)`
    grid-template-columns: 2fr 3fr 2fr [end];
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
        watch,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            proveedor: "",
            pagoDate: data?.pagoDate,
            monto: "$" + data?.monto.toString().replace(/\./g, ","),
            proveedoreId: data?.proveedoreId || 0,
            emisionDate:
                data?.emisionDate || new Date().toISOString().substring(0, 10),
            numero: data?.numero || "",
            observaciones: data?.observaciones || "",
            estado: data?.estado || "A pagar",
        },
    });
    const { proveedores } = useCheques();

    const onSubmit: SubmitHandler<Inputs> = (inputs) => {
        const payload = {
            pagoDate: inputs.pagoDate,
            monto: inputs.monto.slice(1).replace(/\./g, "").replace(/,/g, "."),
            proveedoreId: inputs.proveedoreId,
            emisionDate: inputs.emisionDate,
            numero: inputs.numero,
            observaciones: inputs.observaciones,
            estado: inputs.estado,
        };
        data
            ? feathersClient
                  .service("pagos")
                  .patch(data.id, payload)
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
    }, [isActive, data, reset]);

    return (
        <Form
            isActive={isActive}
            close={close}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Label title="Monto" error={errors.monto?.message}>
                <CurrencyInput control={control} />
            </Label>
            <Select
                nameId="proveedoreId"
                name="proveedor"
                nameService="proveedores"
                list={proveedores}
                register={register}
                watch={watch}
                setValue={setValue}
                error={errors.proveedoreId?.message}
            />
            <Label title="Estado">
                <select {...register("estado")}>
                    <option value="A pagar">A pagar</option>
                    <option value="Pagado">Pagado</option>
                    <option value="Anulado">Anulado</option>
                    <option value="Recuperado">Recuperado</option>
                    <option value="Vencido">Vencido</option>
                </select>
            </Label>
            <Label title="Fecha de emision" error={errors.emisionDate?.message}>
                <input
                    type="date"
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
                    placeholder="-"
                    autoComplete="off"
                    {...register("numero", {
                        required: "Ingrese el numero de cheque",
                    })}
                />
            </Label>
            <Label title="Fecha de pago" error={errors.pagoDate?.message}>
                <input
                    type="date"
                    placeholder="-"
                    autoComplete="off"
                    {...register("pagoDate", {
                        required: "Ingrese la fecha de pago",
                    })}
                />
            </Label>
            <Label title="Observaciones" length={3}>
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

export default PagarForm;
