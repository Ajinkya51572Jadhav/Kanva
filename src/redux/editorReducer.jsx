import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    path: "banner",
    collapsed: {
        parent: false,
        child: true,
    },
    canvasSize: { w: 1080, h: 1080 },
    zoom: 1,
    activeIndex: 0,
    selectedUniqueId: null,
    editorPages: [{ id: 1, children: [], background: "#ffffff" }],
    popup: false,
    fontList: [],
    uploadsPhotos: [],
    savedTemplates: [],
};

const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setPath: (state, action) => {
            state.path = action.payload;
        },
        setCollapsed: (state, action) => {
            const { parent, child } = action.payload;
            state.collapsed.parent = parent;
            state.collapsed.child = child;
        },
        setZoom: (state, action) => {
            state.zoom = action.payload;
        },
        setActiveIndex: (state, action) => {
            state.activeIndex = action.payload;
        },
        setSelectedUniqueId: (state, action) => {
            state.selectedUniqueId = action.payload;
        },
        setEditorPages: (state, action) => {
            state.editorPages = action.payload;
        },
        setPopUp: (state, action) => {
            state.popup = action.payload;
        },
        setFontList: (state, action) => {
            state.fontList = action.payload;
        },
        setCanvasSize: (state, action) => {
            state.canvasSize = action.payload;
        },
        setUploadsPhotos: (state, action) => {
            state.uploadsPhotos = action.payload;
        },
        setSaveTemplate: (state, action) => {
            state.savedTemplates.push(action.payload);
        },
        deleteTemplate: (state, action) => {
            state.savedTemplates = state.savedTemplates.filter((tpl) => String(tpl?.id) !== String(action.payload));
        },

    }
});

export const {
    setPath,
    setCollapsed,
    setZoom,
    setActiveIndex,
    setSelectedUniqueId,
    setEditorPages,
    setPopUp,
    setFontList,
    setCanvasSize,
    setUploadsPhotos,
    setSaveTemplate,
    deleteTemplate
} = editorSlice.actions;
export default editorSlice.reducer;    