import User from '../models/user';

export default {
    render(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}