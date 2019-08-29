import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

	@Output() onSelect = new EventEmitter();

	filteredOptions: any[]

	constructor(
		private service: TxcrmService,
	) { }


	ngOnInit() {

		if (this.default && this.default.name) {
			this.selected = Object.assign({}, this.default)
			this.hasUpdate = true
		}

	}

	filter() {

		if (!this.selected.name || this.selected.name.length < 2) {
			this.focus = false
			this.filteredOptions = []
			return
		}

		const filterValue = this.selected.name

		this.service.filterCustomer({
			name: filterValue,
			page: 0,
			size: 10,
		}).subscribe(res => {
			this.filteredOptions = res
			this.focus = true
			console.log(this.filteredOptions)
			console.log(this.focus)
		}, err => {
			console.log(err)
		})

	}

	select(option) {
		this.focus = false
		this.selected = option
		this.order.customer = Object.assign({}, this.selected)

		console.log('this.selected', this.selected)

		this.service.filterAddress({
			customerId: this.selected.customerId,
		}).subscribe(res => {

			console.log('res', res)
			this.order.ships = res
			if (this.order.ships[0]) {
				this.order.ship = this.order.ships[0]
			}
		}, err => {
			console.log(err)
		})
	}

	focusout() {
		this.focus = false
		if (!this.hasUpdate
			&& this.order.customer.customerId
			&& this.order.customer.customerId == this.selected.customerId
			&& this.order.customer.name != this.selected.name) {
			this.order.customer.customerId = null
		}

		this.order.customer.name = this.selected.name

		console.log(this.order.customer)
		if (!this.order.customer.customerId) {
			this.order.ships = []
		}
	}

}
