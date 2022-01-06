import { MouseEvent, useRef, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import MaskedInput from "react-text-mask";
import feathersClient from "feathersClient";
import styled from "styled-components";
import transition from "styled-transition-group";

import { useCheques } from "hooks/chequesContext";
import FormComponent from "components/Form";
import Label from "components/Label";
import CurrencyInput from "components/CurrencyInput";
import Select from "components/Select";

const Form = styled(FormComponent)`
    grid-template-columns: 2fr 3fr 2fr [end];
`;

const Expand = transition.div.attrs({
    unmountOnExit: true,
    timeout: {
        enter: 300,
        exit: 150,
    },
})`
    grid-column-end: span 3;
    overflow: clip;
    display: grid;
    gap: inherit;
    grid-template-columns: inherit;
    
    &:enter {
        max-height: 0;
    }

    &:enter-active {
        max-height: 5rem;
        transition: 0.3s ease-out;
    }

    &:exit {
        max-height: 5rem;
    }

    &:exit-active {
        max-height: 0;
        transition: 0.15s ease-in;
    }
`;

type ComponentProps = {
    data?: Cobro;
    isActive: boolean;
    close: (e: MouseEvent<HTMLButtonElement>) => void;
};

const CobrarForm = function ({ data, isActive, close }: ComponentProps) {
    const nodeRef = useRef(null);
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
            cliente: "",
            banco: "",
            proveedor: "",
            depositoDate: data?.depositoDate,
            monto: data?.monto
                ? `$${data.monto.toString().replace(/\./g, ",")}`
                : "",
            clienteId: data?.clienteId || 0,
            ingresoDate:
                data?.ingresoDate || new Date().toISOString().substring(0, 10),
            bancoId: data?.bancoId || 0,
            numero: data?.numero || "",
            titular: data?.titular || "",
            cuit: data?.cuit || "",
            observaciones: data?.observaciones || "",
            estado: data?.estado || "A depositar",
            salidaDate: data?.salidaDate,
            proveedoreId: data?.proveedoreId,
        },
    });
    const { clientes, proveedores, bancos } = useCheques();

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
            salidaDate: inputs.salidaDate,
            proveedoreId: inputs.proveedoreId,
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
            <Label title="Estado">
                <select {...register("estado")}>
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
            <Label title="Monto" error={errors.monto?.message}>
                <CurrencyInput control={control} />
            </Label>
            <Expand
                nodeRef={nodeRef}
                ref={nodeRef}
                in={
                    watch("estado") === "Endosado" ||
                    watch("estado") === "Posdatado"
                }
            >
                <Label
                    title="Fecha de salida"
                    error={errors.salidaDate?.message}
                >
                    <input
                        type="date"
                        autoComplete="off"
                        {...register("salidaDate", {
                            required:
                                watch("estado") === "Endosado" ||
                                watch("estado") === "Posdatado"
                                    ? "Ingrese la fecha de salida"
                                    : undefined,
                        })}
                    />
                </Label>
                <Select
                    nameId="proveedoreId"
                    name="proveedor"
                    nameService="proveedores"
                    list={proveedores}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    length={2}
                    error={errors.proveedoreId?.message}
                    disabled={watch("estado") === "Posdatado"}
                />
            </Expand>
            <Label
                title="Fecha de deposito"
                error={errors.depositoDate?.message}
            >
                <input
                    type="date"
                    autoComplete="off"
                    {...register("depositoDate", {
                        required: "Ingrese la fecha de deposito",
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
            <Label title="Fecha de ingreso" error={errors.ingresoDate?.message}>
                <input
                    type="date"
                    placeholder="-"
                    autoComplete="off"
                    {...register("ingresoDate", {
                        required: "Ingrese la fecha de ingreso",
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
                            placeholder="-"
                            autoComplete="off"
                            {...field}
                        />
                    )}
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

export default CobrarForm;
