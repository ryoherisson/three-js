import Canvas from './Canvas';

// このクラス内に ページごとのcanvas外の処理を書いていきます
export default class Page00 {
  constructor() {
    const canvas = new Canvas('scroll-container_title');

    // ページを表示したときにすでに前回のスクロール位置まで移動しているケースがあるので、
    // イベント発生時だけでなく、ページ表示時にもcanvas.scrolled関数を呼んでスクロール位置を更新しておく.
    canvas.scrolled(window.scrollY);

    window.addEventListener('mousemove', e => {
      canvas.mouseMoved(e.clientX, e.clientY);
    });

    window.addEventListener('scroll', e => {
      canvas.scrolled(window.scrollY);
    })
  }
};