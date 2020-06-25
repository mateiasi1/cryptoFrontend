import { NgModule } from '@angular/core';
import { HttpClientWServiceService } from '../services/HttpClientWService.service';

export * from './alert.module';
export * from './alert.service';
export * from './alert.model';

@NgModule({
    providers: [
        HttpClientWServiceService
    ]
})
export class CoreModule {
}