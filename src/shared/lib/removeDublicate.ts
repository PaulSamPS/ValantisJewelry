export function removeDuplicate<T extends { id: string }>(data: Array<T & { id: string }>): Array<T> {
    return data.reduce((arr: T[], el) => (arr.find((i) => el.id === i.id) || arr.push(el), arr), []);
}
