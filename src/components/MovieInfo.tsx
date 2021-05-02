import React, { useContext, useEffect, useState } from "react";
import "./MovieInfo.scss";
import {  Modal } from "@shopify/polaris";
import { getMovieByImdbID } from "../utils/omdbAPI.service";
import { DetailedMovieModel } from "../models/detailedMovie.model";
import { ThemeModel } from "../models/theme.model";
import { ThemeContext } from "styled-components";

type MovieInfoProps = {
    imdbID: string;
    onCloseMovieInfo: () => any;
}


const MovieInfo = ({ imdbID, onCloseMovieInfo }: MovieInfoProps) => {

    const [movieData, setMovieData] = useState<DetailedMovieModel>();

    const theme = useContext<ThemeModel>(ThemeContext);

    useEffect(() => {
        const getMovieData = async (id: string) => {
            const data = await getMovieByImdbID(id);
            console.log(data);
            setMovieData(data);
        }

        if (imdbID.length > 0) {
            getMovieData(imdbID);
        }
    }, [imdbID]);


  return ( 
    movieData ? 
    <div style={{backgroundColor: theme.container, color: theme.text}}>
      <Modal
        large
        open={imdbID.length > 0}
        onClose={() => {
            onCloseMovieInfo();
            setMovieData(undefined);
        }}
        title={movieData?.Title}
      >
        <Modal.Section>
          <div>THIS IS SOME TEXT</div>
        </Modal.Section>
      </Modal>
    </div> : null
  );



};

export default MovieInfo;