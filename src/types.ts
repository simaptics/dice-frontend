export interface Macro {
    id: number;
    name: string;
    num_dice: number;
    sides: number;
    modifier: number;
}

export interface RollResult {
    rolls: number[];
    total: number;
    modifier: number;
    final: number;
    sides: number;
}
