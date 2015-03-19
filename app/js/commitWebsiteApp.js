/**
 * commitWebsiteApp page
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

        var config = {
            element: '.commit-app-form',
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
                    .addClass(this.get('itemErrorClass'));
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

        var customValidator = Validator.extend({
            focus: function (e) {
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
            }
        });


        var stepOne = new customValidator(config);
        var stepTwo = new customValidator(config);

        stepOne.addItem([
            {
                element: '[name=website-name]',
                required: true,
                rule: 'minlength{min:2} maxlength{max:40}',
                errormessageRequired: '请输入网站应用名称'
            },{
                element: '[name=website-intro]',
                required: true,
                rule: 'minlength{min:10} maxlength{max:200}',
                errormessageRequired: '请输入网站应用简介'
            },{
                element: '[name=website-super-type]',
                required: false
            },{
                element: '[name=website-type]',
                required: true,
                rule: '',
                errormessageRequired: '请选择您的网站类型'
            },{
                element: '[name=website-section]',
                required: true,
                rule: 'checkbox',
                errormessageRequired: '请勾选适用学段'
            },{
                element: '[name=website-province]',
                required: false,
                rule: ''
            },{
                element: '[name=website-city]',
                required: true,
                rule: 'checkbox',
                errormessageRequired: '请勾选适用地市'
            },{
                element: '[name=website-tags]',
                required: true,
                rule:'',
                errormessageRequired: '请输入网站标签，用分号隔开'
            },{
                element: '[name=website-img-check]',
                required: true,
                skipHidden:false,
                rule:'checkbox',
                errormessageRequired: '请上传应用图片'
            }
        ]);
        stepTwo.addItem([
           {
                element: '[name=website-auth-url]',
                required: true,
                rule: 'url',
                errormessageRequired: '请输入授权回调域'
            },{
                element: '[name=website-url]',
                required: true,
                rule: 'url',
                errormessageRequired: '请填写官网网址'
            },{
                element: '[name=website-register-check]',
                required: true,
                skipHidden:false,
                rule: 'checkbox',
                errormessageRequired: '请上传网站信息登记表'
            }
        ]);

        //$('.btn-selectfile').click(function(e){
        //    $(this).siblings('input[type=file]').trigger('click');
        //    return false;
        //});

        var websiteImg = new Dialog({
            id:'websiteImg',
            content: '<div class="ajax-loading">上传中...</div>',
            closeTpl: '',
            height: 60 ,
            width: 300
        }).after('show',function() {
                $('#websiteImg').find('.ui-dialog-close').unbind('click').remove();
        });

        websiteImg.undelegateEvents(document, 'keyup.esc');


        $('.ui-inputfile .input-file').bind('change',function(){
            var input = $(this);
            if(input.val()){
                websiteImg.activeTrigger = input;
                websiteImg.show();
                setTimeout(function(){
                    websiteImg.hide();
                    input.blur();
                    var checkbox = input.prev('[type=checkbox]');
                    var checkboxName = checkbox.attr('name');
                    checkbox.attr('checked',true);
                    Validator.query('[name='+checkboxName+']').execute();
                },3000);
            }
            input.val('');
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
                    //$(element).submit();
                    $('.step-one').hide();
                    $('.step-two').hide();
                    $('.step-ok').show();
                    $('.ui-step-start').next().removeClass('ui-step-active').addClass('ui-step-done');
                    $('.ui-step-end').addClass('ui-step-active');
                }
            });
            return false;
        });

    });

});