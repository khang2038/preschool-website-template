(function ($) {
    "use strict";

    // Khởi tạo WOW.js
    new WOW().init();

    // Spinner
    const spinner = () => {
        setTimeout(() => {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });

    // Xử lý form submit
    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();

        // Kiểm tra nếu trường tên và số điện thoại chưa được điền
        if (!name || !phone) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Vui lòng điền đầy đủ thông tin!',
            });
            return;
        }

        const formData = {
            fullName: name,
            phoneNumber: phone
        };

        // Gửi yêu cầu POST đến API sử dụng jQuery AJAX
        $.ajax({
            url: 'https://ai4lifespring.onrender.com/api/customer/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (data) {
                if (data.messageEn === 'Success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thành công!',
                        text: 'Cảm ơn bạn đã gửi thông tin. Chúng tôi sẽ liên hệ sớm.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Đã có lỗi xảy ra, vui lòng thử lại sau!',
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi kết nối',
                    text: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau!',
                });
            }
        });
    });

    // Nút "Back to Top"
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });

})(jQuery);
