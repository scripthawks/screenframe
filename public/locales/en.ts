export const en = {
  auth: {
    authErrors: {
      username: {
        min: 'Minimum number of characters 6',
        max: 'Maximum number of characters 30',
        nonEmpty: 'Enter username',
        regex: 'Username can contain only A-z, - или _',
      },
      email: {
        incorrect: 'Invalid email address',
        nonEmpty: 'Enter email'
      },
      password: {
        min: 'Minimum number of characters 6',
        max: 'Maximum number of characters 20',
        nonEmpty: 'Enter password',
        regex: `Password must contain A-z, 0-9, !"#$%&'()*+,-./:;<=>?@[\\]^_{|}~`,
      },
      passwordConfirm: 'Confirm your password',
      refine: 'Passwords must match'
    }
  }
}