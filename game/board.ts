import { sample } from "https://deno.land/std@0.216.0/collections/mod.ts";

export class Board {
    public readonly field: string;
    public readonly words: string[][];

    constructor(words: string[][]) {
        this.words = words;
        this.field = sample(sample(words) ?? []) ?? "error";
    }
}
