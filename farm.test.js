const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});


test("Calculate costs for a crop", () => {
    const corn = {
        name: "corn",
        cost: 1,
        yield: 3
    };
    expect(getCostsForCrop(corn)).toBe(3);
});

test("Calculate revenue for a crop", () => {
    const corn = {
        name: "corn",
        cost: 1,
        yield: 3,
        salePrice: 5
    };
    expect(getRevenueForCrop(corn)).toBe(15);
});

test("Calculate profit for a crop", () => {
    const corn = {
        name: "corn",
        cost: 1,
        yield: 3,
        salePrice: 5
    };
    expect(getProfitForCrop(corn)).toBe(12);
});

test("Calculate total profit", () => {
    const corn = {
        name: "corn",
        cost: 1,
        yield: 3,
        salePrice: 5
    };
    const pumpkin = {
        name: "pumpkin",
        cost: 2,
        yield: 4,
        salePrice: 10
    };
    const crops = [
        { crop: corn, numCrops: 5 },
        { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalProfit({ crops })).toBe(44);
});
