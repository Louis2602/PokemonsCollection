import React from 'react';
import PokemonList from './PokemonList';
import './pokemon.css';
import { PokemonDetail, Detail } from '../interface';

export interface Props {
	pokemons: PokemonDetail[];
	viewDetail: Detail;
	setDetail: React.Dispatch<React.SetStateAction<Detail>>;
}

const PokemonCollections: React.FC<Props> = ({
	pokemons,
	viewDetail,
	setDetail,
}) => {
	const selectPokemon = (id: number) => {
		if (!viewDetail.isOpened) {
			setDetail({
				id: id,
				isOpened: true,
			});
		}
	};
	return (
		<>
			<section
				className={
					viewDetail.isOpened
						? 'collection-container-active'
						: 'collection-container'
				}
			>
				{viewDetail.isOpened ? (
					<div className='overlay'></div>
				) : (
					<div></div>
				)}
				{pokemons.map((pokemon, idx) => {
					return (
						<div
							onClick={() => {
								selectPokemon(pokemon.id);
							}}
							key={idx}
						>
							<PokemonList
								viewDetail={viewDetail}
								setDetail={setDetail}
								name={pokemon.name}
								id={pokemon.id}
								abilities={pokemon.abilities}
								image={pokemon.sprites.front_default}
							/>
						</div>
					);
				})}
			</section>
		</>
	);
};

export default PokemonCollections;
