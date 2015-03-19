/**
 * register page
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

        var validator = new Validator({
            element: '.register-form',
            skipHidden: true, //不校验type=hidden
            failSilently: true, //校验的元素不存在也不报错
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
        });

        Validator.addRule('passwordFormat',/[A-Z]+/,'{{display}}为字母，数字或者符号，最短6位，区分大小写');

        validator.addItem([
            {
                element: '[name=email]',
                required: true,
                rule: 'email',
                errormessageRequired: '请输入邮箱'
            },{
                element: '[name=password]',
                required: true,
                rule: 'passwordFormat minlength{min:6}',
                errormessageRequired: '密码不正确，请重新输入密码'
            },{
                element: '[name=password-confirmation]',
                required: true,
                rule: 'confirmation{target: "#password"}',
                errormessageRequired: '请再重复输入一遍密码，不能留空'
            },{
                element: '[name=realname]',
                required: true,
                rule: 'minlength{min:2} maxlength{max:20}',
                errormessageRequired: '真实姓名不能为空'
            },{
                element: '[name=cellphone]',
                required: true,
                rule: 'mobile',
                errormessageRequired: '请输入11位手机号码'
            },{
                element: '[name=province]',
                required: true,
                rule:'',
                errormessageRequired: '请选择您所在的省份',
                showMessage:function(message, element){
                    // error msg
                    element.removeClass('ui-select-success');
                    this.getExplain(element).addClass('no-select-province');
                    this.getItem(element).addClass(this.get('itemErrorClass'));
                }, hideMessage:function(message, element){
                    // success msg
                    element.addClass('ui-select-success');
                    this.getExplain(element).removeClass('no-select-province');
                }
            },{
                element: '[name=city]',
                required: true,
                rule:'',
                errormessageRequired: '请选择您所在的地市',
                showMessage:function(message, element){
                    // error msg
                    element.removeClass('ui-select-success');
                    this.getExplain(element).addClass('no-select-city');
                    this.getItem(element).addClass(this.get('itemErrorClass'));
                    this.getItem(element).addClass(this.get('itemErrorClass'));
                }, hideMessage:function(message, element){
                    // success msg
                    element.addClass('ui-select-success');
                    this.getExplain(element).removeClass('no-select-city');
                    if(!this.getExplain(element).hasClass('no-import-text')){
                        message = '<i class="ui-tiptext-icon iconfont">&#xF049;</i><span class="ui-form-explain-text"></span>';
                        this.getExplain(element)
                            .addClass('ui-tiptext ui-tiptext-success')
                            .removeClass('ui-tiptext-error')
                            .html(message);
                        this.getItem(element)
                            .removeClass('ui-form-item-error')
                            .addClass('ui-form-item-success');
                    }
                    else{
                        this.getItem(element).addClass(this.get('itemErrorClass'));
                    }
                }
            },{
                element: '[name=address]',
                required: true,
                rule:'',
                errormessageRequired: '请填写您的联系地址',
                showMessage:function(message, element){
                    // error msg
                    element.removeClass('ui-select-success');
                    this.getExplain(element).addClass('no-import-text');
                    this.getExplain(element)
                        .addClass('ui-tiptext ui-tiptext-error')
                        .removeClass('ui-tiptext-success')
                        .html(message);
                    this.getItem(element)
                        .removeClass('ui-form-item-success')
                        .addClass(this.get('itemErrorClass'));
                }, hideMessage:function(message, element){
                    // success msg
                    element.addClass('ui-select-success');
                    this.getExplain(element).removeClass('no-import-text');
                    if(this.getExplain(element).hasClass('no-select-province') || this.getExplain(element).hasClass('no-select-city')){
                        this.getItem(element).addClass(this.get('itemErrorClass'));
                    }
                    else{
                        message = '<i class="ui-tiptext-icon iconfont">&#xF049;</i><span class="ui-form-explain-text"></span>';
                        this.getExplain(element)
                            .addClass('ui-tiptext ui-tiptext-success')
                            .removeClass('ui-tiptext-error')
                            .html(message);
                        this.getItem(element)
                            .removeClass('ui-form-item-error')
                            .addClass('ui-form-item-success');
                    }
                }
            },{
                element: '[name=checkcode]',
                required: true,
                rule: '',
                errormessageRequired: '请输入验证码'
            },{
                element: '[name=agreement]',
                required: true,
                rule: 'checkbox',
                errormessageRequired: '请勾选开发者服务协议'
            }
        ]);


        $('#commit-register').click(function(){
            validator.execute(function(error, results, element) {
                if(!error){
                    $(element).submit();
                }
            });
            return false;
        });


        //var agreementDialog = new Dialog({
        //    width: 800,
        //    height: 500,
        //    autoFit:false,
        //    title: '人人通开发者服务协议',
        //    content: './agreement.html',
        //    trigger: '.agreement'
        //});


        var ConfirmBox = Dialog.ConfirmBox;
        var cb = new ConfirmBox({
            width: 800,
            height:500,
            trigger: '.agreement',
            title: '人人通开发者服务协议',
            message: '加载中...',
            confirmTpl: '<a class="ui-button ui-button-llblue">确定</a>',
            cancelTpl:'',
            onConfirm: function() {
                var that = this;
                that.hide();
            }
        }).after('show',function() {
                var that = this;
                $.ajax({
                    url:'./agreement.html',
                    success:function(data){
                        that.set('message', data);
                    }
                });
            });


    });


});