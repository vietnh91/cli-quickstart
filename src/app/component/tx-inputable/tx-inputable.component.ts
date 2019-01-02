import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatInput } from '@angular/material';

@Component({
	selector: 'tx-inputable',
	templateUrl: './tx-inputable.component.html',
	styleUrls: ['./tx-inputable.component.css']
})
export class TXInputableComponent implements OnInit {
	@ViewChild('txinput') txinput: ElementRef;

	@Input() label = null
	@Input() id = null
	
	value = null

	editing: boolean = false

	constructor() { }

	ngOnInit() {
	}

	onClick(){
		this.editing = true
		this.value = this.label
		console.log(this.txinput)
		document.getElementById("id_txinput_" + this.id).style.display = "block";
		document.getElementById("id_txinput_" + this.id).focus();
	}

	onFocusOut(){
		this.editing = false
		this.label = this.value
		document.getElementById("id_txinput_" + this.id).style.display = "none";
		console.log('onFocusOut....' + this.id + '/' + this.value)
	}
	
}
