import type { ReactElement } from 'react';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';
import { Sponsors } from '@lwj/design-system';

import styles from './message-rotator.module.css';

type MachineContext = {
	message: number;
};

const messages: ReactElement[] = [
	<>
		<span className={styles.captioning}>live captioning made possible by:</span>
		<Sponsors />
	</>,
	<p>
		visit <strong>lwj.dev/live</strong> to view live captions by White Coat
		Captioning
	</p>,
	<p>
		see past and upcoming episodes at <strong>learnwithjason.dev</strong>
	</p>,
];

const updateMessage = assign({
	message: (context: MachineContext) => (context.message + 1) % messages.length,
});

const messageRotatorMachine = createMachine(
	{
		id: 'MessageRotator',
		initial: 'visible',
		context: {
			message: 0,
		} as MachineContext,
		states: {
			visible: {
				after: {
					ROTATION: {
						target: 'transitioning',
					},
				},
			},
			transitioning: {
				after: {
					TRANSITION: {
						target: 'visible',
						actions: 'updateMessage',
					},
				},
			},
		},
	},
	{
		actions: { updateMessage },
		delays: {
			ROTATION: 10_000,
			TRANSITION: 300,
		},
	}
);

export function MessageRotator() {
	const [state] = useMachine(messageRotatorMachine);
	const hiddenClass = state.value === 'transitioning' ? styles.hide : '';

	return (
		<div className={`${styles.message} ${hiddenClass}`}>
			{messages[state.context.message]}
		</div>
	);
}
