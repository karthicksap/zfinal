sap.ui.define([
    'tit/mm/app/controller/Basecontroller',
    'tit/mm/app/util/Formatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function (Basecontroller, Formatter, Filter, FilterOperator) {
    'use strict';
    return Basecontroller.extend("tit.mm.app.controller.View1", {
        oFormatter: Formatter,
        onInit: function () {
            this.oView = this.getView();
            this.oRouter = this.getOwnerComponent().getRouter();
        },
        onNext: function () {
            // var aSelItems = this.oView.byId("idList").getSelectedItems();
            // var aData = [];
            // for (let index = 0; index < aSelItems.length; index++) {
            //     aData.push(this.oView.getModel().getProperty(aSelItems[index].getBindingContextPath()));
            // }
            // this.oView.getModel().setProperty("/selPlayers", aData);
            // this.oView.getParent().to("idView2");
        },
        onSearch: function (oEvent) {
            var sValue = oEvent.getParameter("query");
            var oFilter = new Filter("team", FilterOperator.Contains, sValue);
            var oFilter2 = new Filter("name", FilterOperator.Contains, sValue);
            var oFilterFin = new Filter({
                filters: [oFilter, oFilter2],
                and: false
            });
            this.oView.byId("idList").getBinding("items").filter(oFilterFin);
        },
        onDelete: function (oEvent) {
            var selItem = oEvent.getParameter("listItem");
            oEvent.getSource().removeItem(selItem);
        },
        onMultiDelete: function () {
            var aSelItems = this.oView.byId("idList").getSelectedItems();
            for (let index = 0; index < aSelItems.length; index++) {
                this.oView.byId("idList").removeItem(aSelItems[index]);
            }
        },
        onSelectionChange: function (oEvent) {
            debugger;
            var oElementAdd = oEvent.getParameter("listItem").getBindingContextPath();
            //  this.oView.getParent().getParent().getDetailPages()[0].bindElement(oElementAdd);
            //  this.oView.getParent().getParent().to("idView2");
            var aVal = oElementAdd.split("/");
            this.oRouter.navTo("next", {
                sId: aVal[aVal.length - 1]
            });
        }
    });
});