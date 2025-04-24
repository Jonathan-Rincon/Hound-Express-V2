import guidesReducer, { addGuide, updateGuideStatus } from "../store/guidesSlice";
import { Guide } from "../types/Guide";

describe("guidesSlice", () => {
    const initialState = {
        guides: [],
    };

    it("Debe agregar una nueva guía con el reducer addGuide", () => {
        const newGuide: Guide = {
            numeroGuia: "12345",
            estado: "Pendiente",
            origen: "Ciudad A",
            destino: "Ciudad B",
            fecha: "2023-05-01",
            historial: [],
            destinatario: "Juan Pérez",
        };

        const nextState = guidesReducer(initialState, addGuide(newGuide));

        expect(nextState.guides).toHaveLength(1);
        expect(nextState.guides[0]).toEqual(newGuide);
    });

    it("Debe actualizar el estado de una guía con el reducer updateGuideStatus", () => {
        const existingGuide: Guide = {
            numeroGuia: "12345",
            estado: "Pendiente",
            origen: "Ciudad A",
            destino: "Ciudad B",
            fecha: "2023-05-01",
            historial: [],
            destinatario: "Juan Pérez",
        };

        const preloadedState = {
            guides: [existingGuide],
        };

        const nextState = guidesReducer(
            preloadedState,
            updateGuideStatus({ index: 0, status: "En tránsito" })
        );

        expect(nextState.guides[0].estado).toBe("En tránsito");
        expect(nextState.guides[0].historial).toContainEqual(
            expect.stringMatching(/Estado actualizado a: En tránsito - .+/)
        );
    });

    it("No debe actualizar el estado si el índice es incorrecto", () => {
        const existingGuide: Guide = {
            numeroGuia: "12345",
            estado: "Pendiente",
            origen: "Ciudad A",
            destino: "Ciudad B",
            fecha: "2023-05-01",
            historial: [],
            destinatario: "Juan Pérez",
        };

        const preloadedState = {
            guides: [existingGuide],
        };

        const nextState = guidesReducer(
            preloadedState,
            updateGuideStatus({ index: 999, status: "En tránsito" })
        );

        expect(nextState.guides[0].estado).toBe("Pendiente"); // No se actualizó
        expect(nextState.guides[0].historial).toHaveLength(0); // No se añadió al historial
    });
});