function CustomAjax(formInputs, acceptFields, url, method) {
    //Setting AJAX:
    this.inputs = formInputs;
    this.acceptFields = acceptFields;
    this.url = url;
    this.method = method ? method : 'post';
    this.errors = {};
    //Count Errors:
    this.hasNoErrors = function () {
        for (var key in this.errors) {
            if (this.errors.hasOwnProperty(key))
                return false;
        }
        return true;
    };
    //Data to submit:
    this.sendData = {};

    //SET Setting AJAX:
    this.setURL = function (url) {
        this.url = url;
    };
    this.setMethod = function (method) {
        this.method = method;
    };
    this.setAcceptFields = function (fields) {
        this.acceptFields = fields;
    };
    this.setErrors = function(error, mess){
        this.errors[error] = mess;
    };
    this.setSendData = function(key, val){
        this.sendData[key] = val;
    };

    //GET Setting AJAX:
    this.getURL = function(){
        return this.url;
    };
    this.getMethod = function(){
        return this.method;
    };
    this.getAcceptFields = function(){
        return this.acceptFields;
    };
    this.getErrors = function(){
        return this.errors;
    };
    this.getSendData = function(){
        return this.sendData;
    };

    //AJAX handle:
    this.sendAjax = function(){
        var prototypeAjax = new Ajax.Request(this.url, {
            method: this.method,
            parameters: {"testData": JSON.stringify(this.sendData)},
            onSuccess: prototypeAjaxSuccess,
            onFailure: prototypeAjaxFail
        });
        function prototypeAjaxSuccess(responseData) {
            if (responseData.status === 200) {
                console.log(responseData.responseText.evalJSON());
                return;
            }
            return false;
        }
        function prototypeAjaxFail() {
            alert('Prototype AJAX failed!');
        }
    };

    //Validate Rules:
    this.textReg = /^[A-za-z]+$/;
    this.numberReg = /^[0-9]+$/;
    this.emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.websiteReg = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    //Check value if ok then push to sendData for submit AJAX:
    this.checkAndPushValue = function (value, name, mess, checkType) {
        if (checkType.test(value)) {
            this.setSendData(name, value);
        } else {
            this.setErrors(name, mess);
        }
    };

    //Validate handle:
    this.dataValidate = function(){
        for (var i = 0; i < this.inputs.length; i++) {
            var input = this.inputs[i];
            if (this.acceptFields.indexOf(input.name) === -1) {
                this.errors[input.name] = input.name + ' is not valid [Type: Mass Assignment]';
            }
            if (input.value === null) {
                this.errors['notEnoughInput'] = 'Missing input to submit!';
            } else {
                switch (input.type) {
                    case 'text':
                        this.checkAndPushValue(input.value, input.name, 'Field ' + input.name + ' must be string!', this.textReg);
                        break;
                    case 'email':
                        this.checkAndPushValue(input.value, input.name, 'Field ' + input.name + ' must be an email!', this.emailReg);
                        break;
                    case 'number':
                        this.checkAndPushValue(parseInt(input.value), input.name, 'Field ' + input.name + ' must be number!', this.numberReg);
                        break;
                    case 'url':
                        this.checkAndPushValue(input.value, input.name, 'Field ' + input.name + ' must be url!', this.websiteReg);
                        break;
                    case 'radio':
                        if(input.hasAttribute('checked')){
                            this.checkAndPushValue(parseInt(input.value), input.name, 'Field ' + input.name + ' error!', this.numberReg);
                        }
                        break;
                    default:
                        this.checkAndPushValue(input.value, input.name, 'Field ' + input.name + ' error!', this.textReg);
                        break;
                }
            }
        }
    };


    this.dataValidate();
    //Check if error.count() === 0 then do AJAX:
    if (this.hasNoErrors()) {
        this.sendAjax();
    } else {
        console.log('Some error:');
        console.log(this.errors);
    }
}