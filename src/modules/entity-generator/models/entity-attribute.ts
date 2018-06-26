export class EntityAttribute<TValue = any> {
    public Name: string;
    public Value: TValue;
    public Prefix: string;
    public Suffix: string;

    constructor(name: string, value: TValue, prefix: string = '', suffix: string = '') {
        this.Name = name;
        this.Value = value;
        this.Prefix = prefix;
        this.Suffix = suffix;
    }
}