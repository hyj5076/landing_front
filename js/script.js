document.addEventListener("DOMContentLoaded", function() {
  // 문서 준비 이벤트 시작

  //헤더 띄우기
  window.addEventListener('DOMContentLoaded', function() {
    let header = document.querySelector('header');
    header.style.display = 'block';
    let wrap = document.querySelector('#wrap');
    let isHeaderVisible = true;
  
    header.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  
    wrap.addEventListener('click', function(e) {
      e.preventDefault();
      toggleHeader();
    });
  
    window.addEventListener('scroll', function() {
      if ((isHeaderVisible && window.scrollY > 100) || (!isHeaderVisible && window.scrollY <= 100)) {
        toggleHeader();
      }
    });
  
    function toggleHeader() {
      header.style.transition = 'opacity 500ms ease';
      header.style.opacity = isHeaderVisible ? '0' : '1';
      isHeaderVisible = !isHeaderVisible;
    }
  });
  

  //PC형 페이징 스크롤
  window.addEventListener("wheel", function(e) {
    e.preventDefault();
  }, { passive: false });

  let html = document.querySelector("html");
  let header = document.querySelector("header"); // 헤더 선택자 추가
  let headerHeight = header.offsetHeight; // 헤더 높이 변수 추가
  let page = 0; // 첫 페이지가 아닌 0으로 설정
  let lastPage = document.querySelectorAll("section").length;
  let scrolling = false; // 스크롤 중 여부를 확인하기 위한 변수 추가

  html.scrollTo({
    top: 0,
    behavior: 'smooth'
  }); // 초기에 맨 위로 스크롤

  function scrollToPosition(top) {
    scrolling = true; // 스크롤 중임을 표시

    html.scrollTo({
      top: top,
      behavior: 'smooth'
    });

    setTimeout(function() {
      scrolling = false; // 스크롤 종료 후 스크롤 중이 아님을 표시
    }, 300); // 스크롤이 완전히 끝나는 시간 (0.3초가 가장 적당)
  }

/*   window.addEventListener("wheel", function(e) {
    if (scrolling) return; // 스크롤 중인 경우 동작하지 않음

    if (e.deltaY > 0) {
      if (page === lastPage - 1) {
        e.preventDefault(); // 마지막 페이지 바로 아래로 스크롤 이벤트를 무효화
        return;
      }
      page++;
    } else if (e.deltaY < 0) {
      if (page === 0) {
        scrollToPosition(0);
        return;
      }
      page--;
    }
    let posTop = page * window.innerHeight; // 위치 계산
    scrollToPosition(posTop);
  }, { passive: false }); */


  window.addEventListener("wheel", function(e) {
    if (scrolling) return; // 스크롤 중인 경우 동작하지 않음

    const content = document.querySelector(".content");
    const benefitContent = document.querySelector(".benefit ul");

    const handleScroll = (element) => {
      const scrollHeight = element.scrollHeight;
      const height = element.offsetHeight;

      if (scrollHeight > height) {
        if (e.deltaY > 0) {
          if (element.scrollTop + height >= scrollHeight) {
            e.preventDefault();
            return;
          }
          element.scrollTop += 50;
        } else if (e.deltaY < 0) {
          if (element.scrollTop === 0) {
            e.preventDefault();
            return;
          }
          element.scrollTop -= 50;
        }
      }
    };

    if (content.contains(e.target)) {
      handleScroll(content);
    } else if (benefitContent.contains(e.target)) {
      handleScroll(benefitContent);
    } else {
      if (e.deltaY > 0) {
        if (page === lastPage - 1) {
          e.preventDefault(); // 마지막 페이지 바로 아래로 스크롤 이벤트를 무효화
          return;
        }
        page++;
      } else if (e.deltaY < 0) {
        if (page === 0) {
          scrollToPosition(0);
          return;
        }
        page--;
      }
      let posTop = page * window.innerHeight; // 위치 계산
      scrollToPosition(posTop);
    }
  }, { passive: false });

  

  // 모바일 터치 이벤트
  let startY; // 터치 시작 위치 변수 추가

  window.addEventListener("touchstart", function(e) {
    if (scrolling) return; // 스크롤 중인 경우에는 동작하지 않음

    startY = e.touches[0].clientY; // 터치 시작 위치 저장
  });

  window.addEventListener("touchmove", function(e) {
    e.preventDefault(); // 스크롤 이벤트를 무효화

    if (scrolling) return; // 스크롤 중인 경우에는 동작하지 않음

    let deltaY = e.touches[0].clientY - startY; // 터치 이동 거리 계산

    if (deltaY > 0) {
      if (page === 0) {
        scrollToPosition(0);
        return;
      }
      page--;
    } else if (deltaY < 0) {
      if (page === lastPage - 1) {
        scrollToPosition(page * window.innerHeight); // 위치로 스크롤
        return;
      }
      page++;
    }
    let posTop = page * window.innerHeight; // 위치 계산
    scrollToPosition(posTop);
  }, { passive: false });

  window.addEventListener("wheel", function(e) {
    if (scrolling) return; // 스크롤 중인 경우에는 동작하지 않음

    if (e.deltaY < 0 && html.scrollTop === 0) {
      scrollToPosition(-headerHeight);
    }
  });

  // 페이지 스크롤 막기
  document.querySelector(".content").addEventListener("touchmove", function(e) {
    e.stopPropagation();
  });

  document.querySelector(".benefit ul").addEventListener("touchmove", function(e) {
    e.stopPropagation();
  });




});