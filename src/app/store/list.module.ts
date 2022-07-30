import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ListEffects } from './effects';
import { listFeature } from './reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(listFeature),
    EffectsModule.forFeature([ListEffects]),
  ],
})
export class ListModule {}
