$(document).ready(() => {
    $('form').submit((e)=> {
        e.preventDefault()
        $.ajax({
            url : $('form').attr('action'),
            type : $('form').attr('method'),
            data : $('form').serialize(),
            success : (response)=>{
                if ( response.result ) {
                    if (response.redirect !== 'undefined')
                        window.location = response.redirect
                } else {
                    // Handle errors
                    _.each(response, function(errors){
                        $(`<span class="label label-danger">${errors.message}</span>`).insertAfter(`#${errors.field}`)
                    })
                    setTimeout(function(){
                        $('.label-danger').fadeOut(250);
                    }, 2000);
                }
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                $('form').prepend(`<div class="alert alert-danger">${err.error}</div>`)
                setTimeout(function(){
                        $('.alert-danger').fadeOut(250);
                }, 4000);
            }
        })
    })

    $('.js-delete').click(function(e) {
        if ( confirm('Are you sure?') ) {
            $.ajax({
                url : $(this).attr('href')+'?_csrf='+$('input[name=_csrf]').val(),
                type : 'DELETE',
                success : (response)=>{
                    if ( response.result )
                        if (response.redirect !== 'undefined')
                            window.location = response.redirect
                }
            })
        }
        e.preventDefault()
    })

    let url = window.location.href;
    let id = url.substring(url.lastIndexOf('/') + 1);

    $.ajax({
        url : `/get_meetings/${id}`,
        type : 'GET',
        success : (response)=>{
            if ( response.result )
                clndr = $('#full-clndr').clndr({
                    template: $('#full-clndr-template').html(),
                    events: response.result,
                    forceSixRows: true,
                    clickEvents: {
                        click: function(target) {
                          console.log(target);
                          let selectedDate = moment(target.date._i).format('MMMM Do YYYY')
                          let date = target.date._i
                          $('.modal-title').html(selectedDate)
                          $('input[name=date]').val(date)
                          $('input[name=title]').val('')
                          $('#bookingSubmit').html('Book')

                          if (target.events.length > 0) {
                             $('.modal-title').html(`${selectedDate} : Edit`)
                             $('#bookingSubmit').html('Update')
                             $('form').attr('method','PUT')
                            _.each(target.events, function(events){
                                $('form').attr('action',`/booking/${events.id}`)
                                $('input[name=title]').val(events.title)
                            })
                          }
                          $('#bookingModal').modal('show')
                        },
                        onMonthChange: function(month) {
                          console.log('you just went to ' + month.format('MMMM, YYYY'));
                        }
                    }
            });
        }
    })

    $('select[name=selectRoom]').change(function() {
        window.location = `/room/${$(this).val()}`
    })

    $('#bookingSubmit').click(function(e){
        e.preventDefault()
        $('.alert-danger').remove()
        const form = $('form#bookingForm')
        const alertBox = '<div class="alert alert-danger"><strong>Alert!</strong> Some errors in form</div>'
        let requiredFields = $('input:required')
        let totalEmpty = 0
        _.each(requiredFields, function(elem){
            let element = $(elem)
            if ( element.val() == '' ) {
                totalEmpty++
            }
        })

        if ( totalEmpty > 0 ) {
            form.prepend(alertBox)
            setTimeout(function(){
                $('.alert-danger').fadeOut(250);
            }, 2000);
            return false;
        }

        form.submit()
    })


})
