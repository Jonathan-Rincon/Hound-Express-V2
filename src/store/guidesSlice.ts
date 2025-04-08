import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Guide } from '../types/Guide';

interface GuidesState {
    guides: Guide[];
}

const initialState: GuidesState = {
    guides: [],
};

const guidesSlice = createSlice({
    name: 'guides',
    initialState,
    reducers: {
        addGuide(state, action: PayloadAction<Guide>) {
            state.guides.push(action.payload);
        },
        updateGuideStatus(state, action: PayloadAction<{ index: number; status: string }>) {
            const { index, status } = action.payload;
            const guide = state.guides[index];
            if (guide) {
                guide.estado = status;
                guide.historial.push(`Estado actualizado a: ${status} - ${new Date().toLocaleString()}`);
            }
        },
    },
});

export const { addGuide, updateGuideStatus } = guidesSlice.actions;
export default guidesSlice.reducer;
