import React from "react";
import WelcomeCard from "../components/welcome-card";
import { useQuery, gql } from "@apollo/client";

const GET_DATA = gql`
  {
    getNext
    getTitle
  }
`;

export const Container = () => {
  const { loading, error, data } = useQuery(GET_DATA);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <WelcomeCard title={data.getTitle} paragraph={data.getNext} />;
};

export default Container;
