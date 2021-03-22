const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./farm");

describe("getYieldForPlant", () => {

    test("Get yield for plant with no environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
        };    
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test("Calculate yield for plant with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: +50,
                    medium: 0,
                    high: -50
                }
            },
        };
        const environmentFactors = {
            sun: "low",
            wind: "high"
        };
        expect(getYieldForPlant(corn, environmentFactors)).toBe(7.5);
    })

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
    })
    test("Calculate yield for crop with environment factors", () => {
        const corn = {
            name: "corn",
            cost: 1,
            salePrice: 5,
            yield: 30,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: +50,
                    medium: 0,
                    high: -50
                }
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };

        const environmentFactors = {
            sun: "low",
            wind: "high"
        };
        expect(getYieldForCrop(input, environmentFactors)).toBe(75);
    }
    );
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
    test("Calculate total yield with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            cost: 1,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: +50,
                    medium: 0,
                    high: -50
                }
            },
        };
        const pumpkin = {
            name: "pumpkin",
            cost: 2,
            yield: 4,
            salePrice: 10,
            sun: {
                low: -10,
                medium: 0,
                high: 10,
            },
        }
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        const environmentFactors = {
            sun: "low",
            wind: "high"
        };
        expect(getTotalYield({ crops }, environmentFactors)).toBe(45.5);
    })
});



test("Calculate costs for a crop", () => {
    const corn = {
        name: "corn",
        cost: 1,
        yield: 3
    };
    const crops = [{ crop: corn, numCrops: 5 }];
    expect(getCostsForCrop(crops[0])).toBe(15);
});


describe("getRevenueForCrop", () => {
    test("Calculate revenue for a crop", () => {
        const corn = {
            name: "corn",
            cost: 1,
            yield: 3,
            salePrice: 5
        };
        const crops = [
            { crop: corn, numCrops: 5 }, ,
        ];
        expect(getRevenueForCrop(crops[0])).toBe(75);
    });

    test("Calculate revenue for crop with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            cost: 1,
            salePrice: 5,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: +50,
                    medium: 0,
                    high: -50
                }
            },
        };
        const pumpkin = {
            name: "pumpkin",
            cost: 2,
            yield: 4,
            salePrice: 10,
            sun: {
                low: -10,
                medium: 0,
                high: 10,
            },
        }
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        const environmentFactors = {
            sun: "low",
            wind: "high"
        };
        expect(getRevenueForCrop(crops[0], environmentFactors)).toBe(187.5);
    })
});


describe("getProfitForCrop", () => {
    test("Calculate profit for a crop", () => {
        const corn = {
            name: "corn",
            cost: 1,
            yield: 3,
            salePrice: 5
        };
        const crops = [
            { crop: corn, numCrops: 5 },
        ];
        expect(getProfitForCrop(crops[0])).toBe(60);
    });

    test("Calculate profit for crop with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            cost: 1,
            salePrice: 5,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: +50,
                    medium: 0,
                    high: -50
                }
            },
        };
        const pumpkin = {
            name: "pumpkin",
            cost: 2,
            yield: 4,
            salePrice: 10,
            sun: {
                low: -10,
                medium: 0,
                high: 10,
            },
        }
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];    
        expect(getProfitForCrop(crops[0])).toBe(150);
    })
})


describe("getTotalProfit", () => {
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
        expect(getTotalProfit(crops)).toBe(124);
    });

    test("Calculate total profit with environment factors", () => {
        const corn = {
            name: "corn",
            yield: 30,
            cost: 1,
            salePrice: 5,
            factors: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                },
                wind: {
                    low: +50,
                    medium: 0,
                    high: -50
                }
            },
        };
        const pumpkin = {
            name: "pumpkin",
            cost: 2,
            yield: 4,
            salePrice: 10,
            sun: {
                low: -10,
                medium: 0,
                high: 10,
            },
        }
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalProfit(crops)).toBe(214);
    })
});

