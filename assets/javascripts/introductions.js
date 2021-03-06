function setIntroParams(selector, text, position, step) {
  $(selector).attr('data-intro', text);
  $(selector).attr('data-position', position);
  $(selector).attr('data-step', step);
}

function startIntroductions(first_url, intro_id, next_url, next_step_id, selectors) {

    if(validateSelectorsPresence(selectors)){
        if(next_url != ""){
            introJs().setOptions({ 'tooltipClass': "introJsTooltipClass",
                'showStepNumbers': false,
                'showButtons': true,
                'showBullets':false,
                'doneLabel': I18n.nextPage,
                'skipLabel': I18n.quit,
                'prevLabel': I18n.prevLabel,
                'nextLabel': I18n.nextLabel
            }).start().oncomplete(function() {
                    window.location.href = next_url + '?multipage=true&intro_id='+intro_id+'&intro_step=' + next_step_id + "&first_url=" + first_url;
                });
        }else{
            introJs().setOptions({ 'tooltipClass': "introJsTooltipClass",
                'showStepNumbers': false,
                'showButtons': true,
                'showBullets':false,
                'doneLabel': I18n.quit,
                'skipLabel': I18n.quit,
                'prevLabel': I18n.prevLabel,
                'nextLabel': I18n.nextLabel
            }).start();
        }
    }
}

jQuery(function() {
    $('#introduction_form').on('click', '.remove_fields', function(event) {
        $(this).prev('input[type=hidden]').val('1');
        $(this).closest('li').hide();
        return event.preventDefault();
    });
    $('#introduction_form').on('click', '.add_fields', function(event) {
        var regexp, time;
        time = new Date().getTime();
        regexp = new RegExp($(this).data('id'), 'g');
        $(this).before($(this).data('fields').replace(regexp, time));
        updateStepsPriorities();
        return event.preventDefault();
    });
    $('#introduction_form').on('click', '#new_url_checkbox', function(event){
       id = $(this).closest("p").attr("data-new-url-checkbox-id");
       $('#new_url_'+id).toggle();
    });
});

function updateStepsPriorities() {
    var steps = $('.ui-state-default');
    i = 1;
    steps.each(function() {
        $(this).find('.order_step').val(i);
        $(this).find('.label_step_priority').html(i);
        i++;
    });
}

function validateSelectorsPresence(selectors) {
    for(var i = 0; i < selectors.length; i++)
    {
        if($(selectors[i]).length<1){
            return false;
        }
    }
    return true;
}