import * as constants from './constants';

const login_url = `${constants.UPDATE_PROFIL_ENDPOINT}`;

export const updateProfil = (name, firstname, login, email) => {
    const request = new Request(`${login_url}`, {
        method: 'PUT',
        body: JSON.stringify({ name, firstname, login, email}),
        headers: new Headers({
            'Content-Type': 'application/ld+json',
            'Authorization': `Bearer ${localStorage.getItem('front-user')}`
        }),
    });

    return fetch(request);
}