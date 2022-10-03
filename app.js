$(function() {
    (function($) {
        // This variable is available only inside this plugin
        $.fn.accordion = function(options) {
            // Plugin options default values
            var conditions = $.extend({
                    openTab: function() {
                        return new Promise((resolve, reject) => {
                            resolve("default resolve");
                        });
                    },
                    hide: function(targetId, component) {
                        $(component).attr("aria-expanded", "false");
                        let tarHeight = $(targetId).height();
                        let speedCalc = tarHeight * 0.75;
                        let speed = speedCalc > 200 ? 200 : speedCalc;
                        $(targetId).css("overflow", "hidden");
                        $(targetId).animate({
                            height: 0
                        }, speed, function() {
                            $(targetId).hide();
                            $(targetId).removeClass("show");
                            $(targetId).removeAttr("style");
                        });


                    },
                    show: function(targetId, component) {
                        $(component).attr("aria-expanded", "true");
                        component.trigger('shown.hub.collapse');
                        let tarHeight = $(targetId).height();
                        $(targetId).css({
                            display: "table-row-group",
                            height: "0px",
                            overflow: "hidden"
                        });
                        $(targetId).addClass("show");
                        let speedCalc = tarHeight * 0.75;
                        let speed = speedCalc > 200 ? 200 : speedCalc;
                        $(targetId).animate({
                            height: tarHeight
                        }, speed, function() {
                            $(targetId).removeAttr("style");
                        });
                    }
                },

                options
            );

            return this.each(function() {
                if (conditions.hasOwnProperty(options) == true) {
                    var component = $(this);
                    let targetId = $(component).attr("data-bs-target");
                    return conditions[options](targetId, component)
                } else {
                    $(this).on("click", function() {
                        var component = $(this);
                        let targetId = $(component).attr("data-bs-target");
                        let checkStat = $(component).attr("aria-expanded");
                        if (checkStat === "true") {
                            conditions.hide(targetId, component)
                        } else {
                            component.trigger('hidden.hub.collapse')
                            conditions.openTab.call(this).then(function(data) {
                                conditions.show(targetId, component)

                            });
                        }
                    });
                }
            });

        };
    })(jQuery);

    $("#module_2_table").accordion({
        openTab: function(e) {
            return new Promise((resolve, reject) => {
                setTimeout(function () {
                    resolve("default resolve");
                }, 3500);
            });
        }
    });
    $("#module_1_table").accordion();
    $("#module_2_table").on('shown.hub.collapse', function() {
        setTimeout( function ( ) { alert( "This will trigger once open table" ); }, 1 );
    })
    $("#module_2_table").on('hidden.hub.collapse', function() {
        setTimeout( function ( ) { alert( "This will trigger once close table" ); }, 1 );
    })

})
    

