import React, { FunctionComponent } from "react";
import styled from "styled-components";

type WelcomeProps = {
  title: string;
  paragraph: string;
};

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: green;
`;

const Paragraph = styled.div`
  font-size: 1em;
  text-align: center;
  color: blue;
`;

const Wrapper = styled.div`
  padding: 4em;
  background: papayawhip;
`;

export const WelcomeCard: FunctionComponent<WelcomeProps> = ({
  title,
  paragraph,
}: WelcomeProps) => (
  <Wrapper>
    <Title>{title}</Title>
    <Paragraph>{paragraph}</Paragraph>
  </Wrapper>
);

export default WelcomeCard;
