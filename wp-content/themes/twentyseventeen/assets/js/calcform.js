function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

jQuery('.wpcf7-submit').on('click', function (e) {
   postbody = { 
     "persons": {
       "Bob": {
            "kiwisaver_employee_deduction_percentage": {
                "2018": (jQuery("select[name=kiwisaver_member]").val() == 'Yes') ? parseInt(jQuery("select[name=kiwisaver_employee_deduction_percentage]").val()) : 0
            },
            "earnings_period_in_weeks": {
                "2018": parseInt(jQuery("input[name=earnings_period_in_weeks]").val())
            },
            "sum_of_earnings_in_last_52_weeks": {
                "2018": parseInt(jQuery("input[name=sum_of_earnings_in_last_52_weeks]").val()) 
            },
            "sum_of_self_employed_earnings_in_most_recently_completed_tax_year": {
                "2018": parseInt(jQuery("input[name=sum_of_self_employed_earnings_in_most_recently_completed_tax_year]").val()) 
            },
            "number_of_weeks_in_most_recently_completed_tax_year": {
                "2018": parseInt(jQuery("input[name=number_of_weeks_in_most_recently_completed_tax_year]").val())
            },
            "sum_of_earnings_during_compensation_period_in_last_52_weeks": {
                "2018": parseInt(jQuery("input[name=sum_of_earnings_during_compensation_period_in_last_52_weeks]").val())
            },
            "compensation_period_in_weeks": {
                "2018": parseInt(jQuery("input[name=compensation_period_in_weeks]").val())
            },
            "kiwisaver_member": {
                "2018": jQuery("select[name=kiwisaver_member]").val()
            },
            "weekly_compensation_before_tax": {
                "2018": null
            },
            "kiwisaver_employee_deduction": {
                "2018": null
            }
        }
     },
     "titled_properties": {
        "donors": {
            "owners": [
            "Bob"
            ]
        }
     }
   }
   jQuery.ajax( {
       url: "http://openfisca.allengeer.com:5000/calculate", 
       type: 'post', 
       data: JSON.stringify(postbody), 
       headers: {
          "Content-Type": "application/json"
       },
       dataType: 'json', 
       success: function(data) { 
          if (!isNaN(data["persons"]["Bob"]["weekly_compensation_before_tax"]["2018"])) {
	       jQuery("#totalval").text(precisionRound( data["persons"]["Bob"]["weekly_compensation_before_tax"]["2018"], 2));
           jQuery("#kiwisaverval").text(precisionRound( data["persons"]["Bob"]["kiwisaver_employee_deduction"]["2018"], 2));
	       jQuery("#resultsdiv").show();
           jQuery("#form-info").hide();
           jQuery('html, body').animate({scrollTop: jQuery("h1").offset().top-50}, 1000);
           if (jQuery("select[name=kiwisaver_member]").val() == 'Yes' || jQuery("select[name=kiwisaver_member]").val() == 'yes') {
               jQuery('#showkiwisaver').show();
           } else {
               jQuery('#showkiwisaver').hide();
           }

          } else {
           jQuery("#resultsdiv").text("There was a problem calculating your payments. Please contact a Live Organ Donor representative at 0800 LIVE DONOR for more information.");
           jQuery("#resultsdiv").show();
          }
        }
          // alert("Your weekly compensation will be: $" + precisionRound( data["persons"]["Bob"]["weekly_compensation_before_tax"]["2018"], 2) + "."); }
     }); 
   e.preventDefault();
});
