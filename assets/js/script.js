let makeAndModels = [
	["mitsubishi",
		["Lancer", 500000],
		["Outlander", 600000],
		["Space Star", 400000]
	],
	["suzuki",
		["Grand Vitara", 550000],
		["SX4", 500000],
		["Swift", 450000]
	],
	["toyota",
		["Avensis", 600000],
		["Corolla", 500000],
		["Yaris", 450000]
	]
];

let make = getMake();
let model = getModel();
let year = getYear();
let engineVolume = getEngineVolume();
let horsePower = getHorsePower();

// ============ EventListeners ===================

make.addEventListener('change', function () {
	removeOptions('.select--model');
	if (make.value == 'choose') {
		addRedBorder(make);
		model.disabled = true;
		disableYear();
	} else {
		removeRedBorder(make);
		let index = getMakeIndex(make);
		addModels(index);
		let fieldset = document.querySelector('.select--model');
		fieldset.removeAttribute('disabled');
	}
});

model.addEventListener('change', function () {
	if (model.value == 'choose') {
		addRedBorder(model);
		disableYear();
	} else {
		removeRedBorder(model);
		let fieldset = document.querySelector('.select--year');
		fieldset.removeAttribute('disabled');
	}
});

year.addEventListener('change', function () {
	if (year.value != "choose") {
		removeRedBorder(year);
	}
});

let reqInputs = document.querySelectorAll('input.input--required');
for (let el of reqInputs) {
	el.addEventListener('change', changeFromNull);
	el.addEventListener('focusout', checkNullVal);
}

document.querySelector('.calculator__button').addEventListener('click', calculatePrice);

// ================ Getters =========================

function getMake() {
	return document.querySelector('.select--make');
}

function getModel() {
	return document.querySelector('.select--model');
}

function getYear() {
	return document.querySelector('.select--year');
}

function getMakeIndex(make) {
	for (let i = 0; i < makeAndModels.length; i++) {
		if (makeAndModels[i][0] == make.value) {
			return i;
		}
	}
}

function getModelIndex(make, model) {
	let makeIndex = getMakeIndex(make);
	for (let i = 1; i < makeAndModels[makeIndex].length; i++) {
		if (makeAndModels[makeIndex][i][0] == model.value) {
			return i;
		}
	}
}

function getBasePrice() {
	let makeIndex = getMakeIndex(make);
	let modelIndex = getModelIndex(make, model);
	return makeAndModels[makeIndex][modelIndex][1];
}

function getAmortizationDiscount() {
	let selectedYear = getYear().value;
	let currentYear = new Date().getFullYear();
	let carAge = currentYear - selectedYear;
	return (carAge > 5) ? (-carAge * 7000) : ((5 - carAge) * 15000);
}

function getFuel() {
	return document.querySelector('.radio--fuel input:checked').id;
}

function getFuelPrice() {
	let fuel = getFuel();
	if (fuel == 'hybrid') {
		return 20000;
	}
	if (fuel == 'diesel') {
		return -20000;
	}
	if (fuel == 'petrol') {
		return 0;
	}
}

function getDriveUnit() {
	return document.querySelector('.radio--drive-unit input:checked').id;
}

function getDriveUnitPrice() {
	let dUnit = getDriveUnit();
	if (dUnit == 'front-du') {
		return 0;
	}
	if (dUnit == 'full-du') {
		return 40000;
	}
}

function getTransmission() {
	return document.querySelector('.radio--transmission input:checked').id;
}

function getTransmissionPrice() {
	let transmission = getTransmission();
	if (transmission == 'automatic-tr') {
		return 50000;
	}
	if (transmission == 'mechanic-tr') {
		return 0;
	}
	if (transmission == 'robotic-tr') {
		return 30000;
	}
}

function getCarBody() {
	return document.querySelector('.radio--car-body input:checked').id;
}

function getCarBodyPrice() {
	let carBody = getCarBody();
	if (carBody == 'sedan') {
		return 30000;
	}
	if (carBody == 'hatchback') {
		return 0;
	}
	if (carBody == 'universal') {
		return 60000;
	}
}

function getEngineVolume() {
	return document.querySelector('.input--engine-volume');
}

function getEngineVolumePrice() {
	let engineVol = getEngineVolume().value;
	return engineVol * 20;
}

function getHorsePower() {
	return document.querySelector('.input--horse-power');
}

function getHorsePowerPrice() {
	let horsePower = getHorsePower().value;
	return horsePower * 2000;
}

function getMileage() {
	return document.querySelector('.input--mileage').value;
}

function getMileagePrice() {
	return -getMileage() * 0.7;
}

function getEquipmentPrice() {
	return document.querySelectorAll('.equipment input:checked').length * 10000;
}

// ================= Main Functions =====================

function addModels(makeIndex) {
	for (let i = 1; i < makeAndModels[makeIndex].length; i++) {
		let newOption = document.createElement('option');
		newOption.innerHTML = makeAndModels[makeIndex][i][0];
		document.querySelector('.select--model').append(newOption);
	}
}

function addRedBorder(elem) {
	elem.classList.add('input-required-red');
}
function removeRedBorder(elem) {
	elem.classList.remove('input-required-red');
}

function changeFromNull() {
	console.log(this.value);
	if (this.value != '' || this.value != 0) {
		console.log("works");
		removeRedBorder(this);
	}
}

function checkNullVal() {
	if (this.value == '' || this.value == null) {
		addRedBorder(this);
	}
}

function calculatePrice() {
	if (validateFields()) {
		let carPrice = getBasePrice() + getAmortizationDiscount() +
		getFuelPrice() + getDriveUnitPrice() + getTransmissionPrice() +
		getCarBodyPrice() + getEngineVolumePrice() + getHorsePowerPrice() +
		getMileagePrice() + getEquipmentPrice();
		printResult(carPrice + ' руб.');
	}
}

function disableYear() {
	year.value = "choose";
	year.disabled = true;
}

function printResult(text) {
	document.querySelector('.result-window').innerHTML = text;
}

function removeOptions(selectClass) {
	let options = document.querySelectorAll(selectClass + ' option');
	if (options.length > 1) {
		for (let i = 1; i < options.length; i++) {
			options[i].remove();
		}
	}
}


function validateFields() {
	let validityFlag = true;
	let requiredSelects = document.querySelectorAll('.input--required');
	for (let e of requiredSelects) {
		if (e.value == 'choose' || e.value == '' || e.value == 0) {
			addRedBorder(e);
			validityFlag = false;
		}
	}
	if (!validityFlag) {
		printResult('Необходимо заполнить обязательные поля.');
	}
	return validityFlag;
}