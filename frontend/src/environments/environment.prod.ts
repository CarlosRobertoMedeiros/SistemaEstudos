export const environment = {
  production: true,
  apiUrl:'https://gerenciadorfinanceiro-api.herokuapp.com',

  whitelistedDomains: [/gerenciadorfinanceiro-api.herokuapp.com/],
  blacklistedRoutes: [/\/oauth\/token/]

};
