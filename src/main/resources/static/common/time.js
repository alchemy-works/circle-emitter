export function getTimeTag(date = new Date()) {
    // sv: El Salvador
    return date.toLocaleString('sv', { hour12: false, timeZone: 'Asia/Shanghai' })
}