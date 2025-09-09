import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const LIMIT = 100;

export default function Comics() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          limit: LIMIT,
          skip: (page - 1) * LIMIT,
          title: query || undefined,
          sort: "title",
        };
        const response = await axios.get(`${API_BASE}/api/comics`, { params });
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page, query]);

  const prec = page > 1;
  const suiv = data?.results?.length === LIMIT;

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <>
      <section>
        <h1 className="title">Comics</h1>

        <form className="searchbar">
          <input
            type="search"
            id="title"
            className="input"
            placeholder="Recherche des comics"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
          {/* <button className="btn">Rechercher</button> */}
        </form>

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
          {(data?.results || []).map((element) => {
            const img =
              element.thumbnail?.path && element.thumbnail?.extension ? (
                `${element.thumbnail.path}/portrait_xlarge.${element.thumbnail.extension}`
              ) : (
                <span>Pas d’image</span>
              );

            return (
              <article className="card" key={element._id}>
                <div className="card_media">
                  {img ? (
                    <img className="card_img" src={img} alt={element.title} />
                  ) : (
                    <span>Pas d’image</span>
                  )}
                </div>
                <div className="card_body">
                  <h2 className="card_title">{element.title}</h2>
                  {element.description && (
                    <div className="card_owner">{element.description}</div>
                  )}
                </div>
              </article>
            );
          })}
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
}
