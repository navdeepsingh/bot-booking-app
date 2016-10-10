$(document).ready(() => {
    $('form').submit((e)=> {
        e.preventDefault()
        $.ajax({
            url : $('form').attr('action'),
            type : $('form').attr('method'),
            data : $('form').serialize(),
            success : (response)=>{
                if ( response.result )
                    if (response.redirect !== 'undefined')
                        window.location = response.redirect
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
})
