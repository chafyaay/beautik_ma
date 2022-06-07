export interface formSchemaProps {
  label: string;
  fcn: string;
  value: any;
  validators: Validators;
}

export interface Validators {
  required?: boolean;
  maxlen?: number;
  minlen?: number;
  pattern?: any[];
}

export class FormValidator {
  _errors = {};
  _isvalid = false;
  _validators: any[];
  validator: Validators;
  fcn: string;
  inputValue: any;
  constructor(fcn: string, inputValue: any, validator: Validators) {
    this.validator = validator;
    this.inputValue = inputValue;
  }

  setValidato(validator: Validators) {
    const key = Object.keys(validator);
    const value = Object.values(validator);

    //for(let [k,v] of validator)
  }

  getvalidation() {}

  buildForm() {}

  validate() {
    Object.values(this._validators).forEach((item) => {});
  }
}
/*
const [form, setForm] = useState({});

const page = new Page();
const input = page.getViewById("input-1");

const controls = {
  f1: {
    validators: ["required", { pattern: /^[0-4]$/g }, { minLen: 2 }],
  },
};

const Validator = (value, formName) => {
  const validators = controls[formName].validators;
  const itmes = Object.values(validators);
  let __test: any = {};
  let __errors: any = {};

  for (let o of itmes) {
    const k =
      typeof o === "object"
        ? { _k: Object.keys(o)[0], _v: Object.values(o)[0] }
        : { _k: o };

    switch (`${k._k}`.toLocaleLowerCase()) {
      case "required":
        __test.req = !!value;
        break;
      case "pattern":
        const regex = new RegExp(k._v);
        const found = regex.test(value);

        __test.pattern = found;
        __errors.pattern = !found;
        break;
      case "minlen":
        __test.minlen = value.length > k._v;
        __errors.minlen = !value.length > k._v;
        break;
      case "maxlen":
        __test.maxlen = value.length <= k._v;
        __errors.maxlen = !value.length <= k._v;
        break;
      default:
        break;
    }
  }
  let valid = {};
  let err = {};
  for (let k in __test) {
    if (__test[k]) {
      valid[k] = __test[k];
    } else {
      err[k] = __test[k];
    }
    setForm({ valid: valid, errs: err });
  }
};
*/
