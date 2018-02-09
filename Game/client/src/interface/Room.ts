/**
 * 開新房間
 */
interface RoomCreatePub {
    action: string;
    key: string;
}

/**
 * 開新房間
 */
interface RoomCreateSub {
    result: string;
    url: string;
}

/**
 * 加入房間
 */
interface RoomJoinPub {
    action: string;
    key: string;
}

/**
 * 加入房間
 */
interface RoomJoinSub {
    result: string;
    id: string;
    map: string;
}