import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {

	
	url = 'http://localhost:8080/order'

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

	filter(condition: Object) : Observable<any>{
		var url: string = this.url;
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}
	
	count(condition: Object) : Observable<any>{
		var url: string = this.url + '/count';
		return this.http.post<any>(url, JSON.stringify(condition), this.getHttpOption());
	}

}
