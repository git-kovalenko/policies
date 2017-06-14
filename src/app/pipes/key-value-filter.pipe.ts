import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name: 'keyValueFilter'
})
export class KeyValueFilterPipe implements PipeTransform{
  transform(value: any, args:any[] = null):any {
    if(value instanceof Object){
      return Object.keys(value).sort().map(function (key) {
        let pair = {};
        pair['key'] = key;
        pair['value'] = value[key];
        return pair;
      });
    }else {
      return [];
    }
  }

}
