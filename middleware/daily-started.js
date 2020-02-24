export default function({ store, route, redirect }) {
  if (!store.state.isDailyStarted) {
    return redirect('/')
  }
}
