import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'product-input',
	templateUrl: './product-input.component.html',
	styleUrls: ['./product-input.component.css']
})
export class ProductInputComponent implements OnInit {

	focus = false
	selected: any = {}

	@Input() options: any[]
	@Input() orderItem: any = {}
	@Input() default: any = {}
	
	filteredOptions: any[]

	ngOnInit() {

		if(this.default && this.default.productName){
			this.selected = Object.assign({}, this.default)
		}
	}

	filter() {
		
		if(!this.selected.productName || this.selected.productName.length < 2){
			this.focus = false
			this.filteredOptions = []
			return
		}

		const filterValue = this.selected.productName.toLowerCase();

		this.filteredOptions = this.options.filter(option => {
			return option.productName 
				&& option.productName.toLowerCase().indexOf(filterValue) > -1
		});
		
		this.focus = true
		console.log(this.filteredOptions)
		console.log(this.focus)
	}
	
	select(option){
		this.focus = false
		this.selected = option
		this.orderItem.product = Object.assign({}, this.selected)
	}

	focusout(){
		this.focus = false
		if(this.orderItem.customerId 
			&& this.orderItem.product.productId == this.selected.productId 
			&& this.orderItem.product.productName != this.selected.productName)
			{
				this.selected = {}
				this.orderItem.invalid = true
		}
		console.log(this.orderItem)
	}

}
