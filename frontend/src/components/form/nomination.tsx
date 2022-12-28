import { useState } from 'react';
import { SelectedAnime } from '../../types/anime';
import Search from './search';
import styles from './styles/nominations.module.css';

const enum Move {
	Up = -1,
	Down = 1,
}

export default function Nomination({ title }: { title: string }) {
	const [anime, setAnime] = useState<SelectedAnime[]>([]);

	const addAnime = (anime: SelectedAnime) => {
		setAnime((existing) => {
			const filtered = existing.filter((v) => v.id !== anime.id);
			return [...filtered, anime];
		});
	};

	const removeAnime = (id: `${number}`) => {
		setAnime((existing) => {
			const filtered = existing.filter((v) => v.id !== id);
			return [...filtered];
		});
	};

	const moveAnime = (i: number, move: Move) => {
		const arr = [...anime];
		const element = arr[i];
		arr.splice(i, 1);
		arr.splice(i + move, 0, element);
		setAnime(arr);
	};

	return (
		<form>
			<legend>{title}</legend>
			<div className={[styles.picks].join(' ')}>
				{anime.map((a, i) => (
					<div className={styles.noms} key={a.id}>
						<div className={styles.move}>
							<p>{i + 1}</p>
							<button
								className={styles.up}
								onClick={(e) => {
									e.preventDefault();
									moveAnime(i, Move.Up);
								}}>
								▲
							</button>
							<button
								className={styles.down}
								onClick={(e) => {
									e.preventDefault();
									moveAnime(i, Move.Down);
								}}>
								▼
							</button>
						</div>
						<p>
							<img src={a.imgUrl} />
							{a.title}
						</p>
						<button
							onClick={(e) => {
								e.preventDefault();
								removeAnime(a.id);
							}}>
							X
						</button>
					</div>
				))}
			</div>
			{anime.length > 6 && <p>TOO MANY ENTRIES, MAX 6</p>}
			<Search setAnime={addAnime} />
		</form>
	);
}
