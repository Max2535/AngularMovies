import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function firstLetterUppercase(): ValidatorFn {
    return (controls: AbstractControl):ValidationErrors | null =>  {
        const value = <string>controls.value;
        if(!value) return null;
        const firstLetter = value[0];
        if(firstLetter !== firstLetter.toUpperCase()){
            return {
                firstLetterUppercase:{
                    message:'The first letter must be uppercase'
                }
            }
        }
        return null;
    }
}

