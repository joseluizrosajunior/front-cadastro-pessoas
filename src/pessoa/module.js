import angular from 'angular';

import formController from './form.controller';
import listController from './list.controller';
import service from './service';

export default angular.module('app.pessoa', [])
    .controller('app.pessoa.FormController', formController)
    .controller('app.pessoa.ListController', listController)
    .service('app.pessoa.pessoaService', service)
    .name;