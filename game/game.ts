import { log } from "../util/log.ts";
import { Board } from "./board.ts";
import { Player } from "./player.ts";
import { Status } from "./status.ts";

export class Game {
    private static instance: Game;

    public readonly players: Map<string, Player>;
    public readonly board: Board;
    private status = Status.PREPARING;

    private constructor() {
        this.players = new Map<string, Player>();
        this.board = new Board([
            ["Pizza", "Krumpli", "Hal", "Sütemény"],
            ["Tészta", "Saláta", "Leves", "Kenyér"],
            ["Tojás", "Sajt", "Gyümölcs", "Virsli"],
            ["Sült Csrike", "Jégkrém", "Csokoládé", "Marhahús"],
        ]);
        this.status = Status.PREPARING;

        log.debug("selected field", { field: this.board.field });
    }

    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game();
            log.warn("new game was built!");
        }

        log.debug("game instance returning...");
        return Game.instance;
    }

    get playerIds(): string[] {
        return Array.from(this.players.entries()).map(el => el[0]);
    }

    public addPlayer(name: string) {
        this.players.set(name, new Player(name));
    }
}
