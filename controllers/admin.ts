import { RouterContext } from "https://deno.land/x/oak@v13.2.5/mod.ts";

import { Game } from "../game/game.ts";
import { Eta } from "../util/eta.ts";

export function admin(ctx: RouterContext<"/admin">) {
    const game = Game.getInstance();
    const { words } = game.board;
    const players = Array.from(game.players.entries());
    const isPlaying = game.isPlaying;

    ctx.response.body = Eta.render("admin.eta", { state: { words, players, isPlaying } });
}

export function adminStart(ctx: RouterContext<"/admin/start">) {
    const game = Game.getInstance();
    game.startNewGame();

    ctx.response.redirect("/admin");
}

export function adminReset(ctx: RouterContext<"/admin/reset">) {
    Game.reset();

    ctx.response.redirect("/admin");
}
