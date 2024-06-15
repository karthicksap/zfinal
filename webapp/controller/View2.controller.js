sap.ui.define([
    'tit/mm/app/controller/Basecontroller',
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    "sap/ui/core/routing/History",
    "sap/ui/core/Fragment"
], function (Basecontroller, MessageBox, MessageToast, Filter, FilterOperator, History, Fragment) {
    'use strict';
    return Basecontroller.extend("tit.mm.app.controller.View2", {
        onInit: function () {
            this.oView = this.getView()
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.attachRoutePatternMatched("next", this.routeCalled.bind(this));
            // this.oView.byId("idTab").bindAggregation("items", "/cars");
        },
        routeCalled: function (oEvent) {
            var elementAdd = "/keyPlayers/" + oEvent.getParameter("arguments").sId;
            this.oView.bindElement(elementAdd);
        },
        onBack: function () {
            var oHistory, sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.oRouter.navTo("myplayers", {
                    sId: 0
                }, true);
            }
        },
        onSave: function () {
            MessageBox.confirm("Are you sure?", {
                title: "Confirm me!",
                onClose: function (oAction) {
                    if (oAction === "OK") {
                        MessageToast.show("Record saved successfully..");
                    } else {
                        MessageBox.error("You cancelled it...!");
                    }
                }
            });
        },
        onSelect: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("state", FilterOperator.Contains, sValue);
            var aFilter = [];
            aFilter.push(oFilter);
            var oFilterFin = new Filter({
                filters: aFilter
            });
            this.oView.byId("idComp").getBinding("items").filter(oFilterFin);
        },
        onselectionChange: function (oEvent) {
            debugger;
            var elementAdd = oEvent.getParameter("listItem").getBindingContextPath();
            var aValue = elementAdd.split("/");
            this.oRouter.navTo("third", {
                sId: aValue[aValue.length - 1]
            });
        },
        onConfirm: function (oEvent) {
            if (oEvent.getParameter("id").includes("idCars")) {
            var aFilter = [];
            var oFilter;
            var aSelItems = oEvent.getParameter("selectedItems");
            for (let index = 0; index < aSelItems.length; index++) {
                oFilter = new Filter("name", FilterOperator.Contains, aSelItems[index].getProperty("title"));
                aFilter.push(oFilter);
            }
            var oFilterFin = new Filter({
                filters: aFilter,
                and: false
            });
            this.oView.byId("idTab").getBinding("items").filter(oFilterFin);                
            }else{
                this.oInput.setValue(oEvent.getParameter("selectedItem").getProperty("title"));
            }
        },        
        oCarsPopup: null,
        oSincePopup: null,
        onCarsFilter: function () {
            if (this.oCarsPopup) {
                this.oCarsPopup.open();
            } else {
                Fragment.load({
                    name: "tit.mm.app.fragment.popup",
                    controller: this,
                    id: "idCars"
                }).then(function (oPopup) {
                    this.oCarsPopup = oPopup;
                    this.oCarsPopup.bindAggregation("items", {
                        path: '/cars',
                        template: new sap.m.StandardListItem({
                            icon: "sap-icon://product",
                            title: "{name}"
                        })
                    });
                    this.oView.addDependent(this.oCarsPopup);
                    this.oCarsPopup.setTitle("Car List").setMultiSelect(true);
                    this.oCarsPopup.open();
                }.bind(this));
            }
        },
        oInput: null,
        onValueHelpRequest: function (oEvent) {
            this.oInput = oEvent.getSource();
            if (this.oSincePopup) {
                this.oSincePopup.open();
            } else {
                Fragment.load({
                    name: "tit.mm.app.fragment.popup",
                    controller: this,
                    id: "idSince"
                }).then(function(oFragment){
                    this.oSincePopup = oFragment;
                    this.oView.addDependent(this.oSincePopup);
                    this.oSincePopup.bindAggregation("items",{
                        path: '/cars',
                        template: new sap.m.StandardListItem({
                            icon: "sap-icon://home",
                            title: "{since}"
                        })
                    });
                    // this.oSincePopup.attachConfirm(this.onConfirm);
                    this.oSincePopup.open();
                }.bind(this));
            }
        }
    });
});