// animation
const animationItems = document.querySelectorAll('.animation-item')
if (animationItems.length > 0) {
	function onEntry(e) {
		e.forEach(e => {
			e.isIntersecting && e.target.classList.add('animation-active')
		})
	}
	let options = {
			threshold: [0.5],
		},
		observer = new IntersectionObserver(onEntry, options)
	for (let e of animationItems) observer.observe(e)
}


document.addEventListener("DOMContentLoaded", function () {
    /*  burger menu  */
    const burgerMenu = document.querySelector('.burger__menu');
    if (burgerMenu) {
        const headerMobile = document.querySelector('.header__content');
        const header = document.querySelector('.header');
        burgerMenu.addEventListener("click", () => {
            if (burgerMenu.classList.contains('burger__menu--active')) {
                document.body.classList.remove('lock');                  
            }
            headerMobile.classList.toggle("header__content--active");
            burgerMenu.classList.toggle("burger__menu--active");
            header.classList.toggle("header--active");

            document.querySelector('html').classList.toggle('burger-lock');
        });
    }
    /*  end burger menu  */


    /*  Popups  */
    function popupClose(popupActive) {
        popupActive.classList.remove('open');
        document.body.classList.remove('lock');
        document.querySelector('html').removeAttribute('style');
        document.querySelector('html').classList.remove('lock');
        document.querySelector('header').removeAttribute('style');
    }
    
    const popupOpenBtns = document.querySelectorAll('.popup-btn');
    const popups = document.querySelectorAll('.popup');
    
    popupOpenBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            const path = e.currentTarget.dataset.path;
            const currentPopup = document.querySelector(`[data-target="${path}"]`);
    
            if (currentPopup) {
                if (currentPopup.classList.contains('open')) {
                    popupClose(currentPopup);
                } else {
                    popups.forEach(function (popup) {
                        popupClose(popup);
                    });
                    currentPopup.classList.add('open');
                    document.querySelector('html').classList.add('lock');
                    currentPopup.addEventListener('click', function (e) {
                        if (!e.target.closest('.popup__content')) {
                            popupClose(currentPopup);
                        }
                    });
                }
            }
        });
    });

    const burger = document.querySelector('.burger__menu');
    burger.addEventListener('click', function () {
        popups.forEach(function (popup) {
            if (popup.classList.contains('open')) {
                popupClose(popup);
            }
        });
    });
    /*  end popups  */



        /*  Slaider  */
        const introSwiper = new Swiper(".introSwiper", {
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            scrollbar: {
                el: ".swiper-scrollbar",
                hide: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });


        const recommendSwiper = new Swiper(".recommendSwiper", {
            slidesPerView: 1.14,
            spaceBetween: 10,
            navigation: {
                nextEl: ".recommend__swiper-button-next",
                prevEl: ".recommend__swiper-button-prev",
            },
        
            breakpoints: {
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                730: {
                    slidesPerView: 2,
                },
            }
        });

        const readAlsoSwiper = new Swiper(".readAlsoSwiper", {
            slidesPerView: 1.14,
            spaceBetween: 15,
            navigation: {
                nextEl: ".read-also__swiper-button-next",
                prevEl: ".read-also__swiper-button-prev",
            },
        
            breakpoints: {
                1330: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                1060: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                730: {
                    slidesPerView: 2,
                },
            }
        });
        /*  End slaider  */


    /* navigation */
    const articleNavigation = document.querySelector('.navigation');
    if (articleNavigation) {
        const jsScrollBlockList = document.querySelectorAll('.text__content h1, .text__content h2, .text__content h3');

        if (jsScrollBlockList.length > 0) {
            for (let i = 0; i < jsScrollBlockList.length; i += 1) {
                const jsScrollBlock = jsScrollBlockList[i];
                const titleBlock = jsScrollBlock.textContent;
                const articleNavigationList = document.querySelector('.navigation__item ul');
                const articleNavigationItem = document.createElement('li');
                const articleNavigationLink = document.createElement('a');
                articleNavigationItem.classList.add('navigation__list-item');
                articleNavigationLink.classList.add('navigation__link');
                jsScrollBlock.setAttribute('id', `${i}`)
                articleNavigationLink.setAttribute('href', `$${i}`);
                articleNavigationLink.textContent = ' ' + titleBlock;
                articleNavigationItem.append(articleNavigationLink);
                articleNavigationList.append(articleNavigationItem);
            }
            document.querySelectorAll('a[href^="$"').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    let href = this.getAttribute('href').substring(1);
                    const scrollTarget = document.getElementById(href);
                    const topOffset = 280;
                    const elementPosition = scrollTarget.getBoundingClientRect().top;
                    const offsetPosition = elementPosition - topOffset;
                    window.scrollBy({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                });
            });
        } else {
            articleNavigation.querySelector('.navigation__item').remove();
        }
    }
    /* end navigation */


    /*  search  */
    let inputSearch = document.querySelectorAll('input[type=search]');
    if (inputSearch.length > 0) {
        inputSearch.forEach((elem) => {
            const wrapper = elem.closest('.search-wrapper');
            if (wrapper) {
                const popularListBlock = wrapper.querySelector('.popup__search');
                const searchResultBlock = wrapper.querySelector('.popup__search-result');
                const searchList = wrapper.querySelector('.search-list');
                const resultCount = searchResultBlock.querySelector('.popup__result_text span');
                const resultText = searchResultBlock.querySelector('.popup__result_text');
                
                popularListBlock.classList.remove('none');
                searchResultBlock.classList.add('none');

                function search() {
                    let filter = elem.value.toUpperCase();
                    let li = searchList.getElementsByTagName("li");
                    let totalResults = 0;
                    if (filter.trim() !== "") {
                        popularListBlock.classList.add('none');
                        searchResultBlock.classList.remove('none');
                        for (let i = 0; i < li.length; i++) {
                            let a = li[i].querySelector(".search-name span");
                            if (a && a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                                li[i].classList.remove('none');
                                totalResults++;
                            } else {
                                li[i].classList.add('none');
                            }
                        }
                        if (totalResults > 0) {
                            resultCount.innerText = totalResults;
                            resultText.innerHTML  = `По вашему запросу найдено: <span>${totalResults}</span>`;
                        } else {
                            resultCount.innerText = '0';
                            resultText.innerHTML  = 'По вашему запросу ничего не найдено';
                        }
                    } else {
                        searchResultBlock.classList.add('none');
                        popularListBlock.classList.remove('none');
                    }
                }
                elem.addEventListener('keyup', search);
            }
        });
    }
    /*  end search  */


    //quantity articles
    const articles = document.querySelectorAll('.articles__card');
    const quantityElement = document.querySelector('.page-articles__quantity span');
    quantityElement.textContent = articles.length;
})



/* toggle select */
function toggleDropdown() {
    const dropdown = document.querySelector('.custom-select');
    dropdown.classList.toggle('open');
}

document.querySelectorAll('.options li').forEach(option => {
    option.addEventListener('click', function() {
        const text = this.textContent;
        const dropdown = document.querySelector('.custom-select');
        const options = document.querySelector('.options');
        document.querySelectorAll('.options li').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        dropdown.querySelector('.selected-option').textContent = text;
        options.classList.remove('open');
    });
});

document.addEventListener('click', function(e) {
    const dropdown = document.querySelector('.custom-select');
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        document.querySelector('.options').classList.remove('open');
    }
});
/* toggle select */



/* play video */
function playVideo() {
    var video = document.getElementById('video');
    var playButton = document.querySelector('.play-button');
    if (video.paused) {
        video.play();
        playButton.style.display = 'none';
    } else {
        video.pause();
        playButton.style.display = 'flex';
    }
}
/* end play video */
