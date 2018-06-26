import { WeightedEntity } from "./weighted-entity";

export class EntityRollRange<T extends WeightedEntity> {
    public Item: T;
    public MinRoll: number;
    public MaxRoll: number;

    constructor(item: T, min: number, max: number) {
        this.Item = item;
        this.MinRoll = min;
        this.MaxRoll = max;
    }
}