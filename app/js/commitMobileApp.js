/**
 * commitMobileApp page
 */

seajs.config({
    base:"./spm_modules",
    alias:{
        "jquery":"jquery/1.7.2/jquery-debug",
        "validator":"arale-validator/0.10.1/index-debug",
        "dialog":"arale-dialog/1.5.1/dialog-debug"
    }
});

seajs.use(['jquery','validator','dialog'],function($,Validator,Dialog){
    $(function(){

        function config(range){
            return {
                element: range,
                skipHidden: true, //不校验type=hidden
                failSilently: true, //校验的元素不存在也不报错
                autoFocus:false,
                showMessage: function (message, element) {
                    message = '<i class="ui-tiptext-icon iconfont">&#xF045;</i><span class="ui-form-explain-text">' + message + '</span>';
                    this.getExplain(element)
                        .addClass('ui-tiptext ui-tiptext-error')
                        .removeClass('ui-tiptext-success')
                        .html(message);
                    this.getItem(element)
                        .removeClass('ui-form-item-success')
                        .addClass('ui-form-item-error');
                },
                hideMessage: function (message, element) {
                    message = '<i class="ui-tiptext-icon iconfont">&#xF049;</i><span class="ui-form-explain-text"></span>';
                    this.getExplain(element)
                        .addClass('ui-tiptext ui-tiptext-success')
                        .removeClass('ui-tiptext-error')
                        .html(message);
                    this.getItem(element)
                        .removeClass('ui-form-item-error')
                        .addClass('ui-form-item-success');
                }
            };
        }

        function mobileConfig(range){
            return $.extend(config(range),{
                showMessage: function (message, element) {
                    message = '<i class="ui-tiptext-icon iconfont">&#xF045;</i><span class="ui-form-explain-text">' + message + '</span>';
                    $(element).parents('.ui-form-item').first().children('.ui-form-explain')
                        .addClass('ui-tiptext ui-tiptext-error')
                        .removeClass('ui-tiptext-success')
                        .html(message);
                    $(element).parents('.ui-form-item').first()
                        .removeClass('ui-form-item-success')
                        .addClass('ui-form-item-error');
                },
                hideMessage: function (message, element) {
                    message = '<i class="ui-tiptext-icon iconfont">&#xF049;</i><span class="ui-form-explain-text"></span>';
                    $(element).parents('.ui-form-item').first().children('.ui-form-explain')
                        .addClass('ui-tiptext ui-tiptext-success')
                        .removeClass('ui-tiptext-error')
                        .html(message);
                    $(element).parents('.ui-form-item').first()
                        .removeClass('ui-form-item-error')
                        .addClass('ui-form-item-success');
                }
            });
        }



        var customValidator = Validator.extend({
            mouseenter: function (e) {
                this.getItem(e.target).first().addClass(this.get('itemHoverClass'));
            },focus: function (e) {
                var target = e.target,
                    autoFocusEle = this.get('autoFocusEle');

                if (autoFocusEle && autoFocusEle.has(target)) {
                    var that = this;
                    $(target).keyup(function (e) {
                        that.set('autoFocusEle', null);
                        that.focus({target: target});
                    });
                    return;
                }
                this.getItem(target).first().removeClass(this.get('itemErrorClass'));
                this.getItem(target).first().addClass(this.get('itemFocusClass'));
                if(!this.getItem(target).first().hasClass('ui-form-item-success')){
                    this.getItem(target).first().children('.' + this.get('explainClass')).html($(target).attr('data-explain') || $(target).prev().attr('data-explain') || '');
                }
                else{

                }
            }
        });

        var stepOne = new customValidator(config($('.step-one > .ui-form-item')));
        var stepTwo = new customValidator(mobileConfig($('.step-two > .ui-form-item')));
        var android = new customValidator(mobileConfig($('.mobile-platform-android')));
        var ios = new customValidator(mobileConfig($('.mobile-platform-ios')));

        stepOne.addItem([
            {
                element: '[name=mobile-name]',
                required: true,
                rule: 'minlength{min:2} maxlength{max:40}',
                errormessageRequired: '请输入移动应用名称'
            },{
                element: '[name=mobile-intro]',
                required: true,
                rule: 'minlength{min:10} maxlength{max:200}',
                errormessageRequired: '请输入移动应用简介'
            },{
                element: '[name=mobile-super-type]',
                required: false
            },{
                element: '[name=mobile-type]',
                required: true,
                rule: '',
                errormessageRequired: '请选择您的应用类型'
            },{
                element: '[name=mobile-section]',
                required: true,
                rule: 'checkbox',
                errormessageRequired: '请勾选适用学段'
            },{
                element: '[name=mobile-province]',
                required: false,
                rule: ''
            },{
                element: '[name=mobile-city]',
                required: true,
                rule: 'checkbox',
                errormessageRequired: '请勾选适用地市'
            },{
                element: '[name=mobile-tags]',
                required: true,
                rule:'',
                errormessageRequired: '请输入应用标签，用分号隔开'
            },{
                element: '[name=mobile-img-check]',
                required: true,
                skipHidden:false,
                rule:'checkbox',
                errormessageRequired: '请上传应用图片'
            }
        ]);
        stepTwo.addItem([
           {
                element: '[name=mobile-auth-url]',
                required: true,
                rule: 'url',
                errormessageRequired: '请输入授权回调域'
            },{
                element: '[name=mobile-url]',
                required: true,
                rule: 'url',
                errormessageRequired: '请填写官网网址'
            },{
                element: '[name=mobile-platform]',
                required: true,
                rule: 'checkbox',
                errormessageRequired: '请选择应用平台'
            }
        ]);

        android.addItem([
            {
                element: '[name=app-android-package]',
                required: true,
                skipHidden:false,
                rule: 'checkbox',
                errormessageRequired: '请上传应用安装包'
            },{
                element: '[name=app-android-screenshot]',
                required: true,
                skipHidden:false,
                rule: 'checkbox',
                errormessageRequired: '请上传4-5张应用屏幕截图'
            },{
                element: '[name=app-android-screensize]',
                required: true,
                rule: 'radio',
                errormessageRequired: '请选择应用支持的屏幕大小'
            },{
                element: '[name=app-android-language]',
                required: true,
                rule: 'radio',
                errormessageRequired: '请选择应用支持的语言'
            },{
                element: '[name=app-android-price]',
                required: true,
                rule: 'radio',
                errormessageRequired: '请选择应用支持的资费类型'
            }
        ]);

        ios.addItem([
            {
                element: '[name=app-ios-appstore]',
                required: true,
                rule: '',
                errormessageRequired: '请填写appstore应用详情页地址'
            },{
                element: '[name=app-ios-bundleid]',
                required: true,
                rule: '',
                errormessageRequired: '请填写应用唯一标识'
            }
        ]);


        $('[name=mobile-platform]').click(function(){
            if(this.checked){
                $(this).parent().next('.mobile-platform-detail').slideDown();
            }
            else{
                $(this).parent().next('.mobile-platform-detail').slideUp();
            }
        });


        //$('.btn-selectfile').click(function(e){
        //    $(this).siblings('input[type=file]').trigger('click');
        //    return false;
        //});

        var upload = new Dialog({
            id:'uploadDialog',
            content: '<div class="ajax-loading">上传中...</div>',
            closeTpl: '',
            height: 60 ,
            width: 300
        }).after('show',function() {
                $('#uploadDialog').find('.ui-dialog-close').unbind('click').remove();
        });

        upload.undelegateEvents(document, 'keyup.esc');

        $('.ui-inputfile .input-file').bind('change',function(){
            var input = $(this);
            if(input.val()){
                upload.activeTrigger = input;
                upload.show();
                setTimeout(function(){
                    upload.hide();
                    input.blur();
                    var checkbox = input.prev('[type=checkbox]');
                    var checkboxName = checkbox.attr('name');
                    if(checkboxName == 'app-android-screenshot'){
                        var screenshot = $('.mobile-platform-android .app-android-screenshot');
                        if(screenshot.length > 3 && screenshot.length < 6){
                            checkbox.attr('checked',true);
                        }
                    }
                    else{
                        checkbox.attr('checked',true);
                    }
                    Validator.query('[name='+checkboxName+']').execute();
                },3000);
            }
            input.val('');
        });

        $(document).on('click','.mobile-platform-android .app-img-del',function(){
            $(this).parent().remove();
            var screenshot = $('.mobile-platform-android .app-android-screenshot');
            if(screenshot.length > 3 && screenshot.length < 6){
                $('.mobile-platform-android [name=app-android-screenshot]').attr('checked',true);
            }
            else{
                $('.mobile-platform-android [name=app-android-screenshot]').attr('checked',false);
            }
            customValidator.query('[name=app-android-screenshot]').execute();
            return false;
        });


        $('#step-two').click(function(){
            stepOne.execute(function(error, results, element) {
                if(!error){
                    $('.step-one').hide();
                    $('.step-two').show();

                    $('.ui-step-start').removeClass('ui-step-active').addClass('ui-step-done')
                                       .next().addClass('ui-step-active');

                    $('#step-one').click(function(){
                        $('.step-one').show();
                        $('.step-two').hide();
                        $('.ui-step-start').removeClass('ui-step-done').addClass('ui-step-active')
                                           .next().removeClass('ui-step-active');
                    });
                }
            });
            return false;
        });


        $('#step-ok').click(function(){
            stepTwo.execute(function(error, results, element) {
                if(!error){
                    var checkbox = [];
                    var checked = $(':checked[name=mobile-platform]').each(function(){
                        checkbox.push($(this).val());
                    });
                    var platform = checkbox.join();
                    if(platform == 'android'){
                        android.execute(function(error){
                            if(!error){
                                checkOk();
                            }
                        });
                    }
                    else if(platform == 'ios'){
                        ios.execute(function(error){
                            if(!error){
                                checkOk();
                            }
                        });
                    }
                    else if(platform){
                        android.execute(function(error){
                            if(!error){
                                ios.execute(function(error){
                                    if(!error){
                                        checkOk();
                                    }
                                });
                            }
                        });
                    }
                }
            });
            return false;
        });

        function checkOk(){
            //$(element).submit();
            $('.step-one').hide();
            $('.step-two').hide();
            $('.step-ok').show();
            $('.ui-step-start').next().removeClass('ui-step-active').addClass('ui-step-done');
            $('.ui-step-end').addClass('ui-step-active');
        }

    });

});