import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SocketStudioProvider } from '@socket-studio/react';

import { StartingSoon } from './routes/starting-soon';
import { Interview } from './routes/interview';
import { Monologue } from './routes/monologue';
import { PairProgramming } from './routes/pair-programming';
import { SoloProgramming } from './routes/solo-programming';
import { Layout } from './components/layout';

import '@lwj/design-system/css/index.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<SocketStudioProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/starting-soon" element={<StartingSoon />} />

					<Route path="/" element={<Layout />}>
						<Route path="interview" element={<Interview />} />
						<Route path="pair-programming" element={<PairProgramming />} />

						<Route path="monologue" element={<Monologue />} />
						<Route path="solo-programming" element={<SoloProgramming />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</SocketStudioProvider>
	</React.StrictMode>
);
