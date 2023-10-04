export const enum Constants {
  PASSWRD_VALIDATOR_REGEX = '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}',
  PASSWORD_VALIDATOR_OPTIONAL_REGX = '^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^a-zA-Z0-9])|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^a-zA-Z0-9])).{8,}$',
  EMAIL_VALIDATOR_REGEX = '^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$',
  PHONE_NUM_VALIDATOR_REGEX = '[- +()0-9]+',
  NAME_VALIDATOR_REGEX = '^[a-zA-Z ]+$',

  USERROLE_MIN_LENGTH = 3,
  USERROLE_MAX_LENGTH = 150,
  PASSWORD_MIN_LENGTH = 12,
  PASSWORD_MAX_LENGTH = 64,
  COUNTER_NAME_MAX_LENGTH = 100,
  COUNTER_NAME_MIN_LENGTH = 1,
  COUNTER_DESC_MAX_LENGTH = 250,

  SUCCESS_NOTIFIER = 'mat-primary',
  WARNING_NOTIFIER = 'mat-warning',
  ERROR_NOTIFIER = 'mat-warn',

  FAILED_COMMON_MSG = 'Something went wrong! please try again.',
  FAILED_PERMORM_MSG = 'Unable to permorm this action. please try again.',
  STANDARD_DATE = 'YYYY-MM-DD',
  STANDARD_DATE_PIPE = 'yyyy-MM-dd',
  SUCCESS_STATUS = 'Success',

  ACTION_INSERT = 'INSERT',
  ACTION_UPDATE = 'UPDATE',
  ACTION_EDIT = 'EDIT',

  TXT_VISA_TYPE = 'VISA Type',
  TXT_VISA_CATEGORY = 'VISA Category',
  TXT_VISA_CLASS = 'VISA Class',
  TXT_VISA_PRIORITY = 'VISA Priority',
  TXT_EMPTY_STR = '',

  POPUP_SMALL_WIDTH = '250px',
  POPUP_MEDIUM_WIDTH = '500px',
  POPUP_LARGE_WIDTH = '750px',

  FORM_MODE_SAVE = 'SAVE',
  FORM_MODE_UPDATE = 'UPDATE',
  RULENAME_MAX_LENGTH = 150,
  RULEDESC_MAX_LENGTH = 500,

  TEXT_MAX_LENGTH_DEF = 50,
  TEXT_MIN_LENGTH_DEF = 3,
  DESCRIPTION_MAX_LENGTH_DEF = 250,
  DESCRIPTION_MIN_LENGTH_DEF = 3,

  FIELD_MAXLENGTH = 255,

  DOCUMENT_DELIVERY_STATUS = 'DOCUMENT_DELIVERY_STATUS',
  REFRESH_TOKEN_KEY = 'Refreshtoken',
  LOGGED_IN_USER = 'loggedInAdminUser',
  ADMIN_AUTH_TOKEN = 'ADMIN_AUTH_TOKEN',
  ADMIN_REFRESH_TOKEN = 'ADMIN_REFRESH_TOKEN',

  LOOKUP_STATE_CODE = 'STATE',
  LOOKUP_TICKET_STATUS_CODE = 'TicketActions',
  AUTH_TOKEN_KEY = 'Authorization',
}
