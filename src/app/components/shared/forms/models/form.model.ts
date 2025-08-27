export interface ResponsiveFormColumns {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  ['2xl']: number;
}

export interface FormConfig {
  id: string;
  title: string;
  subtitle: string;
  fields: FormField[];
  actions: FormAction[];
  columns?: number | Partial<ResponsiveFormColumns>;
}

export interface FormAction {
  type: ActionType;
  label: string;
  actionUrl?: string;
  routeUrl?: string;
  httpService?: any;
}

export interface FormActionEvent {
  actionType: ActionType;
  actionUrl: string;
  formId?: string;
  formData: any;
  httpMethod?: HttpMethod;
}

export interface FormField {
  type: FieldType;
  name: string;
  label: string;
  placeholder?: string;
  helpText?: string;
  value?: any; //TODO: this can be every things (text | number | boolean |
  mode?: 'currency' | 'decimal';
  currency?: string;
  locale?: string;
  useGrouping?: boolean;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  validators?: FieldValidator[];
  asyncValidators?: FieldAsyncValidator[];
  options?: FieldOption[];
  columns?: number | Partial<ResponsiveFormColumns>;
}

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldValidator {
  type: FieldValidatorType;
  message?: string;
  value?: number | string;
}

export interface FieldAsyncValidator extends FieldValidator {
  compareTo?: string;
}

export enum FieldType {
  TEXT = 'text',
  PASSWORD = 'password',
  NUMBER = 'number',
  EMAIL = 'email',
  DATE = 'date',
  DATE_TIME = 'datetime',
  TIME = 'time',
  FILE = 'file',
  SELECT = 'select',
  RADIO = 'radio',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  HIDDEN = 'hidden',
}

export enum FieldValidatorType {
  REQUIRED = 'required',
  MIN_LENGTH = 'minLength',
  MAX_LENGTH = 'maxLength',
  MIN = 'min',
  MAX = 'max',
  STEP = 'step',
  EMAIL = 'email',
  URL = 'url',
  FILE = 'file',
  DATE = 'date',
  PATTERN = 'pattern',
  ASYNC_EMAIL_MISS_MATCH = 'async.emailMissMatch',
  ASYNC_PASSWORD_MISS_MATCH = 'async.passwordMissMatch',
  ASYNC_REGEX_VALIDATION = 'async.regexValidation',
}

export enum ActionType {
  LINK = 'link',
  RESET = 'reset',
  BUTTON = 'button',
  SUBMIT = 'submit',
}

export type HttpMethod = 'post' | 'patch' | 'put';
