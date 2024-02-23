import { RouterContext } from "https://deno.land/x/oak@v13.2.5/mod.ts";

import { Eta } from "../util/eta.ts";

export function index(ctx: RouterContext<"/">) {
    ctx.response.body = Eta.render("index.eta");
}
