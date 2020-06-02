// 매개변수는 원래 context
export default function({ store, redirect }) {
    if(!store.state.users.me) {
        redirect('/');
    }
}
