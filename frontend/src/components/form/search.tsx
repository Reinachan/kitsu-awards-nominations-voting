import { debounce } from 'lodash';
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { useQuery } from 'urql';
import { SelectedAnime } from '../../types/anime';
import styles from './styles/search.module.css';

const QUERY = `query ($title: String!) {
  searchAnimeByTitle(title: $title, first: 20) {
    nodes {
      id
      slug
      titles {
        canonical
      }
      posterImage {
        views {
          url
        }
      }
    }
  }
}`;

// const useSearchAnime = (): [
// 	data: any,
// 	loading: boolean,
// 	error: any,
// 	fetchData: (title: string) => void
// ] => {
// 	const [data, setData] = useState<any>();
// 	const [loading, setLoading] = useState<boolean>(false);
// 	const [error, setError] = useState<any>();

// 	const fetchData = async (title: string) => {
// 		if (title === '') return;

// 		console.log(title);

// 		const body = JSON.stringify({
// 			query: QUERY,
// 			variables: {
// 				title,
// 			},
// 		});

// 		console.log(body);

// 		const data = await fetch('https://kitsu.io/api/graphql', {
// 			method: 'POST',
// 			body,
// 		});

// 		if (data.ok) {
// 			setData(await data.json());
// 		}
// 		setError('something went wrong');
// 		setLoading(false);
// 	};

// 	return [data, loading, error, fetchData];
// };

interface Anime {
	searchAnimeByTitle: {
		nodes: {
			id: `${number}`;
			slug: string;
			posterImage: {
				views: {
					url: string;
				}[];
			};
			titles: {
				canonical: string;
			};
		}[];
	};
}

export default function Search({
	setAnime,
}: {
	setAnime: (anime: SelectedAnime) => void;
}) {
	const [search, setSearch] = useState<string>('');
	const [{ data, fetching, error }, reexecuteQuery] = useQuery<Anime>({
		query: QUERY,
		variables: {
			title: search,
		},
		pause: true,
	});

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (!!search) {
				reexecuteQuery();
			}
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [search]);

	if (data) {
		console.log(data);
	}

	return (
		<div className={styles.search}>
			<input
				type='search'
				value={search}
				placeholder='search Kitsu'
				onChange={(e) => {
					setSearch(e.currentTarget.value);
				}}
			/>

			{fetching && <p>loading ...</p>}

			{!fetching && data && !!search && (
				<div className='results'>
					{data.searchAnimeByTitle.nodes.map((anime) => (
						<button
							key={anime.id}
							className={styles.searchResults}
							onClick={(e) => {
								e.preventDefault();
								setAnime({
									id: anime.id,
									title: anime.titles.canonical,
									imgUrl: anime.posterImage.views[0].url,
								});
							}}>
							<h2>{anime.titles.canonical}</h2>
							<span>
								id: {anime.id} slug: {anime.slug}
							</span>
							<img src={anime.posterImage.views[0].url} />
						</button>
					))}
				</div>
			)}
		</div>
	);
}
