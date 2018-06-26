import { WeightedEntity } from "../../weighted-roller";
import { EntityModifier } from "./entity-modifier";
import { EntityAttribute } from "./entity-attribute";

export class EntityDefinition<TAttrValue = any, TModValue = any> extends WeightedEntity {
    public Name: string;
    public Attribute: EntityAttribute<TAttrValue>;
    public Modifiers: EntityModifier<TModValue>[];

    /**
     * @param weight Controls the chance for the entity to be rolled. Higher values are more common.
     * @param name
     * @param attribute
     * @param modifiers
     */
    constructor(weight: number, name: string, attribute: EntityAttribute<TAttrValue>, modifiers: EntityModifier<TModValue>[]) {
        super(weight);

        this.Name = name;
        this.Attribute = attribute;
        this.Modifiers = modifiers;
    }

    /**
     * Builds the name of the entity.
     *
     * This involves prefixing the name with attribute and modifier prefixes as
     * well as postfixing the name with attribute and modifier suffixes.
     *
     * Modifier prefixes and suffixes are used before those from the attribute.
     *
     * @param maxPrefixes Maximum number of prefixes to use. Use -1 for unlimited.
     * @param maxSuffixes Maximum number of suffixes to use. Use -1 for unlimited.
     */
    public toString(maxPrefixes: number = -1, maxSuffixes: number = -1): string {
        const prefixes: string[] = [];
        const suffixes: string[] = [];

        if (this.Modifiers.some(m => m.Modification.Prefix.length > 0)) {
            this.Modifiers
                .filter(m => m.Modification.Prefix.length > 0)
                .map(m => m.Modification.Prefix)
                .forEach(prefix => prefixes.push(prefix));
        }

        if (this.Attribute.Prefix.length > 0) {
            prefixes.push(this.Attribute.Prefix);
        }

        if (this.Modifiers.some(m => m.Modification.Suffix.length > 0)) {
            this.Modifiers
                .filter(m => m.Modification.Suffix.length > 0)
                .map(m => m.Modification.Suffix)
                .forEach(suffix => suffixes.push(suffix));
        }

        if (this.Attribute.Suffix.length > 0) {
            suffixes.push(this.Attribute.Suffix);
        }

        const effectivePrefixes = prefixes.slice(0, maxPrefixes < 0 ? prefixes.length : maxPrefixes);
        const effectiveSuffixes = suffixes.slice(0, maxSuffixes < 0 ? suffixes.length : maxSuffixes);

        let str = '';
        str += effectivePrefixes.join(' ');
        str += effectivePrefixes.length > 0 ? ' ' : '';
        str += this.Name;
        str += effectiveSuffixes.length > 0 ? ' ' : '';
        str += effectiveSuffixes.join(' ');
        return str;
    }
}