import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TxcrmService {

	
	url = 'http://localhost:8080'
	//url = 'http://ec2-3-85-164-60.compute-1.amazonaws.com:8080'

	constructor(
		private http: HttpClient,
	) { }

	getHttpOption(){
		return {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Authorization': 'TXBEAR'
			})
		};
	}

	filterOrder(condition: Object) : Observable<any>{
		var url: string = this.url + '/order/filter';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	
	countOrder(condition: Object) : Observable<any>{
		var url: string = this.url + '/count';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}

	createOrder(condition: Object) : Observable<any>{
		var url: string = this.url + '/order/create';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	
	getProduct(condition: Object) : Observable<any>{
		var url: string = this.url + '/product/filter';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	
	filterCustomer(condition: Object) : Observable<any>{
		var url: string = this.url + '/customer/filter';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	
	

}
