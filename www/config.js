var G = {}
    G.path ={
        root:'./',
        mod:'./mod',
        controllers:'controllers',
        directives:'directives',
        views:'./views',
        templates:'./templates'
    }


require.config({

    // baseUrl: "/",

    // alias libraries paths
    paths: {

        'app': 'js/app',    
        'ionic': 'lib/ionic/js/ionic.bundle',
        'angularAMD': 'lib/angularAMD/angularAMD',  
        "ngCordova": "lib/ngCordova/dist/ng-cordova",
        "jquery": "lib/jquery/dist/jquery",
        "bootstrap-ui": "lib/angular-bootstrap/ui-bootstrap-tpls",
        "angular-block-ui": "lib/angular-block-ui/dist/angular-block-ui",
        "angular-response-lag": "lib/angular-response-lag/angular-response-lag",
        "ng-baidu-map": "lib/ng-baidu-map/angular-baidu-map",
        "angular-filter": "lib/angular-filter/dist/angular-filter",
        "mainControllers": "controllers/main/mainControllers",
        "positionAutoDirective": "directives/positionAutoDirective",
        "slideCustomDirective": "directives/slideCustomDirective",
        "houseCompleteDirective": "directives/houseCompleteDirective", 
        "masklayer": "directives/maskLayerDirective",
        "myAdvisorDirective": "directives/myAdvisorDirective",
        "temmode": "directives/temModeDirective",
        "ionPinch": "directives/ionPinch",
        "mainService": "services/mainService",
        "ajaxService": "services/ajaxService",
        "utilsService": "services/utilsService",
        "desginer":"directives/desginerDirective",
        "map":"directives/mapDirective",
        "cordova": "lib/cordova"
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angular-response-lag':['ionic'],
        'angular-block-ui': ['ionic'],
        'ng-baidu-map':['ionic'],
        'ngCordova': ['ionic'],
        'angularAMD':['ionic'],
        'bootstrap-ui':['ionic'],
        'angular-filter':['ionic'],
        'angular-baidu-map':['ionic'],
        'app': [
            // 'css!../css/yijiazhang.css',
            // 'css!../css/MaskLayer.css',
        ]
         
    },
    map: {
        '*': {
            'css': 'lib/require-css/css',
        }
    },


    // kick start application
    deps: ['app']
});