/**
 * 了解目前狀態
 */
interface StatusSub {
    team: number;
    hp: number;
    attack: number;
    x: number;
    y: number;
    others: StatusOthersSub[];
}

/**
 * 了解目前狀態 - 其他人
 */
interface StatusOthersSub {
    team: number;
    hp: number;
    x: number;
    y: number;
}

/**
 * 移動角色
 */
interface PlayerMovePub {
    x: number;
    y: number;
    id: string;
}

/**
 * 刪除角色
 */
interface PlayerDeletePub {
    id: string;
}
