export const calculateDiscountedPrice = (price, discount) => {
  const original = parseFloat(price || 0);
  const off = discount || 0;
  return original - (original * off / 100);
};

export const findSimilarProducts = (currentProduct, allProducts) => {
  if (!allProducts?.length) return [];

  const currentColors = currentProduct.selectedColors?.map(c => c.toUpperCase().trim()) || [];

  if (!currentColors.length) {
    return allProducts.filter(p => p.id !== currentProduct.id).slice(0, 8);
  }

  return allProducts.filter(p => {
    if (p.id === currentProduct.id) return false;
    const productColors = p.selectedColors?.map(c => c.toUpperCase().trim()) || [];

    return currentColors.some(color =>
      productColors.some(pc =>
        color === pc || color.includes(pc) || pc.includes(color)
      )
    );
  }).slice(0, 8);
};
