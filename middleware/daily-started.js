export default function dailyStarted({ store, redirect }) {
  if (!store.state.isDailyStarted) {
    return redirect('/')
  }
}
