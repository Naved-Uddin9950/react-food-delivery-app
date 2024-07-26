export const useCount = (products) => {
    return products.reduce((acc, product) => {
        if (product.category && Array.isArray(product.category)) {
            product.category.forEach(category => {
                if (!acc[category]) {
                    acc[category] = 0;
                }
                acc[category]++;
            });
        }
        return acc;
    }, {});
};