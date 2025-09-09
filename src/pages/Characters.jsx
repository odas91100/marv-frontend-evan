import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const LIMIT = 100;

const Characters = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/characters`, {
          params: { limit: LIMIT, skip: (page - 1) * LIMIT },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page]);

  const prec = page > 1;
  const suiv = data?.results?.length === LIMIT;

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <>
      <section>
        <h1 className="title">Personnages</h1>

        <div className="pagination">
          <button
            className="btn"
            disabled={!prec}
            onClick={() => setPage((page) => page - 1)}
          >
            Préc.
          </button>
          <span>Page {page}</span>
          <button
            className="btn"
            disabled={!suiv}
            onClick={() => setPage((page) => page + 1)}
          >
            Suiv.
          </button>
        </div>

        <div className="grid">
          {(data?.results || []).map((element) => (
            <article className="card" key={element._id}>
              <div className="card_media">
                <Link
                  to={`/character/${element._id}`}
                  className="card_img"
                  aria-label={element.name}
                >
                  {element.thumbnail?.path && element.thumbnail?.extension ? (
                    <img
                      className="card_img"
                      src={`${element.thumbnail.path}/portrait_xlarge.${element.thumbnail.extension}`} // les autres size img bug !
                      alt={element.name}
                    />
                  ) : (
                    <span>Pas d’image</span>
                  )}
                </Link>
              </div>

              <div className="card_body">
                <h2 className="card_title">
                  <Link to={`/character/${element._id}`}>{element.name}</Link>
                </h2>
                <p className="card_owner">
                  {element.description
                    ? element.description
                    : "Aucune description disponible."}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="pagination">
          <button
            className="btn"
            disabled={!prec}
            onClick={() => setPage((page) => page - 1)}
          >
            Préc.
          </button>
          <span>Page {page}</span>
          <button
            className="btn"
            disabled={!suiv}
            onClick={() => setPage((page) => page + 1)}
          >
            Suiv.
          </button>
        </div>
      </section>
    </>
  );
};
export default Characters;
