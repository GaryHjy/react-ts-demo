export const loadMore = function(container:HTMLElement, getMore:any) {
  function _loadMore() {
    let clientHeight = container.clientHeight;
    let scrollTop = container.scrollTop;
    let scrollHeight = container.scrollWidth;
    if(clientHeight+scrollTop + 5 >=scrollHeight) {
      getMore();
    }
  }
  container.addEventListener('scroll', debounce(_loadMore, 300));
}

export const downRefresh = function(container:HTMLElement, refreshFn: any) {
  let startY:number;
  let distance:number;
  let originTop = container.offsetTop;
  container.addEventListener('touchstart', function(event: any) {
    let touchMove = throttle(_touchMove, 70)
    if (container.offsetTop == originTop && container.scrollTop == 0) {
      startY = event.touches[0].pageY;
      container.addEventListener('touchmove', touchMove);
      container.addEventListener('touchend', touchEnd);
    }
    function _touchMove(event:any) {
      let pageY = event.touches[0].pageY;
      if(pageY > startY) {
        distance = pageY - startY;
        container.style.top = originTop + distance + 'px';
      } else {
        container.removeEventListener('touchmove', touchMove);
        container.removeEventListener('touchend', touchEnd);
      }
    }

    function touchEnd(event:any) {
      container.removeEventListener('touchmove', touchMove);
      container.removeEventListener('touchend', touchEnd);
      if (distance > 10) {
        refreshFn();
      }
      let timer = setInterval(function() {
        if(distance<1) {
          container.style.top = originTop + 'px';
          clearInterval(timer);
        } else {
          container.style.top = originTop + (--distance) + 'px'
        }
      }, 15)
    }
  })
}

function debounce(fn:any, wait:number):any {
  let timeout:any = null;
  return function() {
    if (!timeout!==null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  }
}

function throttle(func:any, delay:number) {
  let prev = Date.now();
  return function() {
    let context = this;
    let args = Array.from(arguments);
    let now = Date.now();
    if(now -prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  }
}