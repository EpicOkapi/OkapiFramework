
export interface Migration {
    up(): void;
    down(): void;
}
