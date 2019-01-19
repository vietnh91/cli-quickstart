import { Component, OnInit, Input } from '@angular/core';
import { TxcrmService } from 'src/app/service/txcrm.service';

@Component({
	selector: 'customer-input',
	templateUrl: './customer-input.component.html',
	styleUrls: ['./customer-input.component.css']
})
export class CustomerInputComponent implements OnInit {

	focus = false
	selected: any = {}
	hasUpdate = false

	@Input() order: any = {}
	@Input() default: any = {}
	
	filteredOptions: any[]

	constructor(
		private service: TxcrmService,
	) { }


	ngOnInit() {

		if(this.default && this.default.customerName){
			this.selected = Object.assign({}, this.default)
			this.hasUpdate = true
		}

	}

	filter() {
		
		if(!this.selected.customerName || this.selected.customerName.length < 2){
			this.focus = false
			this.filteredOptions = []
			return
		}

		const filterValue = this.selected.customerName

		this.service.filterCustomer({
			customerName: filterValue,
			page: 0,
			size: 10,
		}).subscribe(res=>{
			this.filteredOptions = res
			this.focus = true
			console.log(this.filteredOptions)
			console.log(this.focus)
		}, err=>{
			console.log(err)
		})
		
	}
	
	select(option){
		this.focus = false
		this.selected = option
		this.order.customer = Object.assign({}, this.selected)

		this.service.filterAddress({
			customerId: this.selected.customerId,
		}).subscribe(res=>{
			this.order.ships = res
		}, err=>{
			console.log(err)
		})
	}

	focusout(){
		this.focus = false
		if(!this.hasUpdate
			&& this.order.customer.customerId 
			&& this.order.customer.customerId == this.selected.customerId 
			&& this.order.customer.customerName != this.selected.customerName)
			{
				this.order.customer.customerId = null
		}

		this.order.customer.customerName = this.selected.customerName
		
		console.log(this.order.customer)
	}

}
