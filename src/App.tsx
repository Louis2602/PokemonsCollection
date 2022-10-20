import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Pokemon, Detail } from './interface';
import SearchBar from './components/SearchBar';
import PokemonCollections from './components/PokemonCollections';

interface Pokemons {
	name: string;
	url: string;
}

const App: React.FC = () => {
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [nextUrl, setNextUrl] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [viewDetail, setDetail] = useState<Detail>({
		id: 0,
		isOpened: false,
	});
	const [searchTerm, setSearchTerm] = useState<string>('');

	useEffect(() => {
		const getPokemon = async () => {
			const res = await axios.get(
				'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20'
			);
			setNextUrl(res.data.next);
			res.data.results.forEach(async (pokemon: Pokemons) => {
				const poke = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
				);
				setPokemons((p) => [...p, poke.data]);
				setLoading(false);
			});
		};
		getPokemon();
	}, []);

	const handleLoadMore = async () => {
		setLoading(true);
		let res = await axios.get(nextUrl);
		setNextUrl(res.data.next);
		res.data.results.forEach(async (pokemon: Pokemons) => {
			const poke = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
			);
			setPokemons((p) => [...p, poke.data]);
			setLoading(false);
		});
	};

	return (
		<div className='App'>
			<div className='container'>
				<header className='pokemon-header'>Pokemon</header>
				<SearchBar
					pokemons={pokemons}
					viewDetail={viewDetail}
					setDetail={setDetail}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
				{!searchTerm && (
					<PokemonCollections
						pokemons={pokemons}
						viewDetail={viewDetail}
						setDetail={setDetail}
					/>
				)}
				{!viewDetail.isOpened && (
					<div className='btn'>
						<button onClick={handleLoadMore}>
							{loading ? 'Loading...' : 'Load more'}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
