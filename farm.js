const getYieldForPlant = (crop) => {
	const thisCrop = crop;
	return thisCrop.yield;
}

const getYieldForCrop = (input) => {
	const cropYield = getYieldForPlant(input.crop);
	const numCrops = input.numCrops;
	const totalYield = cropYield * numCrops;
	return totalYield;
}

const getTotalYield = (object) => {
	let totalYield = 0;
	object.crops.forEach(item => {
		const cropYield = item.crop.yield * item.numCrops;
		totalYield = totalYield + cropYield;
	})
	return totalYield;
}

const getCostsForCrop = (cropObject) => {
	const costPerCrop = cropObject.cost;
	const totalCost = getYieldForPlant(cropObject) * costPerCrop;
	return totalCost;
}

const getRevenueForCrop = (cropObject) => {
	const salePrice = cropObject.salePrice;
	const cropYield = cropObject.yield;
	const cropRevenue = cropYield * salePrice;
	return cropRevenue;
}



const getProfitForCrop = (cropObject) => {
	const revenue = getRevenueForCrop(cropObject);
	const cost = getCostsForCrop(cropObject);
	const profit = revenue - cost;
	return profit;
}


const getTotalProfit = (object) => {
	let totalProfit = 0;
	object.crops.forEach(item => {
		totalProfit = totalProfit + getProfitForCrop(item.crop);
	})
	return totalProfit;
}

module.exports = {
	getYieldForPlant,
	getYieldForCrop,
	getTotalYield,
	getCostsForCrop,
	getRevenueForCrop,
	getProfitForCrop,
	getTotalProfit
}