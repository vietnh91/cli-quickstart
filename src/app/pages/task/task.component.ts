import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  dataSource = [
    {
      position: 1,
      name: 'Hydrogen',
      products:
      [
        {
          productId: 1,
          productName: 'bánh chuối'
        },
        {
          productId: 2,
          productName: 'bánh khoai'
        }
      ]
  },
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', products:[
      {
        productId: 1,
        productName: 'bánh chuối'
      }
    ]
    },
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', products:[
      {
        productId: 1,
        productName: 'bánh chuối'
      }]
    },
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', products:[
      {
        productId: 1,
        productName: 'bánh chuối'
      }]
    },
  ];

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  add(){
    let addItem = [
      {
        position: 0,
        name: 'untitled',
        products:
        [
          {
            productId: 1,
            productName: 'bánh chuối'
          },
        ]
    },
  ]
  
  this.dataSource = addItem.concat(this.dataSource)
  }

}
