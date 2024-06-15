sap.ui.define([
    'tit/mm/app/controller/Basecontroller',
    "sap/ui/core/routing/History"
], function (Basecontroller, History,) {
    'use strict';
    return Basecontroller.extend("tit.mm.app.controller.Supplier", {
        onInit: function () {
            this.oView = this.getView();
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("third").attachMatched(this.routeCalled.bind(this));
        },
        routeCalled: function (oEvent) {
            var elementAdd = "/cars/" + oEvent.getParameter("arguments").sId;
            this.oView.bindElement(elementAdd);
        },
        onBack: function () {
            var oHistory, sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.oRouter.navTo("myplayers", {}, true);
            }
        }
    });
});