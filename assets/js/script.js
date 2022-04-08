let makeAndModels = [
	["mitsubishi",
		["Lancer", 200000],
		["Outlander", 250000],
		["Space Star", 150000]],
	["suzuki",
		["Grand Vitara", 200000],
		["SX4", 150000],
		["Swift", 100000]],
	["toyota",
		["Avensis", 300000],
		["Corolla", 200000],
		["Yaris", 150000]]
];

let make = getMake();
let model = getModel();

make.addEventListener('change', function () {
	// isChooseExists(".select--make", "-Марка-");
	removeOptions(".select--model");
	let index = getMakeIndex(getMake());
	addModels(index);
	
	let fieldset = document.querySelector(".select--model");
	fieldset.removeAttribute("disabled");
});

model.addEventListener('change', function () {
	let fieldset = document.querySelector(".select--year");
	fieldset.removeAttribute("disabled");
});

document.querySelector('.calculator__button').addEventListener('click', calculatePrice);

function getMake(){
	return document.querySelector(".select--make");
}
function getModel() {
	return document.querySelector(".select--model");
}
function getYearValue() {
	return document.querySelector(".select--year").value;
}
function getMakeIndex(make) {
	for (let i = 0; i < makeAndModels.length; i++){
		if (makeAndModels[i][0] == make.value) {
			return i;
		}
	}
	alert(`No models for ${make.value} in DB`);
}

function getModelIndex(make, model) {
	let makeIndex = getMakeIndex(make);
	console.log(makeIndex);
	console.log(makeAndModels[makeIndex].length);
	console.log(model.value);
	for (let i = 1; i < makeAndModels[makeIndex].length; i++){
		if (makeAndModels[makeIndex][i][0] == model.value) {
			return i;
		}
	}
	alert(`No price for ${model.value} in DB`);
}

function addModels(makeIndex) {
	for (let i = 1; i < makeAndModels[makeIndex].length; i++){
		let newOption = document.createElement('option');
		newOption.innerHTML = makeAndModels[makeIndex][i][0];
		document.querySelector(".select--model").append(newOption); 
	}
}

function removeOptions(selectClass) {
	let options = document.querySelectorAll(selectClass + " option");
	if (options.length > 1) {
		for (let i = 1; i < options.length; i++){
			options[i].remove();
		}
	}
}
function isChooseExists(selectClass, label) {
	let chooseOption = document.querySelector(selectClass + " option");
	if (chooseOption.label == label) {
		chooseOption.remove();
	}
}

function calculatePrice() {
	getBasePrice(); 
	getAmortizationDiscount();
}
function getBasePrice() {
	let makeIndex = getMakeIndex(make);
	let modelIndex = getModelIndex(make, model);
	let basePrice = makeAndModels[makeIndex][modelIndex][1];
	console.log(basePrice);
}
function getAmortizationDiscount() {
	let year = getYearValue();
	console.log(year);
}