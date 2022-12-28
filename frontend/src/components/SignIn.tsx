import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface TokenRes {
	access_token: string; // Token used in Authorization header
	created_at: number;
	expires_in: number; // Seconds until the access_token expires (30 days default)
	refresh_token: string; // Token used to get a new access_token
	scope: 'public';
	token_type: 'bearer';
}

export default function SignIn({
	setToken,
}: {
	setToken: Dispatch<SetStateAction<string>>;
}) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const submit = () => {
		fetch('https://kitsu.io/api/oauth/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				grant_type: 'password',
				username,
				password: encodeURI(password),
			}),
		}).then(async (data) => {
			const tokenRes: TokenRes = await data.json();

			setToken(tokenRes.access_token);
		});
	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				submit();
			}}>
			<legend>Sign in to Kitsu</legend>
			<p>
				Your password is never sent anywhere else than directly to Kitsu for
				verification. You can inspect the network requests by opening the dev
				tools (F12 or ctrl + shift + I) to verify.
			</p>
			<input
				type='text'
				value={username}
				placeholder='email or @mention'
				onChange={(e) => setUsername(e.currentTarget.value)}></input>
			<input
				type='password'
				value={password}
				placeholder='password'
				onChange={(e) => setPassword(e.currentTarget.value)}></input>
			<input type='submit' value='Sign In'></input>
		</form>
	);
}
