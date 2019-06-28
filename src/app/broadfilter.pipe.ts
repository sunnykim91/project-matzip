import { Pipe, PipeTransform } from '@angular/core';
import { Matzips } from './matzips.interface';

@Pipe({
  name: 'broadfilter'
})
export class BroadfilterPipe implements PipeTransform {

  transform(matzipList: Matzips[], broadcast: string): Matzips[] {
    return matzipList.filter(matzip => {
      if (matzip.broadcastingname.includes( broadcast !== 'All' ? broadcast : '')) return matzip;
      else return false;
    });
  }

}