export const removeDublicateString = (arr: string[]): string[] => {
    const unique = new Set(arr);

    return Array.from(unique);
};
