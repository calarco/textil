import { useState, useEffect } from "react";

const usePrecios = () => {
    const [precios, setPrecios] = useState<Precios>({
        total: 0,
        limit: 0,
        skip: 0,
        data: [],
    });

    useEffect(() => {
        setPrecios({
            total: 0,
            limit: 0,
            skip: 0,
            data: [
                {
                    id: 1,
                    articulo: 158,
                    descripcion: "Escote V sin manga",
                    kg: 0.4,
                    costos: [
                        { nombre: "hilado", monto: 587.4 },
                        { nombre: "tejido", monto: 120 },
                        { nombre: "confeccion", monto: 213.44 },
                        { nombre: "cierre", monto: 0 },
                        { nombre: "fin", monto: 25.5 },
                    ],
                    createdAt: "",
                    updatedAt: "",
                },
            ],
        });
    }, []);

    return { precios };
};

export default usePrecios;
