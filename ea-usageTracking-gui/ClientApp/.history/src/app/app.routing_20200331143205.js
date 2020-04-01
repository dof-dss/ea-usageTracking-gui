"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var auditslist_component_1 = require("./auditslist/auditslist.component");
var usages_component_1 = require('./usages/usages.component'),
var applications_component_1 = require("./applications/applications.component");
var add_application_component_1 = require("./add-application/add-application.component");
var app_login_component_1 = require("./app-login/app-login.component");
var auth_guard_1 = require("./infrastructure/auth.guard");
var role_1 = require("./model/role");
var routes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'app-login',
        component: app_login_component_1.AppLoginComponent
    },
    {
        path: 'audits',
        component: auditslist_component_1.AuditslistComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { roles: [role_1.Role.Admin] }
    },
    {
        path: 'usages',
        component: usages_component_1.UsagesComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { roles: [role_1.Role.Admin] }
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: 'applications',
        component: applications_component_1.ApplicationsComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { roles: [role_1.Role.Admin] }
    },
    {
        path: 'addapplication',
        component: add_application_component_1.AddApplicationComponent,
        canActivate: [auth_guard_1.AuthGuard],
        data: { roles: [role_1.Role.Admin] }
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.appRoutingModule = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map