const getYieldForPlant = (crop) => {
	const thisCrop = crop;
	return thisCrop.yield;
}

const getYieldForCrop = (input) => {
	const crop = input.crop;
	const cropYield = crop.yield;
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


module.exports = {
	getYieldForPlant,
	getYieldForCrop,
	getTotalYield
}