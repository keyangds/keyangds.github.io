(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function () {
    const board = document.querySelector('[data-news-list]');

    if (!board) {
      return;
    }

    let isDown = false;
    let startY = 0;
    let scrollTop = 0;

    const startDrag = (event) => {
      isDown = true;
      board.classList.add('is-dragging');
      startY = (event.pageY || event.touches?.[0]?.pageY || 0) - board.offsetTop;
      scrollTop = board.scrollTop;
    };

    const stopDrag = () => {
      isDown = false;
      board.classList.remove('is-dragging');
    };

    const onDrag = (event) => {
      if (!isDown) {
        return;
      }

      event.preventDefault();
      const y = (event.pageY || event.touches?.[0]?.pageY || 0) - board.offsetTop;
      const walk = (y - startY) * 1.1;
      board.scrollTop = scrollTop - walk;
    };

    board.addEventListener('mousedown', startDrag);
    board.addEventListener('touchstart', startDrag, { passive: true });

    board.addEventListener('mouseleave', stopDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);

    board.addEventListener('mousemove', onDrag);
    board.addEventListener('touchmove', onDrag, { passive: false });
  });
})();

