import { useState } from 'react';
import { createClient, Provider } from 'urql';
import './App.css';
import Nomination from './components/form/nomination';
import Info from './components/Info';
import SignIn from './components/SignIn';

const client = createClient({
	url: 'https://kitsu.io/api/graphql',
});

function App() {
	const [token, setToken] = useState('');

	return (
		<div className='App'>
			{!token && <Info />}
			{!token && <SignIn setToken={setToken} />}
			<Provider value={client}>
				{token && <Nomination title='Anime of the Year' />}
			</Provider>
		</div>
	);
}

export default App;
