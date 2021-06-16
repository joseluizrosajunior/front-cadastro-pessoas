import angular from 'angular';
import 'angular-ui-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import './dashboard.css';

import pessoaModule from './pessoa/module';
import SourceService from './source.service';
import SourceController from './source.controller';

export default angular.module('app', [
    'ui.router', pessoaModule
])
.service('app.sourceService', SourceService)
.controller('app.SourceController', SourceController)
.config(AppConfig);

AppConfig.$inject = ['$stateProvider', '$httpProvider']
function AppConfig($stateProvider, $httpProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = 'Basic YWRtaW46YWRtaW4=';
    $stateProvider
        .state({
            name: 'dashboard',
            url: '/',
            template: '<h3>Dashboard</h3>'
        })
        .state({
            name: 'pessoa',
            url: '/pessoa',
            template: require('./pessoa/list.html'),
            controller: 'app.pessoa.ListController',
            controllerAs: 'vm'
        })
        .state({
            name: 'pessoaNovo',
            url: '/pessoa/novo',
            template: require('./pessoa/form.html'),
            controller: 'app.pessoa.FormController',
            controllerAs: 'vm'
        })
        .state({
            name: 'pessoaEditar',
            url: '/pessoa/:id',
            template: require('./pessoa/form.html'),
            controller: 'app.pessoa.FormController',
            controllerAs: 'vm'
        })
        .state({
            name: 'source',
            url: '/source',
            template: require('./source.html'),
            controller: 'app.SourceController',
            controllerAs: 'vm'
        })
}