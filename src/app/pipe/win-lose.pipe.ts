import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'winLose'
})
export class WinLosePipe implements PipeTransform {

  transform(value: any, arg1:any ): any {

    if(arg1 == true && value < 10){
          return true;

    }else if(arg1 == false && value > 99){
        return true;

    }else{
      return false;

    }
  }

}
