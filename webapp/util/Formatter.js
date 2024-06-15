sap.ui.define([
], function() {
    'use strict';
    return {
        getStatusText: function(sInp){
            switch (sInp) {
                case 'Available':
                    return "Success";
                case 'Not available':
                    return "Warning";
                case 'Discontinued':
                    return "Error";                        
            }
        },
        test: function(){
         return 9000;     
        }
    }
});