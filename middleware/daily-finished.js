export default function dailyFinished({ store, redirect }) {
  if (!store.state.isDailyFinished) {
    return redirect('/')
  }
}
