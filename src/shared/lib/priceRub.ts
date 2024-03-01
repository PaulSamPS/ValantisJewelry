export const priceRub = (price: number | null): string => {
    if (!price) {
        return '';
    }
    const priceLength = price.toString().length;

    if (priceLength === 8) {
        return price
            .toString()
            .substring(0, 5)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
            .concat(' p.');
    }

    return price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        .concat(' p.');
};
