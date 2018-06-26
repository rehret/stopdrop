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

        const numberOfModifiers = Math.floor(Math.random() * ((maxModifiers < 0 ? entityArchetype.Modifiers.length : maxModifiers) + 1));

        for (let i = 0; i < numberOfModifiers; i++) {
            const modifier = WeightedRoller.GetItem(entityArchetype.Modifiers);
            if (entity.Modifiers.indexOf(modifier) === -1) {
                entity.Modifiers.push(modifier);
            }
        }

        return entity;
    }
}
