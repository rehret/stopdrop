export class EntityAttribute<TValue = any> {
    public Value: TValue;
    public Prefix: string;
    public Suffix: string;

    constructor(value: TValue, prefix: string = '', suffix: string = '') {
        this.Value = value;
        this.Prefix = prefix;
        this.Suffix = suffix;
    }
}