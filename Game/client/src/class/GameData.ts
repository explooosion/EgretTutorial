class Player {
    public team: number;
    public hp: number;
    public attack: number;
    public x: number;
    public y: number;
    public others: StatusOthersSub[];
    constructor(team: number, hp: number, attack: number, x: number, y: number, others: StatusOthersSub[]) {
        this.team = team;
        this.hp = hp;
        this.attack = attack;
        this.x = x;
        this.y = y;
        this.others = others;
    }
}

class GameData {

    // Game Server
    public reconnectTimeout: number = 3000;
    public serverAddress: string = '60.249.179.126';
    public serverPort: number = 8083;

    public message: any;
    public topic: string;

    public masterId: string = 'dadkfh';
    public clientId: string = 'mqttclient123456';
    public playerId: string = '';
    public mapId: string = '';

    // Player Info
    public player: Player;

    constructor() {
    }
}
