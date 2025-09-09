import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [comics, setComics] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCharacter = await axios.get(`${API_BASE}/api/character/${id}`);
        const resComics = await axios.get(
          `${API_BASE}/api/comics/by-character/${id}`
        );
        setCharacter(resCharacter.data);
        setIsLoading(false);
        setComics(resComics.data?.results || resComics.data?.comics);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <>
      <section>
        <div className="character_header">
          <Link to="/" className="link">
            Retour
          </Link>
          <h1 className="title">
            {character?.character?.name || character?.name}
          </h1>
        </div>

        <div className="character_main">
          {character?.thumbnail ? (
            <img
              className="character_img"
              src={`${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`}
              alt={character.name}
            />
          ) : (
            <div>Pas d’image</div>
          )}

          <div className="character_body">
            <p className="character_desc">
              {character?.character?.description ||
                character?.description ||
                "Aucune description disponible."}
            </p>
          </div>
        </div>

        <h2 className="subtitle">Comics liés</h2>

        <div className="grid">
          {comics.length === 0 && <p>Aucun comic trouvé.</p>}

          {comics.map((element) => {
            const img =
              element.thumbnail?.path && element.thumbnail?.extension ? (
                `${element.thumbnail.path}/portrait_xlarge.${element.thumbnail.extension}`
              ) : (
                <span>Pas d’image</span>
              );

            return (
              <article
                className="card"
                key={element._id || element.id || element.title}
              >
                <div className="card_media">
                  {img ? (
                    <img className="card_img" src={img} alt={element.title} />
                  ) : (
                    <span>Pas d’image</span>
                  )}
                </div>
                <div className="card_body">
                  <h3 className="card_title">{element.title}</h3>
                  {element.description && (
                    <p className="card_owner">{element.description}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default Character;
