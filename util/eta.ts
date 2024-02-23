import { Eta as EtaJS } from "https://deno.land/x/eta@v3.2.0/src/index.ts";

export class Eta {
    private static instance: Eta;
    public readonly eta: EtaJS;
    private constructor() {
        const viewpath = Deno.cwd() + "/views/";
        this.eta = new EtaJS({ views: viewpath });
    }

    public static render(path: string, data: object = {}) {
        if (!Eta.instance) {
            Eta.instance = new Eta();
        }

        return Eta.instance.eta.render(path, data);
    }
}
