import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.css'],
})
export class InputComponent {
	@Input() placeholder = ''; // Input placeholder
	@Input() type = 'text'; // Input type
	@Output() inputValueChange = new EventEmitter<string>();

	value = ''; // Holds the current value of the input

	// Function called when the input value changes
	onInputChange(event: Event): void {
		this.value = (event.target as HTMLInputElement).value;
		this.inputValueChange.emit(this.value);
	}
}
