export type LoadingState = 'idle' | 'loading' | 'success' | 'failed';

export const LoadingState = {
    IDLE: 'idle' as LoadingState,
    LOADING: 'loading' as LoadingState,
    SUCCESS: 'success' as LoadingState,
    FAILED: 'failed' as LoadingState,
};