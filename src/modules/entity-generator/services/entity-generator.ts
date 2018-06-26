import { EntityDefinition } from "../models/entity-definition";
import { WeightedRoller } from "../../weighted-roller";

export class EntityGenerator<TAttrValue = any, TModValue = any> {
    public ItemDefinitions: EntityDefinition<TAttrValue, TModValue>[];

    constructor(itemDefinitions: EntityDefinition<TAttrValue, TModValue>[]) {
        this.ItemDefinitions = itemDefinitions;
    }

    /**
     * @param maxModifiers Limits the number of possible modifiers. Use -1 for unlimited modifiers.
     */
    GetEntity(maxModifiers: number = -1): EntityDefinition<TAttrValue, TModValue> {
        const entityArchetype = WeightedRoller.GetItem(this.ItemDefinitions);
        const entity = new EntityDefinition<TAttrValue, TModValue>(entityArchetype.Weight, entityArchetype.Name, entityArchetype.Attribute, []);

        const numberOfModifiers = Math.max(WeightedRoller.GetItem(entityArchetype.ModifierChances).ModifierCount, maxModifiers);

        for (let i = 0; i < numberOfModifiers; i++) {
            let modifier = WeightedRoller.GetItem(entityArchetype.Modifiers);

            while (entity.Modifiers.includes(modifier)) {
                modifier = WeightedRoller.GetItem(entityArchetype.Modifiers);
            }

            entity.Modifiers.push(modifier);
        }

        return entity;
    }
}
