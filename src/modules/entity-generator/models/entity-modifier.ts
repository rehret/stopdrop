import { EntityAttribute } from "./entity-attribute";
import { WeightedEntity } from "../../weighted-roller";

export class EntityModifier<TValue = any> extends WeightedEntity {
    public Modification: EntityAttribute<TValue>;

    constructor(weight: number, value: TValue, prefix: string = '', suffix: string = '') {
        super(weight);
        this.Modification = new EntityAttribute(value, prefix, suffix);
    }
}