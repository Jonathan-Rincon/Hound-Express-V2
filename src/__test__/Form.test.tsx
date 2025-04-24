import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Form from "../components/Form"; // Ajusta esta ruta según tu estructura de archivos
import guidesReducer, { addGuide } from "../store/guidesSlice";
import { useDispatch } from "react-redux";
import '@testing-library/jest-dom';

// Mock de Redux Dispatch
jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
}));

describe("Form Component", () => {
    let mockDispatch: jest.Mock;

    beforeEach(() => {
        // Configura el mock del dispatch
        mockDispatch = jest.fn();
        (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    });

    it("Renderiza correctamente el formulario", () => {
        render(
            <Provider
                store={configureStore({
                    reducer: { guides: guidesReducer },
                })}
            >
                <Form />
            </Provider>
        );

        // Verifica que todos los campos del formulario estén presentes
        expect(screen.getByLabelText("Número de Guía:")).toBeInTheDocument();
        expect(screen.getByLabelText("Origen:")).toBeInTheDocument();
        expect(screen.getByLabelText("Destino:")).toBeInTheDocument();
        expect(screen.getByLabelText("Destinatario:")).toBeInTheDocument();
        expect(screen.getByLabelText("Fecha:")).toBeInTheDocument();
        expect(screen.getByText("Registrar")).toBeInTheDocument();
    });

    it("Actualiza el estado del formulario al escribir en los campos", () => {
        render(
            <Provider
                store={configureStore({
                    reducer: { guides: guidesReducer },
                })}
            >
                <Form />
            </Provider>
        );

        const numeroGuiaInput = screen.getByLabelText("Número de Guía:") as HTMLInputElement;
        fireEvent.change(numeroGuiaInput, { target: { value: "12345" } });
        expect(numeroGuiaInput.value).toBe("12345");

        const origenInput = screen.getByLabelText("Origen:") as HTMLInputElement;
        fireEvent.change(origenInput, { target: { value: "Ciudad A" } });
        expect(origenInput.value).toBe("Ciudad A");

        const destinoInput = screen.getByLabelText("Destino:") as HTMLInputElement;
        fireEvent.change(destinoInput, { target: { value: "Ciudad B" } });
        expect(destinoInput.value).toBe("Ciudad B");

        const destinatarioInput = screen.getByLabelText("Destinatario:") as HTMLInputElement;
        fireEvent.change(destinatarioInput, { target: { value: "Juan Pérez" } });
        expect(destinatarioInput.value).toBe("Juan Pérez");

        const fechaInput = screen.getByLabelText("Fecha:") as HTMLInputElement;
        fireEvent.change(fechaInput, { target: { value: "2023-05-01" } });
        expect(fechaInput.value).toBe("2023-05-01");
    });

    it("Muestra una alerta si se envía el formulario con campos vacíos", () => {
        render(
            <Provider
                store={configureStore({
                    reducer: { guides: guidesReducer },
                })}
            >
                <Form />
            </Provider>
        );

        const submitButton = screen.getByText("Registrar");
        const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
        fireEvent.click(submitButton);

        expect(alertMock).toHaveBeenCalledWith("Por favor, completa todos los campos.");
    });

    it("Envía la acción addGuide al store con datos completos", () => {
        render(
            <Provider
                store={configureStore({
                    reducer: { guides: guidesReducer },
                })}
            >
                <Form />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText("Número de Guía:"), { target: { value: "12345" } });
        fireEvent.change(screen.getByLabelText("Origen:"), { target: { value: "Ciudad A" } });
        fireEvent.change(screen.getByLabelText("Destino:"), { target: { value: "Ciudad B" } });
        fireEvent.change(screen.getByLabelText("Destinatario:"), { target: { value: "Juan Pérez" } });
        fireEvent.change(screen.getByLabelText("Fecha:"), { target: { value: "2023-05-01" } });

        const submitButton = screen.getByText("Registrar");
        fireEvent.click(submitButton);

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(
            addGuide({
                numeroGuia: "12345",
                origen: "Ciudad A",
                destino: "Ciudad B",
                destinatario: "Juan Pérez",
                fecha: "2023-05-01",
                estado: "Pendiente",
                historial: ["Creado con estado: Pendiente"],
            })
        );
    });

    it("Reinicia el formulario después de enviarlo con éxito", () => {
        render(
            <Provider
                store={configureStore({
                    reducer: { guides: guidesReducer },
                })}
            >
                <Form />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText("Número de Guía:"), { target: { value: "12345" } });
        fireEvent.change(screen.getByLabelText("Origen:"), { target: { value: "Ciudad A" } });
        fireEvent.change(screen.getByLabelText("Destino:"), { target: { value: "Ciudad B" } });
        fireEvent.change(screen.getByLabelText("Destinatario:"), { target: { value: "Juan Pérez" } });
        fireEvent.change(screen.getByLabelText("Fecha:"), { target: { value: "2023-05-01" } });

        const submitButton = screen.getByText("Registrar");
        fireEvent.click(submitButton);

        expect(screen.getByLabelText("Número de Guía:")).toHaveValue("");
        expect(screen.getByLabelText("Origen:")).toHaveValue("");
        expect(screen.getByLabelText("Destino:")).toHaveValue("");
        expect(screen.getByLabelText("Destinatario:")).toHaveValue("");
        expect(screen.getByLabelText("Fecha:")).toHaveValue("");
    });
});