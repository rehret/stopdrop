import { WeightedEntity } from "../../weighted-roller";

export class ModifierChance extends WeightedEntity {
    public ModifierCount: number;

    constructor(weight: number, count: number) {
        super(weight);
        this.ModifierCount = count;
    }
}
