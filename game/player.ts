export class Player {
    public readonly name: string;
    private chameleon = false;

    constructor(name: string) {
        this.name = name;
    }

    public makeChameleon() {
        this.chameleon = true;
    }

    public clearChameleon() {
        this.chameleon = false;
    }

    get isChameleon() {
        return this.chameleon;
    }
}
