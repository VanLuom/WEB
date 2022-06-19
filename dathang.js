window.onpageshow = function(event) {
    if (event.persisted) {
        var currentUrl = '';

        
            currentUrl = 'http://happylive.vn/checkouts/913189a78ff74efa816492a0bf2c7981?step=1';
        
        
        if(currentUrl)
            window.location = currentUrl;
    }
};
var isInit = false;

function funcFormOnSubmit(e) {

    if(!isInit) {
        isInit = true;

        $.fn.tagName = function() {
            return this.prop("tagName").toLowerCase();
        };
    }

    if(typeof(e) == 'string') {
        var element = $(e);
        var formData = e;
    } else {
        var element = this;
        var formData = this;
        e.preventDefault();
    }
    
    $(element).find('button:submit').addClass('btn-loading');
    
    var formId = $(element).attr('id'), replaceElement = [], funcCallback;

    if(formId == undefined || formId == null || formId == '')
        return;
    
    

        if(formId == 'form_next_step') {
            formData = '.section-customer-information';
            replaceElement.push('.step-sections');
        } 
        else if(
            formId == 'form_discount_add'
            || formId == 'form_discount_remove'
            || formId == 'form_update_location'
            
            ) {
            replaceElement.push('#form_update_location');
            replaceElement.push('.inventory_location');
            replaceElement.push('.inventory_location_data');
            replaceElement.push('.order-summary-toggle-inner .order-summary-toggle-total-recap');
            replaceElement.push('.order-summary-sections');
        }

        

    

    if(!$(formData) || $(formData).length == 0) {
        window.location.reload();
        return false;
    }

    if($(formData).tagName() != 'form')
        formData += ' :input';

    $.ajax({
        type: 'GET',
        url: window.location.origin + window.location.pathname + '?' + $(formData).serialize() + encodeURI('&form_name=' + formId),
        success: function(html) {

            if($(html).attr('id') == 'redirect-url') {
                window.location = $(html).val();
            } else {
                if(replaceElement.length > 0) {
                    for (var i = 0; i < replaceElement.length; i++) 
                    {
                        var tempElement = replaceElement[i];
                        var newElement = $(html).find(tempElement);
                    
                        if(newElement.length > 0) {
                            if(tempElement == '.step-sections')
                                $(tempElement).attr('step', $(newElement).attr('step'));

                            var listTempElement = $(tempElement);

                            for(var j = 0; j < newElement.length; j++)
                                if(j < listTempElement.length)
                                    $(listTempElement[j]).html($(newElement[j]).html());
                        }
                    }
                }

                $('body').attr('src', $(html).attr('src'));
                $(element).find('button:submit').removeClass('btn-loading');

                if(($('body').find('.field-error') && $('body').find('.field-error').length > 0)
                    || ($('body').find('.has-error') && $('body').find('.has-error').length > 0))
                    $("html, body").animate({ scrollTop: 0 }, "slow");

                if(funcCallback)
                    funcCallback();
            }
        }
    });

    return false;
};
function funcSetEvent() {
    var effectControlFieldClass = '.field input, .field select, .field textarea';

    $('body')
        .on('focus', effectControlFieldClass, function() {
            funcFieldFocus($(this), true);
        })
        .on('blur', effectControlFieldClass, function() {
            funcFieldFocus($(this), false);
            funcFieldHasValue($(this), true);
        })
        .on('keyup input paste', effectControlFieldClass, function() {
            funcFieldHasValue($(this), false);
        })
        .on('submit', 'form', funcFormOnSubmit);

    
    
        

            $('body')
                .on('change', '#form_update_location', function() {
                    $(this).submit();
                });

        
            
        $('body')
            .on('change', '#form_update_location select[name=customer_shipping_district]', function() {
                $('.section-customer-information input:hidden[name=customer_shipping_district]').val($(this).val());
            })
            .on('change', '#form_update_location select[name=customer_shipping_ward]', function() {
                $('.section-customer-information input:hidden[name=customer_shipping_ward]').val($(this).val());
            });

        
        
        $('body')
            .on('change', '#form_update_shipping_method input:radio', function() {
                $('#form_update_shipping_method .content-box-row.content-box-row-secondary').addClass('hidden');

                var id = $(this).attr('id');

                if(id) {
                    var sub = $('body').find('.content-box-row.content-box-row-secondary[for=' + id + ']')
                    
                    if(sub && sub.length > 0) {
                        $(sub).removeClass('hidden');
                    }
                }
            });

    
    

    
};
function funcFieldFocus(fieldInputElement, isFocus) {
    if(fieldInputElement == undefined)
        return;

    var fieldElement = $(fieldInputElement).closest('.field');

    if(fieldElement == undefined)
        return;

    if(isFocus) 
        $(fieldElement).addClass('field-active');
    else 
        $(fieldElement).removeClass('field-active');
};
function funcFieldHasValue(fieldInputElement, isCheckRemove) {
    if(fieldInputElement == undefined)
        return;

    var fieldElement = $(fieldInputElement).closest('.field');

    if(fieldElement == undefined)
        return;
        
    if($(fieldElement).find('.field-input-wrapper-select').length > 0) {
        var value = $(fieldInputElement).find(':selected').val();

        if(value == 'null')
            value = undefined;
    } else {
        var value = $(fieldInputElement).val();
    }

    if(!isCheckRemove) {
        if(value != $(fieldInputElement).attr('value'))
            $(fieldElement).removeClass('field-error');
    }

    var fieldInputBtnWrapperElement = $(fieldInputElement).closest('.field-input-btn-wrapper');

    if(value && value.trim() != '') {
        $(fieldElement).addClass('field-show-floating-label');
        $(fieldInputBtnWrapperElement).find('button:submit').removeClass('btn-disabled');
    } 
    else if(isCheckRemove) {
        $(fieldElement).removeClass('field-show-floating-label');
        $(fieldInputBtnWrapperElement).find('button:submit').addClass('btn-disabled');
    } 
    else {
        $(fieldInputBtnWrapperElement).find('button:submit').addClass('btn-disabled');
    }
};
function funcInit() {
    funcSetEvent();

    
}
$(document).ready(function() {
    funcInit();
});
var toggleShowOrderSummary = false;
					$(document).ready(function() {
					    var currentUrl = '';

					    
					        currentUrl = 'http://happylive.vn/checkouts/913189a78ff74efa816492a0bf2c7981?step=1';
					    

					    if ($('#reloadValue').val().length == 0)
					    {
					        $('#reloadValue').val(currentUrl);
					        $('body').show();
					    }
					    else
					    {
					        window.location = $('#reloadValue').val();
					        $('#reloadValue').val('');
					    }

						$('body')
							.on('click', '.order-summary-toggle', function() {
								toggleShowOrderSummary = !toggleShowOrderSummary;

								if(toggleShowOrderSummary) {
									$('.order-summary-toggle')
										.removeClass('order-summary-toggle-hide')
										.addClass('order-summary-toggle-show');

									$('.sidebar:not(".sidebar-second") .sidebar-content .order-summary')
										.removeClass('order-summary-is-collapsed')
										.addClass('order-summary-is-expanded');
										
									$('.sidebar.sidebar-second .sidebar-content .order-summary')
										.removeClass('order-summary-is-expanded')
										.addClass('order-summary-is-collapsed');
								} else {
									$('.order-summary-toggle')
										.removeClass('order-summary-toggle-show')
										.addClass('order-summary-toggle-hide');

									$('.sidebar:not(".sidebar-second") .sidebar-content .order-summary')
										.removeClass('order-summary-is-expanded')
										.addClass('order-summary-is-collapsed');
										
									$('.sidebar.sidebar-second .sidebar-content .order-summary')
										.removeClass('order-summary-is-collapsed')
										.addClass('order-summary-is-expanded');
								}
							});
					});
                    function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                        })(window,document,'script','./www.google-analytics.com/analytics.js','ga');
                        ga('create', 'UA-97086989-1', 'auto');
                        try { 
                             
                        } catch (e) {};
                        ga('send', 'pageview');
                        
                        //]]>
                        //<![CDATA[
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','./connect.facebook.net/en_US/fbevents.js');
    // Insert Your Facebook Pixel ID below. 
    fbq('init', '905600829489553');
    fbq('track', 'PageView');
    //]]>
    //<![CDATA[
if ((typeof Haravan) === 'undefined') {
    Haravan = {};
  }
  Haravan.culture = 'vi-VN';
  Haravan.shop = 'happylive.myharavan.com';
  Haravan.theme = {"name":"Theme mặc định","id":1000229231,"role":"main"};
  Haravan.domain = 'happylive.vn';