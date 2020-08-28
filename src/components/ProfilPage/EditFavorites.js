import React, { useState, useEffect } from "react";
import history from "../../utils/history";
import { getCategories, getSources } from "../../services/dataService";
import { getPersonalData } from "../../services/profilService";
import { FAVORITE_SOURCE, FAVORITE_CATEGORY } from "../../utils/constants";

const EditFavorites = () => {
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [personnalFavorites, setPersonnalFavorites] = useState([]);
    const [favoritesLoading, setFavoritesLoading] = useState(true);
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [sourceLoading, setSourceLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const registering = data => {
        setLoading(true);
        
    }

    useEffect(() => {
        getPersonalData()
            .then((res) => {
                setPersonnalFavorites(res.data.favorites);
                setFavoritesLoading(false);
            })
            .catch((err) => console.error(err));

        getCategories()
            .then((res) => {
                setCategories(res.data["hydra:member"]);
                setCategoryLoading(false);
            })
            .catch((err) => console.error(err));

        getSources()
            .then((res) => {
                setSources(res.data["hydra:member"]);
                setSourceLoading(false);
            })
            .catch((err) => console.error(err));

    }, [],
    );

    return (
        <>
            <div className="container-fluid">
                <div className="row w-100">
                    <div className="col p-2 titles">
                        <h1>Modifier mes favoris</h1>
                    </div>
                </div>
            </div>
            <div className="row w-100 d-flex justify-content-center">
                <div className="col-md-6">
                    <form style={{ width: "100%" }}>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6">

                            </div>
                        </div>
                        <div className="form-group d-flex justify-content-center">
                            <div className="col-md-6">
                                <h3 className="text-primary">Catégories</h3>
                                <p className="text-muted">Veuillez sélectionner au moins une catégorie.</p>
                                <div className="form-check">
                                    {
                                        (favoritesLoading || categoryLoading || sourceLoading) && (
                                            <>
                                                <div className="d-flex justify-content-center mt-5">
                                                    <div className="spinner-grow text-primary" role="status">
                                                        <span className="sr-only"></span>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center text-primary">
                                                    Chargement de vos données en cours...
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        !favoritesLoading && !categoryLoading && !sourceLoading && (
                                            personnalFavorites.map((favoris, index) => (

                                                categories.map((category, index) => {
                                                    if (favoris["@type"] === FAVORITE_CATEGORY && favoris.category.name === category.name) {
                                                        return (
                                                            <div className="row">
                                                                <input className="form-check-input" type="checkbox" id={index} name={category.name} checked />
                                                                <label className="form-check-label" for={category.name}>
                                                                    {category.name}
                                                                </label>
                                                            </div>
                                                        )
                                                    } else if (favoris["@type"] === FAVORITE_CATEGORY && favoris.category.name !== category.name) {
                                                        return (
                                                            <div className="row">
                                                                <input className="form-check-input" type="checkbox" id={index} name={category.name} />
                                                                <label className="form-check-label" for={category.name}>
                                                                    {category.name}
                                                                </label>
                                                            </div>
                                                        )
                                                    }
                                                    return null;

                                                })


                                            ))
                                        )
                                    }

                                </div>
                                <h3 className="text-primary mt-4">Sources</h3>
                                <p className="text-muted">Veuillez sélectionner au moins une source.</p>
                                <div className="form-check">
                                    {
                                        (favoritesLoading || categoryLoading || sourceLoading) && (
                                            <>
                                                <div className="d-flex justify-content-center mt-5">
                                                    <div className="spinner-grow text-primary" role="status">
                                                        <span className="sr-only"></span>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center text-primary">
                                                    Chargement de vos données en cours...
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        !favoritesLoading && !categoryLoading && !sourceLoading && (
                                            personnalFavorites.map((favoris, index) => (
                                                sources.map((source, index) => {
                                                    if (favoris["@type"] === FAVORITE_SOURCE && favoris.source.name === source.name) {
                                                        return (
                                                            <div className="row">
                                                                <input className="form-check-input" type="checkbox" id={index} name={source.name} checked />
                                                                <label className="form-check-label" for={index}>
                                                                    {source.name}
                                                                </label>
                                                            </div>
                                                        )
                                                    } else if (favoris["@type"] === FAVORITE_SOURCE && favoris.source.name !== source.name) {
                                                        return (
                                                            <div className="row">
                                                                <input className="form-check-input" type="checkbox" id={index} name={source.name} />
                                                                <label className="form-check-label" for={index}>
                                                                    {source.name}
                                                                </label>
                                                            </div>
                                                        )

                                                    }
                                                    return null;



                                                })
                                            ))
                                        )

                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div>
                                <button className="btn btn-primary">Mettre à jour</button>
                                <button className="btn btn-danger" onClick={(e) => {
                                    history.push("/profil");
                                }}>Retour</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default EditFavorites;