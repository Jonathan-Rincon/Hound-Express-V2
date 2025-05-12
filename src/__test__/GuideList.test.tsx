import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import guidesReducer, { updateGuideStatus } from "../store/guidesSlice";
import GuideList from "../components/GuideList";
import "@testing-library/jest-dom";

// Mock del Modal para simplificar las pruebas
jest.mock("../components/Modal", () => {
  return ({ isOpen, onClose, title, children }: any) => {
    if (!isOpen) return null;
    return (
      <div data-testid="modal">
        <h1>{title}</h1>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    );
  };
});

const initialState = {
  guides: {
    guides: [
      {
        numeroGuia: "12345",
        estado: "Pendiente",
        origen: "Ciudad A",
        destino: "Ciudad B",
        destinatario: "Juan Pérez",
        fecha: "2023-05-01",
        historial: ["Creado con estado: Pendiente"],
      },
      {
        numeroGuia: "67890",
        estado: "En tránsito",
        origen: "Ciudad C",
        destino: "Ciudad D",
        destinatario: "Ana López",
        fecha: "2023-04-28",
        historial: ["Creado con estado: Pendiente", "Estado cambiado a En tránsito"],
      },
    ],
  },
};

describe("GuideList Component", () => {
  const renderWithProvider = (state = initialState) => {
    const store = configureStore({
      reducer: { guides: guidesReducer }, // Reducer correctamente estructurado
      preloadedState: state,
    });

    render(
      <Provider store={store}>
        <GuideList />
      </Provider>
    );

    return store;
  };

  it("Renderiza correctamente la tabla con las guías", () => {
    renderWithProvider();

    expect(screen.getByText("12345")).toBeInTheDocument();
    expect(screen.getByText("Pendiente")).toBeInTheDocument();
    expect(screen.getByText("Ciudad A")).toBeInTheDocument();
    expect(screen.getByText("Ciudad B")).toBeInTheDocument();

    expect(screen.getByText("67890")).toBeInTheDocument();
    expect(screen.getByText("En tránsito")).toBeInTheDocument();
    expect(screen.getByText("Ciudad C")).toBeInTheDocument();
    expect(screen.getByText("Ciudad D")).toBeInTheDocument();
  });

  it("Muestra el historial en un modal al hacer clic en el botón 'Historial'", () => {
    renderWithProvider();

    const historyButton = screen.getAllByText("Historial")[0];
    fireEvent.click(historyButton);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Historial de Cambios")).toBeInTheDocument();
    expect(screen.getByText("Creado con estado: Pendiente")).toBeInTheDocument();
  });

  it("Actualiza el estado de una guía al hacer clic en 'Actualizar Estado'", () => {
    const store = renderWithProvider();

    const updateButton = screen.getAllByText("Actualizar Estado")[0];
    fireEvent.click(updateButton);

    expect(store.getState().guides.guides[0].estado).toBe("En tránsito"); // Accediendo correctamente al estado
  });

  it("Muestra una alerta si se intenta avanzar el estado de una guía ya entregada", () => {
    const finalState = {
      guides: {
        guides: [
          {
            numeroGuia: "99999",
            estado: "Entregado",
            origen: "Ciudad X",
            destino: "Ciudad Y",
            destinatario: "Carlos Gómez",
            fecha: "2023-04-25",
            historial: ["Creado con estado: Pendiente", "Estado cambiado a Entregado"],
          },
        ],
      },
    };

    const store = renderWithProvider(finalState);

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    const updateButton = screen.getByText("Actualizar Estado");
    fireEvent.click(updateButton);

    expect(alertMock).toHaveBeenCalledWith("Esta guía ya está en el estado final.");
  });
});