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

function debounce(fn:any, wait:number):any {
  let timeout:any = null;
  return function() {
    if (!timeout!==null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  }
}