const makeAndModels = [
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

const fuel = [
	['hybrid', 20000],
	['diesel', -20000],
	['petrol', 0]
];

const dUnit = [
	['front-du', 0],
	['full-du', 40000]
];

const transmission = [
	['automatic-tr', 50000],
	['mechanic-tr', 0],
	['robotic-tr', 30000]
];

const carBody = [
	['sedan', 30000],
	['hatchback', 0],
	['universal', 60000]
];

const make = getMake();
const model = getModel();
const year = getYear();
const engineVolume = getEngineVolume();
const horsePower = getHorsePower();
const reqInputs = getRequieredInputs();
const resBtn = getResBtn();

// ============ EventListeners ===================


make.addEventListener('change', function () {
	removeOptionList('.select--model');
	if (isValueChoose(make)) {
		addRedBorder(make);
		setDisabled(model);
		disableSelect(year);
	} else {
		removeRedBorder(make);
		addModels(getMakeIndex(make));
		model.removeAttribute('disabled');
	}
});

model.addEventListener('change', function () {
	if (isValueChoose(model)) {
		addRedBorder(model);
		disableSelect(year);
	} else {
		removeRedBorder(model);
		year.removeAttribute('disabled');
	}
});

year.addEventListener('change', function () {
	if (!isValueChoose(year)) {
		removeRedBorder(year);
	}
});

for (let el of reqInputs) {
	el.addEventListener('change', changeFromNull);
	el.addEventListener('focusout', checkNullVal);
}

resBtn.addEventListener('click', calculatePrice);

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
		if (makeAndModels[i][0] === make.value) {
			return i;
		}
	}
}

function getModelIndex(make, model) {
	for (let i = 1; i < makeAndModels[getMakeIndex(make)].length; i++) {
		if (makeAndModels[getMakeIndex(make)][i][0] === model.value) {
			return i;
		}
	}
}

function getBasePrice() {
	return makeAndModels[getMakeIndex(make)][getModelIndex(make, model)][1];
}

function getAmortizationDiscount() {
	const carAge = getCurrentYear() - year.value;
	return (carAge > 5) ? (-carAge * 7000) : ((5 - carAge) * 15000);
}

function getCurrentYear() {
	return new Date().getFullYear();
}
// -------------- Radio Buttons -----------------
function getFuelId() {
	return document.querySelector('.radio--fuel input:checked').id;
}
function getDriveUnitId() {
	return document.querySelector('.radio--drive-unit input:checked').id;
}
function getTransmissionId() {
	return document.querySelector('.radio--transmission input:checked').id;
}
function getCarBodyId() {
	return document.querySelector('.radio--car-body input:checked').id;
}

function getFuelPrice() {
	return getRadioBtnPrice(getFuelId(), fuel);
}
function getDriveUnitPrice() {
	return getRadioBtnPrice(getDriveUnitId(), dUnit);
}
function getTransmissionPrice() {
	return getRadioBtnPrice(getTransmissionId(), transmission);
}
function getCarBodyPrice() {
	return getRadioBtnPrice(getCarBodyId(), carBody);
}

function getRadioBtnPrice(elId, arr) {
	return arr[getIndex(elId, arr)][1];
}

function getIndex(elId, arr) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i][0] === elId) {
			return i;
		}
	}
}

function getEngineVolume() {
	return document.querySelector('.input--engine-volume');
}

function getEngineVolumePrice() {
	return engineVolume.value * 20;
}

function getHorsePower() {
	return document.querySelector('.input--horse-power');
}

function getHorsePowerPrice() {
	return horsePower.value * 2000;
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

function getRequieredInputs() {
	return document.querySelectorAll('input.input--required');
}

function getRequiredFieldsAll() {
	return document.querySelectorAll('.input--required');
}

function getResBtn() {
	return document.querySelector('.calculator__button');
}

// ================= Setters ============================

function setValueChoose(el) {
	el.value = 'choose';
}

function setDisabled(el) {
	el.disabled = true;
}

// ================= Main Functions =====================

function isValueChoose(el) {
	return el.value === 'choose';
}

function addOption() {
	return document.createElement('option');
}

function addModels(makeIndex) {
	for (let i = 1; i < makeAndModels[makeIndex].length; i++) {
		const newOption = addOption();
		newOption.innerHTML = makeAndModels[makeIndex][i][0];
		model.append(newOption);
	}
}

function addRedBorder(elem) {
	elem.classList.add('input-required-red');
}

function removeRedBorder(elem) {
	elem.classList.remove('input-required-red');
}

function changeFromNull() {
	if (isValueNotNull(this)) {
		removeRedBorder(this);
	}
}

function checkNullVal() {
	if (!isValueNotNull(this)) {
		addRedBorder(this);
	}
}

function isValueNotNull(el) {
	return (el.value !== '' && el.value !== '0');
}

function calculatePrice() {
	if (validateFields()) {
		printResult(sumOfPrices() + ' руб.');
	}
}

function sumOfPrices() {
	return getBasePrice() + getAmortizationDiscount() +
		getFuelPrice() + getDriveUnitPrice() + getTransmissionPrice() +
		getCarBodyPrice() + getEngineVolumePrice() + getHorsePowerPrice() +
		getMileagePrice() + getEquipmentPrice();
}

function disableSelect(el) {
	setValueChoose(el);
	setDisabled(el);
}

function printResult(text) {
	document.querySelector('.result-window').innerHTML = text;
}

function getOptionsList(selectClass) {
	return document.querySelectorAll(selectClass + ' option');
}
function isOptionList(arr) {
	return arr.length > 1 ? arr.length : -1;
}
function removeOption(arr){
	for (let i = 1; i < arr.length; i++) {
	arr[i].remove();
}
}
function removeOptionList(selectClass) {
	if (isOptionList(getOptionsList(selectClass))){ 
		removeOption(getOptionsList(selectClass));
	}
}

function validateFields() {
	let validityFlag = true;
	for (let e of getRequiredFieldsAll()) {
		if (isValueChoose(e) || !(isValueNotNull(e)) || e.value === null) {
			addRedBorder(e);
			validityFlag = false;
		}
	}
	if (!validityFlag) {
		printResult('Необходимо заполнить обязательные поля.');
	}
	return validityFlag;
}