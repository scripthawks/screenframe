import { en } from './en'

export type LocalesType = typeof en
export const ru: LocalesType = {
  auth: {
    agree: 'Я согласен с',
    and: 'и',
    authErrors: {
      username: {
        min: 'Минимальное количество символов 6',
        max: 'Максимальное количество символов 30',
        nonEmpty: 'Введите имя пользователя',
        regex: 'Имя пользователя может содержать только A-z, - или _',
      },
      email: {
        incorrect: 'Некорректный адрес почты',
        nonEmpty: 'Введите электронную почту'
      },
      password: {
        min: 'Минимальное количество символов 6',
        max: 'Максимальное количество символов 20',
        nonEmpty: 'Введите пароль',
        regex: `Пароль должен содержать A-z, 0-9, !"#$%&'()*+,-./:;<=>?@[\\]^_{|}~`,
      },
      passwordConfirm: 'Подтвердите ваш пароль',
      refine: 'Пароли должны совпадать',
      terms: 'Пожалуйста ознакомьтесь и примите Правила сервиса и Политику конфиденциальности',
    },
    email: 'Электронная почта',
    haveAccount: 'Уже зарегистрированы?',
    logIn: 'Войти',
    password: 'Пароль',
    passwordConfirmation: 'Подтверждение пароля',
    policy: 'Политикой',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    terms: 'Правилами',
    username: 'Имя пользователя'
  },
  locale: {
    english: 'English',
    language: 'Язык',
    russian: 'Russian',
  },
}