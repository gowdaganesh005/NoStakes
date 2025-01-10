export const DECIMAL_MULLTIPLIER=10000;

export function pad(n:number){
    return n*DECIMAL_MULLTIPLIER
}
export function unpad(n:number){
    return Math.floor(n/DECIMAL_MULLTIPLIER);
}