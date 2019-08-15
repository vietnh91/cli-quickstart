import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
	{
	  path: 'order',
	  loadChildren: './pages/order/order.module#OrderModule'
	},
	{
	  path: '',
	  redirectTo: '',
	  pathMatch: 'full'
	}
];

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        {
          enableTracing: false, // <-- debugging purposes only
          //preloadingStrategy: SelectivePreloadingStrategyService,
        }
      )
    ],
    exports: [
      RouterModule
    ]
})
export class AppRoutingModule { }