function Post() {
    function bindEvent() {
        $(".post_edit").click(function(e) {
            let image = $(".image").val().slice(12);
            let image1 = $(".image1").val().slice(12);
            var params = {
                id: $(".id").val(),
                title: $(".title").val(),
                //content: tinymce.get("content").getContent(),
                content: $(".content").val(),
                author: $(".author").val(),
                phone: $(".phone").val(),
                image: image,
                image1: image1,
                price: $(".price").val(),
                area: $(".area").val()

            };

            var base_url = location.protocol + "//" + document.domain + ":" + location.port;

            $.ajax({
                url: base_url + "/admin/post/edit",
                type: "PUT",
                data: params,
                dataType: "json",
                success: function(res) {
                    if (res && res.status_code == 200) {
                        location.reload();
                    }
                }
            });
        });

        $(".post_delete").click(function(e) {
            var post_id = $(this).attr("post_id");

            var base_url = location.protocol + "//" + document.domain + ":" + location.port;

            $.ajax({
                url: base_url + "/admin/post/delete",
                type: "DELETE",
                data: { id: post_id },
                dataType: "json",
                success: function(res) {
                    if (res && res.status_code == 200) {
                        location.reload();
                    }
                }
            });
        })
    }

    bindEvent();
}


$(document).ready(function() {
    new Post();
})