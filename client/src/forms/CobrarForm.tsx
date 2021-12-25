import { MouseEvent, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import MaskedInput from "react-text-mask";
import feathersClient from "feathersClient";
import styled from "styled-components";

import useClientes from "hooks/useClientes";
import useBancos from "hooks/useBancos";
import FormComponent from "components/Form";
import Label from "components/Label";
import CurrencyInput from "components/CurrencyInput";
import Select from "components/Select";

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
        watch,
        setValue,
        reset,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            clienteId: 0,
            cliente: "",
            bancoId: 0,
            banco: "",
        },
    });
    const { clientes } = useClientes();
    const { bancos } = useBancos();

    const onSubmit: SubmitHandler<Inputs> = (inputs) => {
        const payload = {
            depositoDate: inputs.depositoDate,
            monto: inputs.monto.slice(1).replace(/\./g, "").replace(/,/g, "."),
            clienteId: inputs.clienteId,
            ingresoDate: inputs.ingresoDate,
            bancoId: inputs.bancoId,
            numero: inputs.numero,
            titular: inputs.titular,
            cuit: inputs.cuit,
            observaciones: inputs.observaciones,
            estado: inputs.estado,
        };
        data
            ? feathersClient
                  .service("cobros")
                  .patch(data.id, payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  })
            : feathersClient
                  .service("cobros")
                  .create(payload)
                  .then(() => {})
                  .catch((error: FeathersErrorJSON) => {
                      console.error(error.message);
                  });
    };

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
                    control={control}
                    defaultValue={data?.monto.toString().replace(/\./g, ",")}
                />
            </Label>
            <Select
                nameId="clienteId"
                name="cliente"
                nameService="clientes"
                list={clientes}
                register={register}
                watch={watch}
                setValue={setValue}
                error={errors.clienteId?.message}
            />
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
            <Select
                nameId="bancoId"
                name="banco"
                nameService="bancos"
                list={bancos}
                register={register}
                watch={watch}
                setValue={setValue}
                error={errors.bancoId?.message}
            />
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
                <Controller
                    name={"cuit"}
                    control={control}
                    rules={{ required: "Ingrese el CUIT" }}
                    render={({ field }) => (
                        <MaskedInput
                            mask={[
                                /\d/,
                                /\d/,
                                "-",
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                "-",
                                /\d/,
                            ]}
                            guide={false}
                            type="text"
                            inputMode="numeric"
                            defaultValue={data?.cuit}
                            placeholder="-"
                            autoComplete="off"
                            {...field}
                        />
                    )}
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
