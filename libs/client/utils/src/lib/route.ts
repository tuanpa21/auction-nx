export default function changeState(url: string) {
  window.history.replaceState(null, '', url);
}
