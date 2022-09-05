import React from 'react';
import ReactDOM from 'react-dom/client';
import { Wrapper } from './components/wrapper';

import '@lwj/design-system/css/index.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Wrapper />
	</React.StrictMode>
);
