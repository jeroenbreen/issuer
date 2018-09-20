import Vue from "vue";
import $ from "jquery";

let frame, content, margin;


function doChecks() {
    if (hasScrollbar(content[0])) {
        frame.addClass('has-scrollbar');
        frame.addClass('bottom-scrim');
    } else {
        frame.removeClass('has-scrollbar');
    }
}

function onScroll() {
    let position, frameHeight, contentHeight;
    position = getScrollposition(content);
    frameHeight = frame.outerHeight();
    contentHeight = getContentHeight(content);
    doChecks();

    if (position > margin) {
        frame.addClass('top-scrim');
    } else {
        frame.removeClass('top-scrim')
    }

    if (position > (contentHeight - frameHeight - margin)) {
        frame.removeClass('bottom-scrim');
    } else {
        frame.addClass('bottom-scrim');
    }
}



function getScrollposition(e){
    return e.scrollTop()
}

function getContentHeight(e){
    let h = 0;
    e.children().each(function(){
        h += $(this).outerHeight();
    });
    return h;
}

function hasScrollbar(e) {
    return e.scrollHeight > e.clientHeight;
}

function init() {
    create();
    margin = 20;
    frame.addClass('scrim');
    doChecks();
    $(window).resize(function(){
        doChecks();
    });

    content.scroll(function(){
        onScroll();
    });
}

function create() {
    content = $('<div class="scrim__content"></div>');
    content.append(frame.children());
    frame.append(content);
    // move padding to the content
    content.css('padding', frame.css('padding'));
    frame.css('padding', 0);
}

const scrimDirective =  Vue.directive('scrim', {

    inserted: function (el) {
        frame = $(el);
        init();
    },
    componentUpdated(){
        doChecks();
    }
});

export {scrimDirective}