/**
 * manage page
 */

seajs.config({
    base:"./spm_modules",
    alias:{
        "jquery":"jquery/1.7.2/jquery-debug",
        "popup":"arale-popup/1.2.0/src/popup-debug"
    }
});
seajs.use(['jquery','popup'],function($,Popup){

    $(function(){

        new Popup({
            trigger: '#dropdown-app',
            element: '#dropdown-app-list'
        });

        $('#go-dropdown-app').click(function(){
            $('#dropdown-app').trigger('mouseenter');
        });



    });

});
