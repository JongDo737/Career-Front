export function decodeJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
}


export function isTokenExpired(token) {
    const decoded = decodeJwt(token);
    if (!decoded) return true;
    const now = Date.now().valueOf() / 1000;
    return typeof decoded.exp !== "undefined" && decoded.exp < now;
}


export function getIdFromToken(token) {
    const decoded = decodeJwt(token);
    if (!decoded || decoded.id == "undefined") return -1;
    return decoded.id;
}