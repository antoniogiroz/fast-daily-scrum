export default function ({ store, redirect }) {
  if (!store.state.isDailyFinished) {
    return redirect('/')
  }
}
