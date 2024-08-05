import { Image } from './types';
import { create } from 'zustand';

export interface ImageExplorerState {
    images: Image[];
    loading: boolean;
    colUpperBounds: number[] | null;
    colLowerBounds: number[] | null;
    centralImage: Image | null;
    translateX: number;
    translateY: number;
    containerHeight: number;
    containerWidth: number;
    setImages: (images: Image[]) => void;
    setLoading: (loading: boolean) => void;
    setColUpperBounds: (bounds: number[]) => void;
    setColLowerBounds: (bounds: number[]) => void;
    setCentralImage: (image: Image | null) => void;
    setTranslateX: (x: number) => void;
    setTranslateY: (y: number) => void;
    setContainerHeight: (height: number) => void;
    setContainerWidth: (width: number) => void;
}

export const useImageExplorerStore = create<ImageExplorerState>((set) => ({
    images: [],
    loading: false,
    colUpperBounds: null,
    colLowerBounds: null,
    centralImage: null,
    translateX: 0,
    translateY: 0,
    containerHeight: 0,
    containerWidth: 0,
    setImages: (images) => set({ images }),
    setLoading: (loading) => set({ loading }),
    setColUpperBounds: (bounds) => set({ colUpperBounds: bounds }),
    setColLowerBounds: (bounds) => set({ colLowerBounds: bounds }),
    setCentralImage: (image) => set({ centralImage: image }),
    setTranslateX: (x) => set({ translateX: x }),
    setTranslateY: (y) => set({ translateY: y }),
    setContainerHeight: (height) => set({ containerHeight: height }),
    setContainerWidth: (width) => set({ containerWidth: width }),
}));