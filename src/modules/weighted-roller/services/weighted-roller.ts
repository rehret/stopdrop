import 'core-js/fn/array/find';
import { WeightedEntity } from "../models/weighted-entity";
import { EntityRollRange } from "../models/entity-roll-range";

export class WeightedRoller {
    public static GetItem<T extends WeightedEntity>(items: T[]): T {
        const itemRanges = WeightedRoller.GetItemRanges(items);
        const roll = Math.random();
        const itemRange = itemRanges.find((itemRange) => itemRange.MinRoll <= roll && (roll < itemRange.MaxRoll || (itemRange.MaxRoll === 1 && roll === 1)));
        if (itemRange) {
            return itemRange.Item;
        }
        throw new Error('Invalid item ranges');
    }

    private static GetItemRanges<T extends WeightedEntity>(items: T[]): EntityRollRange<T>[] {
        const weightSum = items.reduce((sum, item) => sum + item.Weight, 0);
        const unit = 1 / weightSum;

        let min = 0;
        return items.map((item) => {
            const max = min + item.Weight * unit;
            const itemRange = new EntityRollRange<T>(item, min, max);
            min = max;
            return itemRange;
        });
    }
}
