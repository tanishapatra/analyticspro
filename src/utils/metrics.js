// ==============================
// TOTAL SALES
// ==============================

export const calculateTotalSales = (data) => {
  return data.reduce((sum, row) => sum + Number(row.Sales || 0), 0);
};

// ==============================
// TOTAL PROFIT
// ==============================

export const calculateTotalProfit = (data) => {
  return data.reduce((sum, row) => sum + Number(row.Profit || 0), 0);
};

// ==============================
// TOTAL QUANTITY
// ==============================

export const calculateTotalQuantity = (data) => {
  return data.reduce((sum, row) => sum + Number(row.Quantity || 0), 0);
};

// ==============================
// SALES BY REGION
// ==============================

export const salesByRegion = (data) => {
  const regions = {};

  data.forEach((row) => {
    const region = row.Region;
    const sales = Number(row.Sales || 0);

    if (!regions[region]) {
      regions[region] = 0;
    }

    regions[region] += sales;
  });

  return Object.keys(regions).map((region) => ({
    region,
    sales: regions[region],
  }));
};

// ==============================
// SALES BY CATEGORY (NEW)
// ==============================

export const salesByCategory = (data) => {
  const categories = {};

  data.forEach((row) => {
    const category = row.Category;
    const sales = Number(row.Sales || 0);

    if (!categories[category]) {
      categories[category] = 0;
    }

    categories[category] += sales;
  });

  return Object.keys(categories).map((category) => ({
    name: category,
    sales: categories[category],
  }));
};