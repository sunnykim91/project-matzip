import { Pipe, PipeTransform } from '@angular/core';
import { Matzips } from './matzips.interface';

@Pipe({
  name: 'matzipfilter'
})
export class MatzipfilterPipe implements PipeTransform {

  transform(matzipList: Matzips[], area: string): Matzips[] {
    return matzipList.filter(matzip => {
      if (matzip.address.includes(area)) return matzip;
      else return false;
    });
  }

}
