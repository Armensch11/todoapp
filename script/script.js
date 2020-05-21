let enterJob = document.getElementById('enter');
let removeJob = document.getElementById('remove');
let inputArea = document.getElementsByTagName('input')[0];
// inputArea.addEventListener('click', () => {
// 	inputArea.setAttribute('placeholder', '');
// });

addEventListener('click', outsideClick);

enterJob.addEventListener('click', add);

addEventListener('keydown', function(event) {
	switch (event.keyCode) {
		case 13:
			// console.log('hi');
			add();
			break;
		case 46:
			// console.log('bye');
			removeValue();
			break;
	}
});


let counter = 0;
let entrySet=new Set();
function add() {
	let jobInfo = getValue();
	let todoContainer = document.getElementById('todo-container');
	let todoItem;
	let infoDiv;
	let statusDiv;
	let delDiv;
	let hLine;

	if (jobInfo) {
		let setSize=entrySet.size;
	
		entrySet.add(jobInfo.split(' ').join(''));
		if (entrySet.size===setSize){
			alert('you have such entry');
			return document.getElementById('input-field').focus();;
		}
		

		hLine = document.createElement('hr');
		hLine.classList.add('hr');

		hLine.setAttribute('index', counter);
		counter++;
		todoContainer.prepend(hLine);

		todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');
		todoContainer.prepend(todoItem);

		infoDiv = document.createElement('div');
		infoDiv.classList.add('action-info');

		statusDiv = document.createElement('div');
		statusDiv.classList.add('action-done');
		
		statusDiv.addEventListener('click',showDone);

		delDiv = document.createElement('div');
		delDiv.classList.add('remove');
		
		delDiv.addEventListener('click', deleteParent);
		// delDiv.appendChild(document.createTextNode('del'));
		todoItem.prepend(infoDiv, statusDiv, delDiv);
		
		infoDiv.innerHTML = jobInfo;
		removeValue();
		inputArea.setAttribute('placeholder', 'to do info');
		document.getElementById('input-field').focus();
	}
}
// // function actionToRemove(current){
// // 	let parent=current.closest('div.todo-item');
// // 	let content=parent.firstChild.innerHTML
// // 	return content;

// // }
function actionToRemove(current,classname){
	let prevSib=current.previousElementSibling;
	// console.log(prevSib);
	while (prevSib){
		if(prevSib.className===classname){
			return prevSib.innerHTML;
		}
		prevSib=prevSib.previousElementSibling;
	}
	

}
function deleteParent(event) {
	// const deleteJob = document.getElementsByClassName('remove');
	// if (deleteJob.length) {
	// 	Array.from(deleteJob).forEach((div) => {
	// 		div.addEventListener('click', remove);
	// 	});
	// }
	let child = event.target;
	let jobToDel= actionToRemove(child,'action-info');
	// let jobToDel=child.closest('action-info').innerHTML;
	// console.log(jobToDel);
	entrySet.delete(jobToDel);
	// console.log(event.target);
	let delDiv = child.closest('div.todo-item');

	// console.log(delDiv);
	// console.log('I am here');
	delDiv.nextElementSibling.remove();
	delDiv.remove();
}
function showDone() {
	let child = event.target;
	let paintDiv=child.closest('div.todo-item');
	paintDiv.style.backgroundColor='#f51f1f70';

}
function removeValue() {
	inputArea.value = '';
}
function getValue() {
	return inputArea.value;
}


function outsideClick(event) {
	if (event.target !== inputArea) {
		inputArea.setAttribute('placeholder', 'to do info');
	} else {
		inputArea.setAttribute('placeholder', '');
	}
	if (event.target === removeJob) {
		inputArea.setAttribute('placeholder', '');
		removeValue();
	}
}