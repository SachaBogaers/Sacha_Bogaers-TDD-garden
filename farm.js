const environmentFactors = {
	sun: "low",
	wind: "high"
};



const getYieldForPlant = (crop) => {
	let plantYield = crop.yield;
	if (environmentFactors) {
		if (crop.factors) {
			const cropFactors = Object.keys(crop.factors);
			const factors = Object.keys(environmentFactors);
			var influencingFactors = cropFactors.filter(e => factors.indexOf(e) !== -1);
			influencingFactors.forEach(factor => {
				const influence = environmentFactors[factor];
				const amount = 1 + ((crop.factors[factor][influence]) / 100);
				plantYield = plantYield * amount;
			}
			)
		}
	}
	return plantYield;
}


const getYieldForCrop = (input) => {
	const cropYield = getYieldForPlant(input.crop, environmentFactors);
	const numCrops = input.numCrops;
	const totalYield = cropYield * numCrops;
	return totalYield;
}


const getTotalYield = (object, factors) => {
	let totalYield = 0;
	object.crops.forEach(item => {
		const cropYield = getYieldForCrop(item);
		totalYield = totalYield + cropYield;
	})
	return totalYield;
}

const getCostsForCrop = (cropObject) => {
	const costPerCrop = cropObject.crop.cost;
	const totalCost = getYieldForCrop(cropObject) * costPerCrop;
	return totalCost;
}

const getRevenueForCrop = (cropObject) => {
	const salePrice = cropObject.crop.salePrice;
	const cropYield = getYieldForCrop(cropObject);
	const cropRevenue = cropYield * salePrice;
	return cropRevenue;
}


const getProfitForCrop = (cropObject) => {
	const revenue = getRevenueForCrop(cropObject);
	const cost = getCostsForCrop(cropObject);
	const profit = revenue - cost;
	console.log(cropObject.crop.name, "revenue is", revenue, "cost is ", cost, "profit is ", profit)
	return profit;
}


const getTotalProfit = (array) => {
	let totalProfit = 0;
	array.forEach(item => {
		totalProfit = totalProfit + getProfitForCrop(item);
		console.log("Total profit is now ", totalProfit)
	})
	return totalProfit;
}

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



module.exports = {
	getYieldForPlant,
	getYieldForCrop,
	getTotalYield,
	getCostsForCrop,
	getRevenueForCrop,
	getProfitForCrop,
	getTotalProfit
}