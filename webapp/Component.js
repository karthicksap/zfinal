sap.ui.define([
    'sap/ui/core/UIComponent'
], function (UIComponent) {
    'use strict';
    return UIComponent.extend("tit.mm.app.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            UIComponent.prototype.init.apply(this);
            var oRouter = this.getRouter();
            oRouter.initialize();
        },
        // createContent: function(){
        //     var oAppView = new sap.ui.view({
        //         "viewName": "tit.mm.app.view.App",
        //         "type": "XML"
        //     })
        //     var oView1 = new sap.ui.view({
        //         "id": "idView1",
        //         "viewName": "tit.mm.app.view.View1",
        //         "type": "XML"
        //     });
        //     var oView2 = new sap.ui.view({
        //         "id": "idView2",
        //         "viewName": "tit.mm.app.view.View2",
        //         "type": "XML"
        //     });    
        //     oAppView.byId("idAppCont").addMasterPage(oView1).addDetailPage(oView2);  
        //     return oAppView;      
        // },
        destroy: function () {

        }
    });
});