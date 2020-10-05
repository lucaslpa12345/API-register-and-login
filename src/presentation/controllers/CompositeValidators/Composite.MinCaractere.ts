import {Validation} from './interfaces';
import {Error, erro} from '../../../domain/protocols/errors/ProcessError';
import {MinimalCaracteresTypes} from '../../../utils/minmalCaracteres-validator/minimalCaracteresInterface';
export class MinimalCaracteresC implements Validation {
  constructor( private field: string, private minimalValidator: MinimalCaracteresTypes ) {}
  validate(data: any): undefined | erro {
    console.log('dataaaaa', data );
    console.log('justo', this.field);
    const res = this.minimalValidator.isValid(data[this.field]);

    if (!res) {
      return new Error(400).return(` ${this.field} Minimal caracteres invalid `);
    }
  }
}
